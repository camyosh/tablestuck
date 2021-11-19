exports.run = async function(client, message, args){

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  let name = client.charcall.charData(client,charid,"name");
  let img = client.charcall.charData(client,charid,"img");
  let local = client.charcall.charData(client,charid,"local");

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
    if(charid!=occList[j][1]){
    if(client.charcall.controlCheck(client,occList[j][1])) ++count;
    client.funcall.chanMsg(client,occList[j][1],msg);
    }
  }
  message.channel.send(`Sent message to ${count} channel(s)!`);

}
