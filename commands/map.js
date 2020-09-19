
const landcall = require("../modules/landcall.js");


exports.run = (client, message, args) => {

let charid = message.guild.id.concat(message.author.id);


 input = client.landMap.get(charid,"s1");
 //landcall.landGen(client,0,[5,5]);
 let msg = "";
  for(i=0;i<11;i++){
    for(j=0;j<11;j++){
      let str = "";
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
          str="X";
      }
      msg+=`${str}`
    }
    msg+='\n';
  }
message.channel.send(msg);

}
