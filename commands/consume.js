const tierBD = [[1,2],[1,4],[1,6],[1,8],[1,10],[1,12],[2,16],[2,20],[2,24],[3,30],[3,36],[4,40],[5,50],[6,60],[7,70],[8,80],[10,100]];

exports.run = (client,message,args) =>{

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");

  let sdex = client.charcall.charData(client,charid,"sdex");

  let dogCheck = client.traitcall.traitCheck(client,charid,"DOG");

  let strifeCheck = client.charcall.charData(client,charid,"strife");

  selectDex = parseInt(args[0], 10) - 1;
  if(isNaN(selectDex)){

    message.channel.send("That is not a valid argument!");
    return;
  }
  if(selectDex >= sdex.length || selectDex< 0){
    message.channel.send(`That is not a valid item! Check the list of items in your Sylladex with ${client.auth.prefix}sylladex`);
    return;
  }

  let local = client.charcall.charData(client,charid,"local");
  let pos;
  let strifeLocal;
  let list;
  let turn;
  let init;
  let active;

  if(client.traitcall.itemTrait(client,sdex[selectDex],"MEAT")==false&&client.traitcall.itemTrait(client,sdex[selectDex],"CANDY")==false&&client.traitcall.itemTrait(client,sdex[selectDex],"FOOD")==false&&dogCheck[0]==false){
    message.channel.send("That is not a consumable item!");
    return;
  }

  if(strifeCheck==true){

    pos = client.charcall.charData(client,charid,"pos");
    strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`;
    turn = client.strifeMap.get(strifeLocal,"turn");
    list = client.strifeMap.get(strifeLocal,"list");
    init = client.strifeMap.get(strifeLocal,"init");
    active = client.strifeMap.get(strifeLocal,"active");

 if(list[init[turn][0]][1]!=charid){
   message.channel.send("You can only consume items on your turn!");
   return;
 }
  if(list[pos][6].includes("CONSUME")){

      if(dogCheck[1]==true&&list[pos][6].includes("CONSUME2")){
message.channel.send("You can't eat more than two items in a turn.");
return;
} else if(dogCheck[1]==false){
  message.channel.send("You can't eat more than one item in a turn.");
  return;
} else {
  list[pos][6].push("CONSUME2");
}
}
}

  let tier = sdex[selectDex][2];
  let msg,msg2;
  msg = `You consume the ${sdex[selectDex][0]}!`
if(strifeCheck){
  msg2 = `${client.charcall.charData(client,list[init[turn][0]][1],"name")} consumes a ${sdex[selectDex][0]}!`;
}
  if(client.traitcall.itemTrait(client,sdex[selectDex],"CANDY")){
    if(strifeCheck==false){
      message.channel.send("You can't use that item outside of strife!");
      return;
    }

    let stamina = list[pos][5];
    stamina+=tier;
    list[pos][5]=stamina;
    msg += `\nYou gain ${tier} STAMINA, you now have ${stamina} STAMINA!`;
    msg2 += `\nThey gain ${tier} STAMINA, and now have ${stamina} STAMINA!`;
  }
  if(client.traitcall.itemTrait(client,sdex[selectDex],"MEAT")){
    if(strifeCheck==false){
      message.channel.send("You can't use that item outside of strife!");
      return;
    }

    list[pos][7].push(`MEAT${tier}`);
    msg += `\nYou will do +${tier} BD on your next attack!`;
    msg2 += `\nThey will do +${tier} BD on their next attack!`;

  }

  if(client.traitcall.itemTrait(client,sdex[selectDex],"FOOD")||client.traitcall.traitCheck(client,charid,"DOG")[0]){

    let vit;

    if(strifeCheck==true){
      vit = list[pos][3]
    } else {
      vit = client.charcall.charData(client,charid,"vit");
    }

    let gel = client.charcall.allData(client,userid,charid,"gel");
    let heal = tier*.03;

    if(client.traitcall.traitCheck(client,charid,"FOOD")[1]){
      heal*=2;
    }
    vit += Math.ceil(gel*heal);

    if(vit>gel){
      vit=gel;
    }

    if(strifeCheck){

      list[pos][3]=vit;

    } else{
      client.charcall.setAnyData(client,userid,charid,vit,"vit");
    }

    msg+=`\nYou heal ${Math.ceil(gel*heal)} VITALITY, you now have ${vit} / ${gel} VITALITY!`;
      if(strifeCheck){
    msg2+=`\nThey heal ${Math.ceil(gel*heal)} VITALITY, and now have ${vit} / ${gel} VITALITY!`;
  }
if(strifeCheck){
    list[pos][3]=vit;
  }
  }

  message.channel.send(msg);
  if(strifeCheck){
  for(let i=0;i<active.length;i++){
    if(client.charcall.controlCheck(client,list[active[i]][1])&&list[active[i]][1]!=charid){
      client.funcall.chanMsg(client,list[active[i]][1],msg2);
    }
  }

    list[pos][6].push("CONSUME");
    client.strifeMap.set(strifeLocal, list, "list");
  }
  if (sdex[selectDex][3] == 1) {
    sdex.splice(selectDex, 1);
  } else {
    sdex[selectDex][3]--;
  }
  client.charcall.setAnyData(client,userid,charid,sdex,"sdex");

}
