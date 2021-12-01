
exports.run = (client,message,args) => {

  if(!args[0]){
    message.channel.send("Please include the text you want to display in this image!");
    return;
  }
  let msg=``;
  for(i=0;args[i];i++){
    msg+=`${args[i]} `;
  }
  client.diocall.dialogue(client,message,msg);
}
