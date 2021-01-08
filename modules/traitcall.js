
const tList = ["MELEE","RANGED","MAGIC","NA"];

exports.traitCheck = function(client,target,traitName){
  try{
  let check = [false,false];

  let traitCount = 0;
  let specibus = client.playerMap.get(target,"spec");
  let equip = client.playerMap.get(target,"equip");
  let armor = client.playerMap.get(target,"armor");
  console.log(armor);
  let trinket = client.playerMap.get(target,"trinket");
  //Check weapon first\

  if(specibus.length != 0){

    if(client.traitList[client.captchaCode.indexOf(specibus[equip][1].charAt(2))]==traitName){
      traitCount++;
    }
    if(client.traitList[client.captchaCode.indexOf(specibus[equip][1].charAt(3))]==traitName){
      traitCount++;
    }
  }

  //Check armor

  if(armor.length!=0){
    if(client.traitList[client.captchaCode.indexOf(armor[0][1].charAt(2))]==traitName){
      traitCount++;
    }
    if(client.traitList[client.captchaCode.indexOf(armor[0][1].charAt(3))]==traitName){
      traitCount++;
    }
  }

  //Check Equipment

  if(trinket.length!=0){
    if(client.traitList[client.captchaCode.indexOf(trinket[1].charAt(2))]==traitName){
      traitCount++;
    }
    if(client.traitList[client.captchaCode.indexOf(trinket[1].charAt(3))]==traitName){
      traitCount++;
    }
  }

  if(traitCount > 0){

    check[0]=true;

    if(traitCount >=4){
      check[1]=true;
    }

  }

  return check;

}catch(err){
  console.log("Tried to check an Underling's traits!");
  return [false,false];
}

}

exports.itemTrait = function(client,item,trait){

  if(client.traitList[client.captchaCode.indexOf(item[1].charAt(2))]==trait||client.traitList[client.captchaCode.indexOf(item[1].charAt(3))]==trait){
    return true;
  } else {
    return false;
  }

}

exports.compTest = function(client, message, charid, room, currentInv) {

    let i;
    //if first value in array is true, it means there is a computer, if both are true, it means the computer has sburbed installed
    let comp = [false,false];


    for(i=0; i < room[5].length; i++) {

      if(client.traitList[client.captchaCode.indexOf(room[5][i][1].charAt(2))] == "COMPUTER" || client.traitList[client.captchaCode.indexOf(room[5][i][1].charAt(3))] == "COMPUTER") {
        comp[0]=true;

        let j;
        for(j=0;j<room[5][i][4].length; j++){
          if(room[5][i][4][j][1]=="////////"&&room[5][i][4][j][0]=="SBURB SERVER"){
            comp[1]=true;
          }
        }
      }
    }
    for(i=0; i < currentInv.length; i++) {
      if(client.traitList[client.captchaCode.indexOf(currentInv[i][1].charAt(2))] == "COMPUTER" || client.traitList[client.captchaCode.indexOf(currentInv[i][1].charAt(3))] == "COMPUTER"){
        comp[0]=true;

        let j;
        for(j=0;j<currentInv[i][4].length; j++){
          if(currentInv[i][4][j][1]=="////////"&&currentInv[i][4][j][0]=="SBURB SERVER"){
            comp[1]=true;
      }
    }
}
}
return comp;
}

