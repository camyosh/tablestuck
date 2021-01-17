exports.run = (client, message, args) => {

  if(client.funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

  var charid = message.guild.id.concat(message.author.id);

  if(!args[0]){
    message.channel.send("Enter a chumhandle you want to appear when pestering other players!");
    return;
  }

  if(args[0].length>80){
    message.channel.send("That name is too long!");
    return;
  }

  client.playerMap.set(charid,args[0],"chumhandle");

  client.hookcall.pesterProf(client,message,charid);

}
