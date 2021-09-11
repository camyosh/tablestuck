const funcall = require("../modules/funcall.js");
const landcall = require("../modules/landcall.js");
const strifecall = require("../modules/strifecall.js");

exports.run = async function(client, message, args){

//lists valid tourney players who can register, if applicable.
const tourneyList = client.auth.list;

//if the tournament is live, only valid players can register.
  if(client.limit != 0 && !tourneyList.includes(message.author.id)){
message.channel.send("You have not signed up for the tournament!");
return;
  }

//checks to see if the medium exists, aka the session has been initialized.
if(!client.landMap.has(message.guild.id+"medium")){
  message.channel.send(`A session for this server has not been initialized! Do ${client.auth.prefix}initialize to fix this.`);
  return;
}

//initializes some basic variables needed for registration.
  let channel = ``;
  let pesterchannel = ``;
  let channelCheck = false;
  var gristTypes = ["build","uranium","amethyst","garnet","iron","marble","chalk","shale","cobalt","ruby","caulk","tar","amber"];

//manages the Registration Timer, so that people don't register too quickly.
if (Date.now()-client.landMap.get(message.guild.id+"medium","registerTimer")<10000){
  message.channel.send("Sorry, someone else is registering, wait a few seconds!");
  return;
} else {
  client.landMap.set(message.guild.id+"medium",Date.now(),"registerTimer");
}

//gets the data for the user. userid is only used here in the pure form, of guildid concatted with author id.
let userid = `${message.guild.id}${message.author.id}`
let userData = client.userMap.get(userid);

/*sburbid is for the sburbMap key. for players, it will be the same as userid, but
dm's who might make multiple player sheets will have different sburbid's for each
character. Each time a DM makes a character, the number of character is added on
to the end of the sburbid.
**FOR THE MOMENT, charCount IS NEVER INCREASED. TO BE CHANGED LATER.***/
let sburbid;
if(userData.charCount>0){
 sburbid = `${userid}${userData.charCount}`;
} else {
 sburbid = userid;
}

//this checks the tutorial config to see if it starts enabled or not. the first value in
//the tutor array toggles if the tutorial is on or off.
if(client.configMap.get(message.guild.id).options[2].selection==0){
  defaultTutor = [true];
} else {
  defaultTutor = [false];
}
//for the number of steps in the tutorial, this generates a new bool set to false.
let tutorRef = require("../tutorRef.json");
for(let m=0;m<tutorRef.content.length;m++){
  defaultTutor.push(false);
}

//pushes the tutor list to the usermap. This has to be done here, because if done in
//message.js, it can't access the configMap.
client.userMap.set(userid,defaultTutor,"tutor");

//sets up some more variables and arrays for choosing your aspect. will eventually
//be replaced by user data editing program.
let aspectChoice;
 let aspects = ["BREATH","LIFE","LIGHT","TIME","HEART","RAGE","BLOOD","DOOM","VOID","SPACE","MIND","HOPE"]

 //checks if the user has a character under their control.
  if(client.userMap.get(userid,"possess")!="NONE"){

    //charid is the variable to reference whatever creature a user is controlling.
    //it is usually the sburbid prefixed by a letter defining what kind it is, ex: w for waking self.
    let charid = client.userMap.get(userid,"possess");

    //if there is an active tournament, people can't re-register.
    if (client.limit != 0) {
      message.channel.send("You can not re-register during a tournament!");
      return;
    }
      //checks to see if the currently possessed creature exists and is a player.
      if(client.playerMap.has(charid)&&client.playerMap.get(charid,"type")=="player"){
    //if someone is possessing a player, it won't let them re-register unless they confirm it.
    if(args[0].toLowerCase()!="confirm"){
      message.channel.send(`Be careful, if you re-register now, all of your data will be deleted! If you're sure about this, do ${client.auth.prefix}register confirm.`);
      return;
    }
    //if no second argument is given, aspect is radomized (TO BE REPLACED)
    if(!args[1]){
      aspectChoice="random";
    } else {
      //checks if the given aspect is valid.
      if(!aspects.includes(args[1].toUpperCase())){
        message.channel.send("Sorry, that aspect doesn't exist! Re-register with a valid aspect, or none at all to get a random one!");
        return;
      } else {
        aspectChoice=args[1].toUpperCase();
      }
    }

    //stores channel data for the pre-existing player
    channel = client.sburbMap.get(sburbid,"channel");
    pesterchannel = client.sburbMap.get(sburbid,"pesterchannel");

    channelCheck = true;

    //checks if the channel still exists, and determines if new ones need to be made.
    try{
      client.channels.cache.get(channel).send(`Re-registering`);
    }catch(err){
      channelCheck=false;
    }

    //target will be the sburbid of the player's client and/or server for this function.
    let target;

    //checks if you had a server or client, and resets their client or server (you) to N/A.
    if(client.sburbMap.get(sburbid,"client")!="NA"&&client.sburbMap.get(sburbid,"client")!=sburbid){
      target = client.sburbMap.get(sburbid,"client");
      client.sburbMap.set(target,"NA","server");
      client.funcall.chanMsg(client,target,`Your server has re-registerd, leaving you without a server!`);
    }
    if(client.sburbMap.get(sburbid,"server")!="NA"&&client.sburbMap.get(sburbid,"server")!=sburbid){
        target = client.sburbMap.get(sburbid,"server");
      client.sburbMap.set(target,"NA","client");
      client.funcall.chanMsg(client,target,`Your client has re-registerd, leaving you without a client!`);
    }
    }
  } else {

    //if no first argument is given, aspect is radomized (TO BE REPLACED)
  if(!args[0]){
    aspectChoice="random";
  } else {
    if(!aspects.includes(args[0].toUpperCase())){
      message.channel.send("Sorry, that aspect doesn't exist! Re-register with a valid aspect, or none at all to get a random one!");
      return;
    } else {
      aspectChoice=args[0].toUpperCase();
    }
  }
}

console.log(aspectChoice);
//startTime is used to keep track of how long resgistration takes, for debugging purposes.
let startTime = Date.now();
console.log(`Start time is ${startTime}`);

//lays out occset, the chunk of data that tells the game that there is a player (true)
//with the charid given in a room. This will start in the Bedroom.
  var occset = [true,charid];


//gets a list of every player and their chumhandle registered to the medium.
  let playerList = client.landMap.get(message.guild.id+"medium","playerList");
  let handleList = client.landMap.get(message.guild.id+"medium","handleList");

//sets the chumhandle for the character.
  let chumhandle = client.userMap.get(userid,"name").split(" ").join("");

//sets the chumtag for the character, defaulted to the first two letters of their name.
  let chumtag = chumhandle.substring(0,2).toUpperCase();

  let tagCount = 0;
  let handleCount = 0;
  let index="NA";


  for(i=0;i<handleList.length;i++){
    //counts every case where the new chumhandle matches an existing one.
    if(handleList[i][1].substring(0,chumhandle.length).toLowerCase()==chumhandle.toLowerCase()&&handleList[i][0]!=sburbid){
      handleCount++;
    }
    //???
    /*if(handleList[i].length<3){
      handleList[i].push(`${i}`);
    }*/
    //counts every case where the new chumtag matches an existing one.
    if(handleList[i][2].substring(0,chumtag.length).toUpperCase()==chumtag&&handleList[i][0]!=sburbid){
    tagCount++;
    }
    //catches the index of the character when it comes by.
    if(handleList[i][0]==sburbid){
      index = i;
    }
  }

  //adds a number to the end of the chumhandle to avoid duplicates.
  if(handleCount>0){
    chumhandle+=handleCount;
  }
  //adds a number to the end of the chumtag to avoid duplicates.
  if(tagCount>0){
    chumtag+=tagCount;
  }

  //adds the character to the handlelist if they don't exist, or updates it if they do.
  if(index=="NA"){
    handleList.push([sburbid,chumhandle,chumtag]);
  }else{
    handleList[index]=[sburbid,chumhandle,chumtag];
  }

//adds the character to the playerlist if they don't exist on it.
  if(!playerList.includes(sburbid)){
    playerList.push(sburbid);
  }

//updates the data to the database
  client.landMap.set(message.guild.id+"medium",playerList,"playerList");
  client.landMap.set(message.guild.id+"medium",handleList,"handleList");

  /*randomizes the grist for the land, based on which grists have or haven't been used
  yet in the medium. This way, 3 planets will have exactly 1 occurance of each grist
  type.*/
  var gristSet = [];
  var sessionGrist = client.landMap.get(message.guild.id+"medium","gristCounter");
  for(let i=0;i<4;i++){
    gristSet.push(sessionGrist.splice(Math.floor(Math.random()*sessionGrist.length),1)[0]);
    //refills the grist list if all 12 are used up
    if(sessionGrist.length<1){
      sessionGrist = ["uranium","amethyst","garnet","iron","marble","chalk","shale","cobalt","ruby","caulk","tar","amber"];
    }
  }
  client.landMap.set(message.guild.id+"medium",sessionGrist,"gristCounter");

 //picks a random number 0-11 for the armor the player starts with.
  let randnum = Math.floor((Math.random() * 12));

//default bedroom with a pair of glasses always starting in it.
  const defBedroom = funcall.preItem(client,"bedroom",7,[["GLASSES","vh//QaFS",1,1,[]]],gristSet);
//list of possible armors a player might start with.
  const armorsets = [["CLOTHES", "sQ//m9Kn", 1, 1, []], ["CLOTHES", "sd//1UGt", 1, 1, []], ["CLOTHES", "s4//1jKQ", 1, 1, []], ["CLOTHES", "s5//MEF3", 1, 1, []], ["CLOTHES", "sI//llDd", 1, 1, []], ["CLOTHES", "sh//jXDH", 1, 1, []], ["CLOTHES", "sK//dTnZ", 1, 1, []], ["CLOTHES", "sj//ZVxB", 1, 1, []], ["CLOTHES", "sY//t9oW", 1, 1, []], ["CLOTHES", "sl//RSD8", 1, 1, []], ["CLOTHES", "sO//jCtu", 1, 1, []], ["CLOTHES", "sD//2ydM", 1, 1, []]];

//builds the room array. defBedroom had to be defined earlier, so that occset can be insterted now.
//preItem stocks a room based on it's loot table and the land's grist type.
  const def = [[[5,7,[
     [[],[],"BEDROOM",false,[occset],defBedroom],
     [[],[],"LIVING ROOM",false,[],funcall.preItem(client,"living",7,[],gristSet)],
     [[],[],"STUDY",false,[],funcall.preItem(client,"study",7,[["COMPUTER","yc2x2Esb",1,1,[]],["DESK","yO3wlREq",1,1,[ ["CAPTCHALOGUE CARD","11111111",1,4,[]] ]]],gristSet)],
     [[],[],"KITCHEN",false,[],funcall.preItem(client,"kitchen",5,[["FRIDGE","yT3r7TKE",1,1,[["FRUIT GUSHERS","0L5upepo",1,2,[]],["STEAK","0k6tac2a",1,2,[]],["BREAD","0u4vNX4a",1,2,[]],["ICE","0x8rHRe5",1,4,[]],["CAPTCHALOGUE CARD","11111111",1,2,[]]]]],gristSet)],
     [[],[],"BATHROOM",false,[],funcall.preItem(client,"bathroom",4,[],gristSet)],
     [[],[],"YARD",false,[],funcall.preItem(client,"yard",4,[["MAILBOX","yT3SpVgY",0,1,[["SBURB DISC","/QjGOZb7",1,1,[],"https://media.discordapp.net/attachments/808757312520585227/809997088665370634/SBURB_DISC.png"],["CAPTCHALOGUE CARD","11111111",1,2,[]]]]],gristSet)],
     [[],[],"SHED",false,[],funcall.preItem(client,"shed",8,[],gristSet)]
   ]]]];

//gets the list of players in the dream moon towers
  let prospitList = client.landMap.get(message.guild.id+"medium","prospitList");
  let derseList = client.landMap.get(message.guild.id+"medium","derseList");

  let lunarSway;
  let repDef=[0,0];
  let roomIndex = -1;

//if the player already exists on a moon, it'll keep them there.
  if(prospitList.includes(sburbid)){
    lunarSway = "pm";
    repDef=[10,-10];
    roomIndex = prospitList.indexOf(sburbid);
  }else if(derseList.includes(sburbid)){
    lunarSway = "dm";
    repDef=[-10,10];
    roomIndex = derseList.indexOf(sburbid);
  }
//if the player isn't on either moon, it puts them on the one with less people, or a
//random one if they are both equal.
  else if(prospitList.length==derseList.length){
    if(!Math.floor(Math.random()*2)){
      lunarSway="dm";
      repDef=[-10,10]
      derseList.push(sburbid);
    } else {
      lunarSway="pm";
      repDef=[10,-10]
      prospitList.push(sburbid);
    }
  }else if(prospitList.length>derseList.length){
    lunarSway="dm";
    repDef=[-10,10]
    derseList.push(sburbid);
  }else{
    lunarSway="pm";
    repDef=[10,-10]
    prospitList.push(sburbid);
  }
//pushes the landmaps back into the database.
  client.landMap.set(message.guild.id+"medium",prospitList,"prospitList");
  client.landMap.set(message.guild.id+"medium",derseList,"derseList");

//gets the appropriate map of the moon, and the location of the dream tower.
  let moonMap = client.landMap.get(message.guild.id+"medium",lunarSway);
  let towerLocal = client.landMap.get(message.guild.id+"medium","towerLocal");

//dreamid references specifically a character's dreaming self.
 let dreamid = `d${sburbid}`;

 //if the character had a room before, this puts them there. Otherwise, it's added on to the end.
 let towerRoom;
if(roomIndex==-1){
  towerRoom = moonMap[towerLocal[0]][towerLocal[1]][2].length;
  moonMap[towerLocal[0]][towerLocal[1]][2].push([[],[],`${message.author.username.toUpperCase()}'S DREAM TOWER`,false,[
    [true,dreamid]],defBedroom]);
} else {
  towerRoom = roomIndex;
  moonMap[towerLocal[0]][towerLocal[1]][2][roomIndex].set([[],[],`${client.userMap.get(userid,"name")}'S DREAM TOWER`,false,[
    [true,dreamid]],defBedroom]);
}

//pushes the new data to the moon again.
  client.landMap.set(message.guild.id+"medium",moonMap,lunarSway);

//stores the waking self as what the user is possessing.
userData.possess = `w${sburbid}`;
//adds both waking and sleeping selves to the speeddial, for faster DM possession.
userData.speeddial.push([`w${sburbid}`,`${userData.name}`]);
userData.speeddial.push([`d${sburbid}`,`${userData.name}'s Dream Self'`]);
userData.channel=channel;
/*
Old Character Sheet
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
    timeOfReg:Date.now(),
    dreamer:false,
    revived:false,
    tutor:defaultTutor,
    tutcomplete:false,
    godtier:false,
    sleepTimer:0
  };
*/

var wakingSheet = {
  control:[userid],
  owner:sburbid,
  name: `${userData.name}`,
  faction:"player",
  type:"player",
  strife:false,
  pos:0,
  alive:true,
  local:["h",0,0,0,sburbid],
  b: 0,
  vit: 100,
  port: 1,
  kinds:[],
  spec:[],
  modus: "STACK",
  cards:4,
  scards:2,
  sdex:[],
  equip:0,
  trinket:[],
  armor:[armorsets[randnum]],
  prototype:[],
  prefTarg:[],
  partyID:"NONE",
  ai: false
};
  var dreamSheet = {
    control:[],
    owner:sburbid,
    name: `${userData.name}'s Dream Self'`,
    faction:"player",
    type:"player",
    strife:false,
    pos:0,
    alive:true,
    local:[lunarSway,towerLocal[0],towerLocal[1],towerRoom,message.guild.id+"medium"],
    b: 0,
    vit: 100,
    port: 1,
    kinds:[],
    spec:[],
    modus: "STACK",
    cards:4,
    scards:2,
    sdex:[],
    equip:0,
    trinket:[],
    armor:[],
    prototype:[],
    prefTarg:[],
    partyID:"NONE",
    ai: false
  };

  var sburbSheet = {
    name: userData.name,
    ping: message.author.id,
    channel: channel,
    class:userData.class,
    aspect:userData.aspect,
    landID:sburbid,
    wakingID:`w${sburbid}`,
    dreamingID:`d${sburbid}`,
    lunarSway:lunarSway,
    server:"NA",
    client:"NA",
    deploy:[false,false,false,false,false,false,false,false,false,false],
    act: 0,
    xp: 0,
    rung: 0,
    bank: 0,
    mailbox: [],
    gel: 100,
    grist:[20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    itemsAlchemized:0,
    underlingsDefeated:0,
    tilesDiscovered:0,
    playersDefeated:0,
    bossesDefeated:0,
    itemsCaptchalogued:0,
    chumhandle:chumhandle,
    chumtag:chumtag,
    chumpic:message.author.avatarURL(),
    chumroll:[],
    pesterchannel:pesterchannel,
    block:[],
    prospitRep:repDef[0],
    derseRep:repDef[1],
    underlingRep:-1,
    playerRep:0,
    consortRep:10,
    bio:"This player has not set their BIO!",
    img:"https://media.discordapp.net/attachments/408119077840617493/808458446374436914/human_base.png",
    registry:[],
    timeOfReg:Date.now(),
    dreamer:false,
    revived:false,
    godtier:false,
    sleepTimer:0,
    spriteID:""

  }

  /*let npcSet = {
    name: `${grist.toUpperCase()} ${undername}${underling.toUpperCase()}`,
    //control:[]
    //owner
    /possess:[],
    type: underling,
    faction: "underling",
    vit:client.underlings[underling].vit,
    gel:client.underlings[underling].vit,
    grist: grist,
    strife:false,
    pos:0,
    alive:true,
    local:local,
    sdex:[],
    equip:0,
    trinket:[],
    armor:[],
    spec:[],
    equip:0,
    scards:1,
    kinds:[],
    port:1,
    modus:"STACK",
    cards:4,
    prototype:prototype,
    /prospitRep:0,
    /derseRep:0,
    /underlingRep:100,
    /playerRep:-1,
    /consortRep:-1,
    prefTarg:[],
    /xp:0,
    /rung:0,
    b:0,
    /bio:`A ${grist} ${underling}`,
    /img:client.underlings[underling].img
  }*/

//pushes all playerdata to the proper databases.
client.playerMap.set(`w${sburbid}`,wakingSheet);
client.playerMap.set(`d${sburbid}`,dreamSheet);
client.sburbMap.set(sburbid,sburbSheet);
client.userMap.set(userid,userData);

let dateObj = new Date();

//creates channels if the player doesn't have any.
if(!channelCheck){
  async function generateChannels(){

    var categoryList = [["827298639994421248","827298674547097657"],["827335332789878814","827335362124316712"]]

    let category = [];
    let catCheck=false;

    for(let i=0;i<categoryList.length&&!catCheck;i++){

      //message.channel.send(client.channels.cache.get(categoryList[i][0]).children.size);

    }
    let chan,pesterchan;
    if(client.configMap.get(message.guild.id).options[1].selection==2){
      channel = message.channel.id;
      pesterchannel = message.channel.id;
    } else {
    chan = await message.guild.channels.create(`${sburbSheet.name}-terminal`, {
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
      if(client.configMap.get(message.guild.id).options[1].selection==1){
      pesterchan = await message.guild.channels.create(`${sburbSheet.name}-pester`, {
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
     })
   }
        channel = chan.id;
        if(client.configMap.get(message.guild.id).options[1].selection==1){
        pesterchannel = pesterchan.id;
      } else {
        pesterchannel = chan.id;
      }
    }
    //makes a webhook for pesterchum stuff.
        client.hookcall.hookGen(client,pesterchannel);

        client.playerMap.set(sburbid,channel,"channel");
        client.playerMap.set(sburbid,pesterchannel,"pesterchannel");

        client.channels.cache.get(channel).send(`${sburbSheet.name} stands in their bedroom. Today is ${ dateObj.toLocaleDateString('en-US')} (probably), and you're ready to play around with Pestercord! The tutorial should be sufficient to lead you through all the essentials of the game, but don't be afraid to ask for help!`);
  }

  generateChannels();

}else{
  client.playerMap.set(sburbid,channel,"channel");
  client.playerMap.set(sburbid,pesterchannel,"pesterchannel");
    client.channels.cache.get(channel).send(`${sburbSheet.name} stands in their bedroom. Today is ${ dateObj.toLocaleDateString('en-US')} (probably), and you're ready to play around with Pestercord! The tutorial should be sufficient to lead you through all the essentials of the game, but don't be afraid to ask for help!`);
}
client.userMap.set(userid,channel,"channel");
setTimeout(function(){client.tutorcall.progressCheck(client,message,1)},4000);

//determines where all the gates on the land will be.
let gategen = [[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))]]

//sets the land's aspect based on registration choice (TO BE REMOVED)
let aspect;
if(aspectChoice === "random"){
aspect = aspects[Math.floor((Math.random() * 11))];
} else {
aspect = aspectChoice;
}
//makes all 4 lands and saves them to variables.
var s1 = await landcall.landGen(client,0,gategen[0],message,aspect,gristSet);
var s2 = await landcall.landGen(client,1,gategen[1],message,aspect,gristSet);
var s3 = await landcall.landGen(client,2,gategen[2],message,aspect,gristSet);
var s4 = await landcall.landGen(client,3,gategen[3],message,aspect,gristSet);

//defines all the data for the player's land
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

//pushes the land to the database defined by the sburbid.
client.landMap.set(sburbid,land);

  console.log(`End time is ${Date.now() - startTime}`);

}