exports.inspectItem = function(client, item){

  let weaponkind = client.kind[client.codeCypher[0][client.captchaCode.indexOf(item[1].charAt(0)) /*-1*/  ]];
  let gristType = client.gristTypes[client.codeCypher[1][client.captchaCode.indexOf(item[1].charAt(1))]];
  let trait1 = client.traitList[client.captchaCode.indexOf(item[1].charAt(2))];
  let trait2 = client.traitList[client.captchaCode.indexOf(item[1].charAt(3))];
  let action1 = client.action[client.weaponkinds[weaponkind].t][client.codeCypher[4][client.captchaCode.indexOf(item[1].charAt(4))]];
  let action2 = client.action[client.weaponkinds[weaponkind].t][client.codeCypher[5][client.captchaCode.indexOf(item[1].charAt(5))]];
  let action3 = client.action[client.weaponkinds[weaponkind].t][client.codeCypher[6][client.captchaCode.indexOf(item[1].charAt(6))]];
  let action4 = client.action[client.weaponkinds[weaponkind].t][client.codeCypher[7][client.captchaCode.indexOf(item[1].charAt(7))]];


  msg = `**TIER -** ${item[2]}  **  QTY -** ${item[3]}\n**KIND - **${weaponkind.toUpperCase()} **TYPE -** ${tList[client.weaponkinds[weaponkind].t]}\n\n**GRIST TYPE -** ${
    client.emojis.cache.get(client.grist[gristType].emoji)} ${gristType.toUpperCase()}\n**EFFECTIVE -** ${
    client.emojis.cache.get(client.grist[client.grist[gristType].effective[0]].emoji)}${client.emojis.cache.get(client.grist[client.grist[gristType].effective[1]].emoji)}${client.emojis.cache.get(client.grist[client.grist[gristType].effective[2]].emoji)}${client.emojis.cache.get(client.grist[client.grist[gristType].effective[3]].emoji)
    }\n**INEFFECTIVE -** ${
    client.emojis.cache.get(client.grist[client.grist[gristType].ineffective[0]].emoji)}${client.emojis.cache.get(client.grist[client.grist[gristType].ineffective[1]].emoji)}${client.emojis.cache.get(client.grist[client.grist[gristType].ineffective[2]].emoji)}${client.emojis.cache.get(client.grist[client.grist[gristType].ineffective[3]].emoji)
    }`;
  msg1 = `**TRAIT 1 -** ${trait1}\n\n**TRAIT 1 -** ${trait2}`;
  msg2 = `${client.emojis.cache.get(client.actionList[action1].emoji[0])}${client.emojis.cache.get(client.actionList[action1].emoji[1])}${client.emojis.cache.get(client.actionList[action1].emoji[2])}${client.emojis.cache.get(client.actionList[action1].emoji[3])}${client.emojis.cache.get(client.actionList[action1].emoji[4])
  } **CST - **${client.actionList[action1].cst} **DMG - **${client.actionList[action1].dmg}\n${client.actionList[action1].aa}\n\n${
    client.emojis.cache.get(client.actionList[action2].emoji[0])}${client.emojis.cache.get(client.actionList[action2].emoji[1])}${client.emojis.cache.get(client.actionList[action2].emoji[2])}${client.emojis.cache.get(client.actionList[action2].emoji[3])}${client.emojis.cache.get(client.actionList[action2].emoji[4])
    } **CST - **${client.actionList[action2].cst} **DMG - **${client.actionList[action2].dmg}\n${client.actionList[action2].aa
  }\n\n${
    client.emojis.cache.get(client.actionList[action3].emoji[0])}${client.emojis.cache.get(client.actionList[action3].emoji[1])}${client.emojis.cache.get(client.actionList[action3].emoji[2])}${client.emojis.cache.get(client.actionList[action3].emoji[3])}${client.emojis.cache.get(client.actionList[action3].emoji[4])
    } **CST - **${client.actionList[action3].cst} **DMG - **${client.actionList[action3].dmg}\n${client.actionList[action3].aa
  }\n\n${
    client.emojis.cache.get(client.actionList[action4].emoji[0])}${client.emojis.cache.get(client.actionList[action4].emoji[1])}${client.emojis.cache.get(client.actionList[action4].emoji[2])}${client.emojis.cache.get(client.actionList[action4].emoji[3])}${client.emojis.cache.get(client.actionList[action4].emoji[4])
    } **CST - **${client.actionList[action4].cst} **DMG - **${client.actionList[action4].dmg}\n${client.actionList[action4].aa
  }`
  let msg3=``;
  if(item[4].length > 0){
    let i;
    for(i=0;i<item[4].length && i<20;i++){
      msg3 += `**[${i+1}] ${item[4][i][0]} x${item[4][i][3]}** \n${item[4][i][1]} TIER - ${item[4][i][2]}\n\n`
    }
    if (item[4].length > 20)
    {
      msg3 += `**` + (item[4].length - 20) + ` more items**\n\n`
    }
  } else {
    msg3 = "N/A"
  }
  inspectItem = new client.Discord.MessageEmbed()
  .setTitle(`**${item[0]}**`)
  .addField(`**ITEM INFORMATION**`,msg)
  .addField(`**ITEM TRAITS**`,msg1)
  .addField(`**ITEM ACTIONS**`,msg2)
  .addField(`**ITEM INVENTORY**`,msg3)
  return inspectItem;

}
