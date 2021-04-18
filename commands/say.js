exports.run = async function(client, message, args){

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");
  let name = client.playerMap.get(charid,"name");
  let img = client.playerMap.get(charid,"img");

  let local = client.playerMap.get(charid,"local");

  let sec = client.landMap.get(local[4],local[0]);
  let occList = sec[local[1]][local[2]][2][local[3]][4];
  let channelCheck = [];

  if(!args[0]){
    message.channel.send("Type a message to send to everyone in the room with you!");
    return;
  }

  let msg=``;

  let i;

  for(i=0;i<args.length;i++){
    msg+=`${args[i]} `;
  }

  let count = 0;

  for(j=0;j<occList.length;j++){

    if(client.playerMap.has(occList[j][1],"pesterchannel")){
      channel = client.playerMap.get(occList[j][1],"pesterchannel");
      if(!channelCheck.includes(channel)){
      channelCheck.push(channel);
      try{
        if(charid!=occList[j][1]&&client.funcall.dreamCheck(client,occList[j][1],local)){
        client.hookcall.say(client,message,occList[j][1],msg,name,img);
                count++;
      }
      }catch(err){
        console.log("failed to send message!");
      }
    }

    }else{
      possessList = client.playerMap.get(occList[j][1],"possess");

      for(k=0;k<possessList.length;k++){
        channel = client.playerMap.get(possessList[k],"pesterchannel");
        if(!channelCheck.includes(channel)){
        if(client.playerMap.has(possessList[k],"pesterchannel")){
          channelCheck.push(client.playerMap.get(possessList[k],"pesterchannel"));
          try{
            if(charid!=possessList[k]&&client.funcall.dreamCheck(client,possessList[k],local)){
            client.hookcall.say(client,message,possessList[k],msg,name,img);
                    count++;
          }
          }catch(err){
            console.log("failed to send message!");
          }

      }

    }

  }
}
}
  message.channel.send(`Sent message to ${count} channel(s)!`);

}
