const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");
exports.type = "sylladex";
exports.desc = "Equip a weapon"
exports.use = `">equip [number]" equips a weapon from your sylladex, as long as you have an allocated Strife Specibus of the same weaponkind. The number of weapons you can equip starts at 2, and can be expanded by using Strife Cards.
">equip specibus" does the same thing as ">switch".
">equip trinket" does the same thing as ">trinket equip".
">equip armor" does the same thing as ">armor equip".`
exports.run = (client, message, args) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");

  let sdex = client.charcall.charData(client,charid,"sdex");
  let cards = client.charcall.charData(client,charid,"cards");
  let scards = client.charcall.charData(client,charid,"scards");
  let spec = client.charcall.charData(client,charid,"spec");
  let kinds = client.charcall.charData(client,charid,"kinds");

//make sure strife specibus is allocated

  if(kinds.length == 0){
    message.channel.send(`Your STRIFE SPECIBUS is not currently allocated to a weaponkind, you must ${client.auth.prefix}allocate it before you can ${client.auth.prefix}equip a weapon!`);
    return;
  };

  if(!args[0]){
    message.channel.send(`You need to select an item from your sylladex to add to your STRIFE SPECIBUS! You can see a full list of items in your sylladex with ${client.auth.prefix}sylladex. Allocate an item using the position number in the sylladex, for example: ${client.auth.prefix}equip 3`);
    return;
  }
  
  args[0] = args[0].toLowerCase();
  
  if(args[0] == "armor" || args[0] == "armour")
  {
	let cmd = client.commands.get("armor");
	args[0] = "equip";
	cmd.run(client,message,args);
	return;
  }
  else if(args[0] == "trinket")
  {
	let cmd = client.commands.get("trinket");
	args[0] = "equip";
	cmd.run(client,message,args);
	return;
  }
  else if(args[0] == "weapon" || args[0] == "specibus")
  {
	let cmd = client.commands.get("switch");
	args.splice(0, 1);
	cmd.run(client,message,args);
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


  let equipItem;
  if (sdex[selectDex][3] == 1) {
    equipItem = sdex.splice(selectDex,1)[0];
  } else {
    equipItem = [sdex[selectDex][0], sdex[selectDex][1], sdex[selectDex][2], 1, sdex[selectDex][4]];
    sdex[selectDex][3]--;
  }

  spec.push(equipItem);

  client.charcall.setAnyData(client,userid,charid,sdex,"sdex");
  client.charcall.setAnyData(client,userid,charid,spec,"spec");
  client.funcall.tick(client,message);

  client.tutorcall.progressCheck(client,message,23,["text",`Successfully EQUIPPED the ${equipItem[0]} to your STRIFE SPECIBUS`]);

}
