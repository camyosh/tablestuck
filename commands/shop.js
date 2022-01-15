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
    files.push(await client.diocall.dialogue(client,dialist[Math.floor(Math.random()*dialist.length)]));

  }
}
  message.channel.send({files: files});
}

if(area[0]==4){
  let hasShopkeeper = false;
  let shopkeepId = ``;
  for(let i=0;i<room[4].length;i++){
    targid = room[4][i][1];
    shopPrices = client.charcall.charData(client,targid,"shopPrices");
    if(shopPrices!="NONE"&&client.charcall.charData(client,targid,"alive")){
      hasShopkeeper=true;
      shopkeepId = targid;
      if(shopPrices.length==0){
        for(let j=0;j<dex.length;j++){
          basePrice = Math.pow(dex[j][2],2)*50;
          shopPrices.push(Math.floor(basePrice+basePrice*Math.random().toFixed(2)));
        }
        client.charcall.setAnyData(client,`~`,targid,shopPrices,"shopPrices");
      }
    }
  }
  if (!hasShopkeeper){
    message.channel.send("This shop has no living shopkeeper, so you can't buy anything!");
    return;
  }

  if(!args[0]){
    dexCheck();
    return;
  }
  let choice = parseInt(args[0],10);
  if(choice<=0||choice>dex.length){
    message.channel.send(`There are only ${dex.length} things to buy here! choose one of them!`);
    return;
  }
  let shopData = client.charcall.charData(client,shopkeepId,"shopPrices");
  let price = shopData[choice-1];
  let balance = client.charcall.allData(client,userid,charid,"b");
  if(balance=="NONE"){
    message.channel.send(`You don't have any boons to make a purchase with!`);
    return;
  }
  if(price>balance){
    message.channel.send(`Sorry! That ${dex[choice-1][0]} costs ${price} BOONDOLLARS, and you only have ${balance}.`);
    return;
  }
  balance -= price;
  let item = dex.splice(choice-1,1);
  shopData.splice(choice-1,1);
  let currentInv = client.charcall.charData(client,charid,"sdex");
  currentInv.unshift(item[0]);
  let mess = `PURCHASED the ${item[0][0]} for ${price} BOONDOLLARS. You have ${balance} BOONDOLLARS remaining.`
  if(currentInv.length > client.charcall.charData(client,charid,"cards")){
    let dropItem = currentInv.pop();
    room[5].push(dropItem);
    mess += `\nYour Sylladex is full, ejecting your ${dropItem[0]}!`
}
message.channel.send(mess);
sec[local[1]][local[2]][2][local[3]] = room;
client.landMap.set(land,sec,local[0]);
client.charcall.setAnyData(client,userid,charid,currentInv,"sdex");
client.charcall.setAnyData(client,userid,charid,balance,"b");
} else {
  message.channel.send("You're not in a village :(");
}





}
