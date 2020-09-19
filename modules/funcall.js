
//const GoogleSpreadsheet = require('google-spreadsheet');
//const { promisify } = require('util');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const lootcall = require("./lootcall.js");

//declaring list of premade items and their codes (there are 102 entries)

const premadeNames = ["COMPUTER","LAPTOP","DESK","BED","CELLPHONE","FLAT SCREEN TV","CRT TV","LAMP","ANTIQUE LAMP","POTTED PLANT","REMOTE","COFFEE TABLE","COUCH","BOARD GAME","DICE","WOODEN DUCK","WIZARD STATUE","HARLEQUIN","DECORATIVE KATANA","GAME CONSOLE","YOYO","FANCY SANTA","TOASTER","FORK","STEAK KNIFE","BUTTER KNIFE","OVEN","FRIDGE","ICE","ROCKET-POP","CANDY CORN","FRUIT GUSHERS","STEAK ","LUNCH MEAT","HOT DOG","BREAD","SALAD","BOOKSHELF","DESK","ROLLING CHAIR","BOOK","PEN","PENCIL","PAINTBRUSH","NEWSPAPER","STAPLER","DECK OF CARDS","READING GLASSES","HAT","COMPUTER","OLD COMPUTER","CANDLE","INK","GLUE","UMBRELLA","SAFE","MOUNTED DEER HEAD","HUNTING RIFLE","SHOTGUN","REPLICA SWORD","PISTOL","KNITTING NEEDLES","YARN","TOILET PAPER","TOOTHBRUSH","TOOTHPASTE","SHAVING CREAM","RAZOR","TIM ALLEN BUST","BROOM","SPRING","WASHER","DRYER","POWER COORD","FLASHLIGHT","IRON","HAT","SHOES","POGO RIDE","SHOVEL","ROCK","LAWN GNOME","BASKETBALL","SOCCER BALL","HOCKEY STICK","HOCKEY PUCK","BASEBALL BAT","BASEBALL","SWINGSET","MAILBOX","HAMMER","NAIL","SAW","WRENCH","SCREWDRIVER","PLIERS","CROWBAR","AXE","ROPE","FIREWORKS","CHAINSAW","SLEDGEHAMMER"]

const premadeCodes = ["yQiKRZH8","02iKkCLD","yLWjNwPf","yVaW3ohX","0oiXldWZ","yQASN0xP","ycAQBint","yPAVQcF7","yiUNVJPh","0nC2u8jL","0qWDawXo","yOHU3FhE","yd2FVRHK","0v2fHxfR","Gt2W9naV","xnHHGKpC","xRHbrDH4","84WHmOSf","4rWf881p","0EeKZWAY","YuWHpv1O","N32bdOcn","0reHWNK3","6XWH1aeL","frCHRunB","fBW2FaL2","yAcFDFTD","y9dUU1qy","0JdWv89f","0hYdl7RH","0DYWOQes","08YWJ3ZR","0kZjzFvm","0aKHs80B","0kZ3H55x","0zXWjRYw","0DI3Mt9D","yukjZvcc","yLWjNwPf","yv2WzjUz","XGW2rZ2j","bC22tRFG","bn2Hz4nL","cqHHLUk6","XhHHoMUg","ZBWW1w1j","rdW2VmtN","vSWWcavE","uNWWBSDV","yQiKRZH8","yeiQxD2s","0M8X8qz7","0yWYiwUY","0lbW2ypQ","OgWH3jZf","y4kFp303","xkH2Mece","5MWWyGJT","akWW5Vzw","4rHW0tYH","9yHHBjj5","382WRQrS","hvWIUwQt","MhWIw0tr","cg23mfhd","0UbH2NUT","097WToWS","p7RX1S44","xRaNeE1H","P3HW2sUq","0rLW5L4P","yT9UObs7","y58UrxP8","hQAWLcfb","QcPk0GU1","0fN2sDPx","uNWWBSDV","tCWH7NQ8","zuLB08Ct","gHHWT83p","mIHWgzkD","xFWMZ5R0","lg6XBeTB","liL35T9G","nZWH7nce","ll9HJ9e5","I522DfyR","lmH2Qox9","yrHWPKQ6","yHkIqlBC","2Z2WCHwF","VLHXhBj6","RTgW5zvi","SMWW5eW6","TWWWnvcB","UZ2HE2Oe","WwH2uezj","iTgWA1rs","hbWHfFP1","0wDdKKDf","Ef2W6ibV","2T2Fq1ms"]

