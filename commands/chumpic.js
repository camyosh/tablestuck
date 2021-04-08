exports.run = (client, message, args) => {

  if(client.funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

  var charid = message.guild.id.concat(message.author.id);

  if(!args[0]){
    message.channel.send(`Enter the URL of an image you would like to be your chumhandle, or type ${client.auth.prefix}chumpic reset to change it back to your Discord pfp!`);
    return;
  }
  if(args[0]=="reset"){
    client.playerMap.set(charid,message.author.avatarURL(),"chumpic");
  } else{
  client.playerMap.set(charid,args[0],"chumpic");

}

  client.hookcall.pesterProf(client,message,charid);

}
