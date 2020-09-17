const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");
const rungGrist = [20,22,24,26,28,30,32,34,36,38,40,44,48,52,56,60,64,68,72,76,80,88,96,104,112,120,128,136,144,152,160,176,192,208,224,240,256,272,288,304,320,352,384,416,448,480,512,544,576,608,640,704,768,832,896,960,1024,1088,1152,1216,1280,1408,1536,1664,1792,1920,2048,2176,2304,2432,2560,2816,3072,3328,3584,3840,4096,4352,4608,4864,5120,5632,6144,6656,7168,7680,8192,8704,9216,9728,10240,11264,12288,13312,14336,15360,16384,17408,18432,19456,20480];


exports.run = (client, message, args) => {

  if(funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }
  if(strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
    return;
  }
  var charid = message.guild.id.concat(message.author.id);
  const gristTypes = ["build","uranium","amethyst","garnet","iron","marble","chalk","shale","cobalt","ruby","caulk","tar","amber","artifact","zillium","diamond"];
  let rung = client.playerMap.get(charid,"rung");
  let max = rungGrist[rung];
  let grist = client.playerMap.get(charid,"grist");
  let name = client.playerMap.get(charid,"name");
  let msg =``;
  let i;

//loop to list all of a player's grist types and ammounts

  for(i=0;i<gristTypes.length;i++){
    msg += `${client.emojis.cache.get(client.grist[gristTypes[i]].emoji)} **${gristTypes[i].toUpperCase()} - ${grist[i]}**\n\n`
  }
  cachePrint = new client.Discord.MessageEmbed()
  .setTitle(`**${name.toUpperCase()}'S GRIST**`)
  .addField(`**GRIST CAP**`,`**${max}**`)
  .addField("**GRIST CACHE**",msg);
  message.channel.send(cachePrint);
  return;
}
