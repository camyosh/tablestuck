const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {

  if(funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

  if(strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
    return;
  }

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");

  let sdex = client.playerMap.get(charid,"sdex");
  let cards = client.playerMap.get(charid,"cards");

  let scards = client.playerMap.get(charid,"scards");
  let spec = client.playerMap.get(charid,"spec");

  let kinds = client.playerMap.get(charid,"kinds");

//make sure strife specibus is allocated

  if(kinds.length == 0){
    message.channel.send(`Your STRIFE SPECIBUS is not currently allocated to a weaponkind, you must ${client.auth.prefix}allocate it before you can ${client.auth.prefix}equip a weapon!`);
    return;
  };

  if(!args[0]){
    message.channel.send(`You need to select an item from your sylladex to add to your STRIFE SPECIBUS! You can see a full list of items in your sylladex with ${client.auth.prefix}sylladex. Allocate an item using the position number in the sylladex, for example: ${client.auth.prefix}equip 3`);
    return;
  }

  selectDex = parseInt(args[0], 10) - 1;
  if(isNaN(selectDex)){

    message.channel.send("That is not a valid argument!");
    return;
  }
  if(selectDex >= sdex.length || selectDex< 0){
    message.channel.send(`That is not a valid item! Check the list of items in your Sylladex with ${client.auth.prefix}sylladex`);
    return;
  }

  //check selected itemkind is allocated to strife specibus

  let weaponkind = client.kind[client.codeCypher[0][client.captchaCode.indexOf(sdex[selectDex][1].charAt(0)) /*-1*/  ]];

  if(!kinds.includes(weaponkind)) {
    message.channel.send(`Your STRIFE SPECIBUS is allocated to ${kinds}, you can only ${client.auth.prefix}equip ${kinds} weapons!`);
    return;
  }

//check if strife specibus is full

  if(spec.length >= scards) {
    message.channel.send(`Your STRIFE SPECIBUS is full! You can ${client.auth.prefix}specibus eject a weapon to make room.`);
    return;
  }

  let equipItem = sdex.splice(selectDex,1)[0];
  spec.push(equipItem);

  client.playerMap.set(charid,sdex,"sdex");
  client.playerMap.set(charid,spec,"spec");
  client.funcall.tick(client,message);

  message.channel.send(`Successfully EQUIPPED the ${equipItem[0]} to your STRIFE SPECIBUS`);

}
