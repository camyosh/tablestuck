exports.type = "character";
exports.desc = "Check on a chum"
exports.use = `">chumcheck [number]" checks a chum on your list, like the >check command.`
exports.run = (client, message, args) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");

  let chumroll = client.charcall.allData(client,userid,charid,"chumroll");
  if(chumroll=="NONE"){
    message.channel.send("You need a chumroll to check up on your chums!");
    return;
  }
  let targId = charid;

  if(!args[0]){
    message.channel.send(`Select a chum from your ${client.auth.prefix}chumroll`);
    return;
  }

  let value = parseInt(args[0], 10) - 1;
  if(isNaN(value)){
	  let tagList = [];

	  for(let i=0;i<chumroll.length;i++){
		getTag = client.charcall.charGet(client,chumroll[i]);
		if(client.charcall.allData(client,userid,getTag,"chumtag")!="NONE"){
		  tagList.push(client.charcall.allData(client,userid,getTag,"chumtag"));
		}else{
		  tagList.push(i);
		}
	  }

	  if(tagList.includes(args[0].toUpperCase())){
		value=tagList.indexOf(args[0].toUpperCase());
	  }else{
		client.tutorcall.progressCheck(client,message,11,["text",`That is not a valid selection! See a list of chums with ${client.auth.prefix}chumroll`]);
		return;
	  }
  }

  if(value > chumroll.length-1 || value < 0) {
    message.channel.send(`That is not a valid selection! See a list of chums with ${client.auth.prefix}chumroll`);
    return;
  }


  targId = client.charcall.charGet(client, chumroll[value]);

  if(targId == "NONE") {
    message.channel.send(`Something went wrong! Make sure you're correctly indicating which chum you want to check on. See a list of chums with ${client.auth.prefix}chumroll`);
    return;
  }

listPrint = new client.MessageEmbed()
.setTitle(`**CHECKING ${client.charcall.charData(client,targId,"name").toUpperCase()}**`)
.addFields(
  {name:`**NAME**`,value:`**${client.charcall.charData(client,targId,"name").toUpperCase()}**`,inline:true},
  {name:`**TYPE**`,value:`**${client.charcall.charData(client,targId,"type").toUpperCase()}**`,inline:true},
  {name:`**FACTION**`,value:`**${client.charcall.charData(client,targId,"faction").toUpperCase()}**`,inline:true},
  {name:`**VITALITY**`,value:`${client.emojis.cache.get(client.emoji["GEL"])} ${client.charcall.charData(client,targId,"vit")} / ${client.charcall.allData(client,userid,targId,"gel")}`,inline:true},
  {name:`**BOONDOLLARS**`,value:`${client.emojis.cache.get(client.emoji["BOONS"])} ${client.charcall.allData(client,userid,targId,"b")}`,inline:true},
  {name:`**RUNG**`,value:`${client.charcall.allData(client,userid,targId,"rung")}`,inline:true},
  {name:`**BIO**`,value:`${client.charcall.allData(client,userid,targId,"bio")}`})
.setImage(client.charcall.allData(client,userid,targId,"img"));


  message.channel.send({embeds: [listPrint]}).catch(error => {

    listPrint = new client.MessageEmbed()
    .setTitle(`**CHECKING ${client.charcall.charData(client,targId,"name").toUpperCase()}**`)
    .addFields(
      {name:`**NAME**`,value:`**${client.charcall.charData(client,targId,"name").toUpperCase()}**`,inline:true},
      {name:`**TYPE**`,value:`**${client.charcall.charData(client,targId,"type").toUpperCase()}**`,inline:true},
      {name:`**FACTION**`,value:`**${client.charcall.charData(client,targId,"faction").toUpperCase()}**`,inline:true},
      {name:`**VITALITY**`,value:`${client.emojis.cache.get(client.emoji["GEL"])} ${client.charcall.charData(client,targId,"vit")} / ${client.charcall.allData(client,userid,targId,"gel")}`,inline:true},
      {name:`**BOONDOLLARS**`,value:`${client.emojis.cache.get(client.emoji["BOONS"])} ${client.charcall.allData(client,userid,targId,"b")}`,inline:true},
      {name:`**RUNG**`,value:`${client.charcall.allData(client,userid,targId,"rung")}`,inline:true});
    message.channel.send({embeds: [listPrint]});
  });

}
