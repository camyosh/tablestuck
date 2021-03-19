
const landcall = require(`../modules/landcall.js`);
const funcall = require(`../modules/funcall.js`);
const strifecall = require(`../modules/strifecall.js`);

exports.run = function(client, message, args) {

  if(funcall.regTest(client, message, message.author) == false){
    message.channel.send(`You're not a registered player!`);
    return;
  }

  if(strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send(`You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!`);
    return;
  }


  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");
let local = client.playerMap.get(charid,`local`);

if(local[0]==`h`){
  message.channel.send(`There is no map for your house!`);
  return;
}


async function sendMap(){
var attachment = await landcall.drawMap(client,message,false);

message.channel.send(attachment);
}
sendMap();
}
