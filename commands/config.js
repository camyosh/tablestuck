exports.type = "game";
exports.desc ="Controls the rules of the world you play in";
exports.use = `">config" will open the config menu.
">config [option] [state]" will change config rules, such as >config channels 3 prevents channels from being created on registration.
">config reset" will return config to default settings.
">config page [number]" will switch between pages of config options.`;
exports.run = (client, message, args) => {

//config check template: client.configcall.get(client, message, "name")==#

  if(!client.funcall.dmcheck(client,message)){
    message.channel.send("Only a DM can use this command! Make sure to give yourself a role named \"DM\" if you're in charge!");
    return;
  }

if(!client.configMap.has(message.guild.id)){
  client.configcall.generateSettings(client, message.guild.id);
}
configList = client.configMap.get(message.guild.id);
if(!args[0]||args[0]==`page`){
  if(args[1]){
    targPage = parseInt(args[1], 10)-1;
  } else {
    targPage = 0;
  }
msgPages = [""];
msg = "";
pageNumber = 0;
for(let i=0;i<configList.options.length;i++){
  msg += `\n**${configList.options[i].name}**\n${configList.options[i].desc}\n`
  for(let j=0;j<configList.options[i].choices.length;j++){
    if(j==configList.options[i].selection){
      msg += `>[${j+1}] ${configList.options[i].choices[j]}\n`;
    } else {
    msg += `[${j+1}] ${configList.options[i].choices[j]}\n`;
    }
  }
  if(msgPages[pageNumber].length+msg.length>=1024){
    pageNumber++;
    msgPages[pageNumber]="";
  }
  msgPages[pageNumber]+=msg;
  msg="";

}
  if(targPage<0||targPage>=msgPages.length){
    message.channel.send("That isn't a valid config page!");
    return;
  }
  configPrint = new client.MessageEmbed()
  .setTitle("**GAME CONFIGURATION**")
  .addFields(
    {name:"**INSTRUCTIONS:**",value:`options preceeded with an arrow are the current selections. \nDo ${client.auth.prefix}config [option name] [new choice] to change any of the settings, like \"${client.auth.prefix}config death 2\".\n\nYou can also do ${client.auth.prefix}config reset to reset your config to default settings.\n\n**options with a \* after them may only have effect before the game begins, so set them before initalizing!**`},
    {name:"**PAGE:**",value:`${targPage+1}/${msgPages.length}`},
    {name:"**OPTIONS:**",value:msgPages[targPage]});
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
configList.settings[args[0].toUpperCase()] = (newOption-1);
message.channel.send(`Settings updated! \nRULE: ${configList.options[selection].desc}\nSETTING: ${configList.options[selection].choices[newOption-1]}`);
client.configMap.set(message.guild.id,configList);
}
