const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  let spec = client.charcall.charData(client,charid,"spec");

  if(!args[0]){
    message.channel.send(`Please select a weapon you would like to switch to. You can see all currently equipped weapons with ${client.auth.prefix}specibus`);
    return;
  }

  value = parseInt(args[0], 10) - 1;
  if(isNaN(value)){
    message.channel.send("That is not a valid argument!");
    return;
  }

  if(value >= spec.length || value < 0) {
    message.channel.send("That is not a valid argument!");
    return;
  };
  let curWeapon = client.charcall.charData(client,charid,"equip");
  if(curWeapon==value){
    message.channel.send("You already have that weapon equipped!");
    return;
  }
  if(client.charcall.charData(client,charid,"strife")){
    let local = client.charcall.charData(client,charid,"local");
    let pos = client.charcall.charData(client,charid,"pos");
    let strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`;

    let list = client.strifeMap.get(strifeLocal,"list");

    if(list[pos][5]>1||client.traitcall.traitCheck(client,charid,"STORAGE")[1]||client.traitcall.traitCheck(client,charid,"MIND")[0]){

      if(!client.traitcall.traitCheck(client,charid,"STORAGE")[1]&&!client.traitcall.traitCheck(client,charid,"MIND")[0]){
      list[pos][5]-=2;
      client.strifeMap.set(strifeLocal,list,"list");
      message.channel.send(`Expending 2 stamina to switch to the ${spec[value][0]}`);
      client.charcall.setAnyData(client,userid,charid,value,"equip");
    } else {
      message.channel.send(`Switching to the ${spec[value][0]}`);
      client.charcall.setAnyData(client,userid,charid,value,"equip");
    }
  } else {
    message.channel.send(`You don't have the stamina to switch weapons!`);
    return;
  }
  }else{
  message.channel.send(`Switching to the ${spec[value][0]}`);
  client.charcall.setAnyData(client,userid,charid,value,"equip");

}

}
