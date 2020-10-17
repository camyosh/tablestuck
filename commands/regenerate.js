const funcall = require("../modules/funcall.js");
const landcall = require("../modules/landcall.js");
const strifecall = require("../modules/strifecall.js");
exports.run = (client, message, args) => {

  if(funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

  if(strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
    return;
  }

    var gristTypes = ["build","uranium","amethyst","garnet","iron","marble","chalk","shale","cobalt","ruby","caulk","tar","amber"]

var charid = message.guild.id.concat(message.author.id);

  if(client.playerMap.get(charid,"local")[0]!="h"){
    message.channel.send("You can only regenerate your land from your house");
    return;
  }

 let aspects = ["BREATH","LIFE","LIGHT","TIME","HEART","RAGE","BLOOD","DOOM","VOID","SPACE","MIND","HOPE"];
var gristSet = [gristTypes.splice(Math.floor((Math.random() * 12)+1),1)[0],gristTypes.splice(Math.floor((Math.random() * 11)+1),1)[0],gristTypes.splice(Math.floor((Math.random() * 10)+1),1)[0],gristTypes.splice(Math.floor((Math.random() * 9)+1),1)[0]];
let gategen = [[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))]];

var s1 = landcall.landGen(client,0,gategen[0],gristSet);
var s2 = landcall.landGen(client,1,gategen[0],gristSet);
var s3 = landcall.landGen(client,2,gategen[0],gristSet);
var s4 = landcall.landGen(client,3,gategen[0],gristSet);

var land = {
    name: client.landMap.get(charid,"name"),
    aspect: aspects[Math.floor((Math.random() * 11))],
    grist: gristSet,
    enter:client.landMap.get(charid,"enter"),
    spent: client.landMap.get(charid,"spent"),
    floors: client.landMap.get(charid,"floors"),
    gate: client.landMap.get(charid,"gate"),
    gates:gategen,
    h:client.landMap.get(charid,"h"),
    s1:s1[0],
    s1d:s1[1],
    s2:s2[0],
    s2d:s2[1],
    s3:s3[0],
    s3d:s3[1],
    s4:s4[0],
    s4d:s4[1]
}

client.landMap.set(charid,land);

message.channel.send("Land regenerated!");


}
