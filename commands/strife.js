const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {

    let target = message.author;

    //uncomment this code for the tournament
/*
    if(!client.funcall.dmcheck(client,message)){
      message.channel.send("You must wait for the referee to add you to the Strife!");
      return;
    }

    if(!message.mentions.members.first()){
      message.channel.send("You must @ a player to add them to strife!");
      return;
    }

    target = message.mentions.members.first();
*/


  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  let local = client.charcall.charData(client,charid,"local");
  var isNPC = client.charcall.npcCheck(client,charid);
// if player is in strife, leave strife

if(client.charcall.charData(client,charid,"strife")){
      client.strifecall.leaveStrife(client,message,local,client.charcall.charData(client,charid,"pos"));
      return;

    //  message.channel.send("You are already in STRIFE! You can leave by ABSCONDING, which is >act 6 1");
      //return;
/*      funcall.actionCheck(client,message);
    message.channel.send("Leaving Strife");

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");
    let local = client.playerMap.get(charid,"local");
    //retrieve strife id
    let strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`

    let players = client.strifeMap.get(strifeLocal,"players");
    //if character is the only player in strife, delete strife database
    let pos = client.playerMap.get(charid,"pos");
    let active = client.strifeMap.get(strifeLocal,"active");
    let list = client.strifeMap.get(strifeLocal,"list");
    let playerpos = client.strifeMap.get(strifeLocal,"playerpos");

    if(players == 1){
      client.strifeMap.delete(strifeLocal);
      client.playerMap.set(charid,list[pos][3],"vit");
    } else {
      //remove player from all strife variables in database
      let removed = [active.splice(active.indexOf(pos),1),playerpos.splice(playerpos.indexOf(pos),1)];
      players --;

      client.strifeMap.set(strifeLocal,active,"active");
      client.strifeMap.set(strifeLocal,players,"players");
      client.strifeMap.set(strifeLocal,playerpos,"playerpos");
      client.playerMap.set(charid,list[pos][3],"vit");

    }
    client.playerMap.set(charid,false,"strife");
    return;
*/
  }

  let armor = client.charcall.charData(client,charid,"armor");
  let vit = client.charcall.charData(client,charid,"vit");

  let spec =client.charcall.charData(client,charid,"spec");
  let equip = client.charcall.charData(client,charid,"equip");

/*  if(equip>=spec.length){
    message.channel.send("You must have a weapon equipped before entering strife!");
    return;
  }
*/
  let grist;
//determine grist type for effectiveness
if(armor.length == 0){
    grist = "artifact"
    //unarmored underlings keep their grist type.
    if(isNPC) grist = client.charcall.charData(client,charid,"gristtype");
  } else {
    grist = client.gristTypes[client.codeCypher[1][client.captchaCode.indexOf(armor[0][1].charAt(1))]];
  };

  let land = local[4];
  let sec = client.landMap.get(land,local[0]);
  let occ = sec[local[1]][local[2]][2][local[3]][4];

  let strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`
  let profile = [(isNPC?false:true),charid,grist,vit,0,1,[],[]];

  if(client.strifeMap.has(strifeLocal)){

    let list = client.strifeMap.get(strifeLocal,"list");
    let init = client.strifeMap.get(strifeLocal,"init");
    let active = client.strifeMap.get(strifeLocal,"active");
//set player position in list
    const pos = list.length;
/*
    [[player name,hp],[underlin 1]]

    turn 0

    [[1,15],[0,12],[3,4]]
*/
    list.push(profile);
    init.push([pos,1]);
    active.push(pos);

    client.strifeMap.set(strifeLocal,list,"list");
    client.strifeMap.set(strifeLocal,init,"init");
    client.strifeMap.set(strifeLocal,active,"active");
    client.charcall.setAnyData(client,userid,charid,pos,"pos");

    client.charcall.setAnyData(client,userid,charid,true,"strife");
    funcall.actionCheck(client,message);
    let turn = client.strifeMap.get(strifeLocal,"turn");
    client.strifecall.strifeList(client,local,active,list,turn,init,charid,0,"ENTERING STRIFE!");

    let name = client.charcall.charData(client,charid,"name");

    for(let i =0;i<active.length;i++){

      if(list[active[i]][1]!=charid){
      client.funcall.chanMsg(client,list[active[i]][1],`**${name.toUpperCase()}** has joined the STRIFE at position ${active.indexOf(pos)+1}!`);
    }
    }



  } else {
//if no strife exists, create strife database

let initRoll = Math.floor((Math.random() * 20) + 1);
//if rocket trait, always roll 20 on init
if(client.traitcall.traitCheck(client,charid,"ROCKET")[0]){
  initRoll=20;
}

    var strifeSet = {
      list:[profile],
      init:[[0,initRoll]],
      turn:0,
      active:[0],
      round:0,
      last:[],
      time:Date.now()
    }

    /*if(occ.length > 1){
      //do a for check on each occupant in the room to see if there are any underlings. If there are, add them to the strife
    } else if(local[0]=="h"){
      //generate underlings for the player to fight in their house

      strifecall.underSpawn(client,local,"imp");



    }*/

    client.strifeMap.set(strifeLocal,strifeSet);
    client.charcall.setAnyData(client,userid,charid,0,"pos");
    client.charcall.setAnyData(client,userid,charid,true,"strife");


    //add all underlings in area to strife
    strifecall.underRally(client,local);
    client.funcall.tick(client,message);
    message.channel.send("Entering Strife!");

    strifecall.start(client,message,local);

  }
  client.tutorcall.progressCheck(client,message,33);
}
