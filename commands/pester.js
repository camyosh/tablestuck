exports.run = async function(client, message, args){

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  let chumroll = client.charcall.allData(client,userid,charid,"chumroll");
  if(chumroll=="NONE"){
    message.channel.send("You have no chums to pester!");
    return;
  }
  let tagList = [];

  for(let i=0;i<chumroll.length;i++){
    getTag = client.charcall.charGet(client,chumroll[i]);
    if(client.charcall.allData(client,userid,getTag,"chumtag")!="NONE"){
      tagList.push(client.charcall.allData(client,userid,getTag,"chumtag"));
    }else{
      tagList.push(i);
    }
  }

  if(!args[0]){
      client.tutorcall.progressCheck(client,message,11,["text",`check your chumroll and use a chum's tag to message them! For example, ${client.auth.prefix}pester gt Fuck you!`]);
    return;
  }

  let value;

  if(tagList.includes(args[0].toUpperCase())){
    value=tagList.indexOf(args[0].toUpperCase());
  }else{
    client.tutorcall.progressCheck(client,message,11,["text",`That isn't a valid tag! Check your ${client.auth.prefix}chumroll and use a chum's tag to message them!`]);
    return;
  }

  if(!args[1]){
    message.channel.send("You need to type a message to send to your chum!");
    return;
  }

  let msg=``;

  let i;

  for(i=1;i<args.length;i++){
    msg+=`${args[i]} `;
  }

  try{
    getTag = client.charcall.charGet(client,chumroll[value]);
    client.hookcall.pester(client,message,charid,getTag,msg);
    client.tutorcall.progressCheck(client,message,11);
  }catch(err){
    message.channel.send("Failed to send message!");
  }

}
