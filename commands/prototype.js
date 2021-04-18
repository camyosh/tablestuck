exports.run = (client, message, args) => {

  var charid = message.guild.id.concat(message.author.id);

  let local = client.playerMap.get(charid,"local");
  let land = local[4];
  let sec = client.landMap.get(land,local[0]);
  let sdex = client.playerMap.get(charid,"sdex");

  let occ = sec[local[1]][local[2]][2][local[3]][4]

  if(!args[0]){
    message.channel.send("You need to choose an item from your SYLLADEX to prototype your SPRITE with!");
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
    if(occ[i][1]==`n${charid}`){
      spriteCheck = true;
      spritePos = i;
    }
  }
if(!spriteCheck){
  message.channel.send("Your SPRITE is not in this room!");
  return;
}

let prototype = client.playerMap.get(`n${charid}`,"prototype");

if(prototype.length>=2){
  message.channel.send("You can't prototype more than two times!");
  return;
}
let name = `SPRITE`;
if(prototype.length>0){
name = client.playerMap.get(`n${charid}`,"name");
}

let targetItem = sdex.splice(selectDex,1)[0];
prototype.push(targetItem);

let newName = targetItem[0].toUpperCase()+name;

client.playerMap.set(`n${charid}`,prototype,"prototype");
client.playerMap.set(`n${charid}`,newName,"name")
client.playerMap.set(charid,sdex,"sdex");
message.channel.send(`You prototyped your SPRITE with the ${targetItem[0].toUpperCase()}, it is now ${newName}!`);
client.funcall.tick(client,message);
}
