const funcall = require("../modules/funcall.js");
//command usage: >move [direection / room]
const strifecall = require("../modules/strifecall.js");
const landcall = require("../modules/landcall.js");

//ADDS TO ACTION COUNT!!!

exports.run = (client, message, args) => {

  if(funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }
  if(strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
    return;
  }

  //declare variables

  var charid = message.guild.id.concat(message.author.id);
  var occset = [true,charid];
  let msg = ``;
  let local = client.playerMap.get(charid,"local");
  let land = local[4];
  let sec;
  try{
  sec = client.landMap.get(land,local[0]);
} catch (err) {
  console.log(local[0])
  console.log(land);
  console.log(message.author.username);
  client.landMap.get(land,local[0]);
}
  let area = sec[local[1]][local[2]];
  let room = area[2][local[3]];
  const typeList = ["CLEARING","DUNGEON","CONSTRUCT","RETURN NODE","VILLAGE","HOUSE","GATE"];


  //check if blank >move message to send directory

  if(!args[0]){

    //send room directory of area in chat

    let i;
    for (i = 0; i < area[2].length; i++) {
      console.log(area[2][i]);
      msg += `**[${i+1}] ${area[2][i][2]}**\n\n`
    }
    roomDirect = new client.Discord.MessageEmbed()
    .setTitle(`**AREA DIRECTORY**`)
    .addField("**ROOMS**",msg);
    message.channel.send(roomDirect);
    return;
  }

  if(args[0]=="north" || args[0]=="n" || args[0]=="south" || args[0]=="s" || args[0]=="east" || args[0]=="e" || args[0]=="west" || args[0]=="w") {

    //move between areas on land, cannot be done from house

    if(local[0]=="h") {
      message.channel.send("You can't do that here!");
      return;
    }

    switch(args[0]) {
      case "north":
      case "n":
      if(local[1]<=0){
        message.channel.send("You've reached the edge of the section! You can't go any farther!");
        return;
      }

      sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);

      local[1]-=1;
      local[3]=0;

      sec[local[1]][local[2]][2][local[3]][4].push(occset);

      sec =  strifecall.underSpawn(client,local,sec);
      sec[local[1]][local[2]][2][local[3]][3]=true;
      client.playerMap.set(charid,local,"local");
      client.landMap.set(land,sec,local[0]);

      msg+=`You move North and find a ${typeList[sec[local[1]][local[2]][0]]}`;

      break;

      case "south":
      case "s":
      if(local[1]>=10){
        message.channel.send("You've reached the edge of the section! You can't go any farther!");
        return;
      }

      sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);

      local[1]+=1;
      local[3]=0;

      sec[local[1]][local[2]][2][local[3]][4].push(occset);

      sec =  strifecall.underSpawn(client,local,sec);
      sec[local[1]][local[2]][2][local[3]][3]=true;
      client.playerMap.set(charid,local,"local");
      client.landMap.set(land,sec,local[0]);
      msg+=`You move South and find a ${typeList[sec[local[1]][local[2]][0]]}`
      break;

      case "east":
      case "e":
      if(local[2]>=sec.length-1){
        message.channel.send("You've reached the edge of the section! You can't go any farther!");
        return;
      }

      sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);

      local[2]+=1;
      local[3]=0;

      sec[local[1]][local[2]][2][local[3]][4].push(occset);

      sec =  strifecall.underSpawn(client,local,sec);
      sec[local[1]][local[2]][2][local[3]][3]=true;
      client.playerMap.set(charid,local,"local");
      client.landMap.set(land,sec,local[0]);
      msg+=`You move East and find a ${typeList[sec[local[1]][local[2]][0]]}`
      break;

      case "west":
      case "w":
      if(local[2]<=0){
        message.channel.send("You've reached the edge of the section! You can't go any farther!");
        return;
      }


      sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);

      local[2]-=1;
      local[3]=0;

      sec[local[1]][local[2]][2][local[3]][4].push(occset);
      sec =  strifecall.underSpawn(client,local,sec);
      sec[local[1]][local[2]][2][local[3]][3]=true;
      client.playerMap.set(charid,local,"local");
      client.landMap.set(land,sec,local[0]);
      msg+=`You move West and find a ${typeList[sec[local[1]][local[2]][0]]}`;
      break;
    }

    let occNew = sec[local[1]][local[2]][2][local[3]][4];

    if(occNew.length > 1){
      let occCheck = [false,false];
      for(i=0;i<occNew.length;i++){
        if(occNew[i][0]==false){
          occCheck[0]=true;
        } else if(!occNew[i][1]==charid){
          occCheck[1]=true;
        }
      }
      if(occCheck[0]&&occCheck[1]){
        msg+="\nThere are players and Underlings in this area!";
      } else if(occCheck[0]){
        msg+="\nThere are Underlings in this area!";
      } else {
        msg+="\nThere are Players in this area!";
      }
    }
    message.channel.send(msg);
    landcall.miniMap(client,message);

  } else {

    //move between rooms in an area

    value = parseInt(args[0], 10) - 1;
    if(isNaN(value)){
      message.channel.send("That is not a valid argument!");
      return;
    }

    if(value >= area[2].length || value < 0){
      message.channel.send("That is not a valid room! Check the list of room's with >move");
      return;
    }

    //remove player from old occupancy list

      //let oldOcc = room[4];
      //oldOcc = oldOcc.splice(oldOcc.findIndex(occpos => occpos[1] === occset[1]),1);
      //sec[local[1]][local[2]][2][local[3]][4] = oldOcc;

    sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);

    //change player room designation

    local[3] = value;

    //add player to new occupancy list

    sec[local[1]][local[2]][2][local[3]][4].push(occset);

    message.channel.send(`Moving to the ${area[2][value][2]}!`);
    if(sec[local[1]][local[2]][2][local[3]][4].length <= 1){

    sec =  strifecall.underSpawn(client,local,sec);
    }

    client.playerMap.set(charid,local,"local");
    client.landMap.set(land,sec,local[0]);


  }

}
