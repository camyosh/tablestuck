const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {

  if(funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");
  let spec = client.playerMap.get(charid,"spec");

  if(!args[0]){
    message.channel.send(`Please select a weapon you would like to switch to. You can see all currently equipped weapons with ${client.auth.prefix}SPECIBUS`);
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
  let curWeapon = client.playerMap.get(charid,"equip");
  if(curWeapon==value){
    message.channel.send("You already have that weapon equipped!");
    return;
  }
  if(client.strifecall.strifeTest(client,message,message.author)){
    let local = client.playerMap.get(charid,"local");
    let pos = client.playerMap.get(charid,"pos");
    let strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`;

    let list = client.strifeMap.get(strifeLocal,"list");

    if(list[pos][5]>1||client.traitcall.traitCheck(client,charid,"STORAGE")[1]||client.traitcall.traitCheck(client,charid,"MIND")[0]){

      if(!client.traitcall.traitCheck(client,charid,"STORAGE")[1]&&!client.traitcall.traitCheck(client,charid,"MIND")[0]){
      list[pos][5]-=2;
      client.strifeMap.set(strifeLocal,list,"list");
      message.channel.send(`Expending 2 stamina to switch to the ${spec[value][0]}`);
      client.playerMap.set(charid,value,"equip");
    } else {
      message.channel.send(`Switching to the ${spec[value][0]}`);
      client.playerMap.set(charid,value,"equip");
    }
  } else {
    message.channel.send(`You don't have the stamina to switch weapons!`);
    return;
  }
  }else{
  message.channel.send(`Switching to the ${spec[value][0]}`);
  client.playerMap.set(charid,value,"equip");

}

}
