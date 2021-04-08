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

  if(!args[1]||args[1].length<2){
    message.channel.send(`Please enter a 2 letter chumtag after your chumhandle, for example ${client.auth.prefix}chumhandle ghostlyTrickster GT`);
    return;
  }

  if(args[0].length>32){
    message.channel.send("That name is too long!");
    return;
  }

  let ab = args[1].substring(0,2).toUpperCase();

  let i;
  let index;
  let abCount = 0;

  for(i=0;i<handleList.length;i++){
    if(handleList[i][1]==args[0]&&handleList[i][0]!=charid){
      message.channel.send("That chumhandle is already taken!");
      return;
    }
    if(handleList[i].length<3){
      handleList[i].push(`${i}`);
    }
    if(handleList[i][2].toUpperCase==ab&&handleList[i][0]!=charid){
    abCount++;
    }
    if(handleList[i][0]==charid){
      index = i;
    }
  }

  if(abCount>0){
    ab=`${ab}${abCount}`;
  }

  handleList[index][1]=args[0];
  handleList[index][2]=ab;

  client.landMap.set(message.guild.id+"medium",handleList,"handleList");

  client.playerMap.set(charid,args[0],"chumhandle");
  client.playerMap.set(charid,ab,"chumtag")

  client.hookcall.pesterProf(client,message,charid);

}
