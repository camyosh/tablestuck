const funcall = require("../modules/funcall.js");
//const { GoogleSpreadsheet } = require('google-spreadsheet');
const landcall = require("../modules/landcall.js");
//Command usage: >register @target
//This command creates a character sheet in the player database as well as a new land in the location database
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {

  var gristTypes = ["build","uranium","amethyst","garnet","iron","marble","chalk","shale","cobalt","ruby","caulk","tar","amber"]

//checks to see if the command user is Cam, as we don't want anyone else registering players for the tournament
  let charid = message.guild.id.concat(message.author.id);

if(!client.landMap.has(message.guild.id+"medium")){
let castlegen = [[0,0],[0,0]];

for(i=0;i<2;i++){
  for(j=0;j<2;j++){
  castlegen[i][j]=Math.floor(Math.random()*2)+(Math.floor(Math.random()*4)*3);
}
}
console.log(castlegen);
  let dreamMoon = client.landcall.moonGen(client,castlegen[0],castlegen[1]);

//chumhandle [charid,chumhandle]

  var medium = {
    playerList:[],
    npcCount:0,
    prototype:[],
    prospitList:[],
    derseList:[],
    dmList:[],
    handleList:[],
    castleLocal: castlegen[0],
    towerLocal: castlegen[1],
    p:dreamMoon[0],
    pm:dreamMoon[2],
    d:dreamMoon[1],
    dm:dreamMoon[3]
  }

  client.landMap.set(message.guild.id+"medium", medium);

}

//checks to see if the command user mentioned a target



  //declaring who the target to be registered is and their charid (The server id + the user id)
 let aspects = ["BREATH","LIFE","LIGHT","TIME","HEART","RAGE","BLOOD","DOOM","VOID","SPACE","MIND","HOPE"]
  let target = message.author;
  var occset = [true,charid];


  let playerList = client.landMap.get(message.guild.id+"medium","playerList");
  let handleList = client.landMap.get(message.guild.id+"medium","handleList");

  let chumhandle = message.author.username;

  if(!playerList.includes(charid)){
    playerList.push(charid);
    handleList.push([charid,chumhandle]);

    client.landMap.set(message.guild.id+"medium",playerList,"playerList");
    client.landMap.set(message.guild.id+"medium",handleList,"handleList");


  }else{
    let h;
    for(h=0;h<handleList.length;h++){
      if(handleList[h][0]==charid){
        chumhandle = handleList[h][1];
      }
    }
  }

  let randnum = Math.floor((Math.random() * 12));

  const defBedroom = funcall.preItem("bedroom",7,[]);

  const armorsets = [["CLOTHES", "sQ00m9Kn", 1, 1, []], ["CLOTHES", "sd1y1UGt", 1, 1, []], ["CLOTHES", "s4001jKQ", 1, 1, []], ["CLOTHES", "s500MEF3", 1, 1, []], ["CLOTHES", "sIy0llDd", 1, 1, []], ["CLOTHES", "sh11jXDH", 1, 1, []], ["CLOTHES", "sK0ydTnZ", 1, 1, []], ["CLOTHES", "sj10ZVxB", 1, 1, []], ["CLOTHES", "sY01t9oW", 1, 1, []], ["CLOTHES", "sl1yRSD8", 1, 1, []], ["CLOTHES", "sO1yjCtu", 1, 1, []], ["CLOTHES", "sD012ydM", 1, 1, []]];

  const def = [[[5,7,[
     [0,0,"BEDROOM",false,[occset],defBedroom],
     [0,0,"LIVING ROOM",false,[],funcall.preItem("living room",7,[])],
     [0,0,"STUDY",false,[],funcall.preItem("study",7,[["COMPUTER","yc2x2Esb",1,1,[]],["DESK","yO3wlREq",1,1,[["CAPTCHALOGUE CARD","11111111",1,4,[]]]]])],
     [0,0,"KITCHEN",false,[],funcall.preItem("kitchen",5,[["FRIDGE","yT3r7TKE",1,1,[["FRUIT GUSHERS","0L5upepo",1,2,[]],["STEAK","0k6tac2a",1,2,[]],["BREAD","0u4vNX4a",1,2,[]],["ICE","0x8rHRe5",1,4,[]]]]])],
     [0,0,"BATHROOM",false,[],funcall.preItem("bathroom",4,[])],
     [0,0,"YARD",false,[],funcall.preItem("yard",4,[["MAILBOX","yT3SpVgY",1,1,[["SBURB CLIENT","////////",1,1,[]],["SBURB SERVER","////////",1,1,[]]]]])],
     [0,0,"SHED",false,[],funcall.preItem("shed",8,[])]
   ]]]];


/*
  async function regImport() {
    var doc = new GoogleSpreadsheet(args[0]);
    await doc.useServiceAccountAuth(client.creds);
    const info = await doc.loadInfo();
    var sheet = doc.sheetsByIndex[1];
    const list = ["L5","J7","W7","H10","S10","W16","W19","W22","W25","W28","W31"];

    await sheet.loadCells(list); // loads a range of cells

    importsheet = [sheet.getCellByA1(list[0]).value,sheet.getCellByA1(list[1]).value,sheet.getCellByA1(list[2]).value,sheet.getCellByA1(list[3]).value,sheet.getCellByA1(list[4]).value,sheet.getCellByA1(list[5]).value,sheet.getCellByA1(list[6]).value,sheet.getCellByA1(list[7]).value,sheet.getCellByA1(list[8]).value,sheet.getCellByA1(list[9]).value,sheet.getCellByA1(list[10]).value]


  console.log(importsheet);
    //declaring the basic character sheet

  var charSheet = {
    name: importsheet[0],
    ping: target.id,
    channel: message.channel.id,
    sheet: args[0],
    handle: `${importsheet[1]} ${importsheet[2]}`,
    class: importsheet[3],
    aspect: importsheet[4],
    act:0,
    strife:false,
    pos:0,
    server:"NA",
    client:"NA",
    alive:true,
    local:["h",0,0,0,charid],
    deploy:[false,false,false,false,false],
    xp: 0,
    rung: 0,
    b: 0,
    bank: 0,
    vit: 100,
    gel: 100,
    stats:[importsheet[5],importsheet[6],importsheet[7],importsheet[8],importsheet[9],importsheet[10]],
    grist:[20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    port: 1,
    kinds:[],
    spec:[],
    modus: "STACK",
    cards:4,
    scards:2,
    sdex:[],
    equip:0,
    armor:[armorsets[randnum]]
  };

client.playerMap.set(charid,charSheet)
}

regImport();
  //declaring the basic land sheet
*/
  //random item - funcall.preItem()

  let prospitList = client.landMap.get(message.guild.id+"medium","prospitList");
  let derseList = client.landMap.get(message.guild.id+"medium","derseList");

  let lunarSway;
  let repDef=[0,0];

  if(prospitList.length==derseList.length){
    if(!Math.floor(Math.random()*2)){
      lunarSway="dm";
      repDef=[-10,10]
      derseList.push(charid);
    } else {
      lunarSway="pm";

      repDef=[10,-10]
      prospitList.push(charid);
    }
  }else if(prospitList>derseList){
    lunarSway="dm";
    repDef=[-10,10]
    derseList.push(charid);
  }else{
    lunarSway="pm";
    repDef=[10,-10]
    prospitList.push(charid);
  }

  client.landMap.set(message.guild.id+"medium",prospitList,"prospitList");
  client.landMap.set(message.guild.id+"medium",derseList,"derseList");

  let moonMap = client.landMap.get(message.guild.id+"medium",lunarSway);
  let towerLocal = client.landMap.get(message.guild.id+"medium","towerLocal");

  console.log(moonMap[towerLocal[0]])

  let towerRoom = moonMap[towerLocal[0]][towerLocal[1]][2].length;

  moonMap[towerLocal[0]][towerLocal[1]][2].push([0,0,`${message.author.username.toUpperCase()}'S DREAM TOWER`,false,[
    [true,charid]],defBedroom]);

  client.landMap.set(message.guild.id+"medium",moonMap,lunarSway);





  var charSheet = {
    name: message.author.username,
    ping: message.author.id,
    channel: message.channel.id,
    faction:"player",
    type:"player",
    act:0,
    lunarSway:lunarSway,
    strife:false,
    pos:0,
    server:"NA",
    client:"NA",
    alive:true,
    local:["h",0,0,0,charid],
    dreamlocal:[lunarSway,towerLocal[0],towerLocal[1],towerRoom,message.guild.id+"medium"],
    deploy:[false,false,false,false,false],
    xp: 0,
    rung: 0,
    b: 0,
    bank: 0,
    vit: 100,
    dreamvit: 100,
    gel: 100,
    grist:[20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    port: 1,
    dreamport: 1,
    kinds:[],
    dreamkinds:[],
    spec:[],
    dreamspec:[],
    modus: "STACK",
    dreammodus: "STACK",
    cards:4,
    dreamcards:4,
    scards:2,
    dreamscards:2,
    sdex:[],
    dreamsdex:[],
    equip:0,
    dreamequip:0,
    trinket:[],
    dreamtrinket:[],
    armor:[armorsets[randnum]],
    dreamarmor:[],
    itemsAlchemized:0,
    underlingsDefeated:0,
    tilesDiscovered:0,
    playersDefeated:0,
    bossesDefeated:0,
    itemsCaptchalogued:0,
    chumhandle:chumhandle,
    chumpic:message.author.avatarURL(),
    chumroll:[],
    pesterchannel:message.channel.id,
    prospitRep:repDef[0],
    derseRep:repDef[1],
    underlingRep:-1,
    playerRep:0
  };

client.playerMap.set(charid,charSheet);


//create pesterchum webhook

client.hookcall.hookCheck(client,message);



let gategen = [[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))]]
var gristSet = [gristTypes.splice(Math.floor((Math.random() * 12)+1),1)[0],gristTypes.splice(Math.floor((Math.random() * 11)+1),1)[0],gristTypes.splice(Math.floor((Math.random() * 10)+1),1)[0],gristTypes.splice(Math.floor((Math.random() * 9)+1),1)[0]]
client.landMap.set(charid,{grist: gristSet});

