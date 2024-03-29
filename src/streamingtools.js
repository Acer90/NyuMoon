//streamtools_api_server = "ws://127.0.0.1:1234"; //local zu testzwecken

const ws_link = streamtools_api_server+'/'+streamtools_api_channel+'/'+streamtools_api_token;
var ws; 
var fail_counter = 1;
var last_fail = 0;
var last_topchatter = "";
var last_topchatter_num = 0;

load_websocket();
function load_websocket(){
    ws = new WebSocket(ws_link);
    ws.onmessage = (event) => {
        try{
            data = JSON.parse(event.data);
            console.log(data);

            if(data.top_chatters !== undefined)set_TopChatters(data.top_chatters)
            if(data.toggle_numbers_actuser !== undefined)set_Numbers_actUser(data.toggle_numbers_actuser)
            if(data.toggle_numbers_dono !== undefined)set_Numbers_Dono(data.toggle_numbers_dono)
            if(data.set_animation !== undefined) animation_time = data.set_animation;
        }catch (err){
            console.error(err);
        }
    };

    ws.onclose = (event) => {
        reconect();
    }

    ws.onopen = (event) => {
        console.log("Successfully connect to websocket =>" + event.target.url);
        fail_counter = 1;
        last_fail = 0;
    }

    ws.onerror = (event) => {
        //console.error("Connect to websocket failed =>" + event.target.url);
        ws.close();
    }
}

async function reconect(){
    var now = Math.floor(Date.now() / 1000);
    if((last_fail +1) >= now) return;

    try{
        ws.close();
    }catch (err){
    }

    ws = undefined;
    if(fail_counter > 60) fail_counter = 60;
    var w_time = fail_counter * 1000;
    await new Promise(resolve => setTimeout(resolve, w_time));
    load_websocket();
    fail_counter++;
    last_fail = Math.floor(Date.now() / 1000);
}

async function set_TopChatters(payload){
    var user = payload[period_topchatter].user;
    var count = payload[period_topchatter].count;

    if(user.length === 0) return;
    if(show_numbers_actuser){
        if(last_topchatter !== user){
            var username = user;
            var chars = username.split("");
            await update_object("aktUser", username);
            await update_object("aktUser_Value", " (" + count + ")", (chars.length * (animSpeed + fadeSec)) * 2);
        }else{
            await update_object("aktUser_Value", "(" + count + ")");
        }
    }else{
        $("#aktUser_Value").html("");
        if(last_topchatter === user) return;
        update_object("aktUser", user);
    }
    //$("#aktUser").html(txt);
    //update_object("aktUser", txt);

    last_topchatter = user;
    last_topchatter_num = count;
}

function set_Numbers_actUser(toggle_numbers){
    show_numbers_actuser = toggle_numbers;
    ws.send(JSON.stringify({cmd: "startup"}));
}

function set_Numbers_Dono(toggle_numbers){
    show_numbers_dono = toggle_numbers;
    streamelements_startup();
}