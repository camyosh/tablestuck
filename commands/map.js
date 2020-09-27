
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

let input = client.landMap.get(charid,local[0]);
 //landcall.landGen(client,0,[5,5]);
/*
section[gate[0][0]][gate[0][1]]=defaultGate;
*/
 let legend = [`:zero:`,`:one:`,`:two:`,`:three:`,`:four:`,`:five:`,`:six:`,`:seven:`,`:eight:`,`:nine:`,`:keycap_ten:`]
 let msg = `:diamond_shape_with_a_dot_inside::zero::one::two::three::four::five::six::seven::eight::nine::keycap_ten:\n`;
 let msg2 = ``;
  for(i=0;i<11;i++){
  if(i<5){
    msg+=legend[i];
  } else {
    msg2+=legend[i];
  }
    for(j=0;j<11;j++){
      let str = ``;
      if(!input[i][j][2][0][3]){
        str=`${client.emojis.cache.get("715632438742745188")}`;
      } else if(i==local[1]&& j==local[2]){
       str=`:radio_button:`;
      } else {
      switch(input[i][j][0]){
        case 0:
          str=`:white_large_square:`;
        break;
        case 1:
          str=`:one:`;
        break;
        case 2:
          str=`:two:`;
        break;
        case 3:
          str=`:three:`;
        break;
        case 4:
          str=`:four:`;
        break;
        case 6:
          str=`:blue_circle:`;
        break;
        default:
          str=`:x:`;
      }

    }
    if(i<5){
      msg+=`${str}`;
    }else {
      msg2+=`${str}`;
    }
    }
    if(i<5){
    msg+='\n';
  } else {
    msg2+='\n';
  }
  }

message.channel.send(msg);
message.channel.send(msg2);


}
