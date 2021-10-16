exports.run = (client, message, args,merge = false) => {

  if(client.strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
    return;
  }

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  var sburbid = client.playerMap.get(charid,"owner")




  let local = client.playerMap.get(charid,"local");

  let sleepid;

  if(client.sburbMap.get(sburbid,"dreamer")){
      sleepid = client.sburbMap.get(sburbid,"wakingID");
    } else {
      sleepid = client.sburbMap.get(sburbid,"dreamingID");
    }

  dreamlocal = client.playerMap.get(sleepid,"local");

//check if player and dream self have same coordinates
  let matching = true;
for(let n=0;n<local.length;n++){
  if(local[n]!=dreamlocal[n]){
    matching=false;
  }
}



if(merge||matching&&client.sburbMap.get(sburbid,"revived")){

  //if same location AND revived

  let sec = client.landMap.get(local[4],local[0]);
  let occList = sec[local[1]][local[2]][2][local[3]][4];

let simpleMerge = ["port","cards","scards"];
for(let j=0;j<simpleMerge.length;j++){
  client.playerMap.set(charid,client.playerMap.get(sleepid,simpleMerge[j])+client.playerMap.get(charid,simpleMerge[j]),simpleMerge[j]);
  client.playerMap.set(sleepid,0,simpleMerge[j]);
}
let arrayMerge = ["kinds","spec","sdex"];
for(let k=0;k<arrayMerge.length;k++){
  current = client.playerMap.get(charid,arrayMerge[k]);
  temp = client.playerMap.get(sleepid,arrayMerge[k]);
  while(temp.length>0){
    current.push(temp.pop());
  }
  client.playerMap.set(charid,current,arrayMerge[k]);
  client.playerMap.set(sleepid,temp,arrayMerge[k]);
}
let specialMerge = ["armor","trinket"];
for(let l=0;l<specialMerge.length;l++){
  if(client.playerMap.get(sleepid,specialMerge[l]).length>0){
    if(client.playerMap.get(charid,specialMerge[l]).length==0){
      client.playerMap.set(charid,client.playerMap.get(sleepid,specialMerge[l]),specialMerge[l]);
    } else {
      sdex = client.playerMap.get(charid,"sdex");
      cardcount = client.playerMap.get(charid,"cards");
      client.playerMap.set(charid,cardcount+1,"cards");
      sdex.push(client.playerMap.get(sleepid,specialMerge[l])[0]);
      client.playerMap.set(charid,sdex,"sdex");
    }
    client.playerMap.set(sleepid,[],specialMerge[l]);
  }
}
if(!merge){
  for(let i=0;i<occList.length;i++){
    if(occList[i][1]==sleepid){
      sec[local[1]][local[2]][2][local[3]][4].splice(i,1);
      client.landMap.set(local[4],sec,local[0]);
      break;
    }
  }
}
  client.playerMap.set(sleepid,[],"local");
  if(!merge){
  message.channel.send("You touch your fallen body, and claim what was on it. It fades away.");
}
} else {
  message.channel.send("You don't have anything to do with this command.");
}

}
