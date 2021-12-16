
exports.pogChamp = async function(client,message,chan){

  const embed = new client.MessageEmbed()
  .setTitle(`POGCHAMP!`)
  .addField(`**POGCHAMP SAYS**`,`POGGERS!`)
  .setImage(`https://freepngimg.com/thumb/mouth/92712-ear-head-twitch-pogchamp-emote-free-download-png-hq-thumb.png`)
  const channel = client.channels.cache.get(chan);
	try {
		const webhooks = await channel.fetchWebhooks();
		const webhook = webhooks.first();

		await webhook.send('Webhook test', {
			username: 'pogchamp',
			avatarURL: 'https://freepngimg.com/thumb/mouth/92712-ear-head-twitch-pogchamp-emote-free-download-png-hq-thumb.png',
			embeds: [embed],
		});
	} catch (error) {
		console.error('Error trying to send: ', error);
	}

}

exports.pesterProf = async function(client,message,userid,charid){
  const channel = client.channels.cache.get(client.charcall.allData(client,userid,charid,"pesterchannel"));

	try {
		const webhooks = await channel.fetchWebhooks();
		const webhook = webhooks.first();
		await webhook.send({
      content: 'Updated Pesterchum profile!',
			username: `[${client.charcall.allData(client,userid,charid,"chumtag")}] ${client.charcall.allData(client,userid,charid,"chumhandle")}`,
			avatarURL: client.charcall.allData(client,userid,charid,"chumpic")
		});
	} catch (error) {
		console.error('Error trying to send: ', error);
	}
}

exports.pester = async function(client,message,charid,target,msg){
  controllers = client.charcall.charData(client,target,"control");
  userid = client.charcall.charData(client,charid,"control");
try{
  for(let i=0;i<controllers.length;i++){
  let channel = client.channels.cache.get(client.charcall.allData(client,controllers[i],target,"pesterchannel"));

		let webhooks = await channel.fetchWebhooks();
		let webhook = webhooks.first();
	await	webhook.send({
    content: msg,
    username: `[${client.charcall.allData(client,userid,charid,"chumtag")}] ${client.charcall.allData(client,userid,charid,"chumhandle")}`,
    avatarURL: client.charcall.allData(client,userid,charid,"chumpic")
  });
  }
    message.react(`✅`);
	} catch (error) {
		console.error('Error trying to send: ', error);
    message.react(`❌`);
	}
}

exports.hookCheck = function(client,message){

let hookcheck = false;

message.channel.fetchWebhooks()
  .then(hooks => {
    console.log(`This channel has ${hooks.size} hooks`)
    if(hooks.size==0){
      message.channel.createWebhook('PESTERCHUM', {
      	avatar: 'https://64.media.tumblr.com/cb8e00de5709cc42a74da865da20de26/tumblr_mln8th6D1F1r4qxzoo1_1280.png',
      })
      	.then(webhook => console.log(`Created webhook ${webhook}`))
      	.catch(console.error);
    }
  })
  .catch(console.error);

}

exports.hookGen = function(client,channel){

let hookcheck = false;

client.channels.cache.get(channel).fetchWebhooks()
  .then(hooks => {
    console.log(`This channel has ${hooks.size} hooks`)
    if(hooks.size==0){
      client.channels.cache.get(channel).createWebhook('PESTERCHUM', {
      	avatar: 'https://64.media.tumblr.com/cb8e00de5709cc42a74da865da20de26/tumblr_mln8th6D1F1r4qxzoo1_1280.png',
      })
      	.then(webhook => console.log(`Created webhook ${webhook}`))
      	.catch(console.error);
    }
  })
  .catch(console.error);

}

exports.say = async function(client,message,target,msg,name,pic){

  const channel = client.channels.cache.get(client.playerMap.get(target,"pesterchannel"));

  try {
		const webhooks = await channel.fetchWebhooks();
		const webhook = webhooks.first();

		await webhook.send(msg, {
			username: name,
			avatarURL: pic
		});
	} catch (error) {
		console.error('Error trying to send: ', error);
	}

}
