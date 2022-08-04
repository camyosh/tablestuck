exports.run = (client, message, args) => {
  if(!args[0]){
    let helpSend = new client.MessageEmbed()
    .setTitle("HELP MENU")
    .addFields(
      {name:"**INSTRUCTIONS**",value:`Welcome to the ${client.auth.prefix}HELP menu! From here, you can learn how to use any command in the game.
    \nThere are two ways to navigate this menu: you can either look up a command you already know exists by name, such as "${client.auth.prefix}help inspect", or you can go through groups of commands by number, such as looking up house commands with "${client.auth.prefix}help 2".`},
      {name:"**CATAGORIES:**",value:"[1] Game Commands\n[2] House Commands\n[3] Sylladex Commands\n[4] Character Commands\n[5] Strife Commands\n[6]Alchemy Commands\n[7] Sburb Commands\n[8] Author Commands"});
    message.channel.send({embeds: [helpSend]});
    return;
  }
  if(isNaN(args[0])){
    let found = false;
    client.commands.forEach((command,name)=>{
      if(args[0].toLowerCase() == name&&"type" in command){
        found = true
        let msg = `__${name}__\n ${command.desc}\n${command.use}`
        message.channel.send(msg.replaceAll(`>`,`${client.auth.prefix}`));
      }
    });
    if(!found){
      message.channel.send("That command doesn't exist, or isnt documented yet!");
    }
    return;
  }
  if(args[0]){
    let selection = parseInt(args[0],10)-1;
    if(selection<0||selection>7){
      message.channel.send("That isn't a valid help menu option!")
      return;
    }
    let helpArray = ["game","house","sylladex","character","strife","alchemy","sburb","author"];
    let msg = ``;
    client.commands.forEach((command,name)=>{
      if("type" in command&&command.type==helpArray[selection]){
        msg+= `**${name}**: ${command.desc}\n\n`;
      }
    });
    if(msg.length<=3){
      msg = "NONE";
    }
    let helpCatagory = new client.MessageEmbed()
    .setTitle("HELP MENU")
    .addFields({name:`**${helpArray[selection].toUpperCase()} COMMANDS:**`,value:msg.replaceAll(`>`,`${client.auth.prefix}`)});
    message.channel.send({embeds: [helpCatagory]});
    return;
  }
}
