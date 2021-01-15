
exports.run = (client, message, args) => {

/*
message.channel.createWebhook('POGCHAMP', {
	avatar: 'https://freepngimg.com/thumb/mouth/92712-ear-head-twitch-pogchamp-emote-free-download-png-hq-thumb.png',
})
	.then(webhook => console.log(`Created webhook ${webhook}`))
	.catch(console.error);
*/

var charid = message.guild.id.concat(message.author.id);

let chan = client.playerMap.get(charid,"channel");

client.hookcall.pogChamp(client,message,chan);

message.channel.send("pog");

}