function dubs(x){
  return Math.floor(Math.random() * x) + Math.floor(Math.random() * x);
}



//defining tables to determine information about an area in ranArea
//0 is empty, 1 is dungeon, 2 is construct, 3 is return node, 4 is village
const areaTable = [1,0,2,0,3,0,4];
//the number of rooms in an area, the area type is the index determined above
const roomCount = [[1,3,1,1,3],[1,5,1,1,4],[1,7,1,1,5],[1,9,1,1,6]]
//
const vilName = ["BANK","HABERDASHERY","GENERAL STORE","HOUSE","SNACK STAND","WEAPONSMITH","INN"]

exports.roomGenCall = function(client, area, section, roomNum){
  return roomGen(client, area, section, roomNum);
}

function roomGen(client, area, section, roomNum) {
  //set default room type
  let roomType = 0;
  //check if room type is one that needs a random number, and generate that number
  if(area == 0) roomType = dubs(8);
  else if(area == 1) {
    if(section == 0) roomType = Math.floor(Math.random()*4);
    else if(section == 1) roomType = Math.floor(Math.random()*6);
    else if(section == 2) roomType = Math.floor(Math.random()*8);
    else if(section == 3) roomType = Math.floor(Math.random()*10);
  }
  else if(area==4) roomType = dubs(4);

  //set room loot in case of chest or shop
  let roomLoot;
  if(area==4) {
    roomLoot = Math.floor(Math.random()*12)
  } else {
    roomLoot = dubs(8);
  }

  //set room name
  let nameList = ["CLEARING",`ROOM ${roomNum}`,"LAND CONSTRUCT","RETURN NODE",vilName[roomType]]
  let roomName = nameList[area]

//set room inventory

  let roomInv = [];
//REPLACE THIS WITH A SWITCH CASE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  if(area==0 && roomType ==14){
    roomInv = ["Hidden Chest","y0Gc0000",1,1,[lootcall.lootA(client, section, roomLoot)]]
  }
  else if(area==0 && roomType ==12){
    roomInv[0] = ["Chest","y0Gc0000",1,1,[lootcall.lootB(client, section, roomLoot)]]
  }
  else if(area == 1){
    if(section == 0 && roomType == 3){
      roomInv[0] = ["Dungeon Chest","y0Gc0000",1,1,[lootcall.lootC(client, section, roomLoot)]]
    }
    else if(section == 1 && roomType == 5){
      roomInv[0] = ["Dungeon Chest","y0Gc0000",1,1,[lootcall.lootB(client, section, roomLoot)]]
    }
    else if(section == 2 && roomType == 5){
      roomInv[0] = ["Dungeon Chest","y0Gc0000",1,1,[lootcall.lootC(client, section, roomLoot)]]
    }
    else if(section == 2 && roomType == 7){
      roomInv[0] = ["Dungeon Chest","y0Gc0000",1,1,[lootcall.lootB(client, section, roomLoot)]]
    }
    else if(section == 3 && roomType == 5){
      roomInv[0] = ["Dungeon Chest","y0Gc0000",1,1,[lootcall.lootB(client, section, roomLoot)]]
    }
    else if(section == 3 && roomType == 7){
      roomInv[0] = ["Dungeon Chest","y0Gc0000",1,1,[lootcall.lootB(client, section, roomLoot)]]
    }
    else if(section == 3 && roomType == 9){
      roomInv[0] = ["Dungeon Chest","y0Gc0000",1,1,[lootcall.lootA(client, section, roomLoot)]]
    }
  }

