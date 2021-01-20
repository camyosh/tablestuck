const tList = ["MELEE","RANGED","MAGIC","NA"];
const tierDmg = [1,5,7,10,14,19,25,32,40,49,59,70,82,95,109,124,140];

exports.traitCheck = function(client,target,traitName){
  try{
  let check = [false,false];

  let traitCount = 0;
  let specibus = client.playerMap.get(target,"spec");
  let equip = client.playerMap.get(target,"equip");
  let armor = client.playerMap.get(target,"armor");
  let trinket = client.playerMap.get(target,"trinket");
  //Check weapon first\

  if(specibus.length != 0){

    if(client.traitList[client.captchaCode.indexOf(specibus[equip][1].charAt(2))]==traitName){
      traitCount++;
    }
    if(client.traitList2[client.captchaCode.indexOf(specibus[equip][1].charAt(3))]==traitName){
      traitCount++;
    }
  }

  //Check armor

  if(armor.length!=0){
    if(client.traitList[client.captchaCode.indexOf(armor[0][1].charAt(2))]==traitName){
      traitCount++;
    }
    if(client.traitList2[client.captchaCode.indexOf(armor[0][1].charAt(3))]==traitName){
      traitCount++;
    }
  }

  //Check Equipment

  if(trinket.length!=0){
    if(client.traitList[client.captchaCode.indexOf(trinket[1].charAt(2))]==traitName){
      traitCount++;
    }
    if(client.traitList2[client.captchaCode.indexOf(trinket[1].charAt(3))]==traitName){
      traitCount++;
    }
  }

  if(traitCount > 0){

    check[0]=true;

    if(traitCount >=4){
      check[1]=true;
    }

  }

  return check;

}catch(err){
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

exports.compTest = function(client, message, charid, room, currentInv) {

    let i;
    //if first value in array is true, it means there is a computer, if both are true, it means the computer has sburbed installed
    let comp = [false,false];


    for(i=0; i < room[5].length; i++) {

      if(client.traitList[client.captchaCode.indexOf(room[5][i][1].charAt(2))] == "COMPUTER" || client.traitList2[client.captchaCode.indexOf(room[5][i][1].charAt(3))] == "COMPUTER") {
        comp[0]=true;

        let j;
        for(j=0;j<room[5][i][4].length; j++){
          if(room[5][i][4][j][1]=="////////"&&room[5][i][4][j][0]=="SBURB SERVER"){
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
          if(currentInv[i][4][j][1]=="////////"&&currentInv[i][4][j][0]=="SBURB SERVER"){
            comp[1]=true;
      }
    }
}
}
return comp;
}

exports.inspectItem = async function(client, item, message){
  client.Canvas.registerFont("./miscsprites/fontstuck.ttf",{family:`FONTSTUCK`});
  client.Canvas.registerFont("./miscsprites/Courier Std Bold.otf",{family:`Courier Standard Bold`});
  const canvas = client.Canvas.createCanvas(510,750);
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

let gristList = [artifact,uranium,amethyst,garnet,iron,marble,chalk,shale,cobalt,ruby,caulk,tar,amber,diamond,zillium];
//draw the captcha card background

ctx.fillStyle = '#008c45';
ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(400,0);
ctx.lineTo(400,65);
ctx.lineTo(450,65);
ctx.lineTo(450,130);
ctx.lineTo(510,130);
ctx.lineTo(510,750);
ctx.lineTo(0,750);
ctx.lineTo(0,0);
ctx.fill();

//---------settings for all the shapes----------
ctx.fillStyle = `#00e371`;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.shadowColor = `#0e6037`;

//Title bar
ctx.fillRect(10,10,370,50);

//code and tier bar
ctx.fillRect(10,80,200,50);
ctx.fillRect(230,80,200,50);

//-kind box
ctx.fillRect(10,145,315,50);

//grist boxes
ctx.fillStyle = `#d9ead3`
ctx.fillRect(10,210,55,55);
ctx.fillRect(90,275,55,55);
ctx.fillRect(150,275,55,55);
ctx.fillRect(210,275,55,55);
ctx.fillRect(270,275,55,55);
ctx.fillRect(90,335,55,55);
ctx.fillRect(150,335,55,55);
ctx.fillRect(210,335,55,55);
ctx.fillRect(270,335,55,55);
ctx.fillStyle = `#00e371`;
ctx.fillRect(70,210,255,55);
ctx.fillRect(10,275,75,55);
ctx.fillRect(10,335,75,55);

//damage boxes
ctx.fillRect(335,145,70,50);
ctx.fillRect(415,145,70,50);
ctx.fillRect(335,210,70,50);
ctx.fillRect(335,275,70,50);
ctx.fillRect(335,340,70,50);
ctx.fillStyle = `#d9ead3`;
ctx.fillRect(415,210,70,50);
ctx.fillRect(415,275,70,50);
ctx.fillRect(415,340,70,50);

//trait boxes
ctx.fillStyle = `#00e371`;
ctx.fillRect(10,400,230,50);
ctx.fillRect(257,400,230,50);

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
    tempcolor=  `#FF4B2D`;
    break;
    case `ab`:
    tempcolor=  `#ffe91f`;
    break;
    default:
    tempcolor= `#6D6D6D`;
}
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.strokeStyle = tempcolor;
ctx.strokeRect(15,465+(70*i),470,50);
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;
ctx.fillStyle =`#ffffff`;
ctx.fillRect(15,465+(70*i),470,50);
ctx.fillStyle =tempcolor;
ctx.fillText(actions[i],260,505+(70*i));

}
//-------settings for all the text----------

ctx.fillStyle = "#000000";
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;
ctx.textAlign = "center";
ctx.font = "32px Courier Standard Bold";

//Title Bar
ctx.font = applyText(canvas,item[0],370);
ctx.fillText(item[0],195,45);

//code and tier
ctx.font = "32px Courier Standard Bold";
ctx.fillText(item[1],110,115);
ctx.fillText(`TIER ${item[2]}`,325,115);

//-kind text
ctx.fillText(weaponkind.toUpperCase(),167,180);


//grist img & text
ctx.drawImage(gristList[gristType],13,212,50,50);
ctx.fillText(gristName.toUpperCase(),197,245);
ctx.drawImage(gristList[client.gristTypes.indexOf(client.grist[gristName].effective[0])],93,277,50,50);
ctx.drawImage(gristList[client.gristTypes.indexOf(client.grist[gristName].effective[1])],153,277,50,50);
ctx.drawImage(gristList[client.gristTypes.indexOf(client.grist[gristName].effective[2])],213,277,50,50);
ctx.drawImage(gristList[client.gristTypes.indexOf(client.grist[gristName].effective[3])],273,277,50,50);
ctx.drawImage(gristList[client.gristTypes.indexOf(client.grist[gristName].ineffective[0])],93,337,50,50);
ctx.drawImage(gristList[client.gristTypes.indexOf(client.grist[gristName].ineffective[1])],153,337,50,50);
ctx.drawImage(gristList[client.gristTypes.indexOf(client.grist[gristName].ineffective[2])],213,337,50,50);
ctx.drawImage(gristList[client.gristTypes.indexOf(client.grist[gristName].ineffective[3])],273,337,50,50);
ctx.font = "22px Courier Standard Bold";
ctx.fillText("EFF.",50,310);
ctx.fillText("INEFF.",50,370);

//damage text
ctx.fillText("Lvl",370,175);
ctx.fillText("Dmg",450,175);
ctx.fillText("1",370,240);
ctx.fillText("2",370,305);
ctx.fillText("3",370,370);
ctx.fillText(tierDmg[item[2]],450,240);
ctx.fillText(tierDmg[item[2]]*2,450,305);
ctx.fillText(tierDmg[item[2]]*3,450,370);

//trait text
ctx.font = "30px Courier Standard Bold";
ctx.fillText(trait1,125,433);
ctx.fillText(trait2,375,433);


let attachment = new client.Discord.MessageAttachment(canvas.toBuffer(), 'captchacard.png');
message.channel.send(attachment);




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
