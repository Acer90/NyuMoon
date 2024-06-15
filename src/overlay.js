var socket;
var se_fail_counter = 1;
var se_last_fail = 0;

const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + streamelements_jwt}
};

run_streamelements_ws();
function run_streamelements_ws(){
    socket = io('https://realtime.streamelements.com', {
        transports: ['websocket']
    });

    // Socket connected
    socket.on('connect', onConnect);
    // Socket got disconnected
    socket.on('disconnect', onDisconnect);
    // Socket is authenticated
    socket.on('authenticated', onAuthenticated);
    socket.on('unauthorized', onAuthenticated_failed);
    socket.on('event:test', (data) => {
        console.log(data);
        // Structure as on https://github.com/StreamElements/widgets/blob/master/CustomCode.md#on-event
    });
    socket.on('event', (data) => {
        console.log(data);
        this.update_list(data);
        // Structure as on https://github.com/StreamElements/widgets/blob/master/CustomCode.md#on-event
    });
    socket.on('event:update', (data) => {
        console.log(data);
        this.update_list(data);
        // Structure as on https://github.com/StreamElements/widgets/blob/master/CustomCode.md#on-session-update
    });
    socket.on('event:reset', (data) => {
        console.log(data);
        // Structure as on https://github.com/StreamElements/widgets/blob/master/CustomCode.md#on-session-update
    });


    function onConnect() {
        console.log('Successfully connected to the websocket');
        socket.emit('authenticate', {method: 'jwt', token: streamelements_jwt});
        se_fail_counter
    }

    function onDisconnect() {
        console.log('Disconnected from websocket');
        streamelements_reconnect();
    }

    function onAuthenticated(data) {
        const {
            channelId
        } = data;
        console.log(`Successfully connected to channel ${channelId}`);
        se_fail_counter = 1;
    }

    function onAuthenticated_failed(data){
        se_fail_counter = 1000;
    }
}

async function streamelements_reconnect(){
    var now = Math.floor(Date.now() / 1000);
    if((se_last_fail +1) >= now) return;

    try{
        socket.close();
    }catch (err){
    }

    socket = undefined;
    var w_time = se_fail_counter * 1000;
    await new Promise(resolve => setTimeout(resolve, w_time));
    run_streamelements_ws();
    se_fail_counter++;
    se_last_fail = Math.floor(Date.now() / 1000);
}

streamelements_startup();
function streamelements_startup(){
    fetch('https://api.streamelements.com/kappa/v3/sessions/'+streamelements_channel_id, options)
    .then(response => response.json())
    .then(response => this.load_OnStartUp (response))
    .catch(err => console.error(err));
}

function load_OnStartUp (data) {
    console.log(data)
    update_object("follower", data.data["follower-latest"].name);
    update_object("subscriber", data.data["subscriber-latest"].name);

    if(data.data["tip-latest"].amount > 0){
        var str = data.data["tip-latest"].name;
        if(show_numbers_dono) str = str + " (" + data.data["tip-latest"].amount + "€)";
        update_object("donation", str);
    }
}

var subcounter = 0;
var last_subscribers = [];
function update_list(data){
    switch(data.name){
        case "follower-latest":
            update_object("follower", data.data.name);
            break;
        case "subscriber-latest":
            last_subscribers.push(data.data.name);
            break;
        case "tip-latest":
            var str = data.data.name;
            if(show_numbers_dono) str = str + "(" + data.data.amount + "€)";
            update_object("donation", str);
            break;
    }
}

subscriber_post();
async function subscriber_post(){
    while(true){
        try{
            if(last_subscribers.length > 0){
                var name = last_subscribers[0];
                delete last_subscribers.shift();
                update_object("subscriber", name);
            }
            
        }catch(err){
            console.error(err);
        }

        await new Promise(resolve => setTimeout(resolve, 1000)); //eine sekunde warten
    }
}