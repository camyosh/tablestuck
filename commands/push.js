exports.run = (client, message, args) => {

  var charid = client.userMap.get(message.guild.id.concat(message.author.id),"possess");

  if(!client.charcall.charData(client,charid,"strife")){
    message.channel.send("You are not currently in Strife!")
    return;
  }
  let local = client.charcall.charData(client,charid,"local");

  if(client.strifecall.turnTest(client,message,local)){
    message.channel.send("It is already your turn!");
    return;
  }

    let strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`;

  let time = client.strifeMap.get(strifeLocal,"time");

  if(Date.now()-time<120000&&!client.funcall.dmcheck(client,message)){
    message.channel.send("You need to wait until 30 seconds have passed since the last action taken to force-pass the turn!");
    return;
  }
  let list = client.strifeMap.get(strifeLocal,"list");
  let turn = client.strifeMap.get(strifeLocal,"turn");
  let init = client.strifeMap.get(strifeLocal,"init");
    client.strifecall.pass(client,message,local);

}
