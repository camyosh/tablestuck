//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");

const rungReq = [0,1,2,3,4,5,6,7,8,9,10,12,14,16,18,20,22,24,26,28,30,34,38,42,46,50,54,58,62,66,70,78,86,94,102,110,118,126,134,142,150,166,182,198,214,230,246,262,278,294,310,342,374,406,438,470,502,534,566,598,630,694,758,822,886,950,1014,1078,1142,1206,1270,1398,1526,1654,1782,1910,2038,2166,2294,2422,2550,2806,3062,3318,3574,3830,4086,4342,4598,4854,5110,5622,6134,6646,7158,7670,8182,8694,9206,9718,10230,9999999999999999];


exports.run = (client, message, args) => {


  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");

  let gel = client.charcall.allData(client,userid,charid,"gel");
  let b = client.charcall.allData(client,userid,charid,"b");
  let name = client.charcall.allData(client,userid,charid,"name");
  let vit = client.charcall.allData(client,userid,charid,"vit");
  let rung = client.charcall.allData(client,userid,charid,"rung");
  let xp = client.charcall.allData(client,userid,charid,"xp");
  let xpToRung;
    if(rung==100){
      xpToRung = `MAX RUNG`;
    } else {
      xpToRung = (rungReq[rung+1])-xp;
    }
  let stats = new client.MessageEmbed()
  .setTitle(`**${name.toUpperCase()}'S** Stats`)
  .addField(`**Gel Viscosity**`,`${client.emojis.cache.get('735664168400584715')} ${gel.toString()}`,true)
  .addField(`**Vitality**`,vit.toString(),true)
  .addField(`**Boondollars**`,`${client.emojis.cache.get('735664076180422758')} ${b.toString()}`,true)
  .addField(`**Rung**`,rung.toString(),true)
  .addField(`**Experience**`,xp.toString(),true)
  .addField(`**XP to next Rung**`,xpToRung.toString(),true);
  if (client.limit != 0) {
    stats.addField(`**ACTIONS LEFT**`,(client.limit - client.sburbMap.get(sburbid,"act")).toString(),true)
  }
  stats.addField(`**TILES DISCOVERED**`,client.charcall.allData(client,userid,charid,"tilesDiscovered").toString(),true)
  .addField(`**ITEMS ALCHEMIZED**`,client.charcall.allData(client,userid,charid,"itemsAlchemized").toString(),true)
  .addField(`**ITEMS CAPTCHALOGUED**`,client.charcall.allData(client,userid,charid,"itemsCaptchalogued").toString(),true)
  .addField(`**UNDERLNGS DEFEATED**`,client.charcall.allData(client,userid,charid,"underlingsDefeated").toString(),true)
  .addField(`**PLAYERS DEFEATED**`,client.charcall.allData(client,userid,charid,"playersDefeated").toString(),true)
  .addField(`**BOSSES DEFEATED**`,client.charcall.allData(client,userid,charid,"bossesDefeated").toString(),true)

  message.channel.send({embeds:[stats]});

}
