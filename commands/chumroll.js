const funcall = require("../modules/funcall.js");



exports.run = async function(client, message, args) {

  if(client.funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

  var charid = message.guild.id.concat(message.author.id);
  var local = client.playerMap.get(charid,"local");
  var room = client.landMap.get(local[4],local[0])[local[1]][local[2]][2][local[3]];
  var currentInv = client.playerMap.get(charid,"sdex");
  let chumroll = client.playerMap.get(charid,"chumroll");
//registers the custom homestuck font
client.Canvas.registerFont("./miscsprites/fontstuck.ttf",{family:`fontstuck`});
client.Canvas.registerFont("./miscsprites/Courier Std Bold.otf",{family:`Courier Standard Bold`});


const canvas = client.Canvas.createCanvas(400,650);
const ctx = canvas.getContext('2d');

function applyText(canvas, msg){
let fontsize = 24
ctx.font = `bold ${fontsize}px Courier Standard Bold`;
   while (ctx.measureText(msg).width > 320){
ctx.font = `bold ${fontsize -= 2}px Courier Standard Bold`;
}
  return ctx.font;
}

//old code to generate the OG background
/*
ctx.beginPath();
ctx.rect(0,0,canvas.width,canvas.height);
ctx.fillStyle =`#ffb600`;
ctx.fill();
ctx.strokeStyle =`#fff700`;
ctx.lineWidth = 5;
ctx.strokeRect(0, 0, canvas.width, canvas.height);
//title text
ctx.font = `30px fontstuck`;
ctx.fontColor
ctx.fillStyle =`#ffffff`;
ctx.fillText("PESTERCORD 6.0",10,40);
//banner container
ctx.beginPath();
ctx.rect(10,50,375,100);
ctx.fillStyle = `#000000`;
ctx.fill();
ctx.lineWidth = 4;
ctx.strokeRect(10,50,375,100);
//banner img and text
const logo = await client.Canvas.loadImage(`./miscsprites/chumlogo.png`);
ctx.drawImage(logo,0,45,160,120);
ctx.fillStyle =`#ffffff`;
ctx.font = `14px fontstuck`;
ctx.fillText("CHAT CLIENT",190,105);

//Chumroll text and box
ctx.fillStyle =`#000000`;
ctx.font = `12px fontstuck`;
ctx.fillText("CHUMROLL:",20,170);
ctx.beginPath();
ctx.rect(10,175,375,400);
ctx.fillStyle = `#000000`;
ctx.fill();
ctx.lineWidth = 4;
ctx.strokeRect(10,175,375,400);
//all the chumhandles


//chumhandle text and box
ctx.fillStyle =`#000000`;
ctx.font = `12px fontstuck`;
ctx.fillText("MYCHUMHANDLE:",10,595);
ctx.beginPath();
ctx.rect(10,600,375,40);
ctx.fillStyle = `#000000`;
ctx.fill();
ctx.lineWidth = 4;
ctx.strokeRect(10,600,375,40);*/

const pesterbackground = await client.Canvas.loadImage(`./miscsprites/pestercord.png`);
const online = await client.Canvas.loadImage(`./miscsprites/CHUMMY.png`);
const offline = await client.Canvas.loadImage(`./miscsprites/IDLE.png`);
ctx.drawImage(pesterbackground,0,0,canvas.width,canvas.height);
ctx.fillStyle =`#ffffff`;
ctx.font = `bold 24px Courier Standard Bold`;

ctx.fillText(client.playerMap.get(charid,"chumhandle"),60,628);
let plonline = client.traitcall.compTest(client,message,charid,room,currentInv);
if(plonline[0]){
ctx.drawImage(online,15,605,32,32);
} else {
  ctx.drawImage(offline,15,605,32,32);
}
let pagenumber = 0;
let targonline = [false,false];
for(i=pagenumber*10;i<chumroll.length&&i<pagenumber+10;i++){
  
ctx.font = applyText(canvas,`[${i+1}]${client.playerMap.get(chumroll[i],"chumhandle")}`);

ctx.fillText(`[${i+1}]${client.playerMap.get(chumroll[i],"chumhandle")}`,50,207+((i-(pagenumber*10))*40));

  targlocal = client.playerMap.get(chumroll[i],"local");
  targroom = client.landMap.get(targlocal[4],targlocal[0])[targlocal[1]][targlocal[2]][2][targlocal[3]];
  targcurrentInv = client.playerMap.get(chumroll[i],"sdex");

targonline = client.traitcall.compTest(client,message,chumroll[i],targroom,targcurrentInv);
  if(targonline[0]){
    ctx.drawImage(online,15,183+((i-(pagenumber*10))*40),32,32);
  } else {
    ctx.drawImage(offline,15,183+((i-(pagenumber*10))*40),32,32);
  }

}

  if(!args[0]){
    let attachment = new client.Discord.MessageAttachment(canvas.toBuffer(), 'pestercord.png');
    message.channel.send(attachment);
    return;
  }

  if(args[0]=="add"){

    if(!args[1]){
      message.channel.send("Add a pesterchum ID to add someone to your chumroll!");
      return;
    }

    let h;
    let hcheck =false;
    let handleList = client.sessionMap.get(message.guild.id,"handleList");
    for(h=0;h<handleList.length&&hcheck==false;h++){
      if(handleList[h][1]==args[1]){
        if(handleList[h][0]==charid){
          message.channel.send("You can't add yourself as a chum, dummy!");
          return;
        }
        if(chumroll.includes(handleList[h][0])){
          message.channel.send("You've already added that chum!");
          return;
        }
        chumroll.push(handleList[h][0]);
        message.channel.send(`Added ${handleList[h][1]} to your chumroll!`);
        hcheck =true;
      }
    }
    if(!hcheck){
      message.channel.send("Couldn't find a chum with that handle in this session!");
      return;
    }
    client.playerMap.set(charid,chumroll,"chumroll");


  }

}
