const funcall = require("../modules/funcall.js");
const strifecall = require("../modules/strifecall.js");
//simple ping command to check if the bot is online.

exports.run = (client, message, args) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");

  let dex = client.charcall.charData(client,charid,"sdex");
  let modus = client.charcall.charData(client,charid,"modus");
  let cards = client.charcall.charData(client,charid,"cards");
  let name = client.charcall.charData(client,charid,"name");

  let msg = ``;
  if(!args[0] || args[0] == "page"){
    let page = 0;
    if (args[0]&&args[0] == "page") {
      page = parseInt(args[1], 10) - 1;
      if (isNaN(page)||page<0) {
        message.channel.send("That is not a valid argument!");
        return;
      }
    }

    async function dexCheck(){

    const attachment = await client.imgcall.sdexCheck(client,message,page,args,0,dex,cards,"sylladex");

      client.tutorcall.progressCheck(client,message,7,["img",attachment]);
    }

    dexCheck();
    return;

/*
  let i;
  for(i=0 + 20 * page;i<cards && i<20 + (20 * page);i++){
    if(i<dex.length){
      msg += `**[${i+1}] ${dex[i][0]} x${dex[i][3]}** \n${dex[i][1]} TIER - ${dex[i][2]}\n\n`
    } else {
      msg += `**[${i+1}] EMPTY**\n\n`
    }

  }
  if (cards > 20) {
    msg += `**Page ` + (page + 1) + `/` + Math.floor(cards / 20 + 1) + `**\n\n`
  }
  sylladexPrint = new client.Discord.MessageEmbed()
  .setTitle(`**${name.toUpperCase()}'S SYLLADEX**`)
  .setColor("#ff067d")
  .addField(`**CAPTCHA CARDS**`,`**x${cards}**`,true)
  .addField(`**FETCH MODUS**`,`**${modus}**`,true)
  .addField("**INVENTORY**",msg);
  message.channel.send(sylladexPrint);
  return;*/
}

value = parseInt(args[0], 10) - 1;
if(isNaN(value)){
  message.channel.send("That is not a valid argument!");
  return;
}

if(value >= dex.length || value < 0) {
  message.channel.send("That is not a valid argument!")
  return;
};
async function itemInspect(){
const attachment = await client.imgcall.inspect(client,message,args,0,dex[value]);

  message.channel.send({files: [attachment]});
}
itemInspect()
}
