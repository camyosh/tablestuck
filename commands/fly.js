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


  var charid = message.guild.id.concat(message.author.id);
  var occset = [true,charid];
  let msg = ``;
  let local = client.playerMap.get(charid,"local");
  let land = local[4];
  let sec = client.landMap.get(land,local[0]);

  if(!client.traitcall.traitCheck(client,charid,"ROCKET")[1]&&!client.traitcall.traitCheck(client,charid,"SPACE")[0]){
    message.channel.send("You close your eyes and believe as hard as you can in the idea that maybe with a little bit of magic and a little bit of pixie dust you might be able to fly... you open your eyes to find your feet still planeted firmly on the ground as you remember that magic most definitely is not real.");
    return;
  }

  let area = sec[local[1]][local[2]];
  let room = area[2][local[3]];
  const typeList = ["CLEARING","DUNGEON","CONSTRUCT","RETURN NODE","VILLAGE","HOUSE","GATE"];

  if(!args[0] || !args[1]){
    message.channel.send("That is not a valid coordinate!");
    return;
  }

  x = parseInt(args[1], 10);
  if(isNaN(x)||x>10||x<0){
    message.channel.send("That is not a valid argument!");
    return;
  }
  y = parseInt(args[0], 10);
  if(isNaN(y)||y>10||y<0){
    message.channel.send("That is not a valid argument!");
    return;
  }

  sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);

  local[1]=x;
  local[2]=y;
  local[3]=0;

  sec[local[1]][local[2]][2][local[3]][4].push(occset);
  sec =  strifecall.underSpawn(client,local,sec);
  sec[local[1]][local[2]][2][local[3]][3]=true;
  client.playerMap.set(charid,local,"local");
  client.landMap.set(land,sec,local[0]);
  msg+=`You fly to the coordinates and find a ${typeList[sec[local[1]][local[2]][0]]}`;

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


}
