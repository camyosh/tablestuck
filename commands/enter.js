//const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
//const strifecall = require("../modules/strifecall.js");
//const landcall = require("../modules/landcall.js");

const gateReq = [0,100,200,400,800,1600,3200,6400,12800];
const gateName = ["FIRST","SECOND","THIRD","FOURTH","FIFTH","SIXTH","SEVENTH"];
exports.type = "sburb";
exports.desc = "Enter a gate, ring, or dungeon";
exports.use = `">enter" either lists all gates you have unlocked if you are in a house, or uses and enterance or exit to a dungeon or return node. This also includes crossing the lunar chain and entering the castle.
">enter [number]" enters the given gate number if it's unlocked and you're in a house.`;
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
	{
    let gristSpent = client.landMap.get(local[4],"spent");
    let gate = client.landMap.get(local[4],"gate");
    let enter = client.landMap.get(local[4],"enter");
    let gristRemaining;
    if(gate>7){
      gristRemaining = "BUILD LIMIT REACHED!";
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
      .addFields(
        {name:"**Gate Reached**",value:gate.toString()},
        {name: gate==7 ? "**Grist to build limit**" : "**Grist to next Gate**",value:gristRemaining.toString()},
        {name:"**Gates**",value:msg});
      message.channel.send({embeds: [gateSend]});

      return;
    }

    value = parseInt(args[0], 10);
    if(isNaN(value) || value<1 || value>7){
      message.channel.send("That is not a valid argument!");
      return;
    }

    if(value>gate){
      if (client.traitcall.traitCheck(client,charid,"ROCKET")[1] || client.traitcall.traitCheck(client,charid,"SPACE")[0] || client.charcall.allData(client,userid,charid,"godtier")==true) {
        msg+= `House hasn't been built high enough to reach that gate, but you don't care, you can fly!\n`
      } else {
        message.channel.send(`House hasn't been built high enough to reach that gate! Have your server player build up your house with ${client.auth.prefix}build`);
        return;
      }
    }

	let tier = Math.ceil(value/2);

    target[0]="s" + tier;

    if(value % 2 == 1){
      //odd gates lead to player's own land

      target[1]=Math.floor(Math.random() * 11);
      target[2]=Math.floor(Math.random() * 11);

    }else{
      //even gates lead to player's client's land, or their client's land, or their client's land

      let targetLand = local[4];

      let clientGates;
      let clientCheck = true;

      for(let i=0; i<tier && clientCheck; i++){

		targetLand = client.sburbMap.get(targetLand,"client");
	    if(client.landMap.has(targetLand))
		{
          clientCheck = true;
		}
		else {
		  clientCheck = false;
		  break;
		}
      }

      if(!clientCheck||client.landMap.get(targetLand,"enter")==false){
        message.channel.send("That gate doesn't lead anywhere!");
        return;
      }

      clientGates = client.landMap.get(targetLand,"gates");

      target[1]=clientGates[tier-1][0];
      target[2]=clientGates[tier-1][1];
      target[4]=targetLand;

    }
    msg+=`You ascend to the ${gateName[value-1]} GATE and find yourself in a `
	}
    break;
    case 3:
    target = ["h",0,0,0,local[4]];
    mapCheck=false;
    msg+=`You enter the RETURN NODE and are transported to a `

    break;
    case 6:
	{
	let tier;
	switch(local[0])
	{
		case "s1": tier = 1; break;
		case "s2": tier = 2; break;
		case "s3": tier = 3; break;
		default:
          message.channel.send("This gate doesn't lead anywhere!");
          return;
	}

	let targetLand = local[4];
	let serverCheck = true;
	for(let i=0; i<tier && serverCheck; i++){

	  targetLand = client.sburbMap.get(targetLand,"server");
	  if(client.landMap.has(targetLand))
	  {
	    serverCheck = true;
	  }
	  else {
	    serverCheck = false;
	    break;
	  }
	}

    if(!serverCheck||!client.landMap.get(targetLand,"enter")){
      message.channel.send("This gate doesn't lead anywhere!");
      return;
    }

    target = ["h",0,0,0,targetLand];
    mapCheck=false;
    msg+=`You enter the GATE and are transported to a `
	}
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
      msg+=`You DESCEND deeper into the DUNGEON, you can go back up using the `;

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
