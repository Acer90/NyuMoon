/*stream-elements api-daten, die findest du in stream elements unter benutzerdaten*/
const streamelements_jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjaXRhZGVsIiwiZXhwIjoxNzE3MzI5ODUwLCJqdGkiOiI5MWNmN2FmZi04MzUwLTQxNDMtYTU3NS0xODJhYTBmYWY2N2QiLCJjaGFubmVsIjoiNjJhY2M5MmE5ZmRjYmEwNmY5ZDE0NTNmIiwicm9sZSI6Im93bmVyIiwiYXV0aFRva2VuIjoibG1UUTkzTnJsZEtjanVmRU1hd3RoSktxMldBMWU0WFpuRjdkSDN1clZ1NlZlQzNnIiwidXNlciI6IjYyYWNjOTJhOWZkY2JhN2IzYmQxNDUzZSIsInVzZXJfaWQiOiIzOTgzYWYwNy1kMGUyLTQzZDktYTU4MS1kY2IyY2VhZDVhOTIiLCJ1c2VyX3JvbGUiOiJjcmVhdG9yIiwicHJvdmlkZXIiOiJ0d2l0Y2giLCJwcm92aWRlcl9pZCI6IjQ0NDkzNzkxIiwiY2hhbm5lbF9pZCI6IjMyMGI4Yzc1LTllNDMtNDYwNy05YWNjLWNhNjhmZTJjZmI2NCIsImNyZWF0b3JfaWQiOiI2MTg1NmFhNC01ZTJlLTQ2MDQtOTUyMS0yZGNkNmE1NDQ2YzUifQ.Ej5fMSunzaB6TRDUZYZ6xjS0bX6ZYbl3IWXCwwKcmXk"
//const streamelements_jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjaXRhZGVsIiwiZXhwIjoxNzE0MTQyMjI2LCJqdGkiOiI5ZmFkZGM4ZS1kZDIyLTRjMjUtYmE0Zi1lYWQyMDNmYjIwNWUiLCJjaGFubmVsIjoiNjJhY2M5MmE5ZmRjYmEwNmY5ZDE0NTNmIiwicm9sZSI6Im93bmVyIiwiYXV0aFRva2VuIjoibG1UUTkzTnJsZEtjanVmRU1hd3RoSktxMldBMWU0WFpuRjdkSDN1clZ1NlZlQzNnIiwidXNlciI6IjYyYWNjOTJhOWZkY2JhN2IzYmQxNDUzZSIsInVzZXJfaWQiOiIzOTgzYWYwNy1kMGUyLTQzZDktYTU4MS1kY2IyY2VhZDVhOTIiLCJ1c2VyX3JvbGUiOiJjcmVhdG9yIiwicHJvdmlkZXIiOiJ0d2l0Y2giLCJwcm92aWRlcl9pZCI6IjQ0NDkzNzkxIiwiY2hhbm5lbF9pZCI6IjMyMGI4Yzc1LTllNDMtNDYwNy05YWNjLWNhNjhmZTJjZmI2NCIsImNyZWF0b3JfaWQiOiI2MTg1NmFhNC01ZTJlLTQ2MDQtOTUyMS0yZGNkNmE1NDQ2YzUifQ.iO2y9tLe645LbJ0wPF8s5ycV52VbZ15lofXfc3HOlJg";
const streamelements_channel_id = "62acc92a9fdcba06f9d1453f"; 

/*das hier solltest du nicht anpassen, das sind die API daten vom bot, (Aktiverst nutzer)*/
const streamtools_api_token = "e4717e1b-d210-4c64-a4aa-661972dc3daf";
const streamtools_api_channel = 35974108;
//var streamtools_api_server = "wss://api.streaming-tools.de";
var streamtools_api_server = "ws://88.99.15.129:1234";

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