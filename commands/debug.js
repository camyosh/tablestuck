exports.type = "author";
exports.desc = "Access various debug functions";
exports.use = `">debug" prints a list of debug actions.`;
exports.run = function(client,message,args){

if(!client.funcall.dmcheck(client,message)){
  message.channel.send("You must be a DM or Author to use this command!");
  return;
}

let debugOptions = [
	["enter","enters your medium and builds you up to your max."],
	["god","toggles godtier(DISABLED)"],
	["quest","completes all current quests"],
	["capgrist","fixes NaN grist by setting it to the grist cap."],
	["boons","gives a number of BOONDOLLARS equal to the provided amount."],
	["wallet","captchalogues ANY item."],
	["void","destroys an item completely."]
];
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
else
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
else if(args[0].toLowerCase()==="wallet")
{
	if(!args[1])
	{
		message.channel.send("You must select an item to captchalogue!");
		return;
	}
	
    let local = client.charcall.charData(client,charid,"local");
    let land = local[4];
    let sec = client.landMap.get(land,local[0]);
    let area = sec[local[1]][local[2]];
    let room = area[2][local[3]];
    let currentInv = client.charcall.charData(client,charid,"sdex");


	value = parseInt(args[1], 10) - 1;
    if(isNaN(value)){
      message.channel.send("That is not a valid argument! Make sure to give the number of an item in your room!");
      return;
    }
    if(value >= room[5].length || value < 0){
      message.channel.send(`That is not a valid item! Check the list of items in the room with ${client.auth.prefix}inspect`);
      return;
    }
    let targetItem = room[5].splice(value,1)[0];
	currentInv.unshift(targetItem);
    let mess = `CAPTCHALOGUED the ${targetItem[0]} from the ${room[2]}.`
    if(currentInv.length > client.charcall.charData(client,charid,"cards")){
      let dropItem = currentInv.pop();
      room[5].push(dropItem);
      mess += `\nYour Sylladex is full, ejecting your ${dropItem[0]}!`
    }
    sec[local[1]][local[2]][2][local[3]] = room;
    client.landMap.set(land,sec,local[0]);
    client.charcall.setAnyData(client,userid,charid,currentInv,"sdex");
	
    message.channel.send(mess);
    return;
}
else if(args[0].toLowerCase()==="void")
{
	if(!args[1])
	{
		message.channel.send("You must select an item to void!");
		return;
	}
	
	value = parseInt(args[1], 10) - 1;
    if(isNaN(value)){
      message.channel.send("That is not a valid argument! Make sure to give the number of an item in your sylladex!");
      return;
    }
	
    let currentInv = client.charcall.charData(client,charid,"sdex");
	
    if(value >= currentInv.length || value < 0){
      message.channel.send(`That is not a valid item!`);
      return;
    }
	
	let voidedItem = currentInv.splice(value, 1);
    client.charcall.setAnyData(client,userid,charid,currentInv,"sdex");
	
	message.channel.send(`Deleted your ${voidedItem[0]} (code ${voidedItem[1]}, tier ${voidedItem[2]}) from your Sylladex!`);
	return;
}


var messagePing = message.mentions.members.first();
var targetID = messagePing ? message.guild.id.concat(messagePing.id) : userid;
if(client.userMap.has(targetID))
{
	charid = client.userMap.get(targetID,"possess");
}
else
{
    message.channel.send(`That person isn't registered!`);
    return;
}

if(args[0].toLowerCase()==="capgrist"){
  var gristCheck = client.charcall.allData(client,targetID,charid,"grist");
  if(gristCheck == "NONE")
  {
    message.channel.send(`That person isn't currently possessing anything that has grist.`);
    return;
  }

  const gristTypes = ["build","uranium","amethyst","garnet","iron","marble","chalk","shale","cobalt","ruby","caulk","tar","amber","artifact","zillium","diamond"];
  let max = 0;
  if((client.charcall.allData(client, targetID, charid, "godtier") != true) && (client.charcall.allData(client, targetID, charid, "rung") != "NONE"))
  {
    max = client.cache(client.charcall.allData(client, targetID, charid, "rung"));
  }
  else if((!args[1] || args[1].toLowerCase()!="confirm") && (!args[2] || args[2].toLowerCase()!="confirm"))
  {
        message.channel.send(`I can only help that player by setting their invalid grist levels to 0. If you're sure, add a 'confirm' to that.`);
        return;
  }
  
  for(i=0;i<gristTypes.length;i++){
	if(isNaN(gristCheck[i])||isNull(gristCheck[i])||gristCheck[i]<0||(max > 0 && gristCheck[i]>max))
		gristCheck[i] = max;
  }
  client.charcall.setAnyData(client,targetID,charid,gristCheck,"grist");
  message.channel.send("Fixed. Probably.");
  return;
}

if(args[0].toLowerCase()==="boons"){
  let currentBoons = client.charcall.allData(client,targetID,charid,"b");
  
  if(currentBoons == "NONE")
  {
    message.channel.send(`That character doesn't have a PORKHOLLOW!`);
    return;
  }
  
  if(args[1] && !isNaN(parseInt(args[1],10)))
  {
	  currentBoons += parseInt(args[1],10);
  }
  else if(args[2] && !isNaN(parseInt(args[2], 10)))
  {
	  currentBoons += parseInt(args[2],10);
  }
  else{
    message.channel.send(`You need to provide a numerical amount of boondollars to add.`);
    return;
  }
  client.charcall.setAnyData(client,targetID,charid,currentBoons,"b");
  message.channel.send(`Your boondollars are now ${currentBoons}.`);
  return;
}

  let msg=`Sorry, that's not a valid debug command. Accepted arguments:`;
  for(let i=0;i<debugOptions.length;i++){
    msg+=`\n${debugOptions[i][0].toUpperCase()}: ${debugOptions[i][1]}`;
  }
  message.channel.send(msg);
  return;

}
