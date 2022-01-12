
exports.dialogue = async function(client,msg){
  client.Canvas.registerFont("./miscsprites/fontstuck.ttf",{family:`FONTSTUCK`});
  client.Canvas.registerFont("./miscsprites/Courier Std Bold.otf",{family:`Courier Standard Bold`});
  const canvas = client.Canvas.createCanvas(1000,300);
  const ctx = canvas.getContext('2d');
  let lines = 1;
  function splitText(canvas,ctx,msg,width){

    let i = 0;
    let k = 0;
    let buildmsg = "";
    while(k<msg.length){
      if(msg.charAt(k)==`\n`){
        i = 0;
        buildmsg = "";
        lines++;
      } else {
      buildmsg += msg.charAt(k);
      if(msg.charAt(k)==` `&&ctx.measureText(buildmsg).width>=width){
        var msg1 = msg.substring(0,k);
        var msg2 = msg.substring(k+1);
        msg = msg1+`\n`+msg2;
        buildmsg = "";
        lines++;
        i=0;
      }
      }
      k++;
      i++;
    }
      return(msg);
  }
  ctx.textBaseline = "middle";
  ctx.font = "bold 20px FONTSTUCK";
  ctx.lineWidth = 10;
  msg = splitText(canvas,ctx,msg,610);


const dioProfile = await client.Canvas.loadImage(`./miscsprites/morshu.png`);


  ctx.fillStyle = "#000000";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle = "#ffffff";
  ctx.strokeRect(0,0,canvas.width,canvas.height);

  ctx.drawImage(dioProfile,15,15,235,270);

  //ctx.strokeStyle = "#999999";
  //ctx.linewidth = 2;
  //ctx.strokeRect(15,15,170,270);
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(msg.toUpperCase(),622,155-(12*(lines)));

  let attachment = new client.MessageAttachment(canvas.toBuffer(), 'dialogue.png');
  return attachment;
}
