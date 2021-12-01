const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");

const tierCost = [0,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768,65536,131072]

exports.run = (client, message, args) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");

//retrieve player location and check for computer

  var local = client.charcall.charData(client,charid,"local");
  var room = client.landMap.get(local[4],local[0])[local[1]][local[2]][2][local[3]];
  const phernalia = ["cruxtruder","totem lathe","alchemiter","pre-punched card","punch designix","instant alchemiter","transportalizer"]

  let compCheck = client.traitcall.compTest(client,message,charid,room);

  if(compCheck[0]==false){
    message.channel.send("To use SBURB commands, you must have an item with the COMPUTER trait either in your Inventory or in the room you are in.");
    return;
  }
  if(compCheck[1]==false){
    message.channel.send("It seems that you have a computer, but you don't have SBURB installed on it!");
    return;
  }

  //check if connected to a client

  if(client.charcall.allData(client,userid,charid,"client") == "NA"||client.charcall.allData(client,userid,charid,"client")=="NONE") {
    message.channel.send("You aren't connected to a client!");
    return;
  }

  let clientid = client.charcall.allData(client,userid,charid,"client");
  let targcharid = client.charcall.charGet(client,clientid);
//retrieve client information


  let clientSec = client.landMap.get(clientid,"h");
  let gristLand = client.landMap.get(clientid,"grist")[0];
  let deployCheck = client.charcall.allData(client,userid,targcharid,"deploy");
  let gristCheck = client.charcall.allData(client,userid,targcharid,"grist");

  //let defaultRegistry = [client.registry["cruxtruder"].item,client.registry["totem lathe"].item,client.registry["alchemiter"].item,client.registry["pre-punched card"].item,client.registry["punch designix"].item,client.registry["instant alchemiter"].item]

  let defaultRegistry=[];
  for(i=0;i<phernalia.length;i++){
    defaultRegistry.push(client.registry[phernalia[i]].item)
  }

  let clientRegistry = client.charcall.allData(client,userid,targcharid,"registry");

  let registry = defaultRegistry.concat(clientRegistry);

  let defCost = [];
  let grist;
  let cost;

  for(i=0;i<phernalia.length;i++){
    if(phernalia[i]=="punch designix"){

      grist = gristLand;
      cost = 4;

    }else{
      grist = "build";
    if(deployCheck[i]==false){
      cost = client.registry[phernalia[i]].cost;
    } else {
      cost = client.registry[phernalia[i]].costT;
    }
  }
    defCost.push([grist,cost]);

  }

