//const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
//const strifecall = require("../modules/strifecall.js");
//const landcall = require("../modules/landcall.js");

const gateReq = [0,100,200,400,800,1600,3200,6400];
const gateName = ["FIRST","SECOND","THIRD","FOURTH","FIFTH","SIXTH","SEVENTH"];

exports.run = (client, message, args) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");

  var occset = [(client.charcall.npcCheck(client,charid)?false:true),charid];

  let local = client.charcall.charData(client,charid,"local");
  let land = local[4];
  let sec = client.landMap.get(land,local[0]);
  let area = sec[local[1]][local[2]];
  let room = area[2][local[3]];
  let mapCheck = true;

  let msg=``;

  let target = [local[0],local[1],local[2],0,local[4]];

  switch(area[0]){

    case 5:

    let gristSpent = client.landMap.get(local[4],"spent");
    let gate = client.landMap.get(local[4],"gate");
    let enter = client.landMap.get(local[4],"enter");
    let gristRemaining;
    if(gate+1>=8){
      gristRemaining = "MAX GATE REACHED!";
    } else {
      gristRemaining = gateReq[gate+1]-gristSpent;
    }

    if(!enter){
      message.channel.send("Enter? Enter what? You have no idea what you could possibly be trying to 'enter', it's not like there's any floating spirographs above your house or anything, that would be absurd.");
      return;
    }

    if(!args[0]){

      for(let i=1;i<8;i++){
        msg+=`**[${gate >= i ? i : "X"}] ${client.emojis.cache.get('736006488086282261')} GATE ${i}**\n\n`;
      }

      gateSend = new client.MessageEmbed()
      .setTitle(`${client.sburbMap.get(local[4],"name").toUpperCase()}'S GATES`)
      .setColor("#29b5d3")
      .addField("**Gate Reached**",gate.toString())
      .addField("**Grist to next Gate**",gristRemaining.toString())
      .addField("**Gates**",msg)

      message.channel.send({embeds: [gateSend]});

      return;
    }

    value = parseInt(args[0], 10);
    if(isNaN(value) || value<1 || value>7){
      message.channel.send("That is not a valid argument!");
      return;
    }

    if(value>gate){
      if (client.traitcall.traitCheck(client,charid,"ROCKET")[1]||client.traitcall.traitCheck(client,charid,"SPACE")[0]) {
        msg+= `House hasn't been built high enough to reach that gate, but you don't care, you can fly!\n`
      } else {
        message.channel.send(`House hasn't been built high enough to reach that gate! Have your client player build up your house with ${client.auth.prefix}build`);
        return;
      }
    }


    let clientGates;
    let clientCheck = false;

    let sburbClient = client.sburbMap.get(local[4],"client");


    if(client.landMap.has(sburbClient)){

      clientGates = client.landMap.get(sburbClient,"gates");
      clientCheck = true;

    }

    target[0]="s"+Math.ceil(value/2);

    if(value % 2 == 1){
      //odd gates lead to player's own land

      target[1]=Math.floor(Math.random() * 11);
      target[2]=Math.floor(Math.random() * 11);

    }else{
      //even gates lead to player's client's land

      if(!clientCheck||client.landMap.get(sburbClient,"enter")==false){
        message.channel.send("That gate doesn't lead anywhere!");
        return;
      }

      target[1]=clientGates[Math.floor(value/2)][0]
      target[2]=clientGates[Math.floor(value/2)][1]
      target[4]=sburbClient;

    }

    msg+=`You ascend to the ${gateName[value-1]} GATE and find yourself in a `

    break;
    case 3:

    target = ["h",0,0,0,local[4]];
    mapCheck=false;
    msg+=`You enter the RETURN NODE and are transported to a `

    break;
    case 6:

    let server = client.sburbMap.get(local[4],"server");
    let serverid =message.guild.id.concat(server);

    if(!client.landMap.has(serverid)||!client.landMap.get(serverid,"enter")){
      message.channel.send("This gate doesn't lead anywhere!");
      return;
    }

    target = ["h",0,0,0,local[4]];
    mapCheck=false;
    msg+=`You enter the GATE and are transported to a `

    break;
    case 1:

    if(local[0].length>1&&local[0].charAt(local[0].length-1)=="d"){

      target[0]=target[0].slice(0,-1);
      msg+=`You exit the DUNGEON through the `;

    }else{

      target[0]+="d";

      if(!client.landMap.has(target[4],target[0])){
        message.channel.send("Couldn't find a dungeon!");
        return;
      }
      msg+=`You enter the DUNGEON through the `;
    }

    break;
    case 13:

      if(local[0].charAt(local[0].length-1)=="m"){
        target[0]=target[0].slice(0,1);
      } else {
        target[0]+="m";
      }
      msg+=`You cross the `
      setTimeout(function(){client.tutorcall.progressCheck(client,message,41);},1500);
    break;
    case 46:

      floor = parseInt(target[0].charAt(target[0].length-1),10);
      if(isNaN(floor)){
        target[0]+="1";
      }else{
        target[0]=target[0].slice(0,-1)+`${(floor+1)}`;
      }
      msg+=`Tou DESCEND deeper into the DUNGEON, you can go back up using the `;

    break;
    case 47:

      floor = parseInt(target[0].charAt(target[0].length-1),10);
      if(isNaN(floor)){
        message.channel.send("You're already on the top floor!");
        return;
      }

      if(floor<2){
        target[0]=target[0].slice(0,-1);
      }else{
        target[0]=target[0].slice(0,-1)+`${(floor-1)}`;
      }

      msg+=`You ASCEND higher in the DUNGEON, you can go back down using the `

    break;
    case 12:

      if(local[0].charAt(local[0].length-1)!="c"){
        target[0]+="c";
        target[1]=5;
        target[2]=5;
        msg+=`Entering the `;
      } else {
        if(client.landMap.has(local[4],"castleLocal")){
          castleLocal = client.landMap.get(local[4],"castleLocal");
          target[1]=castleLocal[0];
          target[2]=castleLocal[1];
        }
        target[0]=target[0].slice(0,-1);
        msg+=`Exiting the `
      }

    break;
    default:

    message.channel.send("You can't do that here!");
    return;

  }

  client.funcall.actionCheck(client,message);
  client.funcall.move(client,message,charid,local,target,mapCheck,msg);

}
