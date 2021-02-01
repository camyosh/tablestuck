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
  let sdex = client.playerMap.get(charid,"sdex");

//define variables for the FOR loop

  let i;
  let alchemiter = [false,false];
  let ialchemiter = false;
  let item;
  let cost1;
  let cost2;
  let grist;

//Check every item in the room to find alchemiter, if there is check for any cruxite artifact


  for(i=0;i<room[5].length;i++){
    if(room[5][i][1]=="////////"&&room[5][i][0]=="INSTANT ALCHEMITER"){
      ialchemiter = true;
    }
    if(room[5][i][1]=="////////"&&room[5][i][0]=="ALCHEMITER"){
      alchemiter[0]=true;
      if(room[5][i][4].length==1){
        alchemiter[1]=true;
        item = room[5][i][4][0][4][0];
      }
    }
  }


if (ialchemiter == true || client.traitcall.traitCheck(client,charid,"COMPUTER")[1]){

  if(args.length == 1 || args.length == 2){
    select1 = parseInt(args[0], 10) - 1;
    if(isNaN(select1)){
      message.channel.send("That is is not a valid argument!");
      return;
    }
    let quantity = 1;
    if (args[1]) {
      quantity = parseInt(args[1], 10);
      if(isNaN(quantity)){
        message.channel.send("That is is not a valid argument!");
        return;
      }
      if(quantity<=0 || quantity>8){
        message.channel.send("The quantity must be more than 0 and less than 8.");
        return;
      }
    }

    if(select1 >= sdex.length || select1< 0){
      message.channel.send("That is not a valid item! Check the list of items in your Sylladex with >sylladex");
      return;
    }
    item1 = sdex[select1].slice();
    item1[3] = quantity;
    item1[4] = [];


    if(item1[1] == "////////"||item1[1]=="########"){
      message.channel.send("You can't alchemize that!");
      return;
    }

    cost1=tierCost[item1[2]]*quantity;
    cost2=tierCost[item1[2]-1]*quantity;

    if (item1[1].charAt(1)=="!") {
      cost1*=2;
      cost2*=2;
    }

    grist=client.gristTypes[client.codeCypher[1][client.captchaCode.indexOf(item1[1].charAt(1))]];

    if(playerGrist[0]<cost1||playerGrist[client.grist[grist].pos]<cost2){
      message.channel.send("You can't afford to alchemize that!");
      return;
    }

    playerGrist[0]-=cost1;
    playerGrist[client.grist[grist].pos]-=cost2;
    room[5].push(item1);
    client.playerMap.set(charid,playerGrist,"grist");
    sec[local[1]][local[2]][2][local[3]] = room;
    client.landMap.set(land,sec,local[0]);

    message.channel.send(`Expended **${client.emojis.cache.get(client.grist["build"].emoji)} ${cost1}** and **${client.emojis.cache.get(client.grist[grist].emoji)} ${cost2}** to alchemize the **${item1[0]} x${quantity}**`);
funcall.actionCheck(client,message,"alchemized");
    return;

  }

  if(!args[0]||!args[1]||!args[2]){
    message.channel.send("To use the Instant Alchemiter, you need to select an item from your sylladex, select an alchemy type (&& or ||), and select a second item from your sylladex. For example, >alchemize 1 && 2. If you want to just reproduce a single item, just select the first item.");
    return;
  }

  select1 = parseInt(args[0], 10) - 1;
  if(isNaN(select1)){

    message.channel.send("Item 1 is not a valid argument!");
    return;
  }
  if(select1 >= sdex.length || select1< 0){
    message.channel.send("The first selection is not a valid item! Check the list of items in your Sylladex with >sylladex");
    return;
  }
  select2 = parseInt(args[2], 10) - 1;
  if(isNaN(select2)){

    message.channel.send("Item 2 is not a valid argument!");
    return;
  }
  if(select2 >= sdex.length || select2< 0){
    message.channel.send("The second selection is not a valid item! Check the list of items in your Sylladex with >sylladex");
    return;
  }

  if(select1==select2){

  }

  item1 = sdex[select1];
  item2 = sdex[select2];

  if(args[1]=="||"){

    newItem = funcall.oror(client,item1,item2);

    if(client.traitcall.itemTrait(client,newItem,"SHITTY")){

      newItem[2]=1;
      newItem[1] = newItem[1][0] + "0" + newItem[1].substr(2);

    } else if(client.traitcall.itemTrait(client,newItem,"TRICKSTER")){
      newItem[2]=16;
      newItem[1] = newItem[1][0] + "?" + newItem[1].substr(2);
    } else if(client.traitcall.itemTrait(client,newItem,"EXQUISITE")){

      newItem[1] = newItem[1][0] + "!" + newItem[1].substr(2);

    }

    cost1=tierCost[newItem[2]];
    cost2=tierCost[newItem[2]-1];

    if(newItem[1].charAt(1)=="!"){
      cost1*=2;
      cost2*=2;
    }

    grist=client.gristTypes[client.codeCypher[1][client.captchaCode.indexOf(newItem[1].charAt(1))]];

    if(playerGrist[0]<cost1||playerGrist[client.grist[grist].pos]<cost2){
      message.channel.send("You can't afford to alchemize that!");
      return;
    }

    playerGrist[0]-=cost1;
    playerGrist[client.grist[grist].pos]-=cost2;
    room[5].push(newItem);
    client.playerMap.set(charid,playerGrist,"grist");
    sec[local[1]][local[2]][2][local[3]] = room;
    client.landMap.set(land,sec,local[0]);

    message.channel.send(`Expended **${client.emojis.cache.get(client.grist["build"].emoji)} ${cost1}** and **${client.emojis.cache.get(client.grist[grist].emoji)} ${cost2}** to alchemize the **${newItem[0]}**`);
  funcall.actionCheck(client,message,"alchemized");
    return;


  } else if(args[1]=="&&"){

    newItem = funcall.andand(client,item1,item2);

    if(client.traitcall.itemTrait(client,newItem,"SHITTY")){

      newItem[2]=1;
      newItem[1] = newItem[1][0] + "0" + newItem[1].substr(2);

    } else if(client.traitcall.itemTrait(client,newItem,"TRICKSTER")){
      newItem[2]=16;
      newItem[1] = newItem[1][0] + "?" + newItem[1].substr(2);
    } else if(client.traitcall.itemTrait(client,newItem,"EXQUISITE")){

      newItem[1] = newItem[1][0] + "!" + newItem[1].substr(2);

    }

    cost1=tierCost[newItem[2]];
    cost2=tierCost[newItem[2]-1];

    if(newItem[1].charAt(1)=="!"){
      cost1*=2;
      cost2*=2;
    }


    grist=client.gristTypes[client.codeCypher[1][client.captchaCode.indexOf(newItem[1].charAt(1))]];

    if(playerGrist[0]<cost1||playerGrist[client.grist[grist].pos]<cost2){
      message.channel.send("You can't afford to alchemize that!");
      return;
    }

    playerGrist[0]-=cost1;
    playerGrist[client.grist[grist].pos]-=cost2;
    room[5].push(newItem);
    client.playerMap.set(charid,playerGrist,"grist");
    sec[local[1]][local[2]][2][local[3]] = room;
    client.landMap.set(land,sec,local[0]);

    message.channel.send(`Expended **${client.emojis.cache.get(client.grist["build"].emoji)} ${cost1}** and **${client.emojis.cache.get(client.grist[grist].emoji)} ${cost2}** to alchemize the **${newItem[0]}**`);
    funcall.actionCheck(client,message,"alchemized");
    return;

  } else {
    message.channel.send("That is not a valid alchemy type!");
    return;
  }


}else if(alchemiter[0]==true){

    if(alchemiter[1]==true){


//check if alchemized item is a cruxite artifact

      if(item[1]=="////////" && item[0]=="CRUXITE ARTIFACT"){
        cost1=0;
        cost2=0;
        grist="artifact";
      } else {

        if(client.traitcall.itemTrait(client,item,"SHITTY")){

          item[2]=1;
          item[1] = item[1][0] + "0" + item[1].substr(2);

        } else if(client.traitcall.itemTrait(client,item,"TRICKSTER")){
          item[2]=16;
          item[1] = item[1][0] + "?" + item[1].substr(2);
        } else if(client.traitcall.itemTrait(client,item,"EXQUISITE")){

          item[1] = item[1][0] + "!" + item[1].substr(2);

        }

        cost1=tierCost[item[2]];
        cost2=tierCost[item[2]-1];

        if(item[1].charAt(1)=="!"){
          cost1*=2;
          cost2*=2;
        }

        grist=client.gristTypes[client.codeCypher[1][client.captchaCode.indexOf(item[1].charAt(1))]];
      }

//check for the quantity of the item to be alchemized
      if(args[0]){

        quantity = parseInt(args[0], 10);
        if(isNaN(quantity)){
          message.channel.send("That is not a valid argument!");
          return;
        }
        if(quantity<=0 || quantity>8){
          message.channel.send("The quantity must be more than 0 and less than 8.");
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

        if(client.traitcall.itemTrait(client,item,"SHITTY")){

          item[2]=1;
          item[1] = item[1][0] + "0" + item[1].substr(2);

        } else if(client.traitcall.itemTrait(client,item,"TRICKSTER")){
          item[2]=16;
          item[1] = item[1][0] + "?" + item[1].substr(2);
        }

        playerGrist[0]-=cost1;
        playerGrist[client.grist[grist].pos]-=cost2;
        room[5].push([item[0],item[1],item[2],quantity,[]]);
        client.playerMap.set(charid,playerGrist,"grist");
        sec[local[1]][local[2]][2][local[3]] = room;
        client.landMap.set(land,sec,local[0]);

        message.channel.send(`Expended **${client.emojis.cache.get(client.grist["build"].emoji)} ${cost1}** and **${client.emojis.cache.get(client.grist[grist].emoji)} ${cost2}** to alchemize the **${item[0]} x${quantity}**`);
        funcall.actionCheck(client,message,"alchemized");
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
