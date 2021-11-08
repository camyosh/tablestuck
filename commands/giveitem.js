const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {

  if(!client.funcall.dmcheck(client,message)){
    message.channel.send("Only a DM can use this command! Make sure to give yourself a role named \"DM\" if you're in charge!");
    return;
  }
  if(!args[0]){
    message.channel.send(`to use this command, the format is: \n${client.auth.prefix}giveitem [code of item being given] [tier of item] [number of items being given] [ping of target player] [item name(optional)]`);
    return;
  }
  if(!message.mentions.members.first()){
    message.channel.send("You must @ a user to target them!");
    return;
  }

  var userid = message.guild.id.concat(message.mentions.members.first().id);
  var charid = client.userMap.get(userid,"possess");

  var code = args[0];

  if(!code.length==8){
    message.channel.send("That is not a valid Captchalog Code!");
    return;
  }
  for(i=0;i<8;i++){
    if(!client.captchaCode.includes(code[i])){
      message.channel.send("That is not a valid Captchalog Code!")
      return;
    }
  }


  tier = parseInt(args[1], 10);
  if(isNaN(tier)){
    message.channel.send("That is not a valid tier!");
    return;
  } else if (tier < 1 || tier > 16) {
    message.channel.send("That is not a valid tier!");
    return;
  }
  let local = client.charcall.charData(client,charid,"local");
  let land = local[4];
  let sec = client.landMap.get(land,local[0]);
  let area = sec[local[1]][local[2]];
  let room = area[2][local[3]];

  let currentInv = client.charcall.charData(client,charid,"sdex");
  let itemName = "CUSTOM ITEM";
  let quantity = parseInt(args[2], 10);
  if (isNaN(quantity)) {
    message.channel.send("That is not a valid quantity!");
    return;
  }
  if (quantity < 1 || quantity > 8) {
    message.channel.send("The quantity must be more than 0 and less than 8.");
    return;
  }
  if(args[4]){
    args.splice(0,3);
    itemName = funcall.combineArgs(args);
  }

  let item = [itemName,code,tier,quantity,[]];

  currentInv.unshift(item);
  let mess = `CAPTCHALOGUED the ${item[0]}.`
  if(currentInv.length > client.charcall.charData(client,charid,"cards")){
    let dropItem = currentInv.pop();
    room[5].push(dropItem);
    mess += `\nYour Sylladex is full, ejecting your ${dropItem[0]}!`
}
message.channel.send(mess);
sec[local[1]][local[2]][2][local[3]] = room;
client.landMap.set(land,sec,local[0]);
client.charcall.setAnyData(client,userid,charid,currentInv,"sdex");
}
