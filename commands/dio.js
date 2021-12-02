
exports.run = async(client,message,args) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");

  if(!args[0]){
    message.channel.send("Please include the text you want to display in this image!");
    return;
  }
  let msg=``;
  for(i=0;args[i];i++){
    msg+=`${args[i]} `;
  }
  img = await client.diocall.dialogue(client,message,msg);
  message.channel.send({files: [img]});
}
