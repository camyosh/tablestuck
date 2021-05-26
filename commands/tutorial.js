exports.run = (client, message, args) => {

charid = message.guild.id.concat(message.author.id);
let defaultTutor = [true];
let tutorRef = require("../tutorRef.json");
for(let m=0;m<tutorRef.content.length;m++){
  defaultTutor.push(false);
}
if(!args[0]){
  message.channel.send(`this command is to toggle on and off the in-game tutorial. do ${client.auth.prefix}tutorial switch to turn it on or off, or ${client.auth.prefix}tutorial reset to reset your progress in the tutorial and start again.`);
return;
}
if(args[0]=="reset"){
  client.playerMap.set(charid,defaultTutor,"tutor");
  message.channel.send(`tutorial progress reset (and tutorial turned on, if it wasn't already)! do ${client.auth.prefix}tutorial start to get the first tutorial message again, without re-registering.`);
  return;
}
if(args[0]=="start"){
  client.tutorcall.progressCheck(client,message,1);
  return;
}
if(args[0]=="switch"){
  let progress = client.playerMap.get(charid,"tutor");
  (progress[0]?progress[0]=false:progress[0]=true);
  client.playerMap.set(charid,progress,"tutor");
  message.channel.send(`Tutorial ${(progress[0]?`Enabeled`:`Disabled`)}!`);
  return;
}
if(args[0]=="test"){
  client.tutorcall.progressCheck(client,message,args[1]);
}

}
