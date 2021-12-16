const tList = ["MELEE","RANGED","MAGIC","NA"];
const tierDmg = [1,5,7,10,14,19,25,32,40,49,59,70,82,95,109,124,140];

exports.traitCheck = function(client,target,traitName){
  try{
  let check = [false,false];

  let traitCount = 0;
  let specibus = client.charcall.charData(client,target,"spec");
  let equip = client.charcall.charData(client,target,"equip");
  let armor = client.charcall.charData(client,target,"armor");
  let trinket = client.charcall.charData(client,target,"trinket");
  let prototype = client.charcall.charData(client,target,"prototype");
  let checklist = [];
  if(prototype!="NONE"&&prototype.length>0){
    for(let i=0;i<prototype.length;i++){
      checklist.push(prototype[i][1]);
    }
  }
  if(specibus.length != 0) checklist.push(specibus[equip][1]);
  if(armor.length!=0) checklist.push(armor[0][1]);
  if(trinket.length!=0) checklist.push(trinket[0][1]);

    while(checklist.length>0){
      capcode = checklist.pop();
      if(client.traitList[client.captchaCode.indexOf(capcode.charAt(2))]==traitName){
        traitCount++;
      }
      if(client.traitList2[client.captchaCode.indexOf(capcode.charAt(3))]==traitName){
        traitCount++;
      }
    }

  if(traitCount > 0){

    check[0]=true;

    if(traitCount >=3){
      check[1]=true;
    }

  }

  return check;

}catch(err){
  console.log(err);
  return [false,false];
}

}

exports.itemTrait = function(client,item,trait){

  if(client.traitList[client.captchaCode.indexOf(item[1].charAt(2))]==trait||client.traitList2[client.captchaCode.indexOf(item[1].charAt(3))]==trait){
    return true;
  } else {
    return false;
  }

}

//check if player has a computer in rooms
exports.compTest = function(client, message, charid, room) {
  let currentInv = client.charcall.charData(client,charid,"sdex");
  let specibus = client.charcall.charData(client,charid,"spec");
  let armor = client.charcall.charData(client,charid,"armor");
  let trinket = client.charcall.charData(client,charid,"trinket")

    let i;
    //if first value in array is true, it means there is a computer, if both are true, it means the computer has sburbed installed
    let comp = [false,false];


    for(i=0; i < room[5].length; i++) {

      if(client.traitList[client.captchaCode.indexOf(room[5][i][1].charAt(2))] == "COMPUTER" || client.traitList2[client.captchaCode.indexOf(room[5][i][1].charAt(3))] == "COMPUTER") {
        comp[0]=true;

        let j;
        for(j=0;j<room[5][i][4].length; j++){
          if(room[5][i][4][j][1].charAt(0) == "/"&&room[5][i][4][j][0]=="SBURB DISC"){
            comp[1]=true;
          }
        }
      }
    }
    for(i=0; i < currentInv.length; i++) {
      if(client.traitList[client.captchaCode.indexOf(currentInv[i][1].charAt(2))] == "COMPUTER" || client.traitList2[client.captchaCode.indexOf(currentInv[i][1].charAt(3))] == "COMPUTER"){
        comp[0]=true;

        let j;
        for(j=0;j<currentInv[i][4].length; j++){
          if(currentInv[i][4][j][1].charAt(0) == "/"&&currentInv[i][4][j][0]=="SBURB DISC"){
            comp[1]=true;
          }
        }
      }
    }
    for(i=0; i< specibus.length; i++) {
      if(client.traitList[client.captchaCode.indexOf(specibus[i][1].charAt(2))] == "COMPUTER" || client.traitList2[client.captchaCode.indexOf(specibus[i][1].charAt(3))] == "COMPUTER"){
        comp[0]=true;

        let j;
        for(j=0;j<specibus[i][4].length; j++){
          if(specibus[i][4][j][1].charAt(0) == "/"&&specibus[i][4][j][0]=="SBURB DISC"){
            comp[1]=true;
          }
        }
      }
    }
    if(armor.length>0 && (client.traitList[client.captchaCode.indexOf(armor[0][1].charAt(2))] == "COMPUTER" || client.traitList2[client.captchaCode.indexOf(armor[0][1].charAt(3))] == "COMPUTER")){
      comp[0]=true;

      let j;
      for(j=0;j<armor[0][4].length; j++){
        if(armor[0][4][j][1].charAt(0) == "/"&&armor[0][4][j][0]=="SBURB DISC"){
          comp[1]=true;
        }
      }
    }
    if(trinket.length>0 && (client.traitList[client.captchaCode.indexOf(trinket[0][1].charAt(2))] == "COMPUTER" || client.traitList2[client.captchaCode.indexOf(trinket[0][1].charAt(3))] == "COMPUTER")){
      comp[0]=true;

      let j;
      for(j=0;j<trinket[0][4].length; j++){
        if(trinket[0][4][j][1].charAt(0) == "/"&&trinket[0][4][j][0]=="SBURB DISC"){
          comp[1]=true;
        }
      }
    }
  return comp;
}

