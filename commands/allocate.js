const funcall = require("../modules/funcall.js");
const strifecall = require("../modules/strifecall.js");

//used to allocate a weaponkind to the strife specibus

exports.run = (client, message, args) => {


  //declare important variables
  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");

  let sdex = client.charcall.charData(client,charid,"sdex");
  let cards = client.charcall.charData(client,charid,"cards");

  let kinds = client.charcall.charData(client,charid,"kinds");
  let port = client.charcall.charData(client,charid,"port");

  //check if the list kinds is already greater than or equal to the amount of specibi a player has in their portfolio

  if(kinds.length >= port){
    message.channel.send(`All of your STRIFE SPECIBI are already allocated!`);
    return;
  };

  //check for second argument

  if(!args[0]){
    message.channel.send(`You need to select an item from your sylladex to allocate! You can see a full list of items in your sylladex with ${client.auth.prefix}sylladex. Allocate an item using the position number in the sylladex, for example: ${client.auth.prefix}allocate 3`);
    return;
  }

//convert argument into number

  selectDex = parseInt(args[0], 10) - 1;
  if(isNaN(selectDex)){

    message.channel.send("That is not a valid argument!");
    return;
  }


//check if argument is an item in sylladex

  if(selectDex >= cards || selectDex< 0 || selectDex >= sdex.length){
    message.channel.send(`That is not a valid item! Check the list of items in your Sylladex with ${client.auth.prefix}sylladex`);
    return;
  }

  let weaponkind = client.kind[client.codeCypher[0][client.captchaCode.indexOf(sdex[selectDex][1].charAt(0)) /*-1*/  ]];

//checks for blacklisted weaponkinds

  if(client.weaponkinds[weaponkind].t == 3){
    message.channel.send("That is an invalid weaponkind!");
    return;
  };

//checks to see if weaponkind is already allocated

  if(kinds.includes(weaponkind)==true){
    message.channel.send("That weaponkind is already allocated!");
  }

//push weaponkind into specibus list

  kinds.push(weaponkind);

  client.charcall.setAnyData(client,userid,charid,kinds,"kinds");
  message.channel.send(`Successfully allocated specibus to ${weaponkind}!`)
}
