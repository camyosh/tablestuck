exports.run = (client, message, args) => {

  if(client.strifecall.strifeTest(client, message, message.author) == false){
    message.channel.send("You are not currently in Strife!")
    return;
  }

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");

  let local = client.playerMap.get(charid,"local");

  if(client.strifecall.turnTest(client,message,local)==true){
    message.channel.send("It is already your turn!");
    return;
  }

    let strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`;

  let time = client.strifeMap.get(strifeLocal,"time");

  console.log(Date.now()-time);

  if(Date.now()-time<30000&&!client.funcall.dmcheck(client,message)){
    message.channel.send("You need to wait until 30 seconds have passed since the last action taken to force-pass the turn!");
    return;
  }
  let list = client.strifeMap.get(strifeLocal,"list");
  let turn = client.strifeMap.get(strifeLocal,"turn");
  let init = client.strifeMap.get(strifeLocal,"init");

  if(!client.playerMap.has(list[init[turn][0]][1])||client.playerMap.get(list[init[turn][0]][1],"type")!="player"){

    client.strifecall.pass(client,message,local);

  } else {

    client.strifecall.leaveStrife(client,message,local,init[turn][0]);

  }

}
