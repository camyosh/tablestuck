exports.run = function(client, message, args) {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  var sburbid = client.playerMap.get(charid,"owner");

  if(client.sburbMap.get(sburbid,"revived")){
    let s = client.sburbMap.get(sburbid,"sleepTimer");
    let t = Date.now();
    if(t-s>300000){
      let curvit = client.playerMap.get(charid,"vit");
      let gel = client.sburbMap.get(sburbid,"gel");
      let healing = Math.floor(gel*.5);
      if(curvit+healing>gel){
        client.playerMap.set(charid,gel,"vit");
      } else {
        client.playerMap.set(charid,curvit+healing,"vit");
      }
    message.channel.send(`You sleep, healing for ${healing} Vitality, but have terrifying nightmares of horrifying terrors! You won't be able to go back to sleep for at least another 5 minutes...`);
    client.sburbMap.set(sburbid,t,"sleepTimer");
    return;
  } else {
    message.channel.send(`You can't go to sleep again... not yet... the visions were too horrifying! You need to wait another ${Math.ceil((300000-(t-s))/1000)} seconds!`);
    return;
  }
  }
  if(client.sburbMap.get(sburbid,"dreamer")){
    target = client.sburbMap.get(sburbid,"wakingID");
  } else {
    target = client.sburbMap.get(sburbid,"dreamingID");
  }

  if(client.playerMap.get(target,"vit")<1&&client.configMap.get(message.guild.id).options[0].selection==0){
    message.channel.send(`You try to wake up, but your other self has less than 1 VITALITY! Every action you take as this self will heal your other self by 5 HP. Your other self currently has ${client.playerMap.get(target,"vit")} VITALITY.`);
    return;
  }
    client.userMap.set(userid,target,"possess");
    (client.sburbMap.get(sburbid,"dreamer")?client.sburbMap.set(sburbid,false,"dreamer"):client.sburbMap.set(sburbid,true,"dreamer"));

    let controlList = client.playerMap.get(charid,"control");
    for(let i=0;i<controlList.length;i++){
      if(controlList[i]==userid){
        controlList.splice(i,1);
      }
    }
    client.playerMap.set(charid,controlList,"control");
    client.playerMap.set(target,client.playerMap.get(target,"control").push(userid),"control");

    message.channel.send("You fall asleep, or are you waking up?");
    client.tutorcall.progressCheck(client,message,39);
    console.log(client.sburbMap.get(sburbid,"dreamer"));
}