exports.inspectItem = async function(client, item, message){
  client.Canvas.registerFont("./miscsprites/fontstuck.ttf",{family:`FONTSTUCK`});
  client.Canvas.registerFont("./miscsprites/Courier Std Bold.otf",{family:`Courier Standard Bold`});
  const canvas = client.Canvas.createCanvas(1170,800);
  const ctx = canvas.getContext('2d');

  function applyText(canvas, msg, width){
  let fontsize = 32
  ctx.font = `bold ${fontsize}px Courier Standard Bold`;
     while (ctx.measureText(msg).width > width){
  ctx.font = `bold ${fontsize -= 2}px Courier Standard Bold`;
  }
    return ctx.font;
  }

  let weaponkind = client.kind[client.codeCypher[0][client.captchaCode.indexOf(item[1].charAt(0)) /*-1*/  ]];
  let gristType = client.codeCypher[1][client.captchaCode.indexOf(item[1].charAt(1))];
  let gristName = client.gristTypes[client.codeCypher[1][client.captchaCode.indexOf(item[1].charAt(1))]];
  let trait1 = client.traitList[client.captchaCode.indexOf(item[1].charAt(2))];
  let trait2 = client.traitList2[client.captchaCode.indexOf(item[1].charAt(3))];
  let actions = [``,``,``,``];
  actions[0] = client.action[client.weaponkinds[weaponkind].t][client.codeCypher[4][client.captchaCode.indexOf(item[1].charAt(4))]];
  actions[1] = client.action[client.weaponkinds[weaponkind].t][client.codeCypher[5][client.captchaCode.indexOf(item[1].charAt(5))]];
  actions[2] = client.action[client.weaponkinds[weaponkind].t][client.codeCypher[6][client.captchaCode.indexOf(item[1].charAt(6))]];
  actions[3] = client.action[client.weaponkinds[weaponkind].t][client.codeCypher[7][client.captchaCode.indexOf(item[1].charAt(7))]];

//load all the grist images
const amber = await client.Canvas.loadImage(`./GRIST/AMBER.png`);
const amethyst = await client.Canvas.loadImage(`./GRIST/AMETHYST.png`);
const artifact = await client.Canvas.loadImage(`./GRIST/ARTIFACT.png`);
const caulk = await client.Canvas.loadImage(`./GRIST/CAULK.png`);
const chalk = await client.Canvas.loadImage(`./GRIST/CHALK.png`);
const cobalt = await client.Canvas.loadImage(`./GRIST/COBALT.png`);
const diamond = await client.Canvas.loadImage(`./GRIST/DIAMOND.png`);
const garnet = await client.Canvas.loadImage(`./GRIST/GARNET.png`);
const iron = await client.Canvas.loadImage(`./GRIST/IRON.png`);
const marble = await client.Canvas.loadImage(`./GRIST/MARBLE.png`);
const ruby = await client.Canvas.loadImage(`./GRIST/RUBY.png`);
const shale = await client.Canvas.loadImage(`./GRIST/SHALE.png`);
const tar = await client.Canvas.loadImage(`./GRIST/TAR.png`);
const uranium= await client.Canvas.loadImage(`./GRIST/URANIUM.png`);
const zillium = await client.Canvas.loadImage(`./GRIST/ZILLIUM.png`);
const build = await client.Canvas.loadImage(`./GRIST/BUILD.png`);
const rainbow = await client.Canvas.loadImage(`./GRIST/RAINBOW.png`);

let gristList = [artifact,uranium,amethyst,garnet,iron,marble,chalk,shale,cobalt,ruby,caulk,tar,amber,diamond,zillium,build,rainbow];
//draw the captcha card background (both sides of the card)
//front
ctx.strokeStyle = '#036b37';
ctx.fillStyle = '#008c45';
ctx.lineWidth = 50;
ctx.beginPath();
ctx.moveTo(25,25);
ctx.lineTo(425,25);
ctx.lineTo(425,80);
ctx.lineTo(475,80);
ctx.lineTo(475,155);
ctx.lineTo(535,155);
ctx.lineTo(535,775);
ctx.lineTo(25,775);
ctx.closePath();
ctx.stroke();
ctx.fill();
//back
ctx.beginPath();
ctx.moveTo(1145,25);
ctx.lineTo(745,25);
ctx.lineTo(745,80);
ctx.lineTo(720,80);
ctx.lineTo(720,155);
ctx.lineTo(660,155);
ctx.lineTo(660,775);
ctx.lineTo(1145,775);
ctx.closePath();
ctx.stroke();
ctx.fill();

//---------settings for all the shapes----------
ctx.fillStyle = `#00e371`;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.shadowColor = `#0e6037`;

//Title bar
ctx.fillRect(35,35,370,50);

//code and tier bar
ctx.fillRect(35,105,200,50);
ctx.fillRect(255,105,200,50);

//-kind box
ctx.fillRect(35,170,315,50);

//grist boxes
ctx.fillStyle = `#d9ead3`
ctx.fillRect(35,235,55,55);
ctx.fillRect(115,300,55,55);
ctx.fillRect(175,300,55,55);
ctx.fillRect(235,300,55,55);
ctx.fillRect(295,300,55,55);
ctx.fillRect(115,360,55,55);
ctx.fillRect(175,360,55,55);
ctx.fillRect(235,360,55,55);
ctx.fillRect(295,360,55,55);
ctx.fillStyle = `#00e371`;
ctx.fillRect(95,235,255,55);
ctx.fillRect(35,300,75,55);
ctx.fillRect(35,360,75,55);

//damage boxes
ctx.fillRect(360,170,70,50);
ctx.fillRect(440,170,70,50);
ctx.fillRect(360,235,70,50);
ctx.fillRect(360,300,70,50);
ctx.fillRect(360,365,70,50);
ctx.fillStyle = `#d9ead3`;
ctx.fillRect(440,235,70,50);
ctx.fillRect(440,300,70,50);
ctx.fillRect(440,365,70,50);

//trait boxes
ctx.fillStyle = `#00e371`;
ctx.fillRect(35,425,230,50);
ctx.fillRect(282,425,230,50);

//weapon attacks (text as well)
ctx.font = "30px FONTSTUCK";
ctx.lineWidth = 10;
let tempcolor= '';
ctx.textAlign = "center";
for(i=0;i<4;i++){


  switch(actions[i].substring(0,2)){
    case `no`:
    tempcolor= `#6D6D6D`;
    break;
    case `ac`:
    tempcolor=  `#6688FE`;
    break;
    case `ar`:
    tempcolor= `#9B38F4`;
    break;
    case `as`:
    tempcolor=  `#fc4c2c`;
    break;
    case `ab`:
    tempcolor=  `#ffae00`;
    break;
    default:
    tempcolor= `#6D6D6D`;
}
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.strokeStyle = tempcolor;
ctx.strokeRect(40,490+(70*i),470,50);
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;
ctx.fillStyle =`#ffffff`;
ctx.fillRect(40,490+(70*i),470,50);
ctx.fillStyle =tempcolor;
ctx.fillText(actions[i].toUpperCase(),285,530+(70*i));

}
ctx.fillStyle = `#00e371`;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
//back of card trait boxes
ctx.fillRect(760,40,200,35);
ctx.fillRect(760,155,200,35);
ctx.fillStyle = `#d9ead3`
ctx.fillRect(730,80,405,70);
ctx.fillRect(730,195,405,70);
//back of card action boxes
for(i=0;i<4;i++){
  ctx.fillStyle = `#00e371`;
ctx.fillRect(670,290+(i*120),200,50);
ctx.fillRect(890,290+(i*120),50,50);
ctx.fillRect(950,290+(i*120),50,50);
ctx.fillStyle = `#d9ead3`
ctx.fillRect(670,350+(i*120),465,50);
}
//-------settings for all the text----------

ctx.fillStyle = "#000000";
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;
ctx.textAlign = "center";
ctx.font = "32px Courier Standard Bold";

//Title Bar
ctx.font = applyText(canvas,item[0],370);
ctx.fillText(item[0],220,70);

//code and tier
ctx.font = "32px Courier Standard Bold";
ctx.fillText(item[1],135,140);
ctx.fillText(`TIER ${item[2]}`,350,140);

//-kind text
ctx.fillText(weaponkind.toUpperCase(),192,205);


//grist img & text
ctx.drawImage(gristList[gristType],38,237,50,50);
ctx.fillText(gristName.toUpperCase(),222,270);
ctx.drawImage(gristList[client.gristTypes.indexOf(client.grist[gristName].effective[0])],118,302,50,50);
ctx.drawImage(gristList[client.gristTypes.indexOf(client.grist[gristName].effective[1])],178,302,50,50);
ctx.drawImage(gristList[client.gristTypes.indexOf(client.grist[gristName].effective[2])],238,302,50,50);
ctx.drawImage(gristList[client.gristTypes.indexOf(client.grist[gristName].effective[3])],298,302,50,50);
ctx.drawImage(gristList[client.gristTypes.indexOf(client.grist[gristName].ineffective[0])],118,362,50,50);
ctx.drawImage(gristList[client.gristTypes.indexOf(client.grist[gristName].ineffective[1])],178,362,50,50);
ctx.drawImage(gristList[client.gristTypes.indexOf(client.grist[gristName].ineffective[2])],238,362,50,50);
ctx.drawImage(gristList[client.gristTypes.indexOf(client.grist[gristName].ineffective[3])],298,362,50,50);
ctx.font = "22px Courier Standard Bold";
ctx.fillText("EFF.",75,335);
ctx.fillText("INEFF.",75,395);

//damage text
ctx.fillText("Lvl",395,200);
ctx.fillText("Dmg",475,200);
ctx.fillText("1",395,265);
ctx.fillText("2",395,330);
ctx.fillText("3",395,395);
ctx.fillText(tierDmg[item[2]],475,265);
ctx.fillText(tierDmg[item[2]]*2,475,330);
ctx.fillText(tierDmg[item[2]]*3,475,395);

//trait text
ctx.font = "30px Courier Standard Bold";
ctx.fillText(trait1,150,458);
ctx.fillText(trait2,400,458);

//backside trait text
ctx.fillText(trait1,860,65);
ctx.fillText(trait2,860,180);
//backside action text
for(i=0;i<4;i++){
  ctx.font = applyText(canvas,actions[i].toUpperCase(),200);
ctx.fillText(actions[i].toUpperCase(),770,325+(120*i));
ctx.fillText(client.actionList[actions[i]].cst,915,324+(120*i));
ctx.fillText(client.actionList[actions[i]].dmg,975,325+(120*i));
  ctx.font = applyText(canvas,client.actionList[actions[i]].aa,460);
ctx.fillText(client.actionList[actions[i]].aa,903,385+(120*i));

}
let attachment = new client.MessageAttachment(canvas.toBuffer(), 'captchacard.png');
message.channel.send({file:[attachment]});




/*  msg = `**TIER -** ${item[2]}  **  QTY -** ${item[3]}\n**KIND - **${weaponkind.toUpperCase()} **TYPE -** ${tList[client.weaponkinds[weaponkind].t]}\n\n**GRIST TYPE -** ${
    client.emojis.cache.get(client.grist[gristType].emoji)} ${gristType.toUpperCase()}\n**EFFECTIVE -** ${
    client.emojis.cache.get(client.grist[client.grist[gristType].effective[0]].emoji)}${client.emojis.cache.get(client.grist[client.grist[gristType].effective[1]].emoji)}${client.emojis.cache.get(client.grist[client.grist[gristType].effective[2]].emoji)}${client.emojis.cache.get(client.grist[client.grist[gristType].effective[3]].emoji)
    }\n**INEFFECTIVE -** ${
    client.emojis.cache.get(client.grist[client.grist[gristType].ineffective[0]].emoji)}${client.emojis.cache.get(client.grist[client.grist[gristType].ineffective[1]].emoji)}${client.emojis.cache.get(client.grist[client.grist[gristType].ineffective[2]].emoji)}${client.emojis.cache.get(client.grist[client.grist[gristType].ineffective[3]].emoji)
    }`;
  msg1 = `**TRAIT 1 -** ${trait1}\n\n**TRAIT 2 -** ${trait2}`;
  msg2 = `${client.emojis.cache.get(client.actionList[action1].emoji[0])}${client.emojis.cache.get(client.actionList[action1].emoji[1])}${client.emojis.cache.get(client.actionList[action1].emoji[2])}${client.emojis.cache.get(client.actionList[action1].emoji[3])}${client.emojis.cache.get(client.actionList[action1].emoji[4])
  } **CST - **${client.actionList[action1].cst} **DMG - **${client.actionList[action1].dmg}\n${client.actionList[action1].aa}\n\n${
    client.emojis.cache.get(client.actionList[action2].emoji[0])}${client.emojis.cache.get(client.actionList[action2].emoji[1])}${client.emojis.cache.get(client.actionList[action2].emoji[2])}${client.emojis.cache.get(client.actionList[action2].emoji[3])}${client.emojis.cache.get(client.actionList[action2].emoji[4])
    } **CST - **${client.actionList[action2].cst} **DMG - **${client.actionList[action2].dmg}\n${client.actionList[action2].aa
  }\n\n${
    client.emojis.cache.get(client.actionList[action3].emoji[0])}${client.emojis.cache.get(client.actionList[action3].emoji[1])}${client.emojis.cache.get(client.actionList[action3].emoji[2])}${client.emojis.cache.get(client.actionList[action3].emoji[3])}${client.emojis.cache.get(client.actionList[action3].emoji[4])
    } **CST - **${client.actionList[action3].cst} **DMG - **${client.actionList[action3].dmg}\n${client.actionList[action3].aa
  }\n\n${
    client.emojis.cache.get(client.actionList[action4].emoji[0])}${client.emojis.cache.get(client.actionList[action4].emoji[1])}${client.emojis.cache.get(client.actionList[action4].emoji[2])}${client.emojis.cache.get(client.actionList[action4].emoji[3])}${client.emojis.cache.get(client.actionList[action4].emoji[4])
    } **CST - **${client.actionList[action4].cst} **DMG - **${client.actionList[action4].dmg}\n${client.actionList[action4].aa
  }`
  let msg3=``;
  if(item[4].length > 0){
    let i;
    for(i=0;i<item[4].length && i<20;i++){
      msg3 += `**[${i+1}] ${item[4][i][0]} x${item[4][i][3]}** \n${item[4][i][1]} TIER - ${item[4][i][2]}\n\n`
    }
    if (item[4].length > 20)
    {
      msg3 += `**` + (item[4].length - 20) + ` more items**\n\n`
    }
  } else {
    msg3 = "N/A"
  }
  inspectItem = new client.Discord.MessageEmbed()
  .setTitle(`**${item[0]}**`)
  .addField(`**ITEM INFORMATION**`,msg)
  .addField(`**ITEM TRAITS**`,msg1)
  .addField(`**ITEM ACTIONS**`,msg2)
  .addField(`**ITEM INVENTORY**`,msg3)*/

}
