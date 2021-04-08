const tierBD = [[1,2],[1,4],[1,6],[1,8],[1,10],[1,12],[2,16],[2,20],[2,24],[3,30],[3,36],[4,40],[5,50],[6,60],[7,70],[8,80],[10,100]];

exports.run = (client,message,args) =>{

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");

  let sdex = client.playerMap.get(charid,"sdex");

  let dogCheck = client.traitcall.traitCheck(client,charid,"DOG");

  let strifeCheck = client.strifecall.strifeTest(client, message, message.author);

  selectDex = parseInt(args[0], 10) - 1;
  if(isNaN(selectDex)){

    message.channel.send("That is not a valid argument!");
    return;
  }
  if(selectDex >= sdex.length || selectDex< 0){
    message.channel.send(`That is not a valid item! Check the list of items in your Sylladex with ${client.auth.prefix}sylladex`);
    return;
  }

  let local = client.playerMap.get(charid,"local");
  let pos;
  let strifeLocal;
  let list;

  if(client.traitcall.itemTrait(client,sdex[selectDex],"MEAT")==false&&client.traitcall.itemTrait(client,sdex[selectDex],"CANDY")==false&&client.traitcall.itemTrait(client,sdex[selectDex],"FOOD")==false&&dogCheck[0]==false){
    message.channel.send("That is not a consumable item!");
    return;
  }

  if(strifeCheck==true){

    pos = client.playerMap.get(charid,"pos");
    strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`;
    list = client.strifeMap.get(strifeLocal,"list");

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
  let msg = `You consume the ${sdex[selectDex][0]}!`

  if(client.traitcall.itemTrait(client,sdex[selectDex],"CANDY")){
    if(strifeCheck==false){
      message.channel.send("You can't use that item outside of strife!");
      return;
    }

    let stamina = list[pos][5];
    stamina+=tier;
    list[pos][5]=stamina;
    msg += `\nYou gain ${tier} STAMINA, you now have ${stamina} STAMINA!`;
  }
  if(client.traitcall.itemTrait(client,sdex[selectDex],"MEAT")){
    if(strifeCheck==false){
      message.channel.send("You can't use that item outside of strife!");
      return;
    }

    list[pos][7].push(`MEAT${tier}`);
    msg += `\nYou will do +${tier} BD on your next attack!`;

  }

  if(client.traitcall.itemTrait(client,sdex[selectDex],"FOOD")||client.traitcall.traitCheck(client,charid,"DOG")[0]){

    let vit;

    if(strifeCheck==true){
      vit = list[pos][3]
    } else {
      vit = client.playerMap.get(charid,"vit");
    }

    let gel = client.playerMap.get(charid,"gel");
    let heal = tier*.06;

    if(client.traitcall.traitCheck(client,charid,"FOOD")[1]){
      heal*=2;
    }
    vit += Math.ceil(gel*heal);

    if(vit>gel){
      vit=gel;
    }

    if(strifeCheck==true){

      list[pos][3]=vit;

    } else{

      client.playerMap.set(charid,vit,"vit");

    }

    msg+=`\n You heal ${Math.ceil(gel*heal)} VITALITY, you now have ${vit} / ${gel} VITALITY!`;
if(strifeCheck){
    list[pos][3]=vit;
  }
  }

  message.channel.send(msg);

  if (strifeCheck) {
    list[pos][6].push("CONSUME");
    client.strifeMap.set(strifeLocal, list, "list");
  }
  if (sdex[selectDex][3] == 1) {
    sdex.splice(selectDex, 1);
  } else {
    sdex[selectDex][3]--;
  }
  client.playerMap.set(charid, sdex, "sdex");

}
