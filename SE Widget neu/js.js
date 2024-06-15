let charWidth = 2.5;
let spaceWidth = 8;
let animSpeed = 20;
let fadeSec = 0.5;
let lineSpace = 25; 
let padding_left = 5;

let streamtools_api_token;
let streamtools_api_channel;
let streamtools_api_server;
let period_topchatter = "day";
let show_numbers_actuser = false;
let show_numbers_dono = false;
let animation_time = 500;
let animation_type = "write";

window.addEventListener('onWidgetLoad', function (obj) {
    let recents = obj.detail.recents;
    let data=obj["detail"]["session"]["data"];
    recents.sort(function (a, b) {
        return Date.parse(a.createdAt) - Date.parse(b.createdAt);
    });
  
    userCurrency = obj.detail.currency;
    const fieldData = obj.detail.fieldData;
  	streamtools_api_token = fieldData.streamtools_api_token;
  	streamtools_api_channel = fieldData.streamtools_api_channel;
    streamtools_api_server = fieldData.streamtools_api_server;
  
  	period_topchatter = fieldData.period_topchatter;
  
    show_numbers_actuser = fieldData.show_numbers_actuser;
    show_numbers_dono = fieldData.show_numbers_dono;
  
    animation_time = fieldData.animation_time;
    animation_type = fieldData.animation_type;
  
    //letzen werte laden 
  	update_object("follower", data["follower-latest"].name);
    update_object("subscriber", data["subscriber-latest"].name);	
  
  	var str = data["tip-latest"]["name"];
    if(show_numbers_dono) str = str + " (" + data["tip-latest"]["amount"] + "€)";
    update_object("donation", str);
  
  	//verbindung zu streamingtools aufbauen
    load_websocket();
});

var subcounter = 0;
var last_subscribers = [];
window.addEventListener('onEventReceived', function (obj) {
    if (!obj.detail.event) {
      return;
    }
    if (typeof obj.detail.event.itemId !== "undefined") {
        obj.detail.listener = "redemption-latest"
    }
    const listener = obj.detail.listener.split("-")[0];
    const event = obj.detail.event;

    if (listener === 'follower') {
        update_object("follower", event.name);
    } else if (listener === 'subscriber') {
 		last_subscribers.push(event.name);  
    } else if (listener === 'tip') {
      	var str = event.name;
        if(show_numbers_dono) str = str + " (" + event.amount + "€)";
        update_object("donation", str);
    }
});

//streamingtools
var ws; 
var fail_counter = 1;
var last_fail = 0;
var last_topchatter = "";
var last_topchatter_num = 0;

function load_websocket(){
    ws = new WebSocket(streamtools_api_server+'/'+streamtools_api_channel+'/'+streamtools_api_token);
    ws.onmessage = (event) => {
        try{
            data = JSON.parse(event.data);
            console.log(data);

            if(data.top_chatters !== undefined)set_TopChatters(data.top_chatters)
            //if(data.toggle_numbers_actuser !== undefined)set_Numbers_actUser(data.toggle_numbers_actuser)
            //if(data.toggle_numbers_dono !== undefined)set_Numbers_Dono(data.toggle_numbers_dono)
            //if(data.set_animation !== undefined) animation_time = data.set_animation;
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

//tools
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

async function update_object(id, value, delay = 0){
    if(animation_time > 0){
        switch(animation_type){
            case "fade":
                await $("#"+id).animate({opacity: 0}, (animation_time / 2), function(){
                    $("#"+id).html(value);
                });
                await $("#"+id).animate({opacity: 1}, (animation_time / 2));
                break;
            case "write":
                $("#"+id).html("");
                if(delay > 0){
                    await setTimeout(async function() {
                        await writeChars(id, value);
                    }, delay);
                }else{
                    writeChars(id, value);
                }
                break;
            default:
                $("#"+id).html(value);
                break;
        }
    }else{
        $("#"+id).html(value);
    }
}

function writeChars(p, t) {
	var zone = document.getElementById(p);
	var width = 0;
	var top = 0;
    var padding = 0;
	console.log(zone);
	var chars = t.split("");
	for (var i = 0; i < chars.length; i++) { 
        if(chars[i] == "(") padding = padding_left; else padding = 0;
		var s = "<span id ='" + p + "char" + i +
				"' class='writer' style='top:" + top + "px; left:" + width + 
				"px; padding-left:"+padding+"px; animation:charAnim " + fadeSec + "s linear " + i/animSpeed + "s forwards;'>"
				+ chars[i] + "</span>";
		var node = document.createElement("div");
		node.innerHTML = s;
		zone.appendChild(node);
	}
}