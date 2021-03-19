const funcall = require("../modules/funcall.js");
//command usage: >move [direction / room]
const strifecall = require("../modules/strifecall.js");
const landcall = require("../modules/landcall.js");

//ADDS TO ACTION COUNT!!!
exports.run = (client, message, args) => {

  if(client.strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
    return;
  }

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");
  var occset = [true,charid];
  let msg = ``;
  let local = client.playerMap.get(charid,"local");
  let mapCheck = true;
  let sec = client.landMap.get(local[4],local[0])

  if(!args[0]){

    //send room directory of area in chat


    for (let i = 0; i < sec[local[1]][local[2]][2].length; i++) {
      msg += `**[${i+1}] ${sec[local[1]][local[2]][2][i][2]}**\n\n`
    }
    roomDirect = new client.Discord.MessageEmbed()
    .setTitle(`**AREA DIRECTORY**`)
    .addField("**HELP**","Select a room number below to move to that room in this area, or select a direction (North, South, East or West) to move to the surrounding area!")
    .addField("**ROOMS**",msg);
    message.channel.send(roomDirect);
    return;
  }

  let target = [local[0],local[1],local[2],local[3],local[4]];

  value = parseInt(args[0], 10) - 1;

  if(isNaN(value)){

    switch(args[0]){
      case "n":
      case "north":
        target[1]=local[1]-1;
        msg+=`You move NORTH and enter a `;
      break;
      case "s":
      case "south":
        target[1]=local[1]+1;
        msg+=`You move SOUTH and enter a `;
      break;
      case "e":
      case "east":
        target[2]=local[2]+1;
        msg+=`You move EAST and enter a `;
      break;
      case "w":
      case "west":
        target[2]=local[2]-1;
        msg+=`You move WEST and enter a `;
      break;
      default:

      message.channel.send("That is not a valid argument! Select a direction or room to move to!");
      return;

    }

  } else {
    console.log(local);
    if(value >= sec[local[1]][local[2]][2].length || value < 0){
      message.channel.send("That is not a valid room! Check the list of room's with >move");
      return;
    }

    target[3]=value;
    msg+=`You move between rooms and enter the `;
    mapCheck = false;

  }

  if(target[1]>=sec.length||target[2]>=sec.length||target[1]<0||target[2]<0){
    message.channel.send("You've reached the edge of the section! You can't go any farther!");
    return;
  } else if(sec[target[1]][target[2]][0]==7){
    message.channel.send("you can't go that way!");
    return;
  } else if(target[0].length>1&&target[0].charAt(local[0].length-1)=="d"){
    if(sec[local[1]][local[2]][2][0][3]==false && landcall.underlingCheck(sec[local[1]][local[2]][2][local[3]][4])){

      message.channel.send("You can't continue on until the Underlings have been defeated!");
      return;
    }
  }
  console.log("Calling move function");
  let move = client.funcall.move(client,message,charid,local,target,mapCheck,msg);
}
/*
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

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");
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
      } else if(sec[local[1]-1][local[2]][0]==7){
        message.channel.send("you can't go that way!");
        return;
      } else if(local[0].length==3){
        if(sec[local[1]-1][local[2]][2][0][3]==false && landcall.underlingCheck(sec[local[1]][local[2]][2][local[3]][4])){

          message.channel.send("You can't continue on until the Underlings have been defeated!");
          return;
        }
      }

      sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);

      local[1]-=1;
      local[3]=0;

      sec[local[1]][local[2]][2][local[3]][4].push(occset);


    if(local[4]==message.guild.id+"medium"&&sec[local[1]][local[2]][2][local[3]][4].length==1){
      console.log(local[0]);
      switch(local[0]){
        case "dm":
          sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,0,message.guild.id))
        break;
        case "d":
          sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,0,message.guild.id))
        break;
        case "pm":
          sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,1,message.guild.id))
        break;
        case "p":
          sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,1,message.guild.id))
        break;
        case "bf":
          sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,0,message.guild.id),client.landcall.carSpawn(client,local,1,message.guild.id));
        break;
      }
    }else if(local[4]!=message.guild.id+"medium") {
      if(sec[local[1]][local[2]][2][local[3]][3]==false){
    sec =  strifecall.underSpawn(client,local,sec,message.guild.id);
  }
  }
  funcall.actionCheck(client,message);
      sec[local[1]][local[2]][2][local[3]][3]=true;
      client.playerMap.set(charid,local,"local");
      client.landMap.set(land,sec,local[0]);
      client.funcall.sleepHeal(client,charid);

      msg+=`You move North and find a ${typeList[sec[local[1]][local[2]][0]]}`;

      break;

      case "south":
      case "s":
      if(local[1]>=10){
        message.channel.send("You've reached the edge of the section! You can't go any farther!");
        return;
      } else if(sec[local[1]+1][local[2]][0]==7){
        message.channel.send("you can't go that way!");
        return;
      } else if(local[0].length==3){

        if(sec[local[1]+1][local[2]][2][0][3]==false && landcall.underlingCheck(sec[local[1]][local[2]][2][local[3]][4])){

          message.channel.send("You can't continue on until the Underlings have been defeated!")
          return;
        }
      }

      sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);

      local[1]+=1;
      local[3]=0;

      sec[local[1]][local[2]][2][local[3]][4].push(occset);

        if(local[4]==message.guild.id+"medium"&&sec[local[1]][local[2]][2][local[3]][4].length==1){
          switch(local[0]){
            case "dm":
              sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,0,message.guild.id))
            break;
            case "d":
              sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,0,message.guild.id))
            break;
            case "pm":
              sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,1,message.guild.id))
            break;
            case "p":
              sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,1,message.guild.id))
            break;
            case "bf":
              sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,0,message.guild.id),client.landcall.carSpawn(client,local,1,message.guild.id));
            break;
          }
        }else if(local[4]!=message.guild.id+"medium"){
          if(sec[local[1]][local[2]][2][local[3]][3]==false){
        sec =  strifecall.underSpawn(client,local,sec,message.guild.id);
      }
      }
      funcall.actionCheck(client,message);


      sec[local[1]][local[2]][2][local[3]][3]=true;
      client.playerMap.set(charid,local,"local");
      client.landMap.set(land,sec,local[0]);
      client.funcall.sleepHeal(client,charid);
      msg+=`You move South and find a ${typeList[sec[local[1]][local[2]][0]]}`
      break;

      case "east":
      case "e":
      if(local[2]>=sec.length-1){
        message.channel.send("You've reached the edge of the section! You can't go any farther!");
        return;
      } else if(sec[local[1]][local[2]+1][0]==7){
        message.channel.send("you can't go that way!");
        return;
      } else if(local[0].length==3){

        if(sec[local[1]][local[2]+1][2][0][3]==false && landcall.underlingCheck(sec[local[1]][local[2]][2][local[3]][4])){

          message.channel.send("You can't continue on until the Underlings have been defeated!")
          return;
        }
      }

      sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);

      local[2]+=1;
      local[3]=0;

      sec[local[1]][local[2]][2][local[3]][4].push(occset);

      if(local[4]==message.guild.id+"medium"&&sec[local[1]][local[2]][2][local[3]][4].length==1){
        switch(local[0]){
          case "dm":
            sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,0,message.guild.id))
          break;
          case "d":
            sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,0,message.guild.id))
          break;
          case "pm":
            sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,1,message.guild.id))
          break;
          case "p":
            sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,1,message.guild.id))
          break;
          case "bf":
            sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,0,message.guild.id),client.landcall.carSpawn(client,local,1,message.guild.id));
          break;
        }
      }else if(local[4]!=message.guild.id+"medium"){
        if(sec[local[1]][local[2]][2][local[3]][3]==false){
      sec =  strifecall.underSpawn(client,local,sec,message.guild.id);
    }
    }
    funcall.actionCheck(client,message);
      sec[local[1]][local[2]][2][local[3]][3]=true;
      client.playerMap.set(charid,local,"local");
      client.landMap.set(land,sec,local[0]);
      client.funcall.sleepHeal(client,charid);
      msg+=`You move East and find a ${typeList[sec[local[1]][local[2]][0]]}`
      break;

      case "west":
      case "w":
      if(local[2]<=0){
        message.channel.send("You've reached the edge of the section! You can't go any farther!");
        return;
      }else if(sec[local[1]][local[2]-1][0]==7){
        message.channel.send("you can't go that way!");
        return;
      }else if(local[0].length==3){


        if(sec[local[1]][local[2]-1][2][0][3]==false && landcall.underlingCheck(sec[local[1]][local[2]][2][local[3]][4])){

          message.channel.send("You can't continue on until the Underlings have been defeated!")
          return;
        }
      }


      sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);

      local[2]-=1;
      local[3]=0;

      sec[local[1]][local[2]][2][local[3]][4].push(occset);

      if(local[4]==message.guild.id+"medium"&&sec[local[1]][local[2]][2][local[3]][4].length==1){
        switch(local[0]){
          case "dm":
            sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,0,message.guild.id))
          break;
          case "d":
            sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,0,message.guild.id))
          break;
          case "pm":
            sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,1,message.guild.id))
          break;
          case "p":
            sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,1,message.guild.id))
          break;
          case "bf":
            sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,0,message.guild.id),client.landcall.carSpawn(client,local,1,message.guild.id));
          break;
        }
      }else if(local[4]!=message.guild.id+"medium"){
        if(sec[local[1]][local[2]][2][local[3]][3]==false){
      sec =  strifecall.underSpawn(client,local,sec,message.guild.id);
    }
    }
    funcall.actionCheck(client,message);
      sec[local[1]][local[2]][2][local[3]][3]=true;
      client.playerMap.set(charid,local,"local");
      client.landMap.set(land,sec,local[0]);
      client.funcall.sleepHeal(client,charid);
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
        msg+="\nThere are players and NPC's in this area!";
      } else if(occCheck[0]){
        msg+="\nThere are NPC's in this area!";
      } else {
        msg+="\nThere are Players in this area!";
      }
    }
    client.funcall.sleepHeal(client,charid);
    message.channel.send(msg);
    landcall.drawMap(client,message,true);

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
    if(local[4]==message.guild.id+"medium"&&sec[local[1]][local[2]][2][local[3]][4].length==1){
      switch(local[0]){
        case "dm":
          sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,0,message.guild.id))
        break;
        case "d":
          sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,0,message.guild.id))
        break;
        case "pm":
          sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,1,message.guild.id))
        break;
        case "p":
          sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,1,message.guild.id))
        break;
        case "bf":
          sec[local[1]][local[2]][2][local[3]][4]=sec[local[1]][local[2]][2][local[3]][4].concat(client.landcall.carSpawn(client,local,0,message.guild.id),client.landcall.carSpawn(client,local,1,message.guild.id));
        break;
      }
    }else if(local[4]!=message.guild.id+"medium"){
      if(sec[local[1]][local[2]][2][local[3]][3]==false&&sec[local[1]][local[2]][2][local[3]][4].length<=1){
    sec =  strifecall.underSpawn(client,local,sec,message.guild.id);
  }
  }
  funcall.actionCheck(client,message);

    client.playerMap.set(charid,local,"local");
    client.landMap.set(land,sec,local[0]);
    client.funcall.sleepHeal(client,charid);


  }

}
*/
