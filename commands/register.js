exports.run = async function(client, message, args){

//First, there's a series of checks to see if the function should be run at all.
//This way, processing messages can be sent properly even when the bot is busy.

//T1 checks: see if they can register at all.

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

//gets the data for the user. userid is only used here in the pure form, of guildid concatted with author id.
var userid = `${message.guild.id}${message.author.id}`;
var userData = client.userMap.get(userid);

/*sburbid is for the sburbMap key. for players, it will be the same as userid, but
dm's who might make multiple player sheets will have different sburbid's for each
character. Each time a DM makes a character, the number of character is added on
to the end of the sburbid.
**FOR THE MOMENT, charCount IS NEVER INCREASED. TO BE CHANGED LATER.***/

//since the game is built for re-registering for easy testing, mulitple characters
//cannot be made at this time.
var sburbid;
if(userData.charCount>0){
 sburbid = `${userid}${userData.charCount}`;
} else {
 sburbid = userid;
}
var channels = [``,``];
var aspectChoice;
var channelCheck;
//T2: checks if the player has registered before and acts accordingly.

//checks if the user has any charcter, player or NPC, under their control.
if(userData.possess=="NONE"){
  aspectChoice = chooseAspect(args[0],client,message);
  if(!aspectChoice) return;
}
//checks to see if the currently possessed creature is an NPC, not a player.
else if(!client.playerMap.has(userData.possess)){
message.channel.send("You can't re-register while controlling an NPC! possess a player and try again.");
return;
}
//if someone is possessing a player, it won't let them re-register unless they confirm it.
else if(args[0]==undefined||args[0].toLowerCase()!="confirm"){
    message.channel.send(`Be careful, if you re-register now, all of your data will be deleted! If you're sure about this, do ${client.auth.prefix}register confirm.`);
    return;
}else{
  //only pre-existing players reach this point.
  aspectChoice = chooseAspect(args[1],client,message);
  if(!aspectChoice) return;
  //stores channel data for the pre-existing player
  channels[0] = client.sburbMap.get(sburbid,"channel");
  channels[1] = client.sburbMap.get(sburbid,"pesterchannel");
  channelCheck = true;
  //checks if the channel still exists, and determines if new ones need to be made.
    try{
      await client.channels.cache.get(channels[0]).send(`Re-registering`);
    }catch(err){
      channelCheck=false;
    }
  await clearConnections(client,sburbid);
}
await register(client,message,args,userid,userData,sburbid,aspectChoice,channelCheck,channels);
}
//---- Start of Execution ----------------------------------------------------------------------------------------------------
async function register(client,message,args,userid,userData,sburbid,aspectChoice,channelCheck,channels){
  //initializes some basic variables needed for registration.
    var chumhandle = ``;
    var chumtag = ``;
    var lunarSway;
    var repDef = [0,0];
    //list of possible armors a player might start with.
    const armorsets = [["CLOTHES", "sQ//m9Kn", 1, 1, []], ["CLOTHES", "sd//1UGt", 1, 1, []], ["CLOTHES", "s4//1jKQ", 1, 1, []], ["CLOTHES", "s5//MEF3", 1, 1, []], ["CLOTHES", "sI//llDd", 1, 1, []], ["CLOTHES", "sh//jXDH", 1, 1, []], ["CLOTHES", "sK//dTnZ", 1, 1, []], ["CLOTHES", "sj//ZVxB", 1, 1, []], ["CLOTHES", "sY//t9oW", 1, 1, []], ["CLOTHES", "sl//RSD8", 1, 1, []], ["CLOTHES", "sO//jCtu", 1, 1, []], ["CLOTHES", "sD//2ydM", 1, 1, []]];
    //gets the location of the dream tower.
    var towerLocal = client.landMap.get(message.guild.id+"medium","towerLocal");

  //startTime is used to keep track of how long resgistration takes, for debugging purposes.
  var startTime = Date.now();
  console.log(`Start time is ${Date.now()-startTime}`);

    //manages the Registration Timer, so that people don't register too quickly.
    /*if (Date.now()-client.landMap.get(message.guild.id+"medium","registerTimer")<10000){
      message.channel.send("Sorry, someone else is registering, wait a few seconds!");
      return;
    } else {
      client.landMap.set(message.guild.id+"medium",Date.now(),"registerTimer");
    }*/

  await createTutorial(client,message,userid,userData);
  var chumData = await chumCheck(client,message,userid,sburbid,chumhandle,chumtag);
  await charSetup(userData,sburbid,channelCheck);
  var gristSet= await createGristSet(client,message)
  var defBedroom = client.funcall.preItem(client,"bedroom",7,[["GLASSES","vh//QaFS",1,1,[]]],gristSet);
  var beginData = await beginWorld(client,userData,defBedroom,armorsets,gristSet);
  var moonData = await dreamPlace(client,message,userData,sburbid,lunarSway,repDef,towerLocal,defBedroom);
  await createSheets(client,message,userid,sburbid,userData,armorsets,beginData[0],moonData,towerLocal,channels,chumData,repDef);
  //beginData = [randnum,def]
  //creates channels if the player doesn't have any.
  if(!channelCheck){
    channels = await generateChannels(client,message,userid,sburbid,channels);
  }else{
    client.sburbMap.set(sburbid,channels[0],"channel");
    client.sburbMap.set(sburbid,channels[1],"pesterchannel");
  }
  userData.channel=channels[0];
  userData.pesterchannel=channels[1];
  client.userMap.set(userid,userData);

  await finishLandGen(client,message,sburbid,aspectChoice,gristSet,beginData[1]);
  await tutorStart(client,message,userData,channels);
  console.log(`End time is ${Date.now() - startTime}`);


}
//------- Start of Function Definitions -------------------------------------------------------
function createTutorial(client,message,userid,userData){
  //if the user doesn't already have tutorial data, it'll be created here.
  if(userData.tutor.length>1) {
    return;
}
  //this checks the tutorial config to see if it starts enabled or not. the first value in
  //the tutor array toggles if the tutorial is on or off.
  if(client.configMap.get(message.guild.id).options[2].selection==0){
    defaultTutor = [true];
  } else {
    defaultTutor = [false];
  }

  //for the number of steps in the tutorial, this generates a new bool set to false.
  var tutorRef = require("../tutorRef.json");
  for(var m=0;m<tutorRef.content.length;m++){
    defaultTutor.push(false);
  }

  //pushes the tutor list to the userData object. This has to be done here, because if done in
  //message.js, it can't access the configMap above (there's no confirmation that initialization
  //has occured yet).
  userData.tutor = defaultTutor;
}

