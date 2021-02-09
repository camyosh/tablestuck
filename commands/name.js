exports.run = (client, message, args) => {

  if(!args[0]){
    message.channel.send("Name cannot be empty!");
    return;
  }

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");

  var i=0;
  var output ="";
  while(args[i]){
    if(args[i].includes("@")){
      args[i]=args[i].slice(args[i].indexOf("@")+1);
    }
    output = output + args[i]+" ";
    i++
  }
  output = output.slice(0,-1);

  if(output.length>32){
    message.channel.send("That name is too long!");
    return
  }

message.channel.send("Saving character name!");
client.playerMap.set(charid,output,"name");

}
