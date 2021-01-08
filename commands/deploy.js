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

  var charid = message.guild.id.concat(message.author.id);

//retrieve player location and check for computer

  var local = client.playerMap.get(charid,"local");
  var room = client.landMap.get(local[4],local[0])[local[1]][local[2]][2][local[3]];
  var currentInv = client.playerMap.get(charid,"sdex");
  const phernalia = ["cruxtruder","totem lathe","alchemiter","pre-punched card","punch designix","instant alchemiter"]

  let compCheck = client.traitcall.compTest(client,message,charid,room,currentInv);

  if(compCheck[0]==false){
    message.channel.send("To use SBURB commands, you must have an item with the COMPUTER trait either in your Inventory or in the room you are in.");
    return;
  }
  if(compCheck[1]==false){
    message.channel.send("It seems that you have a computer, but you don't have SBURB installed on it!");
    return;
  }

  //check if connected to a client

  if(client.playerMap.get(charid,"client") == "NA") {
    message.channel.send("You aren't connected to a client!");
    return;
  }

  let clientId = message.guild.id.concat(client.playerMap.get(charid,"client"));

//retrieve client information

  let clientLocal = client.playerMap.get(clientId,"local");
  let clientSec = client.landMap.get(clientId,"h");
  let gristType = client.landMap.get(clientId,"grist")[0];
  let deployCheck = client.playerMap.get(clientId,"deploy");
  let gristCheck = client.playerMap.get(clientId,"grist");

//if no arguments, display list of deployable items

  if(!args[0]) {
    let msg=``;
    let i;
    let grist;
    for(i=0;i<phernalia.length;i++){
      if(phernalia[i]=="punch designix"){
        grist = gristType;
      } else{
        grist = "build";
      }
      let cost;
      if(deployCheck[i]==false){
        cost = client.registry[phernalia[i]].cost;
      } else {
        cost = client.registry[phernalia[i]].costT;
      }
      msg += `**[${i+1}] ${phernalia[i].toUpperCase()} - ${client.emojis.cache.get(client.grist[grist].emoji)} ${cost}**\n\n`

    }
    registryDirect = new client.Discord.MessageEmbed()
    .setTitle(`**PHERNALIA REGISTRY**`)
    .addField("**DEPLOYABLE ITEMS**",msg);
    message.channel.send(registryDirect);
    return;
  }

  //if no second argument, display list of rooms in players house
  if(!args[1]) {
    let msg=``;
    let i;
    for(i=0;i<clientSec[0][0][2].length;i++){
      msg += `**[${i+1}] ${clientSec[0][0][2][i][2]}**\n\n`

    }
    roomDirect = new client.Discord.MessageEmbed()
    .setTitle(`**CLIENT HOUSE DIRECTORY**`)
    .addField("**ROOMS**",msg);
    message.channel.send(roomDirect);
    return;
  }

  value = [parseInt(args[0], 10)-1, parseInt(args[1], 10)-1];
  if(isNaN(value[0]) || isNaN(value[1]) || value[1]>=clientSec[0][0][2].length || value[0]>=phernalia.length){
    message.channel.send("That is not a valid argument! Make sure to select the room to deploy the item after selecting the item to be deployed");
    return;
  }

//PUT A CHECK TO MAKE SURE PLAYER CAN AFFORD MACHINE

//check to see if selected item is already deployed and if they can afford it

  if(deployCheck[value[0]]==false){

    if(phernalia[value[0]]=="punch designix"){
      if(gristCheck[client.grist[gristType].pos] < client.registry[phernalia[value[0]]].cost){
        message.channel.send("You can't afford to deploy that!");
        return;
      }
      gristCheck[client.grist[gristType].pos] -= client.registry[phernalia[value[0]]].cost
    }

      else{ if (gristCheck[0] < client.registry[phernalia[value[0]]].cost) {
        message.channel.send("You can't afford to deploy that!");
        return;
      }
      gristCheck[0] -= client.registry[phernalia[value[0]]].cost
    }

    deployCheck[value[0]]=true
    client.playerMap.set(clientId,deployCheck,"deploy");


  } else {
    if(phernalia[value[0]]=="pre-punched card"){
      message.channel.send("You can only deploy that once!");
      return;
    }
    else if(phernalia[value[0]]=="punch designix"){
      if(gristCheck[client.grist[gristType].pos] < client.registry[phernalia[value[0]]].costT){
        message.channel.send("You can't afford to deploy that!");
        return;
      } else {
        gristCheck[client.grist[gristType].pos] -= client.registry[phernalia[value[0]]].costT
      }
    } else {
      if (gristCheck[0] < client.registry[phernalia[value[0]]].costT) {
        message.channel.send("You can't afford to deploy that!");
        return;
      }
      gristCheck[0] -= client.registry[phernalia[value[0]]].costT
    }
  }

  clientSec[0][0][2][value[1]][5].push(client.registry[phernalia[value[0]]].item);
  client.landMap.set(clientId,clientSec,"h");
  client.playerMap.set(clientId,gristCheck,"grist");

  message.channel.send(`Deployed the ${phernalia[value[0]].toUpperCase()}`)


}
