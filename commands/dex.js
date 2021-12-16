exports.run = async function(client, message, args) {

  const canvas = client.Canvas.createCanvas(527,587);
  const ctx = canvas.getContext('2d');

  const img = await client.Canvas.loadImage(`./miscsprites/OGRETEST.png`);

  let oldColor = [[255,209,0],[93,255,0],[73,77,20],[103,70,37]];

  let newColor = [[11,181,255],[11,181,255],[0,146,214],[250,250,250]]

  if(args){
    try{
      newColor = client.grist[args[0]].rgb;
    }catch(err){
      message.channel.send("That is not a valid grist type");
      return;
    }
  }

  ctx.drawImage(img,0,0,527,587,0,0,527,587);

  var imageData = ctx.getImageData(0,0,527,587);
  let once = false;

  for(let i=0;i<imageData.data.length;i+=4){
    if(imageData.data[i]==oldColor[0][0]&&
        imageData.data[i+1]==oldColor[0][1]&&
        imageData.data[i+2]==oldColor[0][2]
    ){
      imageData.data[i]=newColor[0][0];
      imageData.data[i+1]=newColor[0][1];
      imageData.data[i+2]=newColor[0][2];
    }else if(
      imageData.data[i]==oldColor[1][0]&&
      imageData.data[i+1]==oldColor[1][1]&&
      imageData.data[i+2]==oldColor[1][2]
    ){
      imageData.data[i]=newColor[1][0];
      imageData.data[i+1]=newColor[1][1];
      imageData.data[i+2]=newColor[1][2];
    }else if(
      imageData.data[i]==oldColor[2][0]&&
      imageData.data[i+1]==oldColor[2][1]&&
      imageData.data[i+2]==oldColor[2][2]
    ){
      imageData.data[i]=newColor[4][0];
      imageData.data[i+1]=newColor[4][1];
      imageData.data[i+2]=newColor[4][2];
    }else if(
      imageData.data[i]==oldColor[3][0]&&
      imageData.data[i+1]==oldColor[3][1]&&
      imageData.data[i+2]==oldColor[3][2]
    ){
      imageData.data[i]=newColor[3][0];
      imageData.data[i+1]=newColor[3][1];
      imageData.data[i+2]=newColor[3][2];
    }
  }



  ctx.putImageData(imageData,0,0);

    let attachment = new client.MessageAttachment(canvas.toBuffer(), 'actionlist.png');

    message.channel.send({files: [attachment]});

}
