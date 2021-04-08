const funcall = require("../modules/funcall.js");
const strifecall = require("../modules/strifecall.js");
const tierDmg = [1,5,7,10,14,19,25,32,40,49,59,70,82,95,109,124,140];
const log =true;
//Used to take actions during STRIFE

exports.run = (client, message, args) => {

//Check if player is registered

  if(funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

//Check if player is in STRIFE

  if(strifecall.strifeTest(client, message, message.author) == false){
    message.channel.send("You are not currently in Strife!")
    return;
  }

//Defining variables

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");



  let local = client.playerMap.get(charid,"local");
  let pos = client.playerMap.get(charid,"pos");
    let type = client.playerMap.get(charid,"type");
  let strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`;

  let spec = client.playerMap.get(charid,"spec");
  let equip = client.playerMap.get(charid,"equip");
  let active = client.strifeMap.get(strifeLocal,"active");
  let list = client.strifeMap.get(strifeLocal,"list");
  let turn = client.strifeMap.get(strifeLocal,"turn");
  let init = client.strifeMap.get(strifeLocal,"init");
  let damage = client.underlings[client.playerMap.get(charid,"type")];

  if(spec.length>0){
    damage=tierDmg[spec[equip][2]];
  }

//Check if EQUIP is an actual weapon in the specibus
let action = [];


  if(equip<spec.length){
    let weaponkind = client.kind[client.codeCypher[0][client.captchaCode.indexOf(spec[equip][1].charAt(0))]];
    action =[client.action[client.weaponkinds[weaponkind].t][client.codeCypher[4][client.captchaCode.indexOf(spec[equip][1].charAt(4))]],client.action[client.weaponkinds[weaponkind].t][client.codeCypher[5][client.captchaCode.indexOf(spec[equip][1].charAt(5))]],client.action[client.weaponkinds[weaponkind].t][client.codeCypher[6][client.captchaCode.indexOf(spec[equip][1].charAt(6))]],client.action[client.weaponkinds[weaponkind].t][client.codeCypher[7][client.captchaCode.indexOf(spec[equip][1].charAt(7))]]];
    //message.channel.send("You do not have a WEAPON equipped!");
    //return;
  }

  action=action.concat(client.underlings[type].act);

  if(client.playerMap.has(charid,"prototype")){
    let prototype = client.playerMap.get(charid,"prototype");

    for(let j =0;j<prototype.length;j++){
      let weaponkind = client.kind[client.codeCypher[0][client.captchaCode.indexOf(prototype[j][1].charAt(0))]];
      for(let i=0;i<4;i++){
        action.push(client.action[client.weaponkinds[weaponkind].t][client.codeCypher[i+4][client.captchaCode.indexOf(prototype[j][1].charAt(i+4))]]);

  }
  }

  }

//retrieving the weaponkind and action list for a weapon

  //let weaponkind = client.kind[client.codeCypher[0][client.captchaCode.indexOf(spec[equip][1].charAt(0))]];
  //let action = [client.action[client.weaponkinds[weaponkind].t][client.codeCypher[4][client.captchaCode.indexOf(spec[equip][1].charAt(4))]],client.action[client.weaponkinds[weaponkind].t][client.codeCypher[5][client.captchaCode.indexOf(spec[equip][1].charAt(5))]],client.action[client.weaponkinds[weaponkind].t][client.codeCypher[6][client.captchaCode.indexOf(spec[equip][1].charAt(6))]],client.action[client.weaponkinds[weaponkind].t][client.codeCypher[7][client.captchaCode.indexOf(spec[equip][1].charAt(7))]],"aggrieve","abscond"];

//if no additional arguments, display list of actions

  if(!args[0]){

    function applyText(canvas, msg, width){
    let fontsize = 20;
    ctx.font = `bold ${fontsize}px FONTSTUCK`;
       while (ctx.measureText(msg).width > width){
    ctx.font = `bold ${fontsize -= 2}px FONTSTUCK`;
    }
      return ctx.font;
    }
    function applyText2(canvas, msg, width){
    let fontsize = 28;
    ctx.font = `bold ${fontsize}px Courier Standard Bold`;
       while (ctx.measureText(msg).width > width){
    ctx.font = `bold ${fontsize -= 2}px Courier Standard Bold`;
    if(fontsize<=23){
      return ctx.font;
    }
    }
      return ctx.font;
    }
    function splitText(msg){
      if(msg.length>28){
        let i=26;
      var middle = Math.floor(msg.length/2);
      var split = msg.indexOf(' ',i);
      while(split==-1){
        i--;
        split =msg.indexOf(' ',i)
      }
      var msg1 = msg.substring(0,split);
      var msg2 = msg.substring(split+1);
      msg = msg1+'\n'+msg2;
      return msg;
    } else {
      return msg;
    }
    }
client.Canvas.registerFont("./miscsprites/fontstuck.ttf",{family:`FONTSTUCK`});
client.Canvas.registerFont("./miscsprites/Courier Std Bold.otf",{family:`Courier Standard Bold`});
const canvas = client.Canvas.createCanvas(1000,(Math.ceil(action.length/2)*130) +165);
const ctx = canvas.getContext('2d');
//-----BOXES-----
let d=20;
//stamina box
ctx.fillStyle = "#ffffff";
ctx.strokeStyle = "#000000";
ctx.lineWidth =5;
ctx.fillRect(canvas.width/4,35,canvas.width/2,40);
ctx.strokeRect(canvas.width/4,35,canvas.width/2,40);

//top action referecne bar
ctx.lineWidth =3;
//action number
ctx.fillRect(30+d,95,40,40);
ctx.strokeRect(30+d,95,40,40);

//action name
ctx.fillRect(70+d,95,210,40);
ctx.strokeRect(70+d,95,210,40);
//action cost
ctx.fillRect(290+d,95,60,40);
ctx.strokeRect(290+d,95,60,40);
//action damage
ctx.fillRect(355+d,95,115,40);
ctx.strokeRect(355+d,95,115,40);

//action number
ctx.fillRect(530-d,95,40,40);
ctx.strokeRect(530-d,95,40,40);

//action name
ctx.fillRect(570-d,95,210,40);
ctx.strokeRect(570-d,95,210,40);
//action cost
ctx.fillRect(790-d,95,60,40);
ctx.strokeRect(790-d,95,60,40);
//action damage
ctx.fillRect(855-d,95,115,40);
ctx.strokeRect(855-d,95,115,40);

//----TEXT-----
//Stamina Text
ctx.font = `bold 20px FONTSTUCK`;
ctx.fillStyle = "#000000";
ctx.fillText("STAMINA:",(canvas.width/4)+10,65);
ctx.textAlign = "center";
ctx.fillText(list[pos][5],(canvas.width/4)+205,65);

//top action reference text
ctx.font = `bold 30px Courier Standard Bold`;
ctx.fillText("#",50+d,125);
ctx.fillText("ACTION",170+d,125);
ctx.fillText("CST",320+d,125);
ctx.fillText("DMG",410+d,125);

ctx.fillText("#",550-d,125);
ctx.fillText("ACTION",670-d,125);
ctx.fillText("CST",820-d,125);
ctx.fillText("DMG",910-d,125);



for(i=0;i<action.length;i++){

  let m=d

  if(i%2){
    m=500-d;
  }

  let j=Math.floor(i/2);

  let tempcolor;
  let tempbg;
    switch(action[i].substring(0,2)){
      case `no`:
      tempcolor= `#6D6D6D`;
      tempbg = `#cccccc`;
      break;
      case `ac`:
      tempcolor=  `#6688FE`;
      tempbg = `#b3c3ff`;
      break;
      case `ar`:
      tempcolor= `#9B38F4`;
      tempbg = `#dbb3ff`;
      break;
      case `as`:
      tempcolor=  `#ff4e31`;
      tempbg = `#ffbdb3`;
      break;

      case `ab`:
      tempcolor=  `#ffae00`;
      tempbg = `#ffe7b3`;
      break;
      case `ab`:
      tempcolor=  `#ffae00`;
      tempbg = `#ffe7b3`;
      break;
      case 'ag':
      tempcolor = "#3ef443";
      tempbg = `#aaf2ac`;
      break;
      default:
      tempcolor= `#6D6D6D`;
      tempbg = `#cccccc`;
  }

  if(action[i]=="abscond"){
    tempcolor=`#ff3779`;
    tempbg=`#ffb3cc`;
  }

  if(!client.actionList[action[i]].add.includes("REUSE") && list[pos][6].includes(""+i+equip)){
    tempcolor= `#6D6D6D`;
    tempbg = `#cccccc`;
  }

  //action number
  //ctx.fillRect(30,145+(130*j),40,40);
  //ctx.strokeRect(30,146+(130*j),40,40);

  ctx.lineWidth =3;
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#000000";
  //action cost
  ctx.fillRect(290+m,145+(130*j),60,40);
  ctx.strokeRect(290+m,145+(130*j),60,40);
  //action damage
  ctx.fillRect(355+m,145+(130*j),115,40);
  ctx.strokeRect(355+m,145+(130*j),115,40);
  //action description message
  ctx.fillStyle = tempbg;
  ctx.fillRect(30+m,195+(130*j),440,70);
  ctx.strokeRect(30+m,195+(130*j),440,70);

  //text
  //ctx.fillStyle = "#ffffff";
  //ctx.fillText(i+1,50,175+(130*j));
  ctx.font = `bold 32px Courier Standard Bold`;
  ctx.fillStyle = "#000000";
  ctx.fillText(client.actionList[action[i]].cst,320+m,175+(130*j));
  ctx.fillText(client.actionList[action[i]].dmg*damage,410+m,175+(130*j));

  //action name image

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(70+m,145+(130*j),210,40);
  ctx.strokeStyle = tempcolor;
  ctx.fillStyle = tempcolor;
  ctx.lineWidth=6;
  ctx.strokeRect(72+m,146+(130*j),208,38);
  ctx.font = `bold 20px FONTSTUCK`;
  ctx.font = applyText(canvas,action[i].toUpperCase(),203);
  ctx.fillText(action[i].toUpperCase(),175+m,175+(130*j));
    ctx.fillStyle = "#000000";
    let tempAct = splitText(client.actionList[action[i]].aa);
  ctx.font = applyText2(canvas,tempAct,440);
  ctx.fillText(tempAct,250+m,225+(130*j));
//select number
  ctx.fillStyle = tempcolor;
  ctx.strokeStyle = tempcolor;
  ctx.font = `bold 20px FONTSTUCK`;
  //action number
  ctx.fillRect(30+m,145+(130*j),40,40);
  ctx.strokeRect(30+m,146+(130*j),40,38);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(i+1,50+m,175+(130*j));
  //action cost
  ctx.fillRect(290+m,145+(130*j),60,40);
  ctx.strokeRect(290+m,145+(130*j),60,40);
  //action damage
  ctx.fillRect(355+m,145+(130*j),115,40);
  ctx.strokeRect(355+m,145+(130*j),115,40);
  ctx.fillStyle = tempcolor;
  ctx.fillText(client.actionList[action[i]].cst,320+m,175+(130*j));
  ctx.fillText(client.actionList[action[i]].dmg*damage,410+m,175+(130*j));
}

