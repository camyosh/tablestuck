const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
//retrieve player information like location and sylladex

  let local = client.charcall.charData(client,charid,"local");
  let land = local[4];
  let sec = client.landMap.get(land,local[0]);
  let area = sec[local[1]][local[2]];
  let room = area[2][local[3]];
  let sdex = client.charcall.charData(client,charid,"sdex");
  let cards = client.charcall.charData(client,charid,"cards")

//convert argument to number

  selectDex = parseInt(args[0], 10) - 1;
  if(isNaN(selectDex)){

    message.channel.send("That is not a valid argument!");
    return;
  }
  if(selectDex >= cards || selectDex< 0){
    message.channel.send(`That is not a valid item! Check the list of items in your Sylladex with ${client.auth.prefix}sylladex`);
    return;
  }

//check if item is in selected card, if not drop card

  let dropItem;
  if(selectDex >= sdex.length){

//if only one captcha card left cancel

    if(cards <= 1) {
      message.channel.send("Cannot eject your last CAPTCHALOGUE CARD!");
      return;
    }

//drop captcha card

    cards-=1;
    client.charcall.setAnyData(client,userid,charid,cards,"cards");
    dropItem=["CAPTCHALOGUE CARD","11111111",1,1,[]];
  } else {
    dropItem=sdex.splice(selectDex,1)[0];
  }

  //drop items

  room[5].push(dropItem);
  sec[local[1]][local[2]][2][local[3]] = room;
  client.landMap.set(land,sec,local[0]);
  client.charcall.setAnyData(client,userid,charid,sdex,"sdex");
  client.funcall.tick(client,message);
  client.tutorcall.progressCheck(client,message,6,["text",`Ejected the ${dropItem[0]}!`]);
}
