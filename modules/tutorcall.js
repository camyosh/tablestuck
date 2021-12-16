

exports.progressCheck = async function(client,message,step,affix=false,bypass = false){
  /*
  every player has an array of bools that say if they've passed certain stages of the tutorial.
    this means that progress can be made in any order, though the guide will try to lead the player along a certain route.
    --client.tutorcall.progressCheck(client,message,#);
    --------------------
    Master Reference to step ID and when it's referenced (and what it leads to, if anything):
    1:On Register or >tutorial start (>tutorial,>inspect,>list)
    2:>list
    3:>inspect(>move,>captcha)
    4:>inspect-ing an item
    5:>captcha-ing an item (>sylladex,>eject)
    6:>eject-ing an item
    7:>sylladex
    8:>move
    9:>move with arg (>contents,>chumroll)
    10:>chumroll (>chumhandle,>chumpic,>pester)
    11:>pester (>pesterchannel)
    12:>contents
    13:>captcha-ing two items deep (>use)
    14:>use-ing captcha cards
    15:>use-ing the game disc on a computer (>check,>connect)
    16: >check (>bio,>name,>pic)
    17: >bio(>say,>stats)
    18: >connect (>deploy,>specibus)
    19: >deploy (>cache)
    20: >cache (>grist,>registry,>build)
    21: >build (>specibus)
    22: >specibus (>allocate,>equip)
    23: >equip (>switch,>armor)
    24: >armor (>trinket,>trait)
    25: >trait (>alchemize)
    26: >alchemize (just more alchemy)
    27: use-ing a punched card on the totem lathe(more alchemy,>prototype)
    28: >prototype
    29: use-ing a dowel on the totem lathe(more alchemy)
    30: use-ing a carved dowel on the alchemizer (>alchemize,>ath)
    31: Alchemizing your Entry Artifact (>prototype,>deploy)
    32: Entering your land (>strife)
    33:>strife(>act,>pass)
    34:>act(>switch,>list)
    35:finishing taking an action
    36:>pass (>push)
    37:Winning a Strife(>heal,>quickalch,>sleep)
    38:>heal(>consume,>sleep)
    39:>sleep(>map,>fly)
    40:>fly(>enter)
    41:>enter(>move,>heal,>quickalch)
    42:>quickalch
    43:put a blank card into the PUNCH DESIGNATRIX
    44: punch a code into the blank card
    45:contined explaination from 44
    46: Alchemize a new item (>heal,>sleep)
    47: complete >sleep,>heal, and >quickalch(the fakeout one)
    48:actual >quickalch (disables >heal)
    ------------

  */
  userid = message.guild.id.concat(message.author.id);
  charid = client.userMap.get(userid,"possess");
  channelid = client.userMap.get(userid,"channel");
  progress = client.charcall.allData(client,userid,charid,"tutor");
  //if the step is done and a message is affixed, sends the message without the tutorial attached.
  if(!progress[0]||client.charcall.npcCheck(client,charid)||progress[step]&&!bypass){
    if(affix){
      switch (affix[0]){
        case "text":
        await client.channels.cache.get(channelid).send({content: affix[1]});
        break;
        case "img":
        await client.channels.cache.get(channelid).send({files:[affix[1]]});
        break;
        case "embed":
        await client.channels.cache.get(channelid).send({embeds: [affix[1]]});
        break;
      }
    }
    return;
  }
let tutorRef = require("../tutorRef.json");
let msg = ``;
  msg = tutorRef.content[step];
  progress[step]=true;
  client.userMap.set(userid,progress,"tutor");

  client.Canvas.registerFont("./miscsprites/Courier Std Bold.otf",{family:`Courier Standard Bold`});
  const canvas = client.Canvas.createCanvas(1000,500);
  const ctx = canvas.getContext('2d');
  const sprite = await client.Canvas.loadImage(`./miscsprites/tempSprite.png`);
    function splitText(canvas,ctx,msg,max){

      let i = 0;
      let k = 0;
      while(i<msg.length){
        if(msg.charAt(k)==`\n`){
          i = 0;
        }
        if(msg.charAt(k)==` `&&i>=max){
          var msg1 = msg.substring(0,k);
          var msg2 = msg.substring(k+1);
          msg = msg1+`\n`+msg2;
          i=0;
        }
        k++;
        i++;
      }
        return(msg);
    }



msg = splitText(canvas,ctx,msg,32);
msg = msg.replaceAll(`>`,`${client.auth.prefix}`);
ctx.fillStyle = "#000000";
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.drawImage(sprite,0,0,300,500);
ctx.font = "28px Courier Standard Bold";
ctx.fillStyle = "#ffffff";
ctx.fillText(msg,320,40);

const attachment = new client.MessageAttachment(canvas.toBuffer(), 'tutorial.png');
if(!affix){
await client.channels.cache.get(channelid).send({files:[attachment]});
} else {
  switch (affix[0]){
    case "text":
    await client.channels.cache.get(channelid).send({content: affix[1],files:[attachment]});
    break;
    case "img":
    await client.channels.cache.get(channelid).send({files:[affix[1],attachment]});
    break;
    case "embed":
    await client.channels.cache.get(channelid).send({embeds:[affix[1]]});
    await client.channels.cache.get(channelid).send({files:[attachment]});
    break;
  }
}
if(bypass){
  return;
}
if(progress[44]){
client.tutorcall.progressCheck(client,message,45);
}
if(!progress[47]&&progress[38]&&progress[41]&&progress[46]){
client.tutorcall.progressCheck(client,message,47);
}
if(progress[48]){
client.userMap.set(userid,true,"tutcomplete");
}
}
