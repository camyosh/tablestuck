exports.run = (client, message, args) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  var sburbid = charid.substring(1);

  if(!args[0]){
    message.channel.send(`Enter the URL of an image you would like to be your chumhandle, or type ${client.auth.prefix}chumpic reset to change it back to your Discord pfp!`);
    return;
  }
  if(args[0]=="reset"){
    client.sburbMap.set(sburbid,message.author.avatarURL(),"chumpic");
  } else{
  client.sburbMap.set(sburbid,args[0],"chumpic");

}

  client.hookcall.pesterProf(client,message,sburbid);

}
