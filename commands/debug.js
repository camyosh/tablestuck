exports.type = "author";
exports.desc = "Access various debug functions";
exports.use = `">debug" prints a list of debug actions.`;
exports.run = function(client,message,args){

if(!client.funcall.dmcheck(client,message)){
  message.channel.send("You must be a DM or Author to use this command!");
  return;
}

let debugOptions = [["enter","enters your medium and builds you up to your max."],["god","toggles godtier(DISABLED)"],["quest","completes all current quests"],["capgrist","Fixes NaN grist by setting it to the grist cap."]];
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
if(args[0].toLowerCase()==="quest"){
  if(client.charcall.allData(client,userid,charid,"questProgress")!="NONE"){
    questProgress=client.charcall.allData(client,userid,charid,"questProgress");
    for(let i=0;i<questProgress.length;i++){
    questProgress[i].progress=questProgress[i].goal;
    questProgress[i].completed=true;
    }
    client.charcall.setAnyData(client,userid,charid,questProgress,"questProgress");
    message.channel.send("All quests set to be Complete!");
    return;
  }
  message.channel.send("This creature can't do quests.");
  return;
}
if(args[0].toLowerCase()==="capgrist"){
  var gristCheck = client.charcall.allData(client,userid,charid,"grist");
  const gristTypes = ["build","uranium","amethyst","garnet","iron","marble","chalk","shale","cobalt","ruby","caulk","tar","amber","artifact","zillium","diamond"];
  let rung = client.sburbMap.get(sburbid,"rung");
  
  let max = 0;
  if (client.sburbMap.get(sburbid,`godtier`)) {
	if(args[1].toLowerCase()!="confirm")
	{
        message.channel.send(`I can only help godtiers by setting their invalid grist levels to 0. If you're sure, add a 'confirm' to that.`);
		return;
	}
  }
  else {
    max = client.cache(rung);
  }
  
  for(i=0;i<gristTypes.length;i++){
	if(isNaN(gristCheck[i])||isNull(gristCheck[i])||gristCheck[i]<0||(max > 0 && gristCheck[i]>max))
		gristCheck[i] = max;
  }
  client.charcall.setAnyData(client,userid,charid,gristCheck,"grist");
  message.channel.send("Fixed. Probably.");
  return;
}

  let msg=`Sorry, that's not a valid debug command. Accepted arguments:`;
  for(let i=0;i<debugOptions.length;i++){
    msg+=`\n${debugOptions[i][0].toUpperCase()}: ${debugOptions[i][1]}`;
  }
  message.channel.send(msg);
  return;

}
