const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {

    var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");
    let local = client.playerMap.get(charid,"local");
// if player is in strife, leave strife
    if(strifecall.strifeTest(client, message, message.author) == true){

      client.strifecall.leaveStrife(client,message,local,client.playerMap.get(charid,"pos"));
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

  let armor = client.playerMap.get(charid,"armor");
  let vit = client.playerMap.get(charid,"vit");

  let spec =client.playerMap.get(charid,"spec");
  let equip = client.playerMap.get(charid,"equip");

/*  if(equip>=spec.length){
    message.channel.send("You must have a weapon equipped before entering strife!");
    return;
  }
*/
  let grist;
//determine grist type for effectiveness
  if(armor.length == 0){
    grist = "artifact"
  } else {
    grist = client.gristTypes[client.codeCypher[1][client.captchaCode.indexOf(armor[0][1].charAt(1))]];
  };


  let land = local[4];
  let sec = client.landMap.get(land,local[0]);
  let occ = sec[local[1]][local[2]][2][local[3]][4];

  let strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`
  let profile = [true,charid,grist,vit,0,1,[],[]];

  if(client.strifeMap.has(strifeLocal)){

    let list = client.strifeMap.get(strifeLocal,"list");
    let init = client.strifeMap.get(strifeLocal,"init");
    let active = client.strifeMap.get(strifeLocal,"active");
    let players = client.strifeMap.get(strifeLocal,"players");
    let playerpos = client.strifeMap.get(strifeLocal,"playerpos");
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
    players++;
    playerpos.push(pos);

    client.strifeMap.set(strifeLocal,list,"list");
    client.strifeMap.set(strifeLocal,init,"init");
    client.strifeMap.set(strifeLocal,active,"active");
    client.strifeMap.set(strifeLocal,players,"players");
    client.strifeMap.set(strifeLocal,playerpos,"playerpos");
    client.playerMap.set(charid,pos,"pos");

    client.playerMap.set(charid,true,"strife");
    funcall.actionCheck(client,message);
    let turn = client.strifeMap.get(strifeLocal,"turn");
    client.strifecall.strifeList(client,local,active,list,turn,init,charid,0,"ENTERING STRIFE!");

    let name = client.playerMap.get(charid,"name");

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
      players:1,
      playerpos:[0],
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
    client.playerMap.set(charid,0,"pos");
    client.playerMap.set(charid,true,"strife");


    //add all underlings in area to strife
    strifecall.underRally(client,local);
    client.funcall.tick(client,message);
    message.channel.send("Entering Strife!");

    strifecall.start(client,message,local);

  }

  let strifeEmbed = new client.Discord.MessageEmbed()
  .setTitle()



}
