exports.run = function(client,message,args){

if(!client.funcall.dmcheck(client,message)){
message.channel.send("You must be a DM or Author to use this command!");
return;
}

if(!args[0]){
message.channel.send(`Please select what you want to spawn, such as \"${client.auth.prefix}spawn imp\".\nOptionally, you can specify the grist type with another argument, like \"${client.auth.prefix}spawn imp shale\".`);
return;
}

let spawnList = ["imp","ogre","basilisk","lich","giclopse","titachnid","denizen"];
if(!spawnList.includes(args[0].toLowerCase())){
let msg = `Sorry, your choice isn't recognized. The current spawns supported are:`;
for(let i=0;i<spawnList.length;i++){
  msg+=`\n${spawnList[i]}`;
}
message.channel.send(msg);
return;
}
let gristList = ["uranium","amethyst","garnet","iron","marble","chalk","shale","cobalt","ruby","caulk","tar","amber"];
if(args[1]&&!gristList.includes(args[1].toLowerCase())){
 let msg = `Sorry, that's not a valid grist type. The availible grist types are:\n`;
 for (let i=0;i<gristList.length;i++){
   msg+=`${gristList[i]}, `;
 }
 message.channel.send(msg);
 return;
}
let undername;
if(!args[1]){
undername = client.strifecall.spawn(client,message,args[0].toLowerCase())
} else {
undername = client.strifecall.spawn(client,message,args[0].toLowerCase(),args[1].toLowerCase());
}
message.channel.send(`Spawned ${undername} in current room!`);
}