let occ = [];

var output = [roomType,roomLoot,roomName,false,occ,roomInv];
return output;

}
//generate an AREA

function areaGen(client, section) {
  //rolls a random number to be the selected area from a table
  let area = areaTable[dubs(4)];
  let roomNum = roomCount[section][area];
  let z= [area,roomNum,[]];
  let k;
  for(k = 0; k < roomNum; k++){
    z[2].push(roomGen(client, area, section, k));
  }
  return z;
}


//function creates a list of random items to populate player house

exports.preItem = function() {
//declares random number
  let i = Math.floor(Math.random() * premadeNames.length);
//retriveves info for item at 'i'
  let item = [premadeNames[i],premadeCodes[i],1,1,[]]
  return item;
}
//generates sections by calling on other functions
exports.landSecInit = function(client, section) {
  //xy = [xy[]]
  //s1 =[[x[]]]
  let i;
  let xy = [];
  for(i = 0; i < 11; i++){
    let y = [];
    let j;
    for(j = 0; j <11; j++){
      y.push(areaGen(client, section))
    }
    xy.push(y);
  }
  return xy;

}
//creates a random list of characters that can be used in a captcha code
exports.ranChar = function(client, x) {
  let i;
  let string = "";
  for (i=0; i < x; i++){
    string += client.captchaCode[Math.floor(Math.random()*62)+2]
  }
  return string;
}
//test if player is registered
exports.regTest = function(client, message, target) {

  try {
    if(client.playerMap.get(message.guild.id.concat(target.id),"alive")==false){

      return false;
    }
    else{

      return true;
    }
  }
  catch(err){

    return false;
  }
}
//test if potential client is registered
exports.clientTest = function(client, message, target) {

  try {
    if(client.playerMap.get(message.guild.id.concat(target),"alive")==false){

      return false;
    }
    else{

      return true;
    }
  }
  catch(err){

    return false;
  }
}


exports.accessSpreasdsheet = async function(client, message, charSheet) {
  var doc = new GoogleSpreadsheet(charSheet);
  await doc.useServiceAccountAuth(client.creds);
  const info = await doc.loadInfo();
  const sheet = doc.sheetsByIndex[1];

  await sheet.loadCells('C5:Y32'); // loads a range of cells

  const str = sheet.getCellByA1('W16');

  str.value=3;
  await sheet.saveUpdatedCells();
  message.channel.send("done")
}

