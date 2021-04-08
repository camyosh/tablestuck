exports.run = (client, message, args) => {

  if(!args[0]){

    var target = client.playerMap.get(message.guild.id.concat(message.author.id),"control");


    let traits = [];
    let traitCount = [];
    let specibus = client.playerMap.get(target,"spec");
    let equip = client.playerMap.get(target,"equip");
    let armor = client.playerMap.get(target,"armor");
    let trinket = client.playerMap.get(target,"trinket");

    if(specibus.length != 0){

      if(traits.includes(client.traitList[client.captchaCode.indexOf(specibus[equip][1].charAt(2))])){
        traitCount[traits.indexOf(client.traitList[client.captchaCode.indexOf(specibus[equip][1].charAt(2))])]++
      } else {
        traits.push(client.traitList[client.captchaCode.indexOf(specibus[equip][1].charAt(2))]);
        traitCount.push(1);
      }

      if(traits.includes(client.traitList2[client.captchaCode.indexOf(specibus[equip][1].charAt(3))])){
        traitCount[traits.indexOf(client.traitList2[client.captchaCode.indexOf(specibus[equip][1].charAt(3))])]++
      } else {
        traits.push(client.traitList2[client.captchaCode.indexOf(specibus[equip][1].charAt(3))]);
        traitCount.push(1);
      }
    }
    //Check armor
    if(armor.length!=0){

      if(traits.includes(client.traitList[client.captchaCode.indexOf(armor[0][1].charAt(2))])){
        traitCount[traits.indexOf(client.traitList[client.captchaCode.indexOf(armor[0][1].charAt(2))])]++
      } else {
        traits.push(client.traitList[client.captchaCode.indexOf(armor[0][1].charAt(2))]);
        traitCount.push(1);
      }

      if(traits.includes(client.traitList2[client.captchaCode.indexOf(armor[0][1].charAt(3))])){
        traitCount[traits.indexOf(client.traitList2[client.captchaCode.indexOf(armor[0][1].charAt(3))])]++
      } else {
        traits.push(client.traitList2[client.captchaCode.indexOf(armor[0][1].charAt(3))]);
        traitCount.push(1);
      }
    }
    //Check Equipment
    if(trinket.length!=0){

      if(traits.includes(client.traitList[client.captchaCode.indexOf(trinket[0][1].charAt(2))])){
        traitCount[traits.indexOf(client.traitList[client.captchaCode.indexOf(trinket[0][1].charAt(2))])]++
      } else {
        traits.push(client.traitList[client.captchaCode.indexOf(trinket[0][1].charAt(2))]);
        traitCount.push(1);
      }

      if(traits.includes(client.traitList2[client.captchaCode.indexOf(trinket[0][1].charAt(3))])){
        traitCount[traits.indexOf(client.traitList2[client.captchaCode.indexOf(trinket[0][1].charAt(3))])]++
      } else {
        traits.push(client.traitList2[client.captchaCode.indexOf(trinket[0][1].charAt(3))]);
        traitCount.push(1);
      }
    }
    console.log(`Traits: ${traits}\nTrait Count: ${traitCount}`);

    let msg = ``;

    for(let i=0; i<traits.length; i++){
      if(traits[i]!="NONE"){

        msg+=`**${traits[i]}**\nTrait Bonus - *${client.traitDesc[traits[i]].trait}*\n\nSet Bonus ${traitCount[i]}/3 ${(traitCount[i]>=3?`ACTIVE - `:`INACTIVE - `)} *${client.traitDesc[traits[i]].set}*\n\n`;

      }
    }

    if(msg.length==0){
      msg="NO TRAITS ACTIVE!";
    }

    var embed = new client.Discord.MessageEmbed()
    .setTitle(`ACTIVE TRAITS`)
    .addField(`HELP`,`These are all your active traits and the bonuses they give you! These traits are determined by your equipped WEAPON, ARMOR, and TRINKET.\n\nIf you have at least 3 of the same trait equipped, you also get the SET BONUS listed alongside the trait.\n\n If you'd like to see details on traits you don't have, do ${client.auth.prefix}trait [trait name]`)
    .addField(`TRAITS`,msg);

    message.channel.send(embed);
    return;

  }

  try{

    var embed = new client.Discord.MessageEmbed()
    .setTitle(`${args[0].toUpperCase()} TRAIT`)
    .addField(`TRAIT BONUS`,`*${client.traitDesc[args[0].toUpperCase()].trait}*`)
    .addField(`SET BONUS (3 iterations of trait must be active)`,`*${client.traitDesc[args[0].toUpperCase()].set}*`)
    .setThumbnail(client.traitDesc[args[0].toUpperCase()].img)

    message.channel.send(embed);
    return;

  }catch(err){
    message.channel.send("That doesn't seem to be a trait!");
  }

}
