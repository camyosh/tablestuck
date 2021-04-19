const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");

const rungReq = [0,1,2,3,4,5,6,7,8,9,10,12,14,16,18,20,22,24,26,28,30,34,38,42,46,50,54,58,62,66,70,78,86,94,102,110,118,126,134,142,150,166,182,198,214,230,246,262,278,294,310,342,374,406,438,470,502,534,566,598,630,694,758,822,886,950,1014,1078,1142,1206,1270,1398,1526,1654,1782,1910,2038,2166,2294,2422,2550,2806,3062,3318,3574,3830,4086,4342,4598,4854,5110,5622,6134,6646,7158,7670,8182,8694,9206,9718,10230,9999999999999999];


exports.run = (client, message, args) => {

  if(funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

    var target = message.guild.id.concat(message.author.id);

  let gel = client.playerMap.get(target,"gel");
  let b = client.playerMap.get(target,"b");
  let name = client.playerMap.get(target,"name");
  let vit = client.playerMap.get(target,"vit");
  let rung = client.playerMap.get(target,"rung");
  let xp = client.playerMap.get(target,"xp");

  let stats = new client.Discord.MessageEmbed()
  .setTitle(`**${name.toUpperCase()}'S** Stats`)
  .addField(`**Gel Viscosity**`,`${client.emojis.cache.get('735664168400584715')} ${gel}`,true)
  .addField(`**Vitality**`,`${vit}`,true)
  .addField(`**Boondollars**`,`${client.emojis.cache.get('735664076180422758')} ${b}`,true)
  .addField(`**Rung**`,rung,true)
  .addField(`**Experience**`,xp,true)
  .addField(`**XP to next Rung**`,(rungReq[rung+1])-xp,true);
  if (client.limit != 0) {
    stats.addField(`**ACTIONS LEFT**`,client.limit - client.playerMap.get(target,"act"),true)
  }
  stats.addField(`**TILES DISCOVERED**`,client.playerMap.get(target,"tilesDiscovered"),true)
  .addField(`**ITEMS ALCHEMIZED**`,client.playerMap.get(target,"itemsAlchemized"),true)
  .addField(`**ITEMS CAPTCHALOGUED**`,client.playerMap.get(target,"itemsCaptchalogued"),true)
  .addField(`**UNDERLNGS DEFEATED**`,client.playerMap.get(target,"underlingsDefeated"),true)
  .addField(`**PLAYERS DEFEATED**`,client.playerMap.get(target,"playersDefeated"),true)
  .addField(`**BOSSES DEFEATED**`,client.playerMap.get(target,"bossesDefeated"),true)

  message.channel.send(stats);

}
