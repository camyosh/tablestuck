
//const GoogleSpreadsheet = require('google-spreadsheet');
//const { promisify } = require('util');
//const { GoogleSpreadsheet } = require('google-spreadsheet');
const lootcall = require("./lootcall.js");

//declaring list of premade items and their codes (there are 102 entries)

//const premadeNames = ["COMPUTER","LAPTOP","DESK","BED","CELLPHONE","FLAT SCREEN TV","CRT TV","LAMP","ANTIQUE LAMP","POTTED PLANT","REMOTE","COFFEE TABLE","COUCH","BOARD GAME","DICE","WOODEN DUCK","WIZARD STATUE","HARLEQUIN","DECORATIVE KATANA","GAME CONSOLE","YOYO","FANCY SANTA","TOASTER","FORK","STEAK KNIFE","BUTTER KNIFE","OVEN","FRIDGE","ICE","ROCKET-POP","CANDY CORN","FRUIT GUSHERS","STEAK ","LUNCH MEAT","HOT DOG","BREAD","SALAD","BOOKSHELF","DESK","ROLLING CHAIR","BOOK","PEN","PENCIL","PAINTBRUSH","NEWSPAPER","STAPLER","DECK OF CARDS","READING GLASSES","HAT","COMPUTER","OLD COMPUTER","CANDLE","INK","GLUE","UMBRELLA","SAFE","MOUNTED DEER HEAD","HUNTING RIFLE","SHOTGUN","REPLICA SWORD","PISTOL","KNITTING NEEDLES","YARN","TOILET PAPER","TOOTHBRUSH","TOOTHPASTE","SHAVING CREAM","RAZOR","TIM ALLEN BUST","BROOM","SPRING","WASHER","DRYER","POWER COORD","FLASHLIGHT","IRON","HAT","SHOES","POGO RIDE","SHOVEL","ROCK","LAWN GNOME","BASKETBALL","SOCCER BALL","HOCKEY STICK","HOCKEY PUCK","BASEBALL BAT","BASEBALL","SWINGSET","MAILBOX","HAMMER","NAIL","SAW","WRENCH","SCREWDRIVER","PLIERS","CROWBAR","AXE","ROPE","FIREWORKS","CHAINSAW","SLEDGEHAMMER"]

//const premadeCodes = ["yQiKRZH8","02iKkCLD","yLWjNwPf","yVaW3ohX","0oiXldWZ","yQASN0xP","ycAQBint","yPAVQcF7","yiUNVJPh","0nC2u8jL","0qWDawXo","yOHU3FhE","yd2FVRHK","0v2fHxfR","Gt2W9naV","xnHHGKpC","xRHbrDH4","84WHmOSf","4rWf881p","0EeKZWAY","YuWHpv1O","N32bdOcn","0reHWNK3","6XWH1aeL","frCHRunB","fBW2FaL2","yAcFDFTD","y9dUU1qy","0JdWv89f","0hYdl7RH","0DYWOQes","08YWJ3ZR","0kZjzFvm","0aKHs80B","0kZ3H55x","0zXWjRYw","0DI3Mt9D","yukjZvcc","yLWjNwPf","yv2WzjUz","XGW2rZ2j","bC22tRFG","bn2Hz4nL","cqHHLUk6","XhHHoMUg","ZBWW1w1j","rdW2VmtN","vSWWcavE","uNWWBSDV","yQiKRZH8","yeiQxD2s","0M8X8qz7","0yWYiwUY","0lbW2ypQ","OgWH3jZf","y4kFp303","xkH2Mece","5MWWyGJT","akWW5Vzw","4rHW0tYH","9yHHBjj5","382WRQrS","hvWIUwQt","MhWIw0tr","cg23mfhd","0UbH2NUT","097WToWS","p7RX1S44","xRaNeE1H","P3HW2sUq","0rLW5L4P","yT9UObs7","y58UrxP8","hQAWLcfb","QcPk0GU1","0fN2sDPx","uNWWBSDV","tCWH7NQ8","zuLB08Ct","gHHWT83p","mIHWgzkD","xFWMZ5R0","lg6XBeTB","liL35T9G","nZWH7nce","ll9HJ9e5","I522DfyR","lmH2Qox9","yrHWPKQ6","yHkIqlBC","2Z2WCHwF","VLHXhBj6","RTgW5zvi","SMWW5eW6","TWWWnvcB","UZ2HE2Oe","WwH2uezj","iTgWA1rs","hbWHfFP1","0wDdKKDf","Ef2W6ibV","2T2Fq1ms"]

