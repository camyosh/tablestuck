const funcall = require("../modules/funcall.js");
//const { GoogleSpreadsheet } = require('google-spreadsheet');
const landcall = require("../modules/landcall.js");
//Command usage: >register @target
//This command creates a character sheet in the player database as well as a new land in the location database
const strifecall = require("../modules/strifecall.js");

exports.run = async function(client, message, args){

const tourneyList = client.auth.list;
/*  if(!args[0]||!message.mentions.members.first()){
    message.channel.send("You have to ping a user");
    return;
  }*/

  if(client.limit != 0 && !tourneyList.includes(message.author.id)){
message.channel.send("You have not signed up for the tournament!");
return;
  }

  let channel = ``;
  let pesterchannel = ``;
  let channelCheck = false;
  var gristTypes = ["build","uranium","amethyst","garnet","iron","marble","chalk","shale","cobalt","ruby","caulk","tar","amber"]

//checks to see if the command user is Cam, as we don't want anyone else registering players for the tournament

  let charid = message.guild.id.concat(message.author.id);

if(!client.landMap.has(message.guild.id+"medium")){

  /*
let castlegen = [[0,0],[0,0]];

for(i=0;i<2;i++){
  for(j=0;j<2;j++){
  castlegen[i][j]=Math.floor(Math.random()*2)+(Math.floor(Math.random()*4)*3);
}
}
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
    transLocal:dreamMoon[dreamMoon.length-1],
    p:dreamMoon[0],
    pm:dreamMoon[2],
    d:dreamMoon[1],
    dm:dreamMoon[3],
    pmd:dreamMoon[4],
    pmd1:dreamMoon[5],
    pmd2:dreamMoon[6],
    dmd:dreamMoon[7],
    dmd1:dreamMoon[8],
    dmd2:dreamMoon[9],
    pc:dreamMoon[10],
    dc:dreamMoon[11],
    transList:[],
    transCount:0
  }

  client.landMap.set(message.guild.id+"medium", medium);

  */

  message.channel.send(`A session for this server has not been initialized! Do ${client.auth.prefix}initialize to fix this.`);
  return;
}

  if(client.playerMap.has(charid)){
    /*if(client.playerMap.get(charid,"timeOfReg") + 300000 > Date.now()){
      message.channel.send("You have to wait at least 5 minutes before registering again!");
      return;
    }*/

    if (client.limit != 0) {
      message.channel.send("You can not re-register during a tournament!");
      return;
    }

    channel = client.playerMap.get(charid,"channel");
    pesterchannel = client.playerMap.get(charid,"pesterchannel");

    channelCheck = true;

    try{
      client.channels.cache.get(channel).send(`Re-registering`);
    }catch(err){
      channelCheck=false;
    }


  }



let startTime = Date.now();
  console.log(`Start time is ${startTime}`);

//checks to see if the command user mentioned a target



  //declaring who the target to be registered is and their charid (The server id + the user id)
 let aspects = ["BREATH","LIFE","LIGHT","TIME","HEART","RAGE","BLOOD","DOOM","VOID","SPACE","MIND","HOPE"]
  let target = message.author;
  var occset = [true,charid];

  //console.log(`Retrieving player and handle list - ${Date.now() - startTime}`);

  let playerList = client.landMap.get(message.guild.id+"medium","playerList");
  let handleList = client.landMap.get(message.guild.id+"medium","handleList");

  //console.log(`Retrieved player and handle list - ${Date.now() - startTime}`);
/*
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
*/

  let chumhandle = message.author.username.split(" ").join("");

  let ab = chumhandle.substring(0,2).toUpperCase();

  let abCount = 0;
  let handleCount = 0;
  let index="NA";

  //console.log(`Checking every chumhandle to see if there are duplicates of the default chumhandle using a for() loop - ${Date.now() - startTime}`);

  for(i=0;i<handleList.length;i++){
    if(handleList[i][1].substring(0,chumhandle.length).toLowerCase()==chumhandle.toLowerCase()&&handleList[i][0]!=charid){
      handleCount++;
    }
    if(handleList[i].length<3){
      handleList[i].push(`${i}`);
    }
    if(handleList[i][2].substring(0,ab.length).toUpperCase()==ab&&handleList[i][0]!=charid){
    abCount++;
    }
    if(handleList[i][0]==charid){
      index = i;
    }
  }

  //console.log(`Finished for() loop - ${Date.now() - startTime}`);

  if(handleCount>0){
    chumhandle+=handleCount;
  }
  if(abCount>0){
    ab+=abCount;
  }

  if(index=="NA"){
    handleList.push([charid,chumhandle,ab]);
  }else{
    handleList[index]=[charid,chumhandle,ab];
  }

  if(!playerList.includes(charid)){
    playerList.push(charid);
  }

  //console.log(`Setting playerList and handleList - ${Date.now() - startTime}`);

  client.landMap.set(message.guild.id+"medium",playerList,"playerList");
  client.landMap.set(message.guild.id+"medium",handleList,"handleList");


  var gristSet = [];
  var sessionGrist = client.landMap.get(message.guild.id+"medium","gristCounter");
  for(let i=0;i<4;i++){
    gristSet.push(sessionGrist.splice(Math.floor(Math.random()*sessionGrist.length),1)[0]);
    if(sessionGrist.length<1){
      sessionGrist = ["uranium","amethyst","garnet","iron","marble","chalk","shale","cobalt","ruby","caulk","tar","amber"];
    }
  }
  client.landMap.set(message.guild.id+"medium",sessionGrist,"gristCounter");


  let randnum = Math.floor((Math.random() * 12));

  const defBedroom = funcall.preItem("bedroom",7,[["GLASSES","vh//QaFS",1,1,[]]],gristSet);

  const armorsets = [["CLOTHES", "sQ//m9Kn", 1, 1, []], ["CLOTHES", "sd//1UGt", 1, 1, []], ["CLOTHES", "s4//1jKQ", 1, 1, []], ["CLOTHES", "s5//MEF3", 1, 1, []], ["CLOTHES", "sI//llDd", 1, 1, []], ["CLOTHES", "sh//jXDH", 1, 1, []], ["CLOTHES", "sK//dTnZ", 1, 1, []], ["CLOTHES", "sj//ZVxB", 1, 1, []], ["CLOTHES", "sY//t9oW", 1, 1, []], ["CLOTHES", "sl//RSD8", 1, 1, []], ["CLOTHES", "sO//jCtu", 1, 1, []], ["CLOTHES", "sD//2ydM", 1, 1, []]];

  //console.log(`Generating player bedroom - ${Date.now() - startTime}`);

  const def = [[[5,7,[
     [[],[],"BEDROOM",false,[occset],defBedroom],
     [[],[],"LIVING ROOM",false,[],funcall.preItem("living",7,[],gristSet)],
     [[],[],"STUDY",false,[],funcall.preItem("study",7,[["COMPUTER","yc2x2Esb",1,1,[]],["DESK","yO3wlREq",1,1,[ ["CAPTCHALOGUE CARD","11111111",1,4,[]] ]]],gristSet)],
     [[],[],"KITCHEN",false,[],funcall.preItem("kitchen",5,[["FRIDGE","yT3r7TKE",1,1,[["FRUIT GUSHERS","0L5upepo",1,2,[]],["STEAK","0k6tac2a",1,2,[]],["BREAD","0u4vNX4a",1,2,[]],["ICE","0x8rHRe5",1,4,[]],["CAPTCHALOGUE CARD","11111111",1,2,[]]]]],gristSet)],
     [[],[],"BATHROOM",false,[],funcall.preItem("bathroom",4,[],gristSet)],
     [[],[],"YARD",false,[],funcall.preItem("yard",4,[["MAILBOX","yT3SpVgY",0,1,[["SBURB DISC","/QjGOZb7",1,1,[],"https://media.discordapp.net/attachments/808757312520585227/809997088665370634/SBURB_DISC.png"],["CAPTCHALOGUE CARD","11111111",1,2,[]]]]],gristSet)],
     [[],[],"SHED",false,[],funcall.preItem("shed",8,[],gristSet)]
   ]]]];

   //console.log(`Finished generating player bedroom - ${Date.now() - startTime}`);

/*
  async function regImport() {
    var doc = new GoogleSpreadsheet(args[0]);
    await doc.useServiceAccountAuth(client.creds);
    const info = await doc.loadInfo();
    var sheet = doc.sheetsByIndex[1];
    const list = ["L5","J7","W7","H10","S10","W16","W19","W22","W25","W28","W31"];

    await sheet.loadCells(list); // loads a range of cells

    importsheet = [sheet.getCellByA1(list[0]).value,sheet.getCellByA1(list[1]).value,sheet.getCellByA1(list[2]).value,sheet.getCellByA1(list[3]).value,sheet.getCellByA1(list[4]).value,sheet.getCellByA1(list[5]).value,sheet.getCellByA1(list[6]).value,sheet.getCellByA1(list[7]).value,sheet.getCellByA1(list[8]).value,sheet.getCellByA1(list[9]).value,sheet.getCellByA1(list[10]).value]


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

  //console.log(`Retrieving prospitList and derseList - ${Date.now() - startTime}`);

  let prospitList = client.landMap.get(message.guild.id+"medium","prospitList");
  let derseList = client.landMap.get(message.guild.id+"medium","derseList");

  //console.log(`Finsished retrieving prospitList and Derselist - ${Date.now() - startTime}`);

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
  }else if(prospitList.length>derseList.length){
    lunarSway="dm";
    repDef=[-10,10]
    derseList.push(charid);
  }else{
    lunarSway="pm";
    repDef=[10,-10]
    prospitList.push(charid);
  }

  //console.log(`Setting prospitList and derseList - ${Date.now() - startTime}`);

  client.landMap.set(message.guild.id+"medium",prospitList,"prospitList");
  client.landMap.set(message.guild.id+"medium",derseList,"derseList");

  //console.log(`Finished setting prospitList and derseList, retrieving moonMap and towerLocal - ${Date.now() - startTime}`);

  let moonMap = client.landMap.get(message.guild.id+"medium",lunarSway);
  let towerLocal = client.landMap.get(message.guild.id+"medium","towerLocal");

  //console.log(`Retrieved moonMap and towerLocal - ${Date.now() - startTime}`);

  let towerRoom = moonMap[towerLocal[0]][towerLocal[1]][2].length;

  moonMap[towerLocal[0]][towerLocal[1]][2].push([[],[],`${message.author.username.toUpperCase()}'S DREAM TOWER`,false,[
    [true,charid]],defBedroom]);

    //console.log(`Setting moonMap - ${Date.now() - startTime}`);

  client.landMap.set(message.guild.id+"medium",moonMap,lunarSway);

  //console.log(`Set moonMap - ${Date.now() - startTime}`);


  //console.log(`Creating character sheet - ${Date.now() - startTime}`);

  var charSheet = {
    control:charid,
    possess:[],
    name: message.author.username,
    ping: message.author.id,
    channel: channel,
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
    deploy:[false,false,false,false,false,false,false,false,false,false],
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
    chumtag:ab,
    chumpic:message.author.avatarURL(),
    chumroll:[],
    pesterchannel:pesterchannel,
    prospitRep:repDef[0],
    derseRep:repDef[1],
    underlingRep:-1,
    playerRep:0,
    consortRep:10,
    bio:"This player has not set their BIO!",
    img:"https://media.discordapp.net/attachments/408119077840617493/808458446374436914/human_base.png",
    registry:[],
    timeOfReg:Date.now()
  };

client.playerMap.set(charid,charSheet);

let dateObj = new Date();
console.log();
if(!channelCheck){
  async function generateChannels(){

    var categoryList = [["827298639994421248","827298674547097657"],["827335332789878814","827335362124316712"]]

    let category = [];
    let catCheck=false;

    for(let i=0;i<categoryList.length&&!catCheck;i++){

      //message.channel.send(client.channels.cache.get(categoryList[i][0]).children.size);

    }

    var chan = await message.guild.channels.create(`${message.author.username}-terminal`, {
        type: "text", //This create a text channel, you can make a voice one too, by changing "text" to "voice"
        permissionOverwrites: [
           {
             id: message.author.id,
             allow: [`VIEW_CHANNEL`, 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
       },{
         id: message.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
         deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'], //Deny permissions
       }
     ]//,
     //parent:"827335332789878814"
      })
      /*var pesterchan = await message.guild.channels.create(`${message.author.username}-pester`, {
          type: "text", //This create a text channel, you can make a voice one too, by changing "text" to "voice"
          permissionOverwrites: [
             {
               id: message.author.id,
               allow: [`VIEW_CHANNEL`, 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
         },{
           id: message.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
           deny: ['VIEW_CHANNEL'], //Deny permissions
         }
       ]//,
       //parent:"827335362124316712"
     })*/

        channel = chan.id;
        pesterchannel = chan.id;

        client.hookcall.hookGen(client,pesterchannel);

        client.playerMap.set(charid,channel,"channel");
        client.playerMap.set(charid,pesterchannel,"pesterchannel");

        client.channels.cache.get(channel).send(`${message.author} stands in their bedroom. Today is ${ dateObj.toLocaleDateString('en-US')} (probably), and you're ready to play around with Pestercord! ${client.auth.prefix}help is pretty out of date, so good luck figuring out how the commands work. We promise, we'll fix it sometime.`);
  }

  generateChannels();

}else{
  client.playerMap.set(charid,channel,"channel");
  client.playerMap.set(charid,pesterchannel,"pesterchannel");
    client.channels.cache.get(channel).send(`${message.author} stands in their bedroom. Today is ${ dateObj.toLocaleDateString('en-US')} (probably), and you're ready to play around with Pestercord! ${client.auth.prefix}help is pretty out of date, so good luck figuring out how the commands work. We promise, we'll fix it sometime.`);
}

