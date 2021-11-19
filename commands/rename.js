const funcall = require("../modules/funcall.js");
const strifecall = require("../modules/strifecall.js");
//simple ping command to check if the bot is online.

exports.run = (client, message, args) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  let sdex = client.charcall.charData(client,charid,"sdex");
  let cards = client.charcall.charData(client,charid,"cards");
  let registry = client.charcall.allData(client,userid,charid,"registry");

  selectDex = parseInt(args[0], 10) - 1;
  if(isNaN(selectDex)){
    message.channel.send("That is not a valid argument! Select an item to rename!");
    return;
  }
  if(selectDex >= cards || selectDex< 0 || selectDex >= sdex.length){
    message.channel.send(`That is not a valid item! Check the list of items in your Sylladex with ${client.auth.prefix}sylladex`);
    return;
  }

  if(!args[1]){
    message.channel.send("You must enter a name after selecting an item!");
    return;
  }

  let selectItem = sdex[selectDex];
//combine all args except for selection
  let name = funcall.combineArgs(args);

  let code = selectItem[1];
  let oldName = selectItem[0];

  //check if item code is blacklisted

  if((code == "11111111"&&selectItem[4]==0) || code.charAt(0) == "/") {
    message.channel.send("The name of that item cannot be changed!");
    return;
  }

  if(name.length > 20) {
    message.channel.send("That name is too long!");
    return;
  }

  sdex[selectDex][0]=name;

  client.charcall.setAnyData(client,userid,charid,sdex,"sdex");

  function checkCode(checkItem){
    return checkItem[1] == selectItem[1];
  }
 if(registry!="NONE"){
  let regPos = registry.findIndex(checkCode);
  if(regPos>-1){
    registry[regPos][0]=name;
    client.charcall.setAnyData(client,userid,charid,registry,"registry");
  }
}
  message.channel.send(`Successfully changed the name of ${oldName} to ${name}`);
}
