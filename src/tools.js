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