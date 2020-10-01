
const landcall = require(`../modules/landcall.js`);
const funcall = require(`../modules/funcall.js`);
const strifecall = require(`../modules/strifecall.js`);

exports.run = (client, message, args) => {

  if(funcall.regTest(client, message, message.author) == false){
    message.channel.send(`You're not a registered player!`);
    return;
  }

  if(strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send(`You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!`);
    return;
  }


let charid = message.guild.id.concat(message.author.id);
let local = client.playerMap.get(charid,`local`);

if(local[0]==`h`){
  message.channel.send(`There is no map for your house!`);
  return;
}

let aspect;

try {
  aspect = client.landMap.get(local[4],"aspect");
} catch(err){
  aspect = "BREATH";
}

let input = client.landMap.get(local[4],local[0]);
 //landcall.landGen(client,0,[5,5]);
/*
section[gate[0][0]][gate[0][1]]=defaultGate;
*/
let sectionTitle;
  switch(local[0]){
    case "s1":
    sectionTitle = [`${client.emojis.cache.get("760224982054862868")}`,`${client.emojis.cache.get("760224981988409394")}`];
    break;
    case "s2":
    sectionTitle = [`${client.emojis.cache.get("760225122446737448")}`,`${client.emojis.cache.get("760225122404532294")}`];
    break;
    case "s3":
    sectionTitle = [`${client.emojis.cache.get("760225191888027649")}`,`${client.emojis.cache.get("760225191804010506")}`];
    break;
    case "s4":
    sectionTitle = [`${client.emojis.cache.get("760225497631686706")}`,`${client.emojis.cache.get("760225497401131031")}`];
    break;
  }

let msg =  `${client.emojis.cache.get("760188336325001257")}${client.emojis.cache.get("760224982071640084")}${client.emojis.cache.get("760224981740814367")}${client.emojis.cache.get("760224981740814367")}${client.emojis.cache.get("760224981563998229")}${client.emojis.cache.get("760224981975564308")}${client.emojis.cache.get("760224982005055540")}${client.emojis.cache.get("760224982117908490")}${sectionTitle[0]}${sectionTitle[1]}${client.emojis.cache.get("760224981950267453")}${client.emojis.cache.get("760224982038347836")}\n`


 let legend = [`${client.emojis.cache.get("760217643746852894")}`,`${client.emojis.cache.get("760217643470422036")}`,
 `${client.emojis.cache.get("760217643491131452")}`,`${client.emojis.cache.get("760217643209850911")}`,`${client.emojis.cache.get("760217643533336616")}`,`${client.emojis.cache.get("760217643273158657")}`,`${client.emojis.cache.get("760217643935858718")}`,`${client.emojis.cache.get("760217643507515453")}`,`${client.emojis.cache.get("760217643528880188")}`,`${client.emojis.cache.get("760217643193073685")}`,`${client.emojis.cache.get("760217643336204309")}`]
 msg += `${client.emojis.cache.get("760217693789224960")}${client.emojis.cache.get("760217643746852894")}${client.emojis.cache.get("760217643470422036")}${client.emojis.cache.get("760217643491131452")}${client.emojis.cache.get("760217643209850911")}${client.emojis.cache.get("760217643533336616")}${client.emojis.cache.get("760217643273158657")}${client.emojis.cache.get("760217643935858718")}${client.emojis.cache.get("760217643507515453")}${client.emojis.cache.get("760217643528880188")}${client.emojis.cache.get("760217643193073685")}${client.emojis.cache.get("760217643336204309")}\n`;
 //let msg2 = `${client.emojis.cache.get("760224982054862868")}`;
 let msg2 = ``;
 let msg3 = ``;
  for(i=0;i<11;i++){
  if(i<3){
    msg+=legend[i];
  } else if(i<7){
    msg2+=legend[i];
  } else {
    msg3+=legend[i];
  }
    for(j=0;j<11;j++){
      let str = ``;

      if(!input[i][j][2][0][3]){
        str=`${client.emojis.cache.get(client.map.FOGTILE.BLANK)}`;
      //} else if(i==local[1]&& j==local[2]){
      } else {
        let tile = "TILE";
        if(i==local[1]&& j==local[2]){
          tile = `PLTILE`;
        }
       //str=`${client.emojis.cache.get("760188336245309512")}`;
       switch(input[i][j][0]){
         case 0:

         let player = false;
         if(input[i][j][2][0][4].length > 0){
         for(k=0;k<input[i][j][2][0][4].length;k++){
           if(input[i][j][2][0][4][k][0]&& input[i][j][2][0][4][k][1]!=charid){
             player=true;
           }
         }}
         if(player){
           str=`${client.emojis.cache.get(client.map[tile].PLAYER)}`;
         } else {
           str=`${client.emojis.cache.get(client.map[tile].BLANK)}`;
         }
         break;
         case 1:
           str=`${client.emojis.cache.get(client.map[tile].DUNGEON)}`;
         break;
         case 2:
         console.log(aspect);
          str = `${client.emojis.cache.get(client.map[tile][aspect])}`;
         break;
         case 3:
           str = `${client.emojis.cache.get(client.map[tile].NODE)}`;
         break;
         case 4:
           str=`${client.emojis.cache.get(client.map[tile].VILLAGE)}`;
         break;
         case 6:
           str=`${client.emojis.cache.get(client.map[tile].GATE)}`;
         break;
         default:
           str=`:x:`;
       }
    }
    if(i<3){
      msg+=`${str}`;
    }else if(i<7){
      msg2+=`${str}`;
    } else {
      msg3+=`${str}`;
    }
    }
    if(i<3){
    msg+='\n';
  } else if(i<7){
    msg2+='\n';
  } else {
    msg3+='\n'
  }
  }


message.channel.send(msg);
message.channel.send(msg2);
message.channel.send(msg3);

}
