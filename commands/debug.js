exports.run = function(client,message,args){

if(!client.funcall.dmcheck(client,message)){
  message.channel.send("You must be a DM or Author to use this command!");
  return;
}

let debugOptions = [["enter","enters your medium and builds you up to your max."],["god","toggles godtier(DISABLED)"]]
if(!args[0]){
  let msg =`This is a quick command for various debug functions that don't fit in config. Accepted arguments:`;
  for(let i=0;i<debugOptions.length;i++){
    msg+=`\n${debugOptions[i][0].toUpperCase()}: ${debugOptions[i][1]}`;
  }
message.channel.send(msg);
return;
}
let charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");
if(args[0].toLowerCase()==="enter"){

  client.landMap.set(charid,true,"enter");
  client.landMap.set(charid,7,"gate");
  client.landMap.set(charid,12800,"spent");
  message.channel.send("Player built up and entered!");
  return;
}
if(args[0].toLowerCase()==="god"){
  (client.playerMap.get(charid,"godtier")?client.playerMap.set(charid,false,"godtier"):client.playerMap.set(charid,true,"godtier"));
  message.channel.send(`Player ${client.playerMap.get(charid,"godtier")?`granted Godtier!`:`mortalized again!`}`);
  return;

}

  let msg=`Sorry, that's not a valid debug command. Accepted arguments:`;
  for(let i=0;i<debugOptions.length;i++){
    msg+=`\n${debugOptions[i][0].toUpperCase()}: ${debugOptions[i][1]}`;
  }
  message.channel.send(msg);
  return;

}
