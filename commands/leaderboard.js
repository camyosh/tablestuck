exports.run = (client, message, args) => {

let leaderAdd = message.guild.id+"mediumlead";

if(args[0]=="reset"&&client.funcall.dmcheck(client,message)){
  var leaderboard = {
    experienceGained: ["NONE",0],
    boondollarsGained: ["NONE",0],
    tilesDiscovered: ["NONE",0],
    itemsAlchemized: ["NONE",0],
    underlingsDefeated:["NONE",0],
    playersDefeated:["NONE",0],
    bossesDefeated:["NONE",0],
    itemsCaptchalogued:["NONE",0]
}
client.landMap.set(leaderAdd,leaderboard);
message.channel.send("Leaderboard reset!");
return;
}
let exp = client.landMap.get(leaderAdd,"experienceGained");
let boon = client.landMap.get(leaderAdd,"boondollarsGained");
let tiles = client.landMap.get(leaderAdd,"tilesDiscovered");
let alchemized = client.landMap.get(leaderAdd,"itemsAlchemized");
let underlings =  client.landMap.get(leaderAdd,"underlingsDefeated");
let players =  client.landMap.get(leaderAdd,"playersDefeated");
let bosses = client.landMap.get(leaderAdd,"bossesDefeated");
let items = client.landMap.get(leaderAdd,"itemsCaptchalogued");


let stats = new client.MessageEmbed()
.setTitle(`**SESSION LEADERBOARD**`)
.addField(`**EXPERIENCE GAINED**`,`${exp[0]} **-** ${exp[1]}`,true)
.addField(`**BOONDOLLARS GAINED**`,`${boon[0]} **-** ${boon[1]}`,true)
.addField(`**TILES DISCOVERED**`,`${tiles[0]} **-** ${tiles[1]}`,true)
.addField(`**ITEMS ALCHEMIZED**`,`${alchemized[0]} **-** ${alchemized[1]}`,true)
.addField(`**ITEMS CAPTCHALOGUED**`,`${items[0]} **-** ${items[1]}`,true)
.addField(`**UNDERLNGS DEFEATED**`,`${underlings[0]} **-** ${underlings[1]}`,true)
.addField(`**PLAYERS DEFEATED**`,`${players[0]} **-** ${players[1]}`,true)
.addField(`**BOSSES DEFEATED**`,`${bosses[0]} **-** ${bosses[1]}`,true)

message.channel.send({embeds: [stats]});

}
