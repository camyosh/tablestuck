exports.run = async function(client, message, args){

  if(client.funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

  var charid = message.guild.id.concat(message.author.id);
  let chumroll = client.playerMap.get(charid,"chumroll");

  if(!args[0]){
    message.channel.send("check your chumroll and use a chum's number to message them!");
    return;
  }

  let value = parseInt(args[0], 10) - 1;
  if(isNaN(value)){
    message.channel.send("That is not a valid chum number!");
    return;
  }

  if(value >= chumroll.length || value < 0) {
    message.channel.send("That is not a valid chum number!")
    return;
  };

  if(!args[1]){
    message.channel.send("You need to type a message to send to your chum!");
    return;
  }

  let msg=``;

  let i;

  for(i=1;i<args.length;i++){
    console.log(i);
    console.log(args.length);
    msg+=`${args[i]} `;
  }

  try{

    client.hookcall.pester(client,message,charid,chumroll[value],msg);
  }catch(err){
    message.channel.send("Failed to send message!");
  }

}
