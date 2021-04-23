exports.run = (client, message, args) => {


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
client.playerMap.set("leaderboard",leaderboard);
}
let exp = client.playerMap.get("leaderboard","experienceGained");
let boon = client.playerMap.get("leaderboard","boondollarsGained");
let tiles = client.playerMap.get("leaderboard","tilesDiscovered");
let alchemized = client.playerMap.get("leaderboard","itemsAlchemized");
let underlings =  client.playerMap.get("leaderboard","underlingsDefeated");
let players =  client.playerMap.get("leaderboard","playersDefeated");
let bosses = client.playerMap.get("leaderboard","bossesDefeated");
let items = client.playerMap.get("leaderboard","itemsCaptchalogued");


let stats = new client.Discord.MessageEmbed()
.setTitle(`**SESSION LEADERBOARD**`)
.addField(`**EXPERIENCE GAINED**`,`${exp[0]} **-** ${exp[1]}`,true)
.addField(`**BOONDOLLARS GAINED**`,`${boon[0]} **-** ${boon[1]}`,true)
.addField(`**TILES DISCOVERED**`,`${tiles[0]} **-** ${tiles[1]}`,true)
.addField(`**ITEMS ALCHEMIZED**`,`${alchemized[0]} **-** ${alchemized[1]}`,true)
.addField(`**ITEMS CAPTCHALOGUED**`,`${items[0]} **-** ${items[1]}`,true)
.addField(`**UNDERLNGS DEFEATED**`,`${underlings[0]} **-** ${underlings[1]}`,true)
.addField(`**PLAYERS DEFEATED**`,`${players[0]} **-** ${players[1]}`,true)
.addField(`**BOSSES DEFEATED**`,`${bosses[0]} **-** ${bosses[1]}`,true)

message.channel.send(stats);

}