function clearConnections(client,sburbid){
  //target will be the sburbid of the player's client and/or server for this function.
  var target;

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

function chooseAspect(input,client,message){
  //sets up some variables and arrays for choosing your aspect. will eventually
  //be replaced by user data editing program.

 //either args[0] or args[1] is passed to this function based on when it's called.
  if(!input){
    aspectChoice="random";
  } else {
    //checks if the given aspect is valid.
    if(!client.aspects.includes(input.toUpperCase())){
      message.channel.send("Sorry, that aspect doesn't exist! Re-register with a valid aspect, or none at all to get a random one!");
      return;
    } else {
    aspectChoice=input.toUpperCase();
    }
  }
  return aspectChoice;
}

function chumCheck(client,message,userid,sburbid,chumhandle,chumtag){
  //gets a list of every player and their chumhandle registered to the medium.
    var playerList = client.landMap.get(message.guild.id+"medium","playerList");
    var handleList = client.landMap.get(message.guild.id+"medium","handleList");

  //sets the chumhandle for the character.
    chumhandle = client.userMap.get(userid,"name").split(" ").join("");
  //sets the chumtag for the character, defaulted to the first two varters of their name.
    chumtag = chumhandle.substring(0,2).toUpperCase();
    var tagCount = 0;
    var handleCount = 0;
    var index="NA";
    for(i=0;i<handleList.length;i++){
      //counts every case where the new chumhandle matches an existing one.
      if(handleList[i][1].substring(0,chumhandle.length).toLowerCase()==chumhandle.toLowerCase()&&handleList[i][0]!=sburbid){
        handleCount++;
      }
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
    return[chumhandle,chumtag];
}
function charSetup(userData,sburbid,channelCheck){
  //userData.possess is the character the user is controlling, which will start as the
  //user's waking self.
  userData.possess = `w${sburbid}`;
  //adds both waking and sleeping selves to the speeddial, for faster DM possession.
  if(!channelCheck){
    userData.speeddial.push(`w${sburbid}`);
    userData.speeddial.push(`d${sburbid}`);
  }
}
function createGristSet(client,message){
  /*randomizes the grist for the land, based on which grists have or haven't been used
  yet in the medium. This way, 3 planets will have exactly 1 occurance of each grist
  type.*/
  var gristSet = [];
  var sessionGrist = client.landMap.get(message.guild.id+"medium","gristCounter");
  for(var i=0;i<4;i++){
    gristSet.push(sessionGrist.splice(Math.floor(Math.random()*sessionGrist.length),1)[0]);
    //refills the grist list if all 12 are used up
    if(sessionGrist.length<1){
      sessionGrist = ["uranium","amethyst","garnet","iron","marble","chalk","shale","cobalt","ruby","caulk","tar","amber"];
    }
  }
  client.landMap.set(message.guild.id+"medium",sessionGrist,"gristCounter");
  return gristSet;
}
function beginWorld(client,userData,defBedroom,armorsets,gristSet){
  //lays out occset, the chunk of data that tells the game that there is a player (true)
  //with the charid given in a room. This will start in the Bedroom.
    var occset = [true,userData.possess];

 //picks a random number 0-11 for the armor the player starts with.
  var randnum = Math.floor((Math.random() * 12));

//builds the room array. defBedroom had to be defined earlier, so that occset can be insterted now.
//preItem stocks a room based on it's loot table and the land's grist type.
  const def = [[[5,7,[
     [[],[],"BEDROOM",false,[occset],defBedroom],
     [[],[],"LIVING ROOM",false,[],client.funcall.preItem(client,"living",7,[],gristSet)],
     [[],[],"STUDY",false,[],client.funcall.preItem(client,"study",7,[["COMPUTER","yc2x2Esb",1,1,[]],["DESK","yO3wlREq",1,1,[ ["CAPTCHALOGUE CARD","11111111",1,4,[]] ]]],gristSet)],
     [[],[],"KITCHEN",false,[],client.funcall.preItem(client,"kitchen",5,[["FRIDGE","yT3r7TKE",1,1,[["FRUIT GUSHERS","0L5upepo",1,2,[]],["STEAK","0k6tac2a",1,2,[]],["BREAD","0u4vNX4a",1,2,[]],["ICE","0x8rHRe5",1,4,[]],["CAPTCHALOGUE CARD","11111111",1,2,[]]]]],gristSet)],
     [[],[],"BATHROOM",false,[],client.funcall.preItem(client,"bathroom",4,[],gristSet)],
     [[],[],"YARD",false,[],client.funcall.preItem(client,"yard",4,[["MAILBOX","yT3SpVgY",0,1,[["SBURB DISC","/QjGOZb7",1,1,[],"https://media.discordapp.net/attachments/808757312520585227/809997088665370634/SBURB_DISC.png"],["CAPTCHALOGUE CARD","11111111",1,2,[]]]]],gristSet)],
     [[],[],"SHED",false,[],client.funcall.preItem(client,"shed",8,[],gristSet)]
   ]]]];
   return [randnum,def];
}
function dreamPlace(client,message,userData,sburbid,lunarSway,repDef,towerLocal,defBedroom){
  //gets the list of players in the dream moon towers
    var prospitList = client.landMap.get(message.guild.id+"medium","prospitList");
    var derseList = client.landMap.get(message.guild.id+"medium","derseList");

    var roomIndex = -1;
  //if the player already exists on a moon, it'll keep them there.
    if(prospitList.includes(sburbid)){
      lunarSway = "pm";
      repDef=[10,-10];
      roomIndex = prospitList.indexOf(sburbid)+1;
    }else if(derseList.includes(sburbid)){
      lunarSway = "dm";
      repDef=[-10,10];
      roomIndex = derseList.indexOf(sburbid)+1;
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
  //pushes the player lists back into the medium database.
    client.landMap.set(message.guild.id+"medium",prospitList,"prospitList");
    client.landMap.set(message.guild.id+"medium",derseList,"derseList");

    var moonMap = client.landMap.get(message.guild.id+"medium",lunarSway);
   //if the character had a room before, this puts them there. Otherwise, it's added on to the end.
   var towerRoom;
  if(roomIndex==-1){
    towerRoom = moonMap[towerLocal[0]][towerLocal[1]][2].length;
    moonMap[towerLocal[0]][towerLocal[1]][2].push([[],[],`${userData.name.toUpperCase()}'S DREAM TOWER`,false,[
      [true,`d${sburbid}`]],defBedroom]);
  } else {
    towerRoom = roomIndex;
    moonMap[towerLocal[0]][towerLocal[1]][2][roomIndex] = [[],[],`${userData.name.toUpperCase()}'S DREAM TOWER`,false,[
      [true,`d${sburbid}`]],defBedroom];
  }
  //pushes the new data to the moon again.
    client.landMap.set(message.guild.id+"medium",moonMap,lunarSway);
    return [towerRoom,lunarSway];
}
function createSheets(client,message,userid,sburbid,userData,armorsets,randnum,moonData,towerLocal,channels,chumData,repDef){
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
    name: `${userData.name}'s Dream Self`,
    faction:"player",
    type:"player",
    strife:false,
    pos:0,
    alive:true,
    local:[moonData[1],towerLocal[0],towerLocal[1],moonData[0],message.guild.id+"medium"],
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
    channel: channels[0],
    class:userData.class,
    aspect:userData.aspect,
    landID:sburbid,
    wakingID:`w${sburbid}`,
    dreamingID:`d${sburbid}`,
    lunarSway:moonData[0],
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
    questsCompleted:0,
    questProgress:[],
    chumhandle:chumData[0],
    chumtag:chumData[1],
    chumpic:message.author.avatarURL(),
    chumroll:[],
    pesterchannel:channels[1],
    block:[],
    prospitRep:repDef[0],
    derseRep:repDef[1],
    underlingRep:-1,
    playerRep:0,
    consortRep:10,
    bio:"This player has not set their BIO!",
    img:"https://media.discordapp.net/attachments/408119077840617493/808458446374436914/human_base.png",
    registry:[[
            "CAPTCHALOGUE CARD",
            "11111111",
            1,
            1,
            [
            ]
        ]],
    timeOfReg:Date.now(),
    dreamer:false,
    revived:false,
    godtier:false,
    sleepTimer:0,
    spriteID:""
  }
  //pushes all playerdata to the proper databases.
  client.playerMap.set(`w${sburbid}`,wakingSheet);
  client.playerMap.set(`d${sburbid}`,dreamSheet);
  client.sburbMap.set(sburbid,sburbSheet);
}
async function finishLandGen(client,message,sburbid,aspectChoice,gristSet,def){
  //determines where all the gates on the land will be.
  var gategen = [[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))]]

  //sets the land's aspect based on registration choice (TO BE REMOVED)
  var aspect;
  if(aspectChoice === "random"){
  aspect = client.aspects[Math.floor((Math.random() * 11))];
  } else {
  aspect = aspectChoice;
  }
  //makes all 4 lands and saves them to variables.
  var s1 = await client.landcall.landGen(client,0,gategen[0],message,aspect,gristSet);
  var s2 = await client.landcall.landGen(client,1,gategen[1],message,aspect,gristSet);
  var s3 = await client.landcall.landGen(client,2,gategen[2],message,aspect,gristSet);
  var s4 = await client.landcall.landGen(client,3,gategen[3],message,aspect,gristSet);

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
}
async function generateChannels(client,message,userid,sburbid,channels){
  var chan,pesterchan;
  if(client.configMap.get(message.guild.id).options[1].selection==2){
    channels[0] = message.channel.id;
    channels[1] = message.channel.id;
  } else {
  chan = await message.guild.channels.create(`${client.sburbMap.get(sburbid,"name")}-terminal`, {
      type: "text", //This create a text channel, you can make a voice one too, by changing "text" to "voice"
      permissionOverwrites: [
         {
           id: message.author.id,
           allow: [`VIEW_CHANNEL`, 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
     },{
       id: client.user.id,
       allow: [`VIEW_CHANNEL`, 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
     },{
       id: message.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
       deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'], //Deny permissions
     }
   ]//,
   //parent:"827335332789878814"
    })
    if(client.configMap.get(message.guild.id).options[1].selection==1){
    pesterchan = await message.guild.channels.create(`${client.sburbMap.get(sburbid,"name")}-pester`, {
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
      channels[0] = chan.id;
      if(client.configMap.get(message.guild.id).options[1].selection==1){
      channels[1] = pesterchan.id;
    } else {
      channels[1] = chan.id;
    }
  }
  //makes a webhook for pesterchum stuff.
      client.hookcall.hookGen(client,channels[1]);
      client.sburbMap.set(sburbid,channels[0],"channel");
      client.sburbMap.set(sburbid,channels[1],"pesterchannel");

return channels;
}
async function tutorStart(client,message,userData,channels){
  var dateObj = new Date();
  intromessage = `${message.guild.members.cache.get(userData.ping)} stands in their bedroom. Today is ${ dateObj.toLocaleDateString('en-US')} (probably), and you're ready to play around with Pestercord! The tutorial should be sufficient to lead you through all the essentials of the game, but don't be afraid to ask for help!`;
  client.tutorcall.progressCheck(client,message,1,["text",intromessage]);
}
