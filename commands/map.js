
const landcall = require("../modules/landcall.js");
const funcall = require("../modules/funcall.js");
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {

  if(funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

  if(strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
    return;
  }


let charid = message.guild.id.concat(message.author.id);
let local = client.playerMap.get(charid,"local");

if(local[0]=="h"){
  message.channel.send("Haha you're gay");
  return;
}

let input = client.landMap.get(charid,local[0]);
 //landcall.landGen(client,0,[5,5]);
/*
section[gate[0][0]][gate[0][1]]=defaultGate;
*/

 let msg = "";
  for(i=0;i<11;i++){
    for(j=0;j<11;j++){
      let str = "";
      if(!input[i][j][2][0][3]){
        str=":purple_square:";
      } else if(i==local[1]&& j==local[2]){
       str=":radio_button:";
      } else {
      switch(input[i][j][0]){
        case 0:
          str=":white_circle:";
        break;
        case 1:
          str=":one:";
        break;
        case 2:
          str=":two:";
        break;
        case 3:
          str=":three:";
        break;
        case 4:
          str=":four:";
        break;
        case 6:
          str=":blue_circle:";
        break;
        default:
          str=":x:";
      }

    }
      msg+=`${str}`
    }
    msg+='\n';
  }
message.channel.send(msg);

}
