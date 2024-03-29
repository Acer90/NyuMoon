/*stream-elements api-daten, die findest du in stream elements unter benutzerdaten*/
const streamelements_jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjaXRhZGVs";
const streamelements_channel_id = "62acc92a9fdcba06f9d1453f"; 

/*das hier solltest du nicht anpassen, das sind die API daten vom bot, (Aktiverst nutzer)*/
const streamtools_api_token = "e4717e1b-d210-4c64-a4aa-661972dc3daf";
const streamtools_api_channel = 35974108;
var streamtools_api_server = "wss://api.streaming-tools.de";

/*top-chatter Options */
var period_topchatter = "day"; //welcher Zeitabschnitt soll angezeigt werden (session, day, month, year, all)

/*hier kannst du einstellen ob, beim öffnen die zahlen standartmäßig angezeigt werden sollen */
var show_numbers_actuser = false;  //true oder false
var show_numbers_dono = true; //true, false

/*länge der animation beim ändern des wertes*/
var animation_time = 500;
var animation_type = "write"; //fade, write

/*einstellung für die write animation*/
var charWidth = 2.5;
var spaceWidth = 8;
var animSpeed = 20;
var fadeSec = 0.5;
var lineSpace = 25; 
var padding_left = 5; //abstand bei ( zum vorherigen zeichen in px