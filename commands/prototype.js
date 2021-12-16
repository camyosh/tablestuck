exports.run = (client, message, args) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");

  let local = client.charcall.charData(client,charid,"local");
  let land = local[4];
  let sec = client.landMap.get(land,local[0]);
  let sdex = client.charcall.charData(client,charid,"sdex");

  let occ = sec[local[1]][local[2]][2][local[3]][4]

  if(!args[0]){
    client.tutorcall.progressCheck(client,message,28,["text","You need to choose an item from your SYLLADEX to prototype the SPRITE with!"]);
    return;
  }

  selectDex = parseInt(args[0], 10) - 1;
  if(isNaN(selectDex)){
    message.channel.send("That is not a valid argument!");
    return;
  }
  if(selectDex >= sdex.length || selectDex< 0){
    message.channel.send(`That is not a valid item! Check the list of items in your Sylladex with ${client.auth.prefix}sylladex`);
    return;
  }

  let spriteCheck = false;
  let spritePos;

  for(let i=0;i<occ.length;i++){
    if(client.charcall.charData(client,occ[i][1],"type")=="sprite"){
      spriteCheck = true;
      spritePos = i;
    }
  }
if(!spriteCheck){
  message.channel.send("There is no SPRITE in this room!");
  return;
}

let prototype = client.charcall.charData(client,occ[spritePos][1],"prototype");

if(prototype.length>=2){
  message.channel.send("You can't prototype more than two times!");
  return;
}
let name = `SPRITE`;
if(prototype.length>0){
name = client.charcall.charData(client,occ[spritePos][1],"name");
}

let targetItem = sdex.splice(selectDex,1)[0];
prototype.push(targetItem);

let newName = targetItem[0].toUpperCase()+name;
newName = newName.split(" ").join("");

client.charcall.setAnyData(client,userid,occ[spritePos][1],prototype,"prototype");
client.charcall.setAnyData(client,userid,occ[spritePos][1],newName,"name")
client.charcall.setAnyData(client,userid,charid,sdex,"sdex");
message.channel.send(`You prototyped the SPRITE with the ${targetItem[0].toUpperCase()}, it is now ${newName}!`);
client.funcall.tick(client,message);
}
