exports.type = "strife";
exports.desc = "Flee from strife";
exports.use = `">abscond" functions the same as taking the abscond action as long as you are in strife, and have the stamina for it.`;
exports.run = (client, message, args)=>{
  //Check if player is in STRIFE
    var userid = message.guild.id.concat(message.author.id);
    var charid = client.userMap.get(userid,"possess");

    if(!client.charcall.charData(client,charid,"strife")){
      message.channel.send("You are not currently in Strife!")
      return;
    }
    console.log("check 1");
  //grabs the data of the character, be it player or underling under user control.
  let local = client.charcall.charData(client,charid,"local");
  let pos = client.charcall.charData(client,charid,"pos");
  let type = client.charcall.charData(client,charid,"type");
  let spec = client.charcall.charData(client,charid,"spec");
  let equip = client.charcall.charData(client,charid,"equip");
  let damage = client.underlings[client.charcall.charData(client,charid,"type")].d;
  //gets all strife data
  let strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`;
  let active = client.strifeMap.get(strifeLocal,"active");
  let list = client.strifeMap.get(strifeLocal,"list");
  let turn = client.strifeMap.get(strifeLocal,"turn");
  let init = client.strifeMap.get(strifeLocal,"init");

  if(pos!=init[turn][0]){
    message.channel.send("It's not your turn!");
    return;
  }
  console.log("check 2");
  //Retrieve stamina cost and check if any status effects change the cost
  let cost = 1
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
 console.log(`check 3,${list[pos][5]}`)
  if(cost > list[pos][5]){
    console.log(list[pos][5]);
    if(client.traitcall.traitCheck(client,charid,"DOOM")[0]){
      let maxvit = client.charcall.allData(client,userid,charid,"gel");
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
  client.strifecall.leaveStrife(client,message,local,pos);
  message.channel.send("Absconding!");
  return;

}
