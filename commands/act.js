const funcall = require("../modules/funcall.js");
const strifecall = require("../modules/strifecall.js");

//Used to take actions during STRIFE

exports.run = (client, message, args) => {

//Check if player is registered

  if(funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

//Check if player is in STRIFE

  if(strifecall.strifeTest(client, message, message.author) == false){
    message.channel.send("You are not currently in Strife!")
    return;
  }

//Defining variables

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");



  let local = client.playerMap.get(charid,"local");
  let pos = client.playerMap.get(charid,"pos");
    let type = client.playerMap.get(charid,"type");
  let strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`;

  let spec = client.playerMap.get(charid,"spec");
  let equip = client.playerMap.get(charid,"equip");
  let active = client.strifeMap.get(strifeLocal,"active");
  let list = client.strifeMap.get(strifeLocal,"list");
  let turn = client.strifeMap.get(strifeLocal,"turn");
  let init = client.strifeMap.get(strifeLocal,"init");

//Check if EQUIP is an actual weapon in the specibus
let action = [];


  if(equip<spec.length){
    let weaponkind = client.kind[client.codeCypher[0][client.captchaCode.indexOf(spec[equip][1].charAt(0))]];
    action =[client.action[client.weaponkinds[weaponkind].t][client.codeCypher[4][client.captchaCode.indexOf(spec[equip][1].charAt(4))]],client.action[client.weaponkinds[weaponkind].t][client.codeCypher[5][client.captchaCode.indexOf(spec[equip][1].charAt(5))]],client.action[client.weaponkinds[weaponkind].t][client.codeCypher[6][client.captchaCode.indexOf(spec[equip][1].charAt(6))]],client.action[client.weaponkinds[weaponkind].t][client.codeCypher[7][client.captchaCode.indexOf(spec[equip][1].charAt(7))]]];
    //message.channel.send("You do not have a WEAPON equipped!");
    //return;
  }

  action=action.concat(client.underlings[type].act);

  if(client.playerMap.has(charid,"prototype")){
    let prototype = client.playerMap.get(charid,"prototype");

    for(let j =0;j<prototype.length;j++){
      let weaponkind = client.kind[client.codeCypher[0][client.captchaCode.indexOf(prototype[j][1].charAt(0))]];
      for(let i=0;i<4;i++){
        action.push(client.action[client.weaponkinds[weaponkind].t][client.codeCypher[i+4][client.captchaCode.indexOf(prototype[j][1].charAt(i+4))]]);

  }
  }

  }

//retrieving the weaponkind and action list for a weapon

  //let weaponkind = client.kind[client.codeCypher[0][client.captchaCode.indexOf(spec[equip][1].charAt(0))]];
  //let action = [client.action[client.weaponkinds[weaponkind].t][client.codeCypher[4][client.captchaCode.indexOf(spec[equip][1].charAt(4))]],client.action[client.weaponkinds[weaponkind].t][client.codeCypher[5][client.captchaCode.indexOf(spec[equip][1].charAt(5))]],client.action[client.weaponkinds[weaponkind].t][client.codeCypher[6][client.captchaCode.indexOf(spec[equip][1].charAt(6))]],client.action[client.weaponkinds[weaponkind].t][client.codeCypher[7][client.captchaCode.indexOf(spec[equip][1].charAt(7))]],"aggrieve","abscond"];

//if no additional arguments, display list of actions

  if(!args[0]){
    let msg = ``;
      for(i=0;i<action.length;i++){
        /*msg += `**[${i+1}]** ${client.emojis.cache.get(client.actionList[action[i]].emoji[0])}${client.emojis.cache.get(client.actionList[action[i]].emoji[1])}${client.emojis.cache.get(client.actionList[action[i]].emoji[2])}${client.emojis.cache.get(client.actionList[action[i]].emoji[3])}${client.emojis.cache.get(client.actionList[action[i]].emoji[4])}
        **CST - **${client.actionList[action[i]].cst} **DMG - **${client.actionList[action[i]].dmg}\n${client.actionList[action[i]].aa}\n\n`;
        */
        msg += `**[${i+1}]** ***${action[i].toUpperCase()}***
        **CST - **${client.actionList[action[i]].cst} **DMG - **${client.actionList[action[i]].dmg}\n${client.actionList[action[i]].aa}\n\n`;
      }

    let embed = new client.Discord.MessageEmbed()
    .setTitle(`**SELECT AN ACTION**`)
    .addField(`**STAMINA**`,list[pos][5])
    .addField(`**WEAPON ACTIONS**`,msg)
    .setColor("#00e371")

    try{message.channel.send(embed);}catch(err){console.log(msg)};
    return;
  }

//Turn first argument into a number and check if NAN

  select = parseInt(args[0], 10) - 1;
  if(isNaN(select) || select > 5 || select < 0){
    message.channel.send("That is not a valid argument!");
    return;
  }

//Make sure action is not being taken outside of turn unless INSTANT

  if(init[turn][0] != pos && !client.actionList[action[select]].add.includes("INSTANT")){
    message.channel.send("You can't take non INSTANT ACTIONS outside of your turn!");
    return;
  }

//If action has FIRST, makes sure its the first action taken this turn

  if(client.actionList[action[select]].add.includes("FIRST")){
    if(list[pos][6].length > 0){
      message.channel.send("That ACTION can only be used if it is the first ACTION taken on a turn!");
      return;
    }
  }

//Check to see if action has reuse, and if not check if action has been used this turn

  if(!client.actionList[action[select]].add.includes("REUSE") && list[pos][6].includes(""+select+equip)){
    message.channel.send("You can't use that ACTION more than once per turn!");
    return;
  };

//If there is no second argument, list all participants in strife and their VITALITY

  if(!args[1]){
    let msg = ``;
    let i;
    for(i=0;i<active.length;i++){
        msg += `**[${i+1}]** **${client.playerMap.get(list[active[i]][1],"name").toUpperCase()}** [VIT - ${list[active[i]][3]}]\n\n`
    }

    let embed = new client.Discord.MessageEmbed()
    .setTitle(`**SELECT A TARGET**`)
    .addField(`**AVAILABLE TARGETS**`,msg)
    .setColor("#00e371")

    try{message.channel.send(embed);}catch(err){message.channel.send(msg)};
    return;
  }

  //Make sure second argument is a number

  target = parseInt(args[1], 10) - 1;
  if(isNaN(target) || target >= active.length || target < 0){
    message.channel.send("That is not a valid argument!");
    return;
  }

  //Retrieve stamina cost and check if any status effects change the cost

  let cost = client.actionList[action[select]].cst

  if(list[pos][7].includes("DISCOUNT")){
    if(cost > 1){
       cost--;
     }
  }
  if(client.traitcall.traitCheck(client,charid,"MIND")[1]){
    if(cost > 1){
      cost--;
    }
  }


  //Check if player can pay the stamina cost

  if(cost > list[pos][5]){
    if(client.traitcall.traitCheck(client,charid,"DOOM")[0]){
      let maxvit = client.playerMap.get(charid,"gel");
      let doomcost= Math.floor(cost-list[pos][5])*.1*maxvit;
      if(list[pos][3]-doomcost<=0){
        message.channel.send(`You don't have enough STAMINA to afford that action, or enough VITALITY to sacrifice for it! That action costs ${cost} STAMINA and you have ${list[pos][5]} STAMINA!`);
        return;
      }
      list[pos][3]-=doomcost;
        message.channel.send(`You paid ${list[pos][5]} STAMINA and ${doomcost} VITALITY to take this action. ${list[pos][3]} VITALITY REMAINING!`);
    } else {
    message.channel.send(`You don't have enough STAMINA to afford that action! That action costs ${cost} STAMINA and you have ${list[pos][5]} STAMINA!`);
    return;
   }
  }

  //If action is ABSCOND, leave combat by calling leaveStrife function. Otherwise, spend stamina for the action and call the act function

  if(action[select] == "abscond"){
    strifecall.leaveStrife(client,message,local,pos);
    message.channel.send("Absconding!");
  } else {
  list[pos][5] -= cost;
  if(list[pos][5]<0){
    list[pos][5]=0;
  }
  list[pos][6].push(""+select+equip);
  client.strifeMap.set(strifeLocal,list,"list")
  strifecall.act(client,message,local,action[select],active[target]);
}
}
