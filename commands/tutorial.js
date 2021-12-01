exports.run = (client, message, args) => {


  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");

if(client.charcall.npcCheck(client,charid)){
  message.channel.send("Only players can use and progress the tutorial!");
  return;
}

let defaultTutor = [true];
let tutorRef = require("../tutorRef.json");
for(let m=0;m<tutorRef.content.length-1;m++){
  defaultTutor.push(false);
}

let progress = client.userMap.get(userid,"tutor");
if(!args[0]){
  client.Canvas.registerFont("./miscsprites/Courier Std Bold.otf",{family:`Courier Standard Bold`});
  const canvas = client.Canvas.createCanvas(1200,500);
  const ctx = canvas.getContext('2d');
  ctx.font = "20px Courier Standard Bold";
  ctx.fillStyle = "#000000";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  for(let i=0;i<tutorRef.content.length-1;i++){
    if(progress[i+1]){
      ctx.fillStyle = "#ffffff";
      msg = `[${i+1}] ${tutorRef.content[0][i]}`;
    }else{
      ctx.fillStyle = "#6a6a6a";
      msg = `[${i+1}] LOCKED`;
    }

    ctx.fillText(msg,Math.floor(i/15)*300+20,(i%15)*30+40);
  }
  const attachment = new client.MessageAttachment(canvas.toBuffer(), 'tutorial.png');
  message.channel.send({content: `Here, you can see your progress through the Tutorial.\n-Replay any message you've unlocked with ${client.auth.prefix}tutorial [number].\n-Reset your tutorial progress with ${client.auth.prefix}tutorial reset.\n-Turn the tutorial on or off with ${client.auth.prefix}tutorial switch.`,files: [attachment]});
return;
}

if(args[0]=="reset"){
  client.userMap.set(userid,defaultTutor,"tutor");
  message.channel.send(`tutorial progress reset (and tutorial turned on, if it wasn't already)! do ${client.auth.prefix}tutorial start to get the first tutorial message again, without re-registering.`);
  return;
}
if(args[0]=="start"){
  client.tutorcall.progressCheck(client,message,1,false,true);
  return;
}
if(args[0]=="switch"){
  let progress = client.userMap.get(userid,"tutor");
  (progress[0]?progress[0]=false:progress[0]=true);
  client.userMap.set(userid,progress,"tutor");
  message.channel.send(`Tutorial ${(progress[0]?`Enabeled`:`Disabled`)}!`);
  return;
}
if(args[0]=="test"){
  client.tutorcall.progressCheck(client,message,args[1],false,true);
  return;
}
value = parseInt(args[0], 10);
if(isNaN(value)){
  message.channel.send("Unknown argument. Valid options are reset, start, switch, or a number.");
  return;
}
if(value<=0||value>tutorRef.content.length-1){
  message.channel.send("That step doesn't exist!");
  return;
}
if(!progress[value]){
  message.channel.send("You don't have that tutorial unlocked yet!");
  return;
}
client.tutorcall.progressCheck(client,message,value,false,true);
}