const premadeNames = ["LAPTOP","BRIEFCASE","FIREWORK","BREAD","GUSHERS","STEAK","SPRING","GLUE","CANDLE","ICE","BATTERY","PIN","DOORSTOPPER","SQUIDDLE","LOLLIPOP","DIAMOND","JPEG","BOW","OUIJA BOARD","VAMPIRE TEETH","FROG","CAT","DOG","SHATTERED GLASS","HARLEQUIN STATUE","CRYSTAL BALL","SMUPPET","MICROSCOPE","WEIGHT","FEATHER","FAN","PLANT","COIN","CLOCK","LOCKET","HORN","HEIRLOOM","ERASER","YARD STICK","BRAIN","RELIGIOUS SYMBOL","SKULL","ROSE","URANIUM ROD","PIPE","CUEBALL","TIE","POKER CHIP","PILLOW","BRICK","YOGA MAT","WHOOPIE CUSHION","TABLESTUCK GUIDE","DERSE FLAG","PROSPIT FLAG","HAMMER","KNITTING NEEDLES","KATANA","HUNTING RIFLE","FORK","GLOVES","PUPPET","HANDGUN","LANCE","THROWING STAR","SICKLE","CLAWS","CHAINSAW","CANE","DICE","BOW","BASEBALL BAT","WAND","SPEAR","STUFFED RABBIT","NEWSPAPER","FANCY SANTA","UMBRELLA","BROOM","FLASHLIGHT","SAW","MONKEY WRENCH","SCREWDRIVER","PLIERS","NAIL","CROWBAR","BOOK","YOYO","STAPLER","SHOTGUN","PENCIL","PAINTBRUSH","SCYTHE","SCISSORS","KNIFE","SHOVEL","ROPE","AXE","DART","CHAIN","BASKETBALL","ROCK","HOCKEY STICK","TRIDENT","RAZOR","PAPER FAN","PLAYING CARDS"]

const premadeCodes = ["022x86AC","0O3wDB5A","0kcN448k","0d4vbbCh","0R5uHk7p","0b5uRUEo","05KfTWf7","0bLeYaVh","0g7sCIJN","0x8rHRe5","0E9qJ5gZ","0fAp9kC5","0IBoW1cS","0yiH5aWS","0?lEVS92","0AhI4kDM","00Cncccc","0qDmqTJY","0CElTWag","0SQZEIGn","0cRYI0I3","0XFk91Ob","0NGjEeT4","08HikHMk","0sSXFv2k","0XTWLgVo","04UV6i6t","0QVUllCT","0rWTMnEj","0VXSAoCH","0vmDlhTn","0PnCGh8J","0hoBRhAJ","0qpAZ19O","0iq9Q9Mf","0dr8JvTd","0Ms7up0J","0Nt6EPpm","02u5L1eq","05v4gERn","0sw3SZbv","0yx2n98N","0zbOHlVI","0oeL7hiB","0CfKnb6I","0JkFhQkO","0gJg8X0c","0IdMFWF7","0tIhvR2a","0ePaPkgW","0HaPMeF3","0AgJ1ZIp","0jjGRj6g","0OZQK0AW","0PYResv6","2K0zO1pY","3J0z0lqF","4H0zK0eE","5A0zdU0L","6l0zE9H1","740z0CUT","890zEsUj","9A0zK0W5","AU0zhsV0","BH0z1lSP","Cf0zp0MW","D60zKW1m","Ea0z1e8Z","FF0z1koc","GI0zH9E8","Hz0z0qiI","IP0zq03R","Jd0zMqEY","Kh0zfZ1G","LB0zIoDi","Ma0zX71X","N40zDmTk","OC0zcANq","PP0z1dho","Q20zJb81","Rf0zSd1i","Sw0z91Ji","Tc0zhA1N","Uq0zpK30","V50zl1kb","Wq0zJF4M","Xt0zP8KJ","Yc0zsdZ0","Z60z0FHC","ak0z0ep0","bb0zu80I","cK0z15Q3","dr0zpea1","e90zLVcl","f50z0hTI","gH0zi9Gx","hD0zCqU1","iA0z560e","jv0z0Lg5","k50zCq1U","lm0zK1Jl","mZ0zTjk1","nt0z1F2o","o90zipZm","ph0zpojb","qV0zHM1j","r40zEY90"]

