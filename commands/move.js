
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

  let target = [local[0],local[1],local[2],0,local[4]];

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
      message.channel.send(`That is not a valid room! Check the list of room's with ${client.auth.prefix}move`);
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
    if(sec[target[1]][target[2]][2][0][3]==false && client.landcall.underlingCheck(sec[local[1]][local[2]][2][local[3]][4],client)&& !client.funcall.dmcheck(client,message)){

      message.channel.send("You can't continue on until the Underlings have been defeated!");
      return;
    }
  }
  console.log("Calling move function");
  let move = client.funcall.move(client,message,charid,local,target,mapCheck,msg);
}