exports.regImport = async function(client, charSheet) {
  var doc = new GoogleSpreadsheet(charSheet);
  await doc.useServiceAccountAuth(client.creds);
  const info = await doc.loadInfo();
  var sheet = doc.sheetsByIndex[1];
  const list = ["L5","J7","W7","H10","S10","W16","W19","W22","W25","W28","W31"];

  await sheet.loadCells(list); // loads a range of cells

  var importsheet = [sheet.getCellByA1(list[0]).value,sheet.getCellByA1(list[1]).value,sheet.getCellByA1(list[2]).value,sheet.getCellByA1(list[3]).value,sheet.getCellByA1(list[4]).value,sheet.getCellByA1(list[5]).value,sheet.getCellByA1(list[6]).value,sheet.getCellByA1(list[7]).value,sheet.getCellByA1(list[8]).value,sheet.getCellByA1(list[9]).value,sheet.getCellByA1(list[10]).value]



  return importsheet;
}
//check if player has a computer in rooms
exports.compTest = function(client, message, charid, room, currentInv) {

    let i;
    //if first value in array is true, it means there is a computer, if both are true, it means the computer has sburbed installed
    let comp = [false,false];


    for(i=0; i < room[5].length; i++) {

      if(client.trait1[client.codeCypher[2][client.captchaCode.indexOf(room[5][i][1].charAt(2))]] == "COMPUTER" || client.trait2[client.codeCypher[3][client.captchaCode.indexOf(room[5][i][1].charAt(3))]] == "COMPUTER") {
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
      if(client.trait1[client.codeCypher[2][client.captchaCode.indexOf(currentInv[i][1].charAt(2))]] == "COMPUTER" || client.trait2[client.codeCypher[3][client.captchaCode.indexOf(currentInv[i][1].charAt(3))]] == "COMPUTER"){
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



//alchemy -- || takes lowest && takes highest
//  1<A<a<1
//  0-11  12-37  38-63

exports.oror = function(client, item1, item2){

  let code1 = [item1[1].charAt(0),item1[1].charAt(1),item1[1].charAt(2),item1[1].charAt(3),item1[1].charAt(4),item1[1].charAt(5),item1[1].charAt(6),item1[1].charAt(7)];
  let code2 = [item2[1].charAt(0),item2[1].charAt(1),item2[1].charAt(2),item2[1].charAt(3),item2[1].charAt(4),item2[1].charAt(5),item2[1].charAt(6),item2[1].charAt(7),];

  let tier;
  let i;
  let char1;
  let char2;
  if(code1 == code2){
    return item1;
  }
  let coderes = ["/","/","/","/","/","/","/","/"]
  for(i=0;i<8;i++){
    if(code1[i]=="/"){
      coderes[i]=code2[i];
    } else {
      char1 = client.captchaCode.indexOf(code1[i]);
      char2 = client.captchaCode.indexOf(code2[i]);
      //if character is a number
      if(char1   <   12){

        if(char2   <   12){
          //same case

          if(char1 < char2){
            coderes[i]=code1[i];
          } else {
            coderes[i]=code2[i];
          }

        }
        else if(char2   <   38){
          //2 is greater than

          coderes[i]=code1[i]
        }
        else {
          //2 is less than
          coderes[i]=code2[i]
        }

      //if character is A
      } else if(char1   <   38){

        if(char2   <   12){
          //less than
          coderes[i]=code2[i]
        }
        else if(char2   <   38){
          //same case
          if(char1 < char2){
            coderes[i]=code1[i];
          } else {
            coderes[i]=code2[i];
          }
        }
        else {
          //greater than
          coderes[i]=code1[i]
        }


      //if character is a
      } else {
        if(char2   <   12){
          //greater than
          coderes[i]=code1[i]
        }
        else if(char2   <   38){
          //less than
          coderes[i]=code2[i]
        }
        else {
          //same case
          if(char1 < char2){
            coderes[i]=code1[i];
          } else {
            coderes[i]=code2[i];
          }
        }

      }
    }
  }
  if(coderes[0]=="/"){
    tier=0;
  }else if(code1[0]==code2[0]){
    if(item1[2]>item2[2]){
      tier = item1[2] + 1;
    }else{
      tier = item2[2] + 1;
    }
  }else if(coderes[0]==code1[0]){
    tier = item1[2] + 1;
  } else {
    tier = item2[2] + 1;
  }
  if(tier > 16){
    var resItem = ["ALCHEMIZED ITEM",`${coderes[0]}${coderes[1]}${coderes[2]}${coderes[3]}${coderes[4]}${coderes[5]}${coderes[6]}${coderes[7]}`,16,1,[]];

    return resItem;
  } else {
  var resItem = ["ALCHEMIZED ITEM",`${coderes[0]}${coderes[1]}${coderes[2]}${coderes[3]}${coderes[4]}${coderes[5]}${coderes[6]}${coderes[7]}`,tier,1,[]];

  return resItem;
}
}

//combines 2 items and returns the result
exports.andand = function(client, item1, item2){

  let code1 = [item1[1].charAt(0),item1[1].charAt(1),item1[1].charAt(2),item1[1].charAt(3),item1[1].charAt(4),item1[1].charAt(5),item1[1].charAt(6),item1[1].charAt(7)];
  let code2 = [item2[1].charAt(0),item2[1].charAt(1),item2[1].charAt(2),item2[1].charAt(3),item2[1].charAt(4),item2[1].charAt(5),item2[1].charAt(6),item2[1].charAt(7),];

  let tier;
  let i;
  let char1;
  let char2;
  if(code1 == code2){
    return item1;
  }
  let coderes = ["/","/","/","/","/","/","/","/"]
  for(i=0;i<8;i++){
    if(code1[i]=="/"){
      coderes[i]=code2[i];
    } else {
      char1 = client.captchaCode.indexOf(code1[i]);
      char2 = client.captchaCode.indexOf(code2[i]);
      //if character is a number
      if(char1   <   12){

        if(char2   <   12){
          //same case

          if(char1 < char2){
            coderes[i]=code2[i];
          } else {
            coderes[i]=code1[i];
          }

        }
        else if(char2   <   38){
          //2 is greater than

          coderes[i]=code2[i]
        }
        else {
          //2 is less than
          coderes[i]=code1[i]
        }

      //if character is A
      } else if(char1   <   38){

        if(char2   <   12){
          //less than
          coderes[i]=code1[i]
        }
        else if(char2   <   38){
          //same case
          if(char1 < char2){
            coderes[i]=code2[i];
          } else {
            coderes[i]=code1[i];
          }
        }
        else {
          //greater than
          coderes[i]=code2[i]
        }


      //if character is a
      } else {
        if(char2   <   12){
          //greater than
          coderes[i]=code2[i]
        }
        else if(char2   <   38){
          //less than
          coderes[i]=code1[i]
        }
        else {
          //same case
          if(char1 < char2){
            coderes[i]=code2[i];
          } else {
            coderes[i]=code1[i];
          }
        }

      }
    }
  }
  if(coderes[0]=="/"){
    tier=0;
  }else if(code1[0]==code2[0]){
    if(item1[2]>item2[2]){
      tier = item1[2] + 1;
    }else{
      tier = item2[2] + 1;
    }
  }else if(coderes[0]==code1[0]){
    tier = item1[2] + 1;
  } else {
    tier = item2[2] + 1;
  }

  var resItem = ["ALCHEMIZED ITEM",`${coderes[0]}${coderes[1]}${coderes[2]}${coderes[3]}${coderes[4]}${coderes[5]}${coderes[6]}${coderes[7]}`,tier,1,[]];

  return resItem;
}


//used to give xp to a player and level them up
exports.xpGive = function(client, message, xp, target){
  let curXp = client.playerMap.get(target,"xp");
  let curRung = client.playerMap.get(target,"rung");
  let name = client.playerMap.get(target,"name");

  let newXp = curXp+xp;

  client.playerMap.set(target, newXp,"xp");

  client.message.send(`${name} got ${xp} XP and now has ${newXp} XP!`);

  if(newXp >= client.xpReq[curRung+1]){

    let stats = client.playerMap.get(target,"stats");
    let curVit = client.playerMap.get(target,"vit");
    let curCache = client.cache[curRung];

    let gvGain = 0;
    let i;

    for(i = curRung; newXp >= client.xpReq[i+1]; i++){
      gvGain += (client.gvGet[i+1] + (stats[1]*(client.gvGet[i+1] / 5)));
    }
    let newVit = curVit+gvGain;

    client.playerMap.set(target, newXp,"xp");

    let congrats = new client.Discord.MessageEmbed()
    .setTitle(`${name} ASCENDED THEIR ECHELADDER!`)
    .addField("RUNG",`${curRung} + ${i - curRung}`,true)
    .addField("GEL VISCOSITY",`${client.emojis.cache.get('721452682115809454')} ${curGel} + ${gvGain}`)
    .addField("GRIST CACHE", `${client.emojis.cache.get('715632438751002654')} ${curCache} + ${client.cache[i] - curCache}`)
    .setThumbnail(target.avatarURL());
    message.channel.send(congrats);
  }
}

exports.combineArgs = function(args) {
  var i=1;
  var output ="";
  while(args[i]){
    output = output + args[i]+" ";
    i++
  }
  return output;
}
