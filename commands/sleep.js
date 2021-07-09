exports.run = function(client, message, args) {

  if(client.strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send(`You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!`);
    return;
  }
  let charid = message.guild.id.concat(message.author.id);

  if(client.playerMap.get(charid,"revived")){
    let s = client.playerMap.get(charid,"sleepTimer");
    let t = Date.now();
    if(t-s>300000){
      let curvit = client.playerMap.get(charid,"vit");
      let gel = client.playerMap.get(charid,"gel");
      let healing = Math.floor(gel*.5);
      if(curvit+healing>gel){
        client.playerMap.set(charid,gel,"vit");
      } else {
        client.playerMap.set(charid,curvit+healing,"vit");
      }
    message.channel.send(`You sleep, healing for ${healing} Vitality, but have terrifying nightmares of horrifying terrors! You won't be able to go back to sleep for at least another 5 minutes...`);
    client.playerMap.set(charid,t,"sleepTimer");
    return;
  } else {
    message.channel.send(`You can't go to sleep again... not yet... the visions were too horrifying! You need to wait another ${Math.ceil((300000-(t-s))/1000)} seconds!`);
    return;
  }
  }
  if(client.playerMap.get(charid,"dreamvit")<1&&client.configMap.get(message.guild.id).options[0].selection==0){
    message.channel.send(`You try to wake up, but your other self has less than 1 VITALITY! Every action you take as this self will heal your other self by 5 HP. Your other self currently has ${client.playerMap.get(charid,"dreamvit")} VITALITY.`);
    return;
  }
  let temp;
  let dreamSwitch=["local","vit","port","kinds","spec","modus","cards","scards","sdex","equip","trinket","armor"];
  for(let i=0;i<dreamSwitch.length;i++){

    temp =client.playerMap.get(charid,dreamSwitch[i])
    client.playerMap.set(charid,client.playerMap.get(charid,`dream${dreamSwitch[i]}`),dreamSwitch[i]);
    client.playerMap.set(charid,temp,`dream${dreamSwitch[i]}`);
  }

(client.playerMap.get(charid,"dreamer")?client.playerMap.set(charid,false,"dreamer"):client.playerMap.set(charid,true,"dreamer"));
message.channel.send("You fall asleep, or are you waking up?");
client.tutorcall.progressCheck(client,message,39);
console.log(client.playerMap.get(charid,"dreamer"));
}
