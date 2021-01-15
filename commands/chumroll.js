exports.run = (client, message, args) => {

  if(client.funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

  var charid = message.guild.id.concat(message.author.id);

  let chumroll = client.playerMap.get(charid,"chumroll");

  if(!args[0]){
    if(chumroll.length==0){
      const embed = new client.Discord.MessageEmbed()
      .setTitle(`PESTERCHUM chumroll`)
      .addField(`**PESTERCHUM ID**`,`${charid} \n(Your friends use this to add you to their chumroll!)`)
      .addField(`**CHUMROLL**`,`You don't have any chums! To add someone to your chumroll, do ">chumroll add" followed by their PESTERCHUM ID.`)
      .setColor(`#FFFC20`);
      message.channel.send(embed);
      return;
    } else {
      let contactList = ``;
      let i;
      for(i=0;i<chumroll.length;i++){
        contactList+=`**[${i+1}] ${client.playerMap.get(chumroll[i],"chumhandle")}**\n**ID** - ${chumroll[i]}\n\n`
      }
      const embed = new client.Discord.MessageEmbed()
      .setTitle(`PESTERCHUM chumroll`)
      .addField(`**PESTERCHUM ID**`,`${charid} \n(Your friends use this to add you to their chumroll!)`)
      .addField(`**CHUMROLL**`,contactList)
      .setColor(`#FFFC20`);
      message.channel.send(embed);
      return;
    }
  }

  if(args[0]=="add"){

    if(!args[1]){
      message.channel.send("Add a pesterchum ID to add someone to your chumroll!");
      return;
    }

    if(!client.playerMap.has(args[1])){
      message.channel.send("That is not a registered player!");
      return;
    }

    let targetHandle = client.playerMap.get(args[1],"chumhandle");

    if(chumroll.includes(args[1])){
      message.channel.send(`${targetHandle} is already on your chumroll!`);
      return;
    }

    chumroll.push(args[1]);
    let targetRoll = client.playerMap.get(args[1],"chumroll");
    targetRoll.push(charid);

    client.playerMap.set(args[1],targetRoll,"chumroll");
    client.playerMap.set(charid,chumroll,"chumroll");

    message.channel.send(`Registered ${targetHandle}!`);


  }

}
