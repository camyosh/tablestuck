exports.run = (client, message, args) => {

  if(!args[0]){
    message.channel.send("Name cannot be empty!");
    return;
  }

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  var prereg = false;
  if(charid=="NONE"){
    prereg = true;
  }
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
  if(prereg){
    client.userMap.set(userid,output,"name");
  } else if (client.charcall.npcCheck(client,charid)){
    client.charcall.setAnyData(client,userid,charid,output,"name");
  } else {
    let dreamingID = client.charcall.allData(client,userid,charid,"dreamingID");
    let wakingID = client.charcall.allData(client,userid,charid,"wakingID");
    client.charcall.setAnyData(client,userid,wakingID,output,"name");
    client.charcall.setAnyData(client,userid,dreamingID,`${output}'s Dream Self`,"name");
    client.sburbMap.set(client.charcall.charData(client,charid,"owner"),output,"name");
    client.userMap.set(userid,output,"name");
  }
}
