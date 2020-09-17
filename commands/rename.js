const funcall = require("../modules/funcall.js");
const strifecall = require("../modules/strifecall.js");
//simple ping command to check if the bot is online.

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
  let sdex = client.playerMap.get(charid,"sdex");
  let cards = client.playerMap.get(charid,"cards");

  selectDex = parseInt(args[0], 10) - 1;
  if(isNaN(selectDex)){

    message.channel.send("That is not a valid argument!");
    return;
  }
  if(selectDex >= cards || selectDex< 0 || selectDex >= sdex.length){
    message.channel.send("That is not a valid item! Check the list of items in your Sylladex with >sylladex");
    return;
  }

  if(!args[1]){
    message.channel.send("You must enter a name after selecting an item!");
  }

  let selectItem = sdex[selectDex];
//combine all args except for selection
  let name = funcall.combineArgs(args);

  let code = selectItem[1];
  let oldName = selectItem[0];

  //check if item code is blacklisted

  if(code == "11111111" || code == "////////" || code.includes("/")) {
    message.channel.send("The name of that item cannot be changed!");
    return;
  }

  if(name.length > 32) {
    message.channel.send("That name is too long!");
    return;
  }

  sdex[selectDex][0]=name;

  client.playerMap.set(charid,sdex,"sdex");

  message.channel.send(`Successfully changed the name of ${oldName} to ${name}`);
}