//bedroom,living room, study, kitchen, bathroom, yard, shed

function dubs(x){
  return Math.floor(Math.random() * x) + Math.floor(Math.random() * x);
}

exports.dmcheck = function(client,message){
try{

  if(message.member.roles.cache.some(role => role.name.toLowerCase() === 'dm')||message.member.roles.cache.some(role => role.name.toLowerCase() === 'author')){
    return true;
  }else{
    return false;
  }
}catch(err){
  return false;
}
}

//TODO: make experience and boondollars gained actually track what they say
exports.actionCheck = function(client, message, score){
try{
  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  let curCount = client.charcall.allData(client,userid,charid,"act");
  let name = client.charcall.allData(client,userid,charid,"name");
  let leaderAdd = message.guild.id+"mediumlead";
  let key = "";
//curCount++;
switch(score){
  case "alchemized":
    key = "itemsAlchemized"
    break;
  case "tile":
    key = "tilesDiscovered"
    break;
  case "underling":
    key = "underlingsDefeated"
    break;
  case "player":
    key = "playersDefeated"
    break;
  case "boss":
    key = "bossesDefeated"
    break;
  case "item":
    key = "itemsCaptchalogued"
    break;
}
//if the target doesn't have a score for the action being incremented, return.
if(client.charcall.allData(client,userid,charid,key)=="NONE"){
  return;
}
increase = client.charcall.allData(client,userid,charid,key);
increase++;
client.charcall.setAnyData(client,userid,charid,increase,key);
if(increase>client.landMap.get(leaderAdd,key)[1]){
  client.landMap.set(leaderAdd,[name,increase],key);
}

let b = client.charcall.allData(client,userid,charid,"b");
let xp = client.charcall.allData(client,userid,charid,"xp");
if(b>client.landMap.get(leaderAdd,"boondollarsGained")[1]){
  client.landMap.set(leaderAdd,[name,b],"boondollarsGained");
}
if(xp>client.landMap.get(leaderAdd,"experienceGained")[1]){
  client.landMap.set(leaderAdd,[name,xp],"experienceGained");
}

if(curCount!="NONE"&&curCount>=client.limit&&client.limit!=0){

  let tiles = client.charcall.allData(client,userid,charid,"tilesDiscovered");
  let alchemized = client.charcall.allData(client,userid,charid,"itemsAlchemized");
  let underlings =  client.charcall.allData(client,userid,charid,"underlingsDefeated");
  let players =  client.charcall.allData(client,userid,charid,"playersDefeated");
  let bosses = client.charcall.allData(client,userid,charid,"bossesDefeated");
  let items = client.charcall.allData(client,userid,charid,"itemsCaptchalogued");

  message.channel.send("That was your last action in the tournament, here's your final stats:");
  let stats = new client.MessageEmbed()
  .setTitle(`**HERE'S HOW YOU DID**`)
  .addField(`**EXPERIENCE GAINED**`,`${xp}`,true)
  .addField(`**BOONDOLLARS GAINED**`,`${b}`,true)
  .addField(`**TILES DISCOVERED**`,`${tiles}`,true)
  .addField(`**ITEMS ALCHEMIZED**`,`${alchemized}`,true)
  .addField(`**ITEMS CAPTCHALOGUED**`,`${items}`,true)
  .addField(`**UNDERLNGS DEFEATED**`,`${underlings}`,true)
  .addField(`**PLAYERS DEFEATED**`,`${players}`,true)
  .addField(`**BOSSES DEFEATED**`,`${bosses}`,true)

  message.channel.send({embed:[stats]});
  //enter stat stuff here
}
  //client.playerMap.set(charid,curCount,"act")
}catch(err){
}
}

