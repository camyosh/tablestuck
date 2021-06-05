exports.run = function(client, message, args) {

  if(client.strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send(`You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!`);
    return;
  }
  let charid = message.guild.id.concat(message.author.id);
  if(client.playerMap.get(charid,"revived")){
    message.channel.send(`Since you've died, you don't have an alternative self to wake up as, and for the moment cannot sleep.`);
    return;
  }
  if(client.playerMap.get(charid,"dreamvit")<1){
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
