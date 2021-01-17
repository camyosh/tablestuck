


 exports.run = async function(client, message, args){
if(!args[0]){
  message.channel.send("Please include the text you want to display in this image!");
  return;
}
let msg = '';
for(i=0;args[i];i++){
  msg+=`${args[i]} `;
}
const canvas = client.Canvas.createCanvas(700,250);
	const ctx = canvas.getContext('2d');

const background = await client.Canvas.loadImage(`./background.jpg`);

const applyText = (canvas, msg) => {

	let fontSize = 70;
ctx.font = `${fontSize}px sans-serif`;
	 while (ctx.measureText(msg).width > canvas.width){
ctx.font = `${fontSize -= 10}px sans-serif`;
if(fontSize<=0){
  fontSize = 2;
  return ctx.font;
}
}
	// Return the result to use in the actual canvas
	return ctx.font;
};
ctx.font = applyText(canvas,msg);
ctx.drawImage (background,0,0,canvas.width,canvas.height);
ctx.fillStyle = '#ffffff';
ctx.textAlign = `center`;
ctx.fillText(msg, canvas.width/2, canvas.height / 1.8);
const attachment = new client.Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

message.channel.send(attachment);
return;
}
