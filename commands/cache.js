const funcall = require("../modules/funcall.js");
//displays player's grist total
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {
  //check for computer with sburb installed

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");

  var local = client.charcall.charData(client,charid,"local");
  var room = client.landMap.get(local[4],local[0])[local[1]][local[2]][2][local[3]];
  let compCheck = client.traitcall.compTest(client,message,charid,room);
  if(compCheck[0]==false){
    message.channel.send("To use SBURB commands, you must have an item with the COMPUTER trait either in your Inventory or in the room you are in.");
    return;
  }
  if(compCheck[1]==false){
    message.channel.send("It seems that you have a computer, but you don't have SBURB installed on it!");
    return;
  }

  //check if connected to a client

  if(client.charcall.allData(client,userid,charid,"client") == "NA"||client.charcall.allData(client,userid,charid,"client") == "NONE") {
    message.channel.send("You aren't connected to a client!");
    return;
  }

//retrieve client charid

  let targsburb = client.charcall.allData(client,userid,charid,"client");

  client.tutorcall.progressCheck(client,message,20,["embed",client.funcall.gristCacheEmbed(client,targsburb)]);
  return;
}
