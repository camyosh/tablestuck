exports.type = "character";
exports.desc = "Shows top stats";
exports.use = `">leaderboard" displays the players in the session who have the highest scores in certain tasks.`;
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
.addFields(
  {name:`**EXPERIENCE GAINED**`,value:`${exp[0]} **-** ${exp[1]}`,inline:true},
  {name:`**BOONDOLLARS GAINED**`,value:`${boon[0]} **-** ${boon[1]}`,inline:true},
  {name:`**TILES DISCOVERED**`,value:`${tiles[0]} **-** ${tiles[1]}`,inline:true},
  {name:`**ITEMS ALCHEMIZED**`,value:`${alchemized[0]} **-** ${alchemized[1]}`,inline:true},
  {name:`**ITEMS CAPTCHALOGUED**`,value:`${items[0]} **-** ${items[1]}`,inline:true},
  {name:`**UNDERLNGS DEFEATED**`,value:`${underlings[0]} **-** ${underlings[1]}`,inline:true},
  {name:`**PLAYERS DEFEATED**`,value:`${players[0]} **-** ${players[1]}`,inline:true},
  {name:`**BOSSES DEFEATED**`,value:`${bosses[0]} **-** ${bosses[1]}`,inline:true});
message.channel.send({embeds: [stats]});

}
