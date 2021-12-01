exports.run = (client, message, args) => {

  if(!args[0]){

    var userid = message.guild.id.concat(message.author.id);
    var charid = client.userMap.get(userid,"possess");
    let traits = [];
    let traitCount = [];
    let specibus = client.charcall.charData(client,charid,"spec");
    let equip = client.charcall.charData(client,charid,"equip");
    let armor = client.charcall.charData(client,charid,"armor");
    let trinket = client.charcall.charData(client,charid,"trinket");
    let prototype = client.charcall.charData(client,charid,"prototype");
    let checklist = [];
    if(prototype!="NONE"&&prototype.length>0){
      for(let i=0;i<prototype.length;i++){
        checklist.push(prototype[i][1]);
      }
    }
    if(specibus.length != 0) checklist.push(specibus[equip][1]);
    if(armor.length!=0) checklist.push(armor[0][1]);
    if(trinket.length!=0) checklist.push(trinket[0][1]);
    while(checklist.length>0){
      capcode = checklist.pop();
      if(traits.includes(client.traitList[client.captchaCode.indexOf(capcode.charAt(2))])){
        traitCount[traits.indexOf(client.traitList[client.captchaCode.indexOf(capcode.charAt(2))])]++
      } else {
        traits.push(client.traitList[client.captchaCode.indexOf(capcode.charAt(2))]);
        traitCount.push(1);
      }

      if(traits.includes(client.traitList2[client.captchaCode.indexOf(capcode.charAt(3))])){
        traitCount[traits.indexOf(client.traitList2[client.captchaCode.indexOf(capcode.charAt(3))])]++
      } else {
        traits.push(client.traitList2[client.captchaCode.indexOf(capcode.charAt(3))]);
        traitCount.push(1);
      }
    }
    let msg = ``;
    for(let i=0; i<traits.length; i++){
      if(traits[i]!="NONE"){

        msg+=`**${traits[i]}**\nTrait Bonus - *${client.traitDesc[traits[i]].trait}*\n\nSet Bonus ${traitCount[i]}/3 ${(traitCount[i]>=3?`ACTIVE - `:`INACTIVE - `)} *${client.traitDesc[traits[i]].set}*\n\n`;

      }
    }

    if(msg.length==0){
      msg="NO TRAITS ACTIVE!";
    }

    var embed = new client.MessageEmbed()
    .setTitle(`ACTIVE TRAITS`)
    .addField(`HELP`,`These are all your active traits and the bonuses they give you! These traits are determined by your equipped WEAPON, ARMOR, and TRINKET.\n\nIf you have at least 3 of the same trait equipped, you also get the SET BONUS listed alongside the trait.\n\n If you'd like to see details on traits you don't have, do ${client.auth.prefix}trait [trait name]`)
    .addField(`TRAITS`,msg);

    client.tutorcall.progressCheck(client,message,25,["embed",embed]);
    return;

  }

  try{

    var embed = new client.MessageEmbed()
    .setTitle(`${args[0].toUpperCase()} TRAIT`)
    .addField(`TRAIT BONUS`,`*${client.traitDesc[args[0].toUpperCase()].trait}*`)
    .addField(`SET BONUS (3 iterations of trait must be active)`,`*${client.traitDesc[args[0].toUpperCase()].set}*`)
    .setThumbnail(client.traitDesc[args[0].toUpperCase()].img)

    message.channel.send({embeds:[embed]});
    return;

  }catch(err){
    message.channel.send("That doesn't seem to be a trait!");
  }

}
