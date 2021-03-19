module.exports = (client, message) => {
  //ignore all bots
  if(message.author.bot) return;

  if(message.guild === null) return;

  //Ignore all messages not starting with the prefix
  if(message.content.indexOf(client.auth.prefix) !== 0) return;



  //standard argument/command name definition
  const args = message.content.slice(client.auth.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  console.log(message.content);

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);
  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;
  try{
    let charid = message.guild.id.concat(message.author.id);
    if(!client.playerMap.has(charid)&&command!="register"&&command!="help"){
      message.channel.send("You are not registered! Register using the >register command!");
      return;
    }

    if(client.playerMap.get(charid,"act")>=client.limit&&client.limit!=0&&command!="register"&&command!="leaderboard"&&command!="stats"){
      message.channel.send("You have reached your maximum number of actions for this tournament!");
      return;
    }
  } catch(err){
 console.log("failed when checking to see if someone is registered, or if they're over the tournament action limit.");
  }
	 client.user.setActivity("Tablestuck Development");
  // Run the command
  cmd.run(client, message, args);
};
