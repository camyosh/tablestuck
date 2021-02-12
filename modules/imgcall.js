
const trait1Search = ["NONE","COMPUTER","STORAGE","FOOD","CANDY","MEAT","HOT","COLD","ELECTRIC","SHARP","BLUNT","SHITTY","CUTE","SPOOKY","CAT","DOG","BROKEN","CUSHIONED","BUSINESS","BOUNCY","STICKY","MELEE","RANGED","MAGIC","REFINED","VAMPIRIC","FROG","HARLEQUIN","WIZARD,","PLUSH","SCIENTIFIC","HEAVY","LIGHTWEIGHT","PROSPIT","DERSE","ENDURING","THORNS","ROCKET","GAMBLING","IRRADIATED","NOIR","CHARLATAN","EXQUISITE","GRIMDARK","META","WELSH", "TRICKSTER","BREATH","LIFE","LIGHT","TIME","HEART","RAGE","BLOOD","VOID","SPACE","MIND","HOPE","DOOM"]


const  trait2Search = ["NONE","DOOM","HOPE","MIND","SPACE","VOID","BLOOD","RAGE","HEART","TIME","LIGHT","LIFE","BREATH","TRICKSTER","WELSH","META","GRIMDARK","EXQUISITE","CHARLATAN","NOIR","IRRADIATED","GAMBLING","ROCKET","THORNS","ENDURING","DERSE","PROSPIT","LIGHTWEIGHT","HEAVY","SCIENTIFIC","PLUSH","WIZARD","HARLEQUIN","FROG","VAMPIRIC","REFINED","MAGIC","RANGED","MELEE","STICKY","BOUNCY","BUSINESS","CUSHIONED","BROKEN","DOG","CAT","SPOOKY","CUTE","SHITTY","BLUNT","SHARP","ELECTRIC","COLD","HOT","MEAT","CANDY","FOOD","STORAGE","COMPUTER","NONE","NONE"];
exports.sdexCheck = async function (client, message,page, args, type, sdex, cards){
  client.Canvas.registerFont("./miscsprites/fontstuck.ttf",{family:`FONTSTUCK`});
  client.Canvas.registerFont("./miscsprites/Courier Std Bold.otf",{family:`Courier Standard Bold`});
  const canvas = client.Canvas.createCanvas(1056,560);
  const ctx = canvas.getContext('2d');

  //list light, list dark, card fg, card bg, card shade

  let scheme = ["#992445","#0c6137","#992ae1","#484848"];
  let typeList = ["sylladex","strife specibus","container","room inventory"];
  let cardList = ["captchalogue cards","strife cards","storage space","room space"]
  let maxPage = Math.floor(cards/10);

//set background
  ctx.linewidth = 5;

//set top text line

  ctx.fillStyle = scheme[type];
  ctx.fillRect(0,0,canvas.width,32);

  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 32px Courier Standard Bold`;
  ctx.fillText(`${typeList[type]}::page ${page+1}/${maxPage+1}`,16,24);

  if(type<3){

    let msg = `${cardList[type]}::${sdex.length}/${cards}`

    ctx.fillText(msg,canvas.width-16-ctx.measureText(msg).width,24);

  }

  const cardSheet = await client.Canvas.loadImage(`./miscsprites/CAPTCHACARD.png`);
  const gristSheet = await client.Canvas.loadImage(`./miscsprites/GRISTSPRITES.png`);
  const traitSheet = await client.Canvas.loadImage(`./miscsprites/TRAITSPRITES.png`);
  const kindSheet = await client.Canvas.loadImage(`./miscsprites/WEAPONKINDSLARGE.png`);

  //ctx.drawImage(cardSheet,0,0,192,232,16,48,192,232);

  let j = page*10;

  for(i=0;i<10;i++){

    let x = 16+((i%5)*208);

    let y = 48+(264*Math.floor(i/5))

    if(j<cards){

//draw card

      ctx.drawImage(cardSheet,194*(type+1),0,194,232,x,y,194,232);

//if card isn't empty
      if(j<sdex.length){
        ctx.fillStyle = "#ffffff";
        ctx.font = `bold 16px Courier Standard Bold`;
        //captcha code
      ctx.fillText(sdex[j][1],x+16,y+28);
      //tier
      ctx.fillStyle = "#000000";
      ctx.font = `bold 10px FONTSTUCK`;
      ctx.fillText("TIER",x+16,y+45);
      ctx.fillText(sdex[j][2],x+63+(Math.floor((14-ctx.measureText(sdex[j][2]).width)/2)),y+45);
//22 196
      //name
      let name = sdex[j][0];

      ctx.font = applyText(canvas,ctx,name,16,8,"FONTSTUCK",130)
      ctx.fillText(name,x+20,y+196-(Math.floor(16-ctx.measureText(j+1).emHeightAscent)/2));

      let gristType = client.codeCypher[1][client.captchaCode.indexOf(sdex[j][1].charAt(1))];

      //grist type
      //sheet, X coord to pull, y coord to pull, pull width, pull height, place coords
      ctx.drawImage(gristSheet,(gristType%8)*32,Math.floor(gristType/8)*32,32,32,x+122,y+68,32,32);
//client.traitList[client.captchaCode.indexOf(item[1].charAt(2))]
      //trait 1
      ctx.drawImage(traitSheet,(trait1Search.indexOf(client.traitList[client.captchaCode.indexOf(sdex[j][1].charAt(2))])%8)*32,Math.floor(trait1Search.indexOf(client.traitList[client.captchaCode.indexOf(sdex[j][1].charAt(2))])/8)*32,32,32,x+122,y+104,32,32);
      ctx.drawImage(traitSheet,(trait2Search.indexOf(client.traitList[client.captchaCode.indexOf(sdex[j][1].charAt(3))])%8)*32,Math.floor(trait2Search.indexOf(client.traitList[client.captchaCode.indexOf(sdex[j][1].charAt(3))])/8)*32,32,32,x+122,y+140,32,32);

      //weaponkind//
      //client.codeCypher[0][client.captchaCode.indexOf(sdex[j][1].charAt(0))]
      ctx.drawImage(kindSheet,client.codeCypher[0][client.captchaCode.indexOf(sdex[j][1].charAt(0))]*96,0,96,96,x+17,y+61,96,96);
      //22 212
      ctx.fillStyle = "#ffffff";
      ctx.font = `bold 8px FONTSTUCK`;
      ctx.fillText(client.kind[client.codeCypher[0][client.captchaCode.indexOf(sdex[j][1].charAt(0))]],x+22,y+214);

      msg = `x${sdex[i][3]}`

      ctx.fillText(msg,x+160-ctx.measureText(msg).width,y+214);

    }
//number selection

      ctx.fillStyle = "#000000";
      ctx.font = `bold 20px FONTSTUCK`;
      ctx.font = applyText(canvas,ctx, j+1,20,12,"FONTSTUCK",26)
      ctx.fillText(j+1,x+152+26-ctx.measureText(j+1).width-Math.floor((26-ctx.measureText(j+1).width)/2),y+20+Math.floor(ctx.measureText(j+1).emHeightAscent/2));

      //16 28


    } else {

    ctx.drawImage(cardSheet,0,0,194,232,x,y,194,232);

  }

  j++

  }

//send message

  let attachment = new client.Discord.MessageAttachment(canvas.toBuffer(), 'actionlist.png');

return attachment;

}

function applyText(canvas,ctx, msg,fontsize,minsize,font,targ){
ctx.font = `bold ${fontsize}px ${font}`;
   while (ctx.measureText(msg).width > targ){
ctx.font = `bold ${fontsize -= 1}px ${font}`;
if(fontsize<=minsize){
  return ctx.font;
}
}
  return ctx.font;
}