exports.tick = function(client, message){

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  let curCount = client.charcall.allData(client,userid,charid,"act");
  let leaderAdd = message.guild.id+"mediumlead";
  //anything without an action counter gets bounced here
  if(curCount=="NONE")
    return;
  curCount++;
  client.funcall.sleepHeal(client,charid);
  let name = client.charcall.allData(client,userid,charid,"name");
  let b = client.charcall.allData(client,userid,charid,"b");
  let xp = client.charcall.allData(client,userid,charid,"xp");
  if(b>client.landMap.get(leaderAdd,"boondollarsGained")[1]){
    client.landMap.set(leaderAdd,[name,b],"boondollarsGained");
  }
  if(xp>client.landMap.get(leaderAdd,"experienceGained")[1]){
    client.landMap.set(leaderAdd,[name,xp],"experienceGained");
  }

  if(curCount==client.limit&&client.limit!=0){

    let tiles = client.playerMap.get(charid,"tilesDiscovered");
    let alchemized = client.playerMap.get(charid,"itemsAlchemized");
    let underlings =  client.playerMap.get(charid,"underlingsDefeated");
    let players =  client.playerMap.get(charid,"playersDefeated");
    let bosses = client.playerMap.get(charid,"bossesDefeated");
    let items = client.playerMap.get(charid,"itemsCaptchalogued");

    message.channel.send("That was your last action in the tournament, here's your final stats:");
    let stats = new client.MessageEmbed()
    .setTitle(`**HERE'S HOW YOU DID**`)
    .addField(`**EXPERIENCE GAINED**`,`${xp}`,true)
    .addField(`**BOONDOLLARS GAINED**`,`${b}`,true)
    .addField(`**TILES DISCOVERED**`,`${tiles}`,true)
    .addField(`**ITEMS ALCHEMIZED**`,`${alchemized}`,true)
    .addField(`**ITEMS CAPTCHALOGUED**`,`${items}`,true)
    .addField(`**UNDERLNGS DEFEATED**`,`${underlings}`,true)
    .addField(`**PLAYERS DEFEATED**`,`${players}`,true)
    .addField(`**BOSSES DEFEATED**`,`${bosses}`,true)

    message.channel.send({embed:[stats]});
    //enter stat stuff here
  }

  client.playerMap.set(charid,curCount,"act")
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

exports.preItem = function(client,room,quantity,list,gristList) {
//declares random number
let itemList = [];
let item;
if(isNaN(room)){
for(let j=0;j<quantity;j++){
  do{
    item = lootcall.itemGen(room,gristList);
  } while(itemList.includes(item[0]));
    list.push(item);
    itemList.push(item[0]);

}
} else {
  for(let j=0;j<quantity;j++){
    do{
      item = lootcall.lootGen(client,room);
    } while(itemList.includes(item[0]));
      list.push(item);
      itemList.push(item[0]);

  }
}
  return list;
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

/*

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

*/

//alchemy -- || takes lowest && takes highest
//  1<A<a<1
//  0-11  12-37  38-63

//|| false
//&& true

exports.alchemize = function(client, item1, item2, type){

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

    if(code1[i]=="/"||code1[i]=="#"||code1[i]=="@"){
      coderes[i]=code2[i];
    } else if(code2[i]=="/"||code2[i]=="#"||code1[i]=="@"){
      coderes[i]=code1[i];
    } else{
      char1 = client.captchaCode.indexOf(code1[i]);
      char2 = client.captchaCode.indexOf(code2[i]);

      switch(type){
        case "||":
          if(char1<char2){
            coderes[i]=code1[i];
          }else{
            coderes[i]=code2[i];
          }
        break;
        case "&&":
        if(char1>char2){
          coderes[i]=code1[i];
        }else{
          coderes[i]=code2[i];
        }
        break;
      }

    }


  }
  if(code1[0]==code2[0]){
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
    if(code1[i]=="/"||code1[i]=="#"){
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
  if(coderes[0]=="/"||coderes[0]=="#"){
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
    if(code1[i]=="/"||code1[i]=="#"){
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
  if(coderes[0]=="/"||coderes[0]=="#"){
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

  if(newXp >= client.xpReq(curRung+1)){

    let stats = client.playerMap.get(target,"stats");
    let curVit = client.playerMap.get(target,"vit");
    let curCache = client.cache(curRung);

    let gvGain = 0;
    let i;

    for(i = curRung; newXp >= client.xpReq(i+1); i++){
      gvGain += (client.gvGet(i+1) + (stats[1]*(client.gvGet(i+1) / 5)));
    }
    let newVit = curVit+gvGain;

    client.playerMap.set(target, newXp,"xp");

    let congrats = new client.MessageEmbed()
    .setTitle(`${name} ASCENDED THEIR ECHELADDER!`)
    .addField("RUNG",`${curRung} + ${i - curRung}`,true)
    .addField("GEL VISCOSITY",`${client.emojis.cache.get('721452682115809454')} ${curGel} + ${gvGain}`)
    .addField("GRIST CACHE", `${client.emojis.cache.get('715632438751002654')} ${curCache} + ${client.cache(i) - curCache}`)
    .setThumbnail(target.avatarURL());
    message.channel.send({embeds:[congrats]});
  }
}

exports.combineArgs = function(args,start) {

  var i=1;

  if(start!=undefined){
    i=start;
  }

  var output ="";
  while(args[i]){
    if(output.length>0){
      output+=" ";
    }
    output = output + args[i];
    i++
  }
  return output;
}

exports.gristCacheEmbed = function(client,sburbid) {
  //retrieve character's grist details
  const gristTypes = ["build","uranium","amethyst","garnet","iron","marble","chalk","shale","cobalt","ruby","caulk","tar","amber","artifact","zillium","diamond"];
  let rung = client.sburbMap.get(sburbid,"rung");
  let max;
  if(client.sburbMap.get(sburbid,`godtier`)){
    max = `♾️`
  } else {
    max = client.cache(rung);
  }
  let grist = client.sburbMap.get(sburbid,"grist");
  let name = client.sburbMap.get(sburbid,"name");
  let msg =``;
  let i;


  //loop to list all of a player's grist types and ammounts

  for(i=0;i<gristTypes.length;i++){
    msg += `${client.emojis.cache.get(client.grist[gristTypes[i]].emoji)} **${gristTypes[i].toUpperCase()} - ${grist[i]}**\n\n`
  }
  cachePrint = new client.MessageEmbed()
  .setTitle(`**${name.toUpperCase()}'S GRIST**`)
  .addField(`**GRIST CAP**`,`**${max}**`)
  .addField("**GRIST CACHE**",msg);
  return cachePrint;
}

exports.chanMsg = function(client, target, msg, embed){
  if(!msg)
    return;
    if(!client.charcall.controlCheck(client,target)){
      return;
    } else {
      controlList = client.charcall.charData(client,target,"control");
      for(let i=0;i<controlList.length;i++){
        if(embed!=undefined){
          if(msg=="NONE"){
            client.channels.cache.get(client.charcall.allData(client,controlList[i],target,"channel")).send({embeds:[embed]});
          } else {
            client.channels.cache.get(client.charcall.allData(client,controlList[i],target,"channel")).send(msg,{embeds:[embed]});
          }
        }else{
        client.channels.cache.get(client.charcall.allData(client,controlList[i],target,"channel")).send(msg);
      }
      }
    }
  }
/*try{

  let charid;
  if(client.sburbMap.get(target,"dreamer")){
    charid = client.sburbMap.get(target,"dreamingID");
  }else{
    charid = client.sburbMap.get(target,"wakingID");
  }



  if(client.sburbMap.has(target,"channel")){
    if(embed!=undefined){
    client.channels.cache.get(client.sburbMap.get(target,"channel")).send(msg,embed);
    }else{
    client.channels.cache.get(client.sburbMap.get(target,"channel")).send(msg);
  }
  }
}catch(err){
  console.log("Error occured with the chanMsg command!");
  console.log(err);
}

  let charid;
  if(client.sburbMap.get(target,"dreamer")){
    charid = client.sburbMap.get(target,"dreamingID");
  }else{
    charid = client.sburbMap.get(target,"wakingID");
  }

  let possess = client.playerMap.get(charid,"control");

  for(let i=0;i<possess.length;i++){
    if(embed!=undefined){
    client.channels.cache.get(client.playerMap.get(possess[i],"channel")).send(msg,embed);
  }else{
    client.channels.cache.get(client.playerMap.get(possess[i],"channel")).send(msg);
  }
  }

} */

exports.sleepHeal = function(client,charid){
  userid = client.charcall.charData(client,charid,"control");
  let target;
  if(client.charcall.allData(client,userid,charid,"dreamer")){
    target = client.charcall.allData(client,userid,charid,"wakingID");
  } else {
    target = client.charcall.allData(client,userid,charid,"dreamingID");
  }
 if(target=="NONE"){
   return;
 }
    let vit = client.charcall.charData(client,target,"vit");
    let gel = client.charcall.allData(client,userid,target,"gel");

    if(vit<gel){
      let heal = 5;
      if(client.traitcall.traitCheck(client,target,"CUSHIONED")[1]){
        heal*=4;
      }else if(client.traitcall.traitCheck(client,target,"CUSHIONED")[0]){
        heal*=2;
      }
      if(vit+heal>gel){
        client.charcall.setAnyData(client,userid,target,gel,"vit");
      }else{
        client.charcall.setAnyData(client,userid,target,vit+heal,"vit");
      }
    }
  }


exports.move = function(client,message,charid,local,target,mapCheck,msg){

  let targSec = client.landMap.get(target[4],target[0]);
  var occset = [(client.charcall.npcCheck(client,charid)?false:true),charid];
  var userid = message.guild.id.concat(message.author.id);
  if(local[0]==target[0]&&local[4]==target[4]){

    targSec[local[1]][local[2]][2][local[3]][4].splice(targSec[local[1]][local[2]][2][local[3]][4].findIndex(occpos => occpos[1] === occset[1]),1);

  } else {

    let sec = client.landMap.get(local[4],local[0]);

    sec[local[1]][local[2]][2][local[3]][4].splice(sec[local[1]][local[2]][2][local[3]][4].findIndex(occpos => occpos[1] === occset[1]),1);

    client.landMap.set(local[4],sec,local[0]);

  }

    targSec[target[1]][target[2]][2][target[3]][4].push(occset);
//the &&false is to disable prospitians spawning for the tournament
    if(target[4]==message.guild.id+"medium"&&targSec[target[1]][target[2]][2][target[3]][4].length==1){
      switch(target[0]){
        case "dm":
          targSec[target[1]][target[2]][2][target[3]][4]=targSec[target[1]][target[2]][2][target[3]][4].concat(client.landcall.carSpawn(client,target,0,message.guild.id))
        break;
        case "d":
          targSec[target[1]][target[2]][2][target[3]][4]=targSec[target[1]][target[2]][2][target[3]][4].concat(client.landcall.carSpawn(client,target,0,message.guild.id))
        break;
        case "pm":
          targSec[target[1]][target[2]][2][target[3]][4]=targSec[target[1]][target[2]][2][target[3]][4].concat(client.landcall.carSpawn(client,target,1,message.guild.id))
        break;
        case "p":
          targSec[target[1]][target[2]][2][target[3]][4]=targSec[target[1]][target[2]][2][target[3]][4].concat(client.landcall.carSpawn(client,target,1,message.guild.id))
        break;
        case "bf":
          targSec[target[1]][target[2]][2][target[3]][4]=targSec[target[1]][target[2]][2][target[3]][4].concat(client.landcall.carSpawn(client,target,0,message.guild.id),client.landcall.carSpawn(client,target,1,message.guild.id));
        break;
      }
    }else if(target[4]!=message.guild.id+"medium"){
      if(targSec[target[1]][target[2]][2][target[3]][4].length==1){
    targSec =  client.strifecall.underSpawn(client,target,targSec,message.guild.id);
  }
  }
//for now, NPCs won't reveal new tiles.
  if(!client.charcall.npcCheck(client,charid)&&targSec[target[1]][target[2]][2][target[3]][3]==false){
    client.funcall.actionCheck(client,message,"tile")
    targSec[target[1]][target[2]][2][target[3]][3]=true;
  }

  client.funcall.tick(client,message);
  client.charcall.setAnyData(client,userid,charid,target,"local");
  client.landMap.set(target[4],targSec,target[0]);

  let occNew = targSec[target[1]][target[2]][2][target[3]][4];
  let location = targSec[target[1]][target[2]][2][target[3]][2];
  msg +=`**${location}**`

  if(occNew.length > 1){
    let occCheck = [false,false];
    for(let i=0;i<occNew.length;i++){
      if(occNew[i][0]==false){
        occCheck[0]=true;
      } else if(!occNew[i][1]==charid){
        occCheck[1]=true;
      }
    }


  }

  if(targSec[target[1]][target[2]][2].length>1){
    msg+=`\nThere are multiple rooms in this area!`;
  }

  async function moveEmbed(){
    var userid = message.guild.id.concat(message.author.id);
    var charid = client.userMap.get(userid,"possess");
    dex = targSec[target[1]][target[2]][2][target[3]][5];
    var attachment = await client.imgcall.sdexCheck(client,message,0,false,3,dex,dex.length,`${targSec[target[1]][target[2]][2][target[3]][2]} (>inspect)`);
    let occList = targSec[target[1]][target[2]][2][target[3]][4];

    let i;
    let list = ``;
    for(let i=0;i<10&&i<occList.length;i++){
      list+=`**[${i+1}] ${client.charcall.charData(client,occList[i][1],"name").toUpperCase()}** \n *${client.charcall.charData(client,occList[i][1],"type")}*\n\n`
    }

    var listEmbed;
    var files = [attachment];
    listEmbed = new client.MessageEmbed()
      .setTitle(`**MOVING TO ${targSec[target[1]][target[2]][2][target[3]][2]}**`)
      .addField(`**ALERTS**`,msg)
      .addField(`**ROOM**`,`**${targSec[target[1]][target[2]][2][target[3]][2]}**`,true)
      .addField(`**PAGE**`,`**1**`,true)
      .addField(`**CURRENT OCCUPANTS** (>list)`,list)
      .setImage(`attachment://actionlist.png`);
    if(mapCheck){
      miniMap = await client.landcall.drawMap(client,message,true);
      files.push(miniMap);
      listEmbed.setThumbnail(`attachment://landmap.png`);
    }
      client.channels.cache.get(client.charcall.allData(client,userid,charid,"channel")).send({embeds:[listEmbed], files:files});

      let checkQuest = client.questcall.checkQuest(client,userid,charid,occList);
      if(checkQuest[0]>0){
        let qfiles = [];
        let qattachement;
        for(let i=0;i<checkQuest[0];i++){
          qattachment = await client.diocall.dialogue(client,checkQuest[1][i]);
          qattachment.name = `dialogue${i}.png`
          qfiles.push(qattachment);
        }
        if(checkQuest[2]>0){
          let curBoon = client.charcall.allData(client,userid,charid,"b");
          let embed = new client.MessageEmbed()
          .setTitle(`**${client.charcall.charData(client,charid,"name")}** gained BOONDOLLARS!`)
          .addField(`**BOONDOLLARS**`,`${client.emojis.cache.get('735664076180422758')} ${curBoon} + ${checkQuest[2]}= **${curBoon+checkQuest[2]}**`,true);
          client.charcall.setAnyData(client,userid,charid,curBoon+checkQuest[2],"b");
          console.log(embed);
          client.channels.cache.get(client.charcall.allData(client,userid,charid,"channel")).send({embeds:[embed], files:qfiles});
        }else{
          client.channels.cache.get(client.charcall.allData(client,userid,charid,"channel")).send({files:qfiles});
        }
      }

  }

  let name = client.charcall.charData(client,charid,"name");

  for(let i=0;i<occNew.length;i++){
    try{
      if(occNew[i][1]!=charid){
      client.funcall.chanMsg(client,occNew[i][1],`**${name.toUpperCase()}** has entered the room!`)
    }

    }catch(err){
      console.log(err);
    }
  }
  moveEmbed();
  setTimeout(function(){
    client.tutorcall.progressCheck(client,message,8);
    client.tutorcall.progressCheck(client,message,9)
  },1500);
}
function dreamCheck(client,target,local){

  let targLocal = client.charcall.charData(client,target,"local");

  if(targLocal[0]===local[0]&&targLocal[1]===local[1]&&targLocal[2]===local[2]&&targLocal[3]===local[3]&&targLocal[4]===local[4]){
    return true;
  } else {
    return false;
  }
}
exports.dreamCheck =  function(client,target,local){
  return dreamCheck(client,target,local);
}
