exports.run = function(client, message, args) {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");


  if(client.charcall.allData(client,userid,charid,"revived")){
    if(client.charcall.allData(client,userid,charid,"revived")=="NONE"){
      message.channel.send("It doesn't seem like you can sleep!");
      return;
    }
    let s = client.charcall.allData(client,userid,charid,"sleepTimer");
    let t = Date.now();
    if(t-s>300000){
      let curvit = client.charcall.charData(client,charid,"vit");
      let gel = client.charcall.allData(client,userid,charid,"gel");
      let healing = Math.floor(gel*.5);
      if(curvit+healing>gel){
        client.charcall.setAnyData(client,userid,charid,gel,"vit");
      } else {
        client.charcall.setAnyData(client,userid,charid,curvit+healing,"vit");
      }
    message.channel.send(`You sleep, healing for ${healing} Vitality, but have terrifying nightmares of horrifying terrors! You won't be able to go back to sleep for at least another 5 minutes...`);
    client.charcall.setAnyData(client,userid,charid,t,"sleepTimer");
    return;
  } else {
    message.channel.send(`You can't go to sleep again... not yet... the visions were too horrifying! You need to wait another ${Math.ceil((300000-(t-s))/1000)} seconds!`);
    return;
  }
  }
  if(client.charcall.allData(client,userid,charid,"dreamer")){
    target = client.charcall.allData(client,userid,charid,"wakingID");
  } else {
    target = client.charcall.allData(client,userid,charid,"dreamingID");
  }

  if(client.charcall.charData(client,target,"vit")<1&&client.configMap.get(message.guild.id).options[0].selection==0){
    message.channel.send(`You try to wake up, but your other self has less than 1 VITALITY! Every action you take as this self will heal your other self by 5 HP. Your other self currently has ${client.playerMap.get(target,"vit")} VITALITY.`);
    return;
  }
    if(!client.charcall.charData(client,target,"alive")){
      client.charcall.setAnyData(client,userid,target,true,"alive");
    }

    client.userMap.set(userid,target,"possess");
    (client.charcall.allData(client,userid,charid,"wakingID")==target?client.charcall.setAnyData(client,userid,charid,false,"dreamer"):client.charcall.setAnyData(client,userid,charid,true,"dreamer"));
    let controlList = client.charcall.charData(client,charid,"control");
    let targList = client.charcall.charData(client,target,"control");
    targList.push(userid);
    for(let i=0;i<controlList.length;i++){
      if(controlList[i]==userid){
       controlList.splice(i,1);
      }
    }

    client.charcall.setAnyData(client,userid,charid,controlList,"control");
    client.charcall.setAnyData(client,userid,target,targList,"control");
    client.tutorcall.progressCheck(client,message,39,["text","You fall asleep, or are you waking up?"]);
}
