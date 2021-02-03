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

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");

//get player location and room inventory

  let local = client.playerMap.get(charid,"local");
  let land = local[4];
  let sec = client.landMap.get(land,local[0]);
  let area = sec[local[1]][local[2]];
  let room = area[2][local[3]];
  let currentInv = client.playerMap.get(charid,"sdex");
  let targetItem;

  if(local[0]!="h"&&landcall.underlingCheck(sec[local[1]][local[2]][2][local[3]][4])){
    message.channel.send("You can't captchalogue items while there are Underlings here!");
    return;
  }

//convert first argument to number and check if number is valid argument

  value = parseInt(args[0], 10) - 1;
  if(isNaN(value)){
    message.channel.send("That is not a valid argument!");
    return;
  }
  if(value >= room[5].length || value < 0){
    message.channel.send("That is not a valid item! Check the list of items in the room with >inspect");
    return;
  }

//if only one argument, captchalogue item in that position in room

  if(!args[1]){
  targetItem = room[5].splice(value,1)[0];
} else {

  //if more than one argument, check if target item is holding other items
  value1 = parseInt(args[1], 10) - 1;
  if(isNaN(value1)){
    message.channel.send("That is not a valid argument!");
    return;
  }
  if(room[5][value].length==0){
    message.channel.send("There are no items in that container!");
    return;
  }
  if(value1 >= room[5][value][4].length || value1 < 0){
    message.channel.send("That is not a valid item! Check the list of items in the room with >inspect");
    return;
  }
  if(room[5][value][1]=="11111111"){
    message.channel.send("That is not a valid item!");
    return;
  }
  if(room[5][value][1]=="########" && room[5][value][0]=="CARVED TOTEM"){
    message.channel.send("That is not a valid item!");
    return;
  }if(room[5][value][1]=="////////" && room[5][value][0]=="CRUXTRUDER"){
    targetItem = ["CRUXITE DOWEL","########",1,1,[]]
  } else {
  targetItem = room[5][value][4].splice(value1,1)[0];
  }
}

//add target item to Sylladex

  currentInv.unshift(targetItem);
  let mess = `CAPTCHALOGUED the ${targetItem[0]} from the ${room[2]}.`
  if(currentInv.length > client.playerMap.get(charid,"cards")){
    let dropItem = currentInv.pop();
    room[5].push(dropItem);
    mess += `\nYour Sylladex is full, ejecting your ${dropItem[0]}!`
}
message.channel.send(mess);
sec[local[1]][local[2]][2][local[3]] = room;
client.landMap.set(land,sec,local[0]);
client.playerMap.set(charid,currentInv,"sdex");
funcall.actionCheck(client,message,"item");
}
