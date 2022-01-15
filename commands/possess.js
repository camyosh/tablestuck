exports.run = (client, message, args) => {

var userid = message.guild.id.concat(message.author.id);
var charid = client.userMap.get(userid,"possess");

let local = client.charcall.charData(client,charid,"local");

let sec = client.landMap.get(local[4],local[0]);
let occList = sec[local[1]][local[2]][2][local[3]][4];
let speeddial = client.userMap.get(userid,"speeddial");

if(!client.funcall.dmcheck(client,message)){
  message.channel.send("Only a DM can use this command! Make sure to give yourself a role named \"DM\" if you're in charge!");
  return;
}

if(!args[0]){
  let msg = ``;
  let msg2 = ``;
  let i;

  for(i=0;i<occList.length;i++){
      msg += `**[${i+1}]** **${client.charcall.charData(client,occList[i][1],"name").toUpperCase()}**\n\n`;
  }
  for(let j=0;j<speeddial.length;j++){
    msg2 += `**[${i+1}] ${client.charcall.charData(client,speeddial[j],"name").toUpperCase()}**\n\n`;
    i++;
  }
  possessList = new client.MessageEmbed()
  .setTitle("**POSSESS LIST**")
  .addField(`**CURRENT OCCUPANTS:**`,msg)
  .addField(`**SPEED DIAL:**`,msg2)
  .addField(`**CURRENTLY POSSESSING:**`,`**${client.charcall.charData(client,client.userMap.get(userid,"possess"),"name")}**\n\n
      To stop possessing, do ${client.auth.prefix}possess cancel
      To add to speeddial, do ${client.auth.prefix}possess add
      To remove from speeddial, do ${client.auth.prefix}possess remove
      To set as default character, do ${client.auth.prefix}possess default`)

  message.channel.send({embeds:[possessList]});

  return;
}

if(args[0]=="cancel"){

let target = client.userMap.get(userid,"possess");

  if(target==speeddial[0]){
    message.channel.send("You're already controlling your default character!");
    return;
  }
  //first, removes you from the control list of the target.
  let control = client.charcall.charData(client,target,"control");
  control.splice(control.indexOf(userid),1);
  client.charcall.setAnyData(client,userid,target,control,"control");
  checkStrife(client,message,target);
  //second, sets your default body to your current possess value.
  client.userMap.set(userid,speeddial[0],"possess");

  //last, adds you to the body's control list.
  charid = client.userMap.get(userid,"possess");
  let destination = client.charcall.charData(client,charid,"control");
  destination.push(userid);
  client.charcall.setAnyData(client,userid,charid,destination,"control");
  checkDreaming(client,userid,charid);


  message.channel.send(`Stopped possessing ${client.charcall.charData(client,target,"name").toUpperCase()}!
You have been shifted to your first Speed Dial option, ${client.charcall.charData(client,speeddial[0],"name").toUpperCase()}.`);
  return;
}
if(args[0]=="add"){
  if(speeddial.indexOf(charid)!=-1){
    message.channel.send("This creature is already on your speed dial list!");
    return;
  }
  speeddial.push(charid);
  message.channel.send(`${client.charcall.charData(client,charid,"name")} added to speeddial!`);
  client.charcall.setAnyData(client,userid,charid,speeddial,"speeddial");
  return;
}
if(args[0]=="remove"){
  if(speeddial.indexOf(charid)==-1){
    message.channel.send("This creature isn't on your speed dial list!");
    return;
  }
  speeddial.splice(speeddial.indexOf(charid),1);
  message.channel.send(`${client.charcall.charData(client,charid,"name")} removed from speeddial!`);
  client.charcall.setAnyData(client,userid,charid,speeddial,"speeddial");
  return;
}
if(args[0]=="default"){
  if(speeddial.indexOf(charid)==-1){
    message.channel.send("This creature isn't on your speed dial list!");
    return;
  }
  speeddial.splice(speeddial.indexOf(charid),1);
  speeddial.unshift(charid);
  message.channel.send(`${client.charcall.charData(client,charid,"name")} set as default character!`);
  client.charcall.setAnyData(client,userid,charid,speeddial,"speeddial");
  return;
}
let isSpeed = false;
let target;
  value = parseInt(args[0], 10) - 1;
  if(isNaN(value)){
    message.channel.send("That is not a valid number!");
    return;
  }

  if(value >= occList.length+speeddial.length || value < 0) {
    message.channel.send("That target doesn't exist!")
    return;
  };
  if(value >= occList.length){
    value = value-occList.length;
    isSpeed = true;
  }
  if(isSpeed){
    target = speeddial[value];
  } else {
    target = occList[value][1];
  }
  if(target==charid){
    message.channel.send("You're alredy possessing that character!");
    return;
  }
  //first,removes you from your currently possessed character.
  let control = client.charcall.charData(client,charid,"control");
  control.splice(control.indexOf(userid),1);
  client.charcall.setAnyData(client,userid,charid,control,"control");
  message.channel.send(`Stopped possessing ${client.charcall.charData(client,charid,"name").toUpperCase()}!`);
  checkStrife(client,message,charid);
  //second, sets your current possession as your choice.
  client.userMap.set(userid,target,"possess");

  //last, adds you to the body's control list.
  charid = client.userMap.get(userid,"possess");
  let destination = client.charcall.charData(client,charid,"control");
  destination.push(userid);
  client.charcall.setAnyData(client,userid,charid,destination,"control");
  checkDreaming(client,userid,charid);
  message.channel.send(`Now possessing ${client.charcall.charData(client,target,"name").toUpperCase()}!`);
}
function checkStrife(client,message,charid){
  if(client.charcall.charData(client,charid,"strife")&&client.charcall.charData(client,charid,"faction")!="player"){
    let local = client.charcall.charData(client,charid,"local");
      if(client.strifecall.turnTest(client,message,local)){
        setTimeout(client.strifecall.npcTurn,1500,client,message,local);
    }
  }
}
//if the body you're pushed into doesn't have dreaming set as the body you're taking,
//it sets it to be so, to avoid conflicts with sleeping.
function checkDreaming(client,userid,charid){
  let dreamer = client.charcall.allData(client,userid,charid,"dreamer");
  if(dreamer!="NONE"){
    let target = (dreamer?client.charcall.allData(client,userid,charid,"dreamingID"):client.charcall.allData(client,userid,charid,"wakingID"));
    if(charid!=target){
      dreamer = (dreamer?false:true);
      client.charcall.setAnyData(client,userid,charid,dreamer,"dreamer");
    }
  }
}
