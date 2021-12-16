exports.run = function(client, message, args) {

var userid = message.guild.id.concat(message.author.id);
var charid = client.userMap.get(userid,"possess");
let local = client.charcall.charData(client,charid,"local");

if(local[0]==`h`){
  message.channel.send(`There is no map for your house!`);
  return;
}

async function sendMap(){
var attachment = await client.landcall.drawMap(client,message,false);

message.channel.send({files: [attachment]});
}
sendMap();
}