//console.log(`Finished setting character sheet - ${Date.now() - startTime}`);


//create pesterchum webhook

//console.log(`Calling Hookcheck - ${Date.now() - startTime}`);

//client.hookcall.hookCheck(client,message);

//console.log(`hookCheck has resolved - ${Date.now() - startTime}`);


let gategen = [[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))]]


//var gristSet = [gristTypes.splice(Math.floor((Math.random() * 12)+1),1)[0],gristTypes.splice(Math.floor((Math.random() * 11)+1),1)[0],gristTypes.splice(Math.floor((Math.random() * 10)+1),1)[0],gristTypes.splice(Math.floor((Math.random() * 9)+1),1)[0]]
aspect = aspects[Math.floor((Math.random() * 11))];
//console.log(`Generating all of the lands - ${Date.now() - startTime}`);
var s1 = await landcall.landGen(client,0,gategen[0],message,aspect);
var s2 = await landcall.landGen(client,1,gategen[1],message,aspect);
var s3 = await landcall.landGen(client,2,gategen[2],message,aspect);
var s4 = await landcall.landGen(client,3,gategen[3],message,aspect);

//console.log(`Lands have been generated - ${Date.now() - startTime}`);

var land = {
    name: [client.resources.landFirst[Math.floor(Math.random()*client.resources.landFirst.length)],client.resources.landSecond[Math.floor(Math.random()*client.resources.landSecond.length)]],
    aspect: aspect,
    grist: gristSet,
    enter:false,
    spent: 0,
    floors: 0,
    gate: 0,
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
console.log(`The Land of ${land.name[0]} and ${land.name[1]} -- LO${land.name[0].substring(0,1).toUpperCase()}A${land.name[1].substring(0,1).toUpperCase()}`);
//adds the charaacter sheet and land sheet to the database

client.landMap.set(charid,land)

  console.log(`End time is ${Date.now() - startTime}`);

}
