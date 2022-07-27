module.exports = async(client,interaction) => {
  if (!interaction.isButton()) return;
  interaction.deferUpdate();
    customArray = interaction.customId.split('.');
    if(interaction.user.id!=customArray[1]){
      return;
    }
    message = interaction.message;
    argsArray = customArray[0].split(' ');
    message.author.id = customArray[1];
    argsArray.push(message.id);
    command = argsArray.shift();
    if (command) {
      const cmd = await client.commands.get(command);
      cmd.run(client,message,argsArray);
    }
    return;
}
