exports.run = async function(client, message, args) {

  var userid = message.guild.id.concat(message.author.id);
/*
 let custom = [1,1,1,1,1];

 if(args.length>custom.length){
   message.channel.send("Too many arguments!")
 }

 for(i=0;i<args.length;i++){

   let value = parseInt(args[i],10);

   if(isNaN(value)||value>4||value<1){
     message.channel.send("Please enter a value between 1 and 4");
     return;
   }

   custom[i]=value;

 }
*/
 //client.imgcall.characterImg(client, message, custom)]

const canvas = client.Canvas.createCanvas(224,288);
const ctx = canvas.getContext('2d');

var hairList = client.fs.readdirSync('./miscsprites/CharGen/Head/Hair');
var eyeList = client.fs.readdirSync('./miscsprites/CharGen/Head/Eyes');
var glassesList = client.fs.readdirSync('./miscsprites/CharGen/Head/Glasses');
var mouthList = client.fs.readdirSync('./miscsprites/CharGen/Head/Mouth');

var topList = client.fs.readdirSync('./miscsprites/CharGen/Body/Top');
var bottomList = client.fs.readdirSync('./miscsprites/CharGen/Body/Bottom');
var shoeList = client.fs.readdirSync('./miscsprites/CharGen/Body/Shoes');

let body = await client.Canvas.loadImage(`./miscsprites/CharGen/Body/BASE.png`);
let head = await client.Canvas.loadImage(`./miscsprites/CharGen/Head/BASE.png`);

let hairSelect = './miscsprites/CharGen/Head/Hair/'+hairList[Math.floor(Math.random()*hairList.length)];

let hair = await client.Canvas.loadImage(hairSelect);
let eye = await client.Canvas.loadImage('./miscsprites/CharGen/Head/Eyes/'+eyeList[Math.floor(Math.random()*eyeList.length)]);
let glasses = await client.Canvas.loadImage('./miscsprites/CharGen/Head/Glasses/'+glassesList[Math.floor(Math.random()*glassesList.length)]);
let mouth = await client.Canvas.loadImage('./miscsprites/CharGen/Head/Mouth/'+mouthList[Math.floor(Math.random()*mouthList.length)]);

let top = await client.Canvas.loadImage('./miscsprites/CharGen/Body/Top/'+topList[Math.floor(Math.random()*topList.length)]);
let bottom = await client.Canvas.loadImage('./miscsprites/CharGen/Body/Bottom/'+bottomList[Math.floor(Math.random()*bottomList.length)]);
let shoe = await client.Canvas.loadImage('./miscsprites/CharGen/Body/Shoes/'+shoeList[Math.floor(Math.random()*shoeList.length)]);

if(hairSelect =='./miscsprites/CharGen/Head/Hair/JADE.png'){

  let hairBack = await client.Canvas.loadImage('./miscsprites/CharGen/Head/HairBack/JADE.png')

  ctx.drawImage(hairBack,0,0);

}

ctx.drawImage(body,0,0);
ctx.drawImage(shoe,0,0);
ctx.drawImage(bottom,0,0);
ctx.drawImage(top,0,0);
ctx.drawImage(head,0,0);
ctx.drawImage(hair,0,0);
ctx.drawImage(glasses,0,0);
ctx.drawImage(eye,0,0);
ctx.drawImage(mouth,0,0);

let oldColor = [[251,242,54],[217,160,102],[143,86,59],[103,70,37]];
let newColor = [[11,181,255],[11,181,255],[0,146,214],[250,250,250]]

if(args){
  try{
    newColor = client.grist[args[0]].rgb;
  }catch(err){
    message.channel.send("That is not a valid grist type");
    return;
  }
}

let hairReplace = [153,229,80];
let hairOptions = [[0,0,0],[255,255,255]];

let hairChoice = Math.floor(Math.random()*hairOptions.length);

  let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);

  for(let i=0;i<imageData.data.length;i+=4){

    if(imageData.data[i]==hairReplace[0]&&
      imageData.data[i+1]==hairReplace[1]&&
      imageData.data[i+2]==hairReplace[2]
    ){
      imageData.data[i]=hairOptions[hairChoice][0]
        imageData.data[i+1]=hairOptions[hairChoice][1]
        imageData.data[i+2]=hairOptions[hairChoice][2]
    }

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
      imageData.data[i]=newColor[2][0];
      imageData.data[i+1]=newColor[2][1];
      imageData.data[i+2]=newColor[2][2];
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

    ctx.putImageData(imageData,0,0)

let attachment = new client.MessageAttachment(canvas.toBuffer(), `character.png`);

message.channel.send({files: [attachment]});

}