var s1 = landcall.landGen(client,0,gategen[0],message);
var s2 = landcall.landGen(client,1,gategen[0],message);
var s3 = landcall.landGen(client,2,gategen[0],message);
var s4 = landcall.landGen(client,3,gategen[0],message);

var land = {
    name: ["Stumps","Dismay"],
    aspect: aspects[Math.floor((Math.random() * 11))],
    grist: gristSet,
    enter:true,
    spent: 1000000,
    floors: 100000,
    gate: 7,
    gates:gategen,
    h:def,
    s1:s1[0],
    s1d:s1[1],
    s2:s2[0],
    s2d:s2[1],
    s3:s3[0],
    s3d:s3[1],
    s4:s4[0],
    s4d:s4[1]
}

//adds the charaacter sheet and land sheet to the database


client.landMap.set(charid,land)

message.channel.send(`${target} has been registered!`);
message.channel.send(`${message.author.username} stands in their bedroom. It just so happens that today, the 25th of July is the day of SAHCON! \n\nThank you for playing Tablestuck! For this game, you have been given completely randomized items throughout your house. If you are ever confused about how the bot functions or any of the commnands, use the >help command!\nIf at any point you die during this test, just use >register again to come back to life! This will reset your character, house and land entirely so only do this if you die or get softlocked!\n\nIf you're ever confused, feel free to use >help`);

}
