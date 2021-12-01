const funcall = require("../modules/funcall.js");

const strifecall = require("../modules/strifecall.js");

//command to alchemize an item from a totem in the alchemiter

exports.run = (client, message, args) => {

//defining the costs to alchemize the item based on the tier

  const tierCost = [0,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768,65536,131072]

//defining important variables

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  var local = client.charcall.charData(client,charid,"local");
  let land = local[4];
  let sec = client.landMap.get(land,local[0]);
  let area = sec[local[1]][local[2]];
  let room = area[2][local[3]];
  var playerGrist = client.charcall.allData(client,userid,charid,"grist");
  let sdex = client.charcall.charData(client,charid,"sdex");
  let registry = client.charcall.allData(client,userid,charid,"registry");
  if(playerGrist=="NONE"){
    message.channel.send("You can't alchemize without any grist!");
    return;
  }

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
    if(room[5][i][1].charAt(0) == "/"&&room[5][i][0]=="INSTANT ALCHEMITER"){
      ialchemiter = true;
    }
  }


if (ialchemiter == true || client.traitcall.traitCheck(client,charid,"COMPUTER")[1]){

  if(args.length == 1){
    select1 = parseInt(args[0], 10) - 1;
    if(isNaN(select1)){
      message.channel.send("That is is not a valid argument!");
      return;
    }

    if(select1 >= sdex.length || select1< 0){
      message.channel.send(`That is not a valid item! Check the list of items in your Sylladex with ${client.auth.prefix}sylladex`);
      return;
    }
    item1 = sdex[select1].slice();
    item1[4] = [];


    if(item1[1].charAt(0) == "/"||item1[1]=="########"){
      message.channel.send("You can't alchemize that!");
      return;
    }
    registry.unshift(item1);
    client.charcall.setAnyData(client,userid,charid,registry,"registry");
    message.channel.send(`Registered the ${item1[0]} to the alchemy athenaeum! Alchemize it using the ${client.auth.prefix}alchemize command`);
    client.funcall.tick(client,message);
    return;

  }

  if(!args[0]||!args[1]||!args[2]){
    client.tutorcall.progressCheck(client,message,48,["text",`To use the Instant Alchemiter, you need to select an item from your sylladex, select an alchemy type (&& or ||), and select a second item from your sylladex. For example, ${client.auth.prefix}quickalch 1 && 2. If you want to just reproduce a single item, just select the first item.`]);
    return;
  }

  select1 = parseInt(args[0], 10) - 1;
  if(isNaN(select1)){

    message.channel.send("Item 1 is not a valid argument!");
    return;
  }
  if(select1 >= sdex.length || select1< 0){
    message.channel.send(`The first selection is not a valid item! Check the list of items in your Sylladex with ${client.auth.prefix}sylladex`);
    return;
  }
  select2 = parseInt(args[2], 10) - 1;
  if(isNaN(select2)){

    message.channel.send("Item 2 is not a valid argument!");
    return;
  }
  if(select2 >= sdex.length || select2< 0){
    message.channel.send(`The second selection is not a valid item! Check the list of items in your Sylladex with ${client.auth.prefix}sylladex`);
    return;
  }

  if(select1==select2){

  }

  item1 = sdex[select1];
  item2 = sdex[select2];

  if(args[1]=="||"||args[1].toLowerCase()=="oror"||args[1].toLowerCase()=="or"){

    newItem = funcall.alchemize(client,item1,item2,"||");

    if(client.traitcall.itemTrait(client,newItem,"SHITTY")){

      newItem[2]=1;
      newItem[1] = newItem[1][0] + "0" + newItem[1].substr(2);

    } else if(client.traitcall.itemTrait(client,newItem,"TRICKSTER")){
      newItem[2]=16;
      newItem[1] = newItem[1][0] + "?" + newItem[1].substr(2);
    } else if(client.traitcall.itemTrait(client,newItem,"EXQUISITE")){

      newItem[1] = newItem[1][0] + "!" + newItem[1].substr(2);

    }

    registry.unshift(newItem);
    client.charcall.setAnyData(client,userid,charid,registry,"registry");
    message.channel.send(`Registered the resulting item to the alchemy athenaeum! Alchemize it using the ${client.auth.prefix}alchemize command`);
    client.funcall.tick(client,message);
    return;

    /*cost1=tierCost[newItem[2]];
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
  funcall.actionCheck(client,message,"alchemized");*/
    return;


  } else if(args[1]=="&&"||args[1].toLowerCase()=="andand"||args[1].toLowerCase()=="and"){

    newItem = funcall.alchemize(client,item1,item2,"&&");

    if(client.traitcall.itemTrait(client,newItem,"SHITTY")){

      newItem[2]=1;
      newItem[1] = newItem[1][0] + "0" + newItem[1].substr(2);

    } else if(client.traitcall.itemTrait(client,newItem,"TRICKSTER")){
      newItem[2]=16;
      newItem[1] = newItem[1][0] + "?" + newItem[1].substr(2);
    } else if(client.traitcall.itemTrait(client,newItem,"EXQUISITE")){

      newItem[1] = newItem[1][0] + "!" + newItem[1].substr(2);

    }

    registry.unshift(newItem);
    client.charcall.setAnyData(client,userid,charid,registry,"registry");
    message.channel.send(`Registered the resulting item to the alchemy athenaeum! Alchemize it using the ${client.auth.prefix}alchemize command`);
    client.funcall.tick(client,message);
    return;
/*
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

*/

  } else {
    message.channel.send("That is not a valid alchemy type!");
    return;
  }


}else{
    client.tutorcall.progressCheck(client,message,42,["text","To QUICK ALCHEMIZE, you must be in a room with an INSTANT ALCHEMITER."]);
    return;
  }

}
