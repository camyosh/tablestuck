exports.run = (client, message, args) => {

//config check template: client.configMap.get(message.guild.id).options[#].selection==#

  if(!client.funcall.dmcheck(client,message)){
    message.channel.send("Only a DM can use this command! Make sure to give yourself a role named \"DM\" if you're in charge!");
    return;
  }
defaultConfig = require("../config.json");
if(!client.configMap.has(message.guild.id)){
  console.log("creating a new config file!");
client.configMap.set(message.guild.id,defaultConfig);
}
configList = client.configMap.get(message.guild.id);
if(!args[0]){
msg = "";
for(let i=0;i<configList.options.length;i++){
msg += `\n**${configList.options[i].name}**\n${configList.options[i].desc}\n`
for(let j=0;j<configList.options[i].choices.length;j++){
  if(j==configList.options[i].selection){
    msg += `>[${j+1}] ${configList.options[i].choices[j]}\n`;
  } else {
  msg += `[${j+1}] ${configList.options[i].choices[j]}\n`;
  }
}
}

  configPrint = new client.MessageEmbed()
  .setTitle("**GAME CONFIGURATION**")
  .addField("**INSTRUCTIONS:**",`options preceeded with an arrow are the current selections. \nDo ${client.auth.prefix}config [option name] [new choice] to change any of the settings, like \"${client.auth.prefix}config death 2\".\n\nYou can also do ${client.auth.prefix}config reset to reset your config to default settings.\n\n**options with a \* after them may only have effect before the game begins, so set them before initalizing!**`)
  .addField("**OPTIONS:**",msg)
  message.channel.send({embeds: [configPrint]});
  return;
  }
if(args[0].toLowerCase()==="reset"){
client.configMap.set(message.guild.id,defaultConfig);
message.channel.send("Config file reset to default!");
return;
}
let selection = -1;
for(let k=0;k<configList.options.length;k++){
  if(configList.options[k].name === args[0].toUpperCase()){
    selection = k;
  }
}
if(selection==-1){
  message.channel.send(`that's not a valid option! do ${client.auth.prefix}config to see what options there are.`);
  return;
}
if(!args[1]||isNaN(args[1])){
  message.channel.send(`You need to select which option you want to change to, it has to be the number next to the options!`);
  return;
}
newOption = parseInt(args[1], 10);
if(newOption>configList.options[selection].choices.length||newOption<=0){
  message.channel.send(`that's not a valid option! do ${client.auth.prefix}config to see what options there are.`);
  return;
}
configList.options[selection].selection = (newOption-1);
message.channel.send(`Settings updated! \nRULE: ${configList.options[selection].desc}\nSETTING: ${configList.options[selection].choices[newOption-1]}`);
client.configMap.set(message.guild.id,configList);
}