let attachment = new client.Discord.MessageAttachment(canvas.toBuffer(), 'actionlist.png');
message.channel.send(attachment);
return;
  }

//Turn first argument into a number and check if NAN

  select = parseInt(args[0], 10) - 1;
  if(isNaN(select) || select > action.length-1 || select < 0){
    message.channel.send("That is not a valid argument!");
    return;
  }

//Make sure action is not being taken outside of turn unless INSTANT

  if(init[turn][0] != pos && !client.actionList[action[select]].add.includes("INSTANT")){
    message.channel.send("You can't take non INSTANT ACTIONS outside of your turn!");
    return;
  }

//If action has FIRST, makes sure its the first action taken this turn
if(log){
  console.log(`${action[select]} is position ${select} from ${action}`);
}
  if(client.actionList[action[select]].add.includes("FIRST")){
    if(list[pos][6].length > 0){
      message.channel.send("That ACTION can only be used if it is the first ACTION taken on a turn!");
      return;
    }
  }

//Check to see if action has reuse, and if not check if action has been used this turn

  if(!client.actionList[action[select]].add.includes("REUSE") && list[pos][6].includes(""+select+equip)){
    message.channel.send("You can't use that ACTION more than once per turn!");
    return;
  };

//If there is no second argument, list all participants in strife and their VITALITY

  if(!args[1]){
    /*
    let msg = ``;
    let i;
    for(i=0;i<active.length;i++){
        msg += `**[${i+1}]** **${client.playerMap.get(list[active[i]][1],"name").toUpperCase()}** [VIT - ${list[active[i]][3]}]\n\n`
    }

    let embed = new client.Discord.MessageEmbed()
    .setTitle(`**SELECT A TARGET**`)
    .addField(`**AVAILABLE TARGETS**`,msg)
    .setColor("#00e371")

    try{message.channel.send(embed);}catch(err){message.channel.send(msg)};
    return;
    */

    client.strifecall.strifeList(client,local,active,list,turn,init,charid,0,`SELECT A TARGET (${client.auth.prefix}list)`)
    return;
  }

  //Make sure second argument is a number

  target = parseInt(args[1], 10) - 1;
  if(isNaN(target) || target >active.length-1 || target < 0){
    message.channel.send("That is not a valid argument!");
    return;
  }

  //Retrieve stamina cost and check if any status effects change the cost

  let cost = client.actionList[action[select]].cst

  if(list[pos][7].includes("DISCOUNT")){
    if(cost > 1){
       cost--;
     }
  }
  if(client.traitcall.traitCheck(client,charid,"MIND")[1]){
    if(cost > 1){
      cost--;
    }
  }


  //Check if player can pay the stamina cost

  if(cost > list[pos][5]){
    if(client.traitcall.traitCheck(client,charid,"DOOM")[0]){
      let maxvit = client.playerMap.get(charid,"gel");
      let doomcost= Math.floor(cost-list[pos][5])*.1*maxvit;
      if(list[pos][3]-doomcost<=0){
        message.channel.send(`You don't have enough STAMINA to afford that action, or enough VITALITY to sacrifice for it! That action costs ${cost} STAMINA and you have ${list[pos][5]} STAMINA!`);
        return;
      }
      list[pos][3]-=doomcost;
        message.channel.send(`You paid ${list[pos][5]} STAMINA and ${doomcost} VITALITY to take this action. ${list[pos][3]} VITALITY REMAINING!`);
    } else {
    message.channel.send(`You don't have enough STAMINA to afford that action! That action costs ${cost} STAMINA and you have ${list[pos][5]} STAMINA!`);
    return;
   }
  }

  //If action is ABSCOND, leave combat by calling leaveStrife function. Otherwise, spend stamina for the action and call the act function

  if(action[select] == "abscond"){
    strifecall.leaveStrife(client,message,local,pos);
    message.channel.send("Absconding!");
  } else {
  list[pos][5] -= cost;
  if(list[pos][5]<0){
    list[pos][5]=0;
  }
  list[pos][6].push(""+select+equip);
  client.strifeMap.set(strifeLocal,list,"list")
  strifecall.act(client,message,local,action[select],active[target]);
}
}
