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

var userid = message.guild.id.concat(message.author.id);
var charid = client.userMap.get(userid,"possess");
var sburbid = client.charcall.allData(client,userid,charid,"owner");
var isNPC = client.charcall.npcCheck(client,charid);
if(args[0].toLowerCase()==="enter"){
  if(isNPC){
    message.channel.send("Can't build up an NPC!");
    return;
  }
  client.landMap.set(sburbid,true,"enter");
  client.landMap.set(sburbid,7,"gate");
  client.landMap.set(sburbid,12800,"spent");
  message.channel.send("Player built up and entered!");
  return;
}
if(args[0].toLowerCase()==="god"){
  if(isNPC){
    message.channel.send("Can't godtier an NPC!");
    return;
  }
  (client.sburbMap.get(sburbid,"godtier")?client.sburbMap.set(sburbid,false,"godtier"):client.sburbMap.set(sburbid,true,"godtier"));
  message.channel.send(`Player ${client.sburbMap.get(sburbid,"godtier")?`granted Godtier!`:`mortalized again!`}`);
  return;

}

  let msg=`Sorry, that's not a valid debug command. Accepted arguments:`;
  for(let i=0;i<debugOptions.length;i++){
    msg+=`\n${debugOptions[i][0].toUpperCase()}: ${debugOptions[i][1]}`;
  }
  message.channel.send(msg);
  return;

}
