exports.run = (client, message, args) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  if(client.charcall.allData(client,userid,charid,"chumpic")=="NONE"){
    message.channel.send("You can't set a chumpic without pesterchum!");
    return;
  }
  if(!args[0]){
    message.channel.send(`Enter the URL of an image you would like to be your chumhandle, or type ${client.auth.prefix}chumpic reset to change it back to your Discord pfp!`);
    return;
  }
  if(args[0]=="reset"){
    client.charcall.setAnyData(client,userid,charid,message.author.avatarURL(),"chumpic");
  } else{
  client.charcall.setAnyData(client,userid,charid,args[0],"chumpic");

}
  client.hookcall.pesterProf(client,message,userid,charid);
}
