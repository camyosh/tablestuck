exports.run = function(client, message, args) {

console.log(1);
  if(client.strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send(`You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!`);
    return;
  }
console.log(2);
  let charid = message.guild.id.concat(message.author.id);
  let temp;
  let dreamSwitch=["local","vit","port","kinds","spec","modus","cards","scards","sdex","equip","trinket","armor"];
console.log(dreamSwitch);
  for(let i=0;i<dreamSwitch.length;i++){

    temp =client.playerMap.get(charid,dreamSwitch[i])
console.log(temp);
    client.playerMap.set(charid,client.playerMap.get(charid,`dream${dreamSwitch[i]}`),dreamSwitch[i]);
    client.playerMap.set(charid,temp,`dream${dreamSwitch[i]}`);
  }

message.channel.send("You fall asleep, or are you waking up?");

}
