exports.type = "game";
exports.desc ="Same thing as >ping";
exports.use = `">pog", pog.`;
exports.run = (client, message, args) => {

/*
message.channel.createWebhook('POGCHAMP', {
	avatar: 'https://freepngimg.com/thumb/mouth/92712-ear-head-twitch-pogchamp-emote-free-download-png-hq-thumb.png',
})
	.then(webhook => console.log(`Created webhook ${webhook}`))
	.catch(console.error);
*/


message.channel.send("pog");

}
