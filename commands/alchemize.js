const funcall = require("../modules/funcall.js");

const strifecall = require("../modules/strifecall.js");

//command to alchemize an item from a totem in the alchemiter

exports.run = (client, message, args) => {

  if(funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

  if(strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
    return;
  }

//defining the costs to alchemize the item based on the tier

  const tierCost = [0,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768,65536,131072]

//defining important variables

  var charid = message.guild.id.concat(message.author.id);
  var local = client.playerMap.get(charid,"local");
  let land = local[4];
  let sec = client.landMap.get(land,local[0]);
  let area = sec[local[1]][local[2]];
  let room = area[2][local[3]];
  var playerGrist = client.playerMap.get(charid,"grist");

//define variables for the FOR loop

  let i;
  let alchemiter = [false,false];
  let item;
  let cost1;
  let cost2;
  let grist;

//Check every item in the room to find alchemiter, if there is check for any cruxite artifact

  for(i=0;i<room[5].length;i++){
    if(room[5][i][1]=="////////"&&room[5][i][0]=="ALCHEMITER"){
      alchemiter[0]=true;
      if(room[5][i][4].length==1){
        alchemiter[1]=true;
        item = room[5][i][4][0][4][0];
      }
    }
  }

  if(alchemiter[0]==true){

    if(alchemiter[1]==true){

//check if alchemized item is a cruxite artifact

      if(item[1]=="////////" && item[0]=="CRUXITE ARTIFACT"){
        cost1=0;
        cost2=0;
        grist="artifact";
      } else {
        cost1=tierCost[item[2]];
        cost2=tierCost[item[2]-1];
        grist=client.gristTypes[client.codeCypher[1][client.captchaCode.indexOf(item[1].charAt(1))]];
      }

//check for the quantity of the item to be alchemized
      if(args[0]){

        quantity = parseInt(args[0], 10);
        if(isNaN(quantity)){
          message.channel.send("That is not a valid argument!");
          return;
        }
        if(quantity<=0){
          message.channel.send("The quantity must be more than 0");
          return;
        }
        if(quantity>=10000){
          message.channel.send("The quantity must be less than 10000");
          return;
        }

//increase price based on quantity alchemized

        cost1*=quantity;
        cost2*=quantity;

        if(playerGrist[0]<cost1||playerGrist[client.grist[grist].pos]<cost2){
          message.channel.send("You can't afford to alchemize that!");
          return;
        }

//Deduct price from grist and place alchemized artifact in room

        playerGrist[0]-=cost1;
        playerGrist[client.grist[grist].pos]-=cost2;
        item[3]=quantity;
        room[5].push([item[0],item[1],item[2],quantity,[]]);
        client.playerMap.set(charid,playerGrist,"grist");
        sec[local[1]][local[2]][2][local[3]] = room;
        client.landMap.set(land,sec,local[0]);

        message.channel.send(`Expended **${client.emojis.cache.get(client.grist["build"].emoji)} ${cost1}** and **${client.emojis.cache.get(client.grist[grist].emoji)} ${cost2}** to alchemize the **${item[0]} x${quantity}**`);
        return;

      } else {
        //display the cost for the item
        message.channel.send(`The resulting item costs **${client.emojis.cache.get(client.grist["build"].emoji)} ${cost1}** and **${client.emojis.cache.get(client.grist[grist].emoji)} ${cost2}**\nALCHEMIZE it by doing '>alchemize' followed by the quantity of the item you wish to alchemize`);
        return;
      }

    } else {
      message.channel.send("It seems there's an ALCHEMITER, but it doesn't have a TOTEM!");
      return;
    }

  }else{
    message.channel.send("To ALCHEMIZE, you must be in a room with an ALCHEMITER");
    return;
  }

}
