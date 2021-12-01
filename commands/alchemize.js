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
  var gristCheck = client.charcall.allData(client,userid,charid,"grist");
  let sdex = client.charcall.charData(client,charid,"sdex");
  let registry = client.charcall.allData(client,userid,charid,"registry");
//this will catch underlings and prevent them from alchemizing.
if(gristCheck=="NONE"){
  message.channel.send("Sorry, you dont seem to have any grist to alchemize with!");
  return;
}
//define variables for the FOR loop
  let alchemiter = false;
  let item;
  let cost1;
  let cost2;
  let grist;

//Check every item in the room to find alchemiter, if there is check for any cruxite artifact
  for(let i=0;i<room[5].length;i++){
    if(room[5][i][1].charAt(0) == "/"&&(room[5][i][0]=="ALCHEMITER"||room[5][i][0]=="INSTANT ALCHEMITER")){
      alchemiter=true;
    }
  }

 if(alchemiter==true||client.traitcall.traitCheck(client,charid,"COMPUTER")[1]){
   if(!args[0] || args[0] == "page"){
     let page = 0;
     if (args[1]&&args[0] == "page") {
       page = parseInt(args[1], 10) - 1;
       if (isNaN(page)||page<0) {
         message.channel.send("That is not a valid page number!");
         return;
       }
     }

     async function dexCheck(){
     const attachment = await client.imgcall.alchCheck(client,message,page,args,registry,[],"alchemy athenaeum");

       client.tutorcall.progressCheck(client,message,26,["img",attachment]);
     }

     dexCheck();
     return;
 }

  value = parseInt(args[0], 10)-1;

  if(isNaN(value)||value<0||value>=registry.length){
    message.channel.send("That is not a valid item!");
    return;
  }

  let quantity = 1;

  if(args[1]){
    value1 = parseInt(args[1], 10);

    if(isNaN(value1)||value1<1||value1>16){
      message.channel.send("That is not a valid quantity!");
      return;
    }

    quantity = value1;
  }

  let tier = registry[value][2];

  let gristType = client.gristTypes[client.codeCypher[1][client.captchaCode.indexOf(registry[value][1].charAt(1))]];

  if(client.traitcall.itemTrait(client,registry[value],"SHITTY")){

    tier=1;
    gristType = "artifact";

  } else if(client.traitcall.itemTrait(client,registry[value],"TRICKSTER")){
    tier=16;
    gristType = "zillium";
  }

  let cost1 = tierCost[tier];
  let cost2 = tierCost[tier-1];

  if(client.traitcall.itemTrait(client,registry[value],"EXQUISITE")){

    gristType = "diamond";

  }

  cost1 = tierCost[tier];
  cost2 = tierCost[tier-1];

  if(cost2 == undefined){
    cost2=0;
  }

  if(gristType == "diamond"){
    cost1*=2;
    cost2*=2;
  }

  cost1*=quantity;
  cost2*=quantity;

  if(gristCheck[client.grist[gristType].pos]<cost2||gristCheck[0]<cost1){
    message.channel.send("You cannot afford to deploy that!");
    return;
  }

  gristCheck[client.grist[gristType].pos]-=cost2;
  gristCheck[0]-=cost1;

  let newItem = [];

  for(let i=0;i<registry[value].length;i++){
    if(i==3){
      newItem.push(quantity);
    }else{
      newItem.push(registry[value][i]);
    }
  }

  msg = `Expended ${client.emojis.cache.get(client.grist["build"].emoji)} ${cost1} ${client.emojis.cache.get(client.grist[gristType].emoji)} ${cost2} to ALCHEMIZE **${newItem[0].toUpperCase()} x${quantity}!**`

sdex.unshift(newItem);
if(sdex.length > client.charcall.charData(client,charid,"cards")){
  let dropItem = sdex.pop();
  sec[local[1]][local[2]][2][local[3]][5].push(dropItem);
  msg += `\nYour Sylladex is full, ejecting your ${dropItem[0]}!`
}

  client.landMap.set(land,sec,local[0]);
  client.charcall.setAnyData(client,userid,charid,sdex,"sdex");
  client.charcall.setAnyData(client,userid,charid,gristCheck,"grist");

  client.funcall.tick(client,message);

  client.funcall.actionCheck(client,message,"alchemized");
  client.tutorcall.progressCheck(client,message,31,["text",msg]);

  }else{
    client.tutorcall.progressCheck(client,message,26,["text","To ALCHEMIZE, you must be in a room with an ALCHEMITER"]);
    return;
  }

}
