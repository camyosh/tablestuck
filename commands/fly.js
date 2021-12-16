
exports.run = (client, message, args) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");


  let local = client.charcall.charData(client,charid,"local");

  if(((!client.charcall.allData(client,userid,charid,"godtier")||client.charcall.allData(client,userid,charid,"godtier")=="NONE")&&!client.funcall.dmcheck(client,message)&&!client.traitcall.traitCheck(client,charid,"ROCKET")[1]&&!client.traitcall.traitCheck(client,charid,"SPACE")[0]&&local[0]!="p"&&local[0]!="pm"&&local[0]!="d"&&local[0]!="dm")){
    message.channel.send("You close your eyes and believe as hard as you can in the idea that maybe with a little bit of magic and a little bit of pixie dust you might be able to fly... you open your eyes to find your feet still planeted firmly on the ground as you remember that magic most definitely is not real.");
    return;
  }
  if(local[0]=="h") {
    message.channel.send("You cannot fly in someone's house!");
    return;
  }
  if((local[0].length>1&&local[0].charAt(local[0].length-1)=="d")||local[0].charAt(local[0].length-1)=="c"){
    message.channel.send("The hallways are too narrow for you to fly here!");
    return;
  }

  if(!args[0] || !args[1]){
    message.channel.send("That is not a valid coordinate!");
    return;
  }

  x = parseInt(args[1], 10);
  if(isNaN(x)||x>10||x<0){
    message.channel.send("That is not a valid argument!");
    return;
  }
  y = parseInt(args[0], 10);
  if(isNaN(y)||y>10||y<0){
    message.channel.send("That is not a valid argument!");
    return;
  }

  let target = [local[0],x,y,0,local[4]];

    client.funcall.actionCheck(client,message);
  let move = client.funcall.move(client,message,charid,local,target,true,`You take flight and land at a `);
  setTimeout(function(){client.tutorcall.progressCheck(client,message,40);},1500);
}
