exports.run = (client, message, args) => {

  if(client.funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

  var charid = message.guild.id.concat(message.author.id);
  let handleList = client.landMap.get(message.guild.id+"medium","handleList");

  if(!args[0]){
    message.channel.send("Enter a chumhandle you want to appear when pestering other players!");
    return;
  }

  if(args[0].length>32){
    message.channel.send("That name is too long!");
    return;
  }

  let i;
  let index;

  for(i=0;i<handleList.length;i++){
    if(handleList[i][1]==args[0]){
      message.channel.send("That chumhandle is already taken!");
      return;
    }
    if(handleList[i][0]==charid){
      index = i;
    }
  }

  handleList[index][1]=args[0];
  client.landMap.set(message.guild.id+"medium",handleList,"handleList");

  client.playerMap.set(charid,args[0],"chumhandle");

  client.hookcall.pesterProf(client,message,charid);

}
