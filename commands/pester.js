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
      .addField(`**PESTERCHUM ID**`,`${charid} \n(Your friends use this to add you to their >chumroll)`)
      .addField(`**CHUMROLL**`,`You don't have any chums! To pester someone, add them to your chumroll using the >chumroll command!`)
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
      .addField(`**PESTERCHUM ID**`,`${charid} \n(Your friends use this to add you to their >chumroll)`)
      .addField(`**CHUMROLL**`,contactList)
      .setColor(`#FFFC20`);
      message.channel.send(embed);
      return;
    }
  }

  let value = parseInt(args[0], 10) - 1;
  if(isNaN(value)){
    message.channel.send("That is not a valid argument!");
    return;
  }

  if(value >= chumroll.length || value < 0) {
    message.channel.send("That is not a valid argument!")
    return;
  };

  if(!args[1]){
    message.channel.send("You need to type a message to send to your chum!");
    return;
  }

  let msg=``;

  let i;

  for(i=1;i<args.length;i++){
    console.log(i);
    console.log(args.length);
    msg+=`${args[i]} `;
  }

  try{

    client.hookcall.pester(client,message,charid,chumroll[value],msg);
  }catch(err){
    message.channel.send("Failed to send message!");
  }

}
