exports.run = (client, message, args) => {


  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");

  let local = client.charcall.charData(client,charid,"local");
  let land = local[4];
  let sec = client.landMap.get(land,local[0]);
  let area = sec[local[1]][local[2]];
  let room = area[2][local[3]];
  let dex  = room[0];

//temp to Test

let page = 0;

async function dexCheck(){
let files = []
const attachment = await client.imgcall.sdexCheck(client,message,page,args,3,dex,dex.length,room[2]);
files.push(attachment);
for(let i=0;i<room[4].length;i++){
  if(client.charcall.hasData(client,room[4][i][1],"dialogue")){
    let dialist = client.charcall.charData(client,room[4][i][1],"dialogue");
    files.push(await client.diocall.dialogue(client,message,dialist[Math.floor(Math.random()*dialist.length)]));

  }
}
  message.channel.send({files: files});
}

if(area[0]==4){
dexCheck();
} else {
  message.channel.send("You're not in a village :(");
}





}