//if no arguments, display list of deployable items

  if(!args[0]) {

    if(!args[1] || args[1] == "page"){
      let page = 0;
      if (args[2]&&args[1] == "page") {
        page = parseInt(args[2], 10) - 1;
        if (isNaN(page)||page<0) {
          message.channel.send("That is not a valid page number!");
          return;
        }
      }

      async function dexCheck(){

      const attachment = await client.imgcall.alchCheck(client,message,page,args,registry,defCost,"phernalia registry");

        client.tutorcall.progressCheck(client,message,19,["img",attachment]);
      }

      dexCheck();
      return;
  }
}

  //if no second argument, display list of rooms in players house
  if(!args[1]) {
    let msg=``;
    let i;
    for(i=0;i<clientSec[0][0][2].length;i++){
      msg += `**[${i+1}] ${clientSec[0][0][2][i][2]}**\n\n`

    }
    roomDirect = new client.MessageEmbed()
    .setTitle(`**CLIENT HOUSE DIRECTORY**`)
    .addField("**ROOMS**",msg);
    message.channel.send({embeds: [roomDirect]});
    return;
  }

  value = [parseInt(args[0], 10)-1, parseInt(args[1], 10)-1];
  if(isNaN(value[0]) || isNaN(value[1]) || value[1]>=clientSec[0][0][2].length || value[0]>=registry.length || value[0]<0||value[1]<0){
    message.channel.send("That is not a valid argument! Make sure to select the room to deploy the item after selecting the item to be deployed");
    return;
  }

    let tier = registry[value[0]][2];

    let gristType = client.gristTypes[client.codeCypher[1][client.captchaCode.indexOf(registry[value[0]][1].charAt(1))]];

    if(client.traitcall.itemTrait(client,registry[value[0]],"SHITTY")){

      tier=1;
      gristType = "artifact";

    } else if(client.traitcall.itemTrait(client,registry[value[0]],"TRICKSTER")){
      tier=16;
      gristType = "zillium";
    }

    let cost1 = tierCost[tier];
    let cost2 = tierCost[tier-1];

    if(client.traitcall.itemTrait(client,registry[value[0]],"EXQUISITE")){

      gristType = "diamond";

    }

    cost1 = tierCost[tier];
    cost2 = tierCost[tier-1];

    if(gristType == "diamond"){
      cost1*=2;
      cost2*=2;
    }

    if(value[0]<defCost.length){
      gristType=defCost[value[0]][0];
      cost1 = 0;
      cost2 = defCost[value[0]][1];
    }

    if(gristCheck[client.grist[gristType].pos]<cost2||gristCheck[0]<cost1){
      message.channel.send("Client cannot afford to deploy that!");
      return;
    }


    if(value[0]<defCost.length){
      if(deployCheck[value[0]]==false){

        if(value[0]==0){

          let spriteID = `n${clientid}`;

          var spriteSheet = {
            name: `KERNELSPRITE`,
            control:[],
            type: "sprite",
            faction: "player",
            vit:100,
            gel:100,
            strife:false,
            gristtype:"diamond",
            pos:0,
            alive:true,
            local:["h",0,0,value[1],clientid],
            sdex:[],
            equip:0,
            trinket:[],
            armor:[],
            spec:[],
            equip:0,
            scards:1,
            kinds:[],
            port:1,
            modus:"STACK",
            cards:4,
            prototype:[],
            prospitRep:0,
            derseRep:0,
            underlingRep:-1,
            playerRep:0,
            consortRep:10,
            prefTarg:[],
            xp:0,
            rung:0,
            b:0,
            bio:`${client.charcall.charData(client,targcharid,"name").toUpperCase()}'S SPRITE`,
            img:"https://media.discordapp.net/attachments/808210897008984087/808224784856514560/Kernelsprite-gray.gif"
          }
          client.npcMap.set(spriteID,spriteSheet);

          clientSec[0][0][2][value[1]][4].push([false,spriteID]);

        }

        deployCheck[value[0]]=true;
        client.charcall.setAnyData(client,userid,targcharid,deployCheck,"deploy");
      }
    }

    gristCheck[client.grist[gristType].pos]-=cost2;
    gristCheck[0]-=cost1;

    if(registry[value[0]][1].charAt(0)=="@"){

      let transCount = client.landMap.get(message.guild.id+"medium","transCount");

      if(transCount>1000){
        message.channel.send("There are too many transportalizers in this session!");
        return;
      }

      let transList = client.landMap.get(message.guild.id+"medium","transList");
      let transCode = "0000";
      while(transList.includes(transCode)||transCode=="0000"){
        transCode = "";
        for(i=0;i<4;i++){
          transCode+= client.captchaCode[Math.floor(Math.random()*38)]
        }
      }

      var transSet = {
        local:["h",0,0,value[1],clientid],
        target:""
      }

      client.transMap.set(`${message.guild.id}${transCode}`,transSet);
      transList.push(transCode);
      transCount++;
      registry[value[0]][1]=registry[value[0]][1].substring(0,4)+transCode;
      client.landMap.set(message.guild.id+"medium",transList,"transList");
      client.landMap.set(message.guild.id+"medium",transCount,"transCount");

    }

  clientSec[0][0][2][value[1]][5].push(registry[value[0]]);
  client.landMap.set(clientid,clientSec,"h");
  client.charcall.setAnyData(client,userid,targcharid,gristCheck,"grist");
  client.funcall.tick(client,message);

  let deployedItem = registry[value[0]][0].toUpperCase();
  message.channel.send(`Deployed the ${deployedItem}`);

  let alertClientList = ["CRUXTRUDER","TOTEM LATHE","ALCHEMITER","PRE-PUNCHED CARD","PUNCH DESIGNIX","INSTANT ALCHEMIZER","TRANSPORTALIZER"];
  if(alertClientList.includes(deployedItem)&&client.charcall.charData(client,targcharid,"local")[0]=="h"){
    client.funcall.chanMsg(client,targcharid,`There's a THUD as something is deployed in your ${clientSec[0][0][2][value[1]][2]}!`);
  }



}
