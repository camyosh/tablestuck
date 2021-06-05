exports.run = (client, message, args) => {

  if(client.strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
    return;
  }

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");
  let local = client.playerMap.get(charid,"local");
  let dreamlocal = client.playerMap.get(charid,"dreamlocal");
  let matching = true;
for(let n=0;n<local.length;n++){
  if(local[n]!=dreamlocal[n]){
    matching=false;
  }
}
if(matching&&client.playerMap.get(charid,"revived")){

  let sec = client.landMap.get(local[4],local[0]);
  let occList = sec[local[1]][local[2]][2][local[3]][4];

let simpleMerge = ["port","cards","scards"];
for(let j=0;j<simpleMerge.length;j++){
  client.playerMap.set(charid,client.playerMap.get(charid,"dream"+simpleMerge[j])+client.playerMap.get(charid,simpleMerge[j]),simpleMerge[j]);
  client.playerMap.set(charid,0,"dream"+simpleMerge[j]);
}
let arrayMerge = ["kinds","spec","sdex"];
for(let k=0;k<arrayMerge.length;k++){
  current = client.playerMap.get(charid,arrayMerge[k]);
  temp = client.playerMap.get(charid,"dream"+arrayMerge[k]);
  while(temp.length>0){
    current.push(temp.pop());
  }
  client.playerMap.set(charid,current,arrayMerge[k]);
  client.playerMap.set(charid,temp,"dream"+arrayMerge[k]);
}
let specialMerge = ["armor","trinket"];
for(let l=0;l<specialMerge.length;l++){
  if(client.playerMap.get(charid,"dream"+specialMerge[l]).length>0){
    if(client.playerMap.get(charid,specialMerge[l]).length==0){
      client.playerMap.set(charid,client.playerMap.get(charid,"dream"+specialMerge[l]),specialMerge[l]);
    } else {
      sdex = client.playerMap.get(charid,"sdex");
      cardcount = client.playerMap.get(charid,"cards");
      client.playerMap.set(charid,cardcount+1,"cards");
      sdex.push(client.playerMap.get(charid,"dream"+specialMerge[l])[0]);
      client.playerMap.set(charid,sdex,"sdex");
    }
    client.playerMap.set(charid,[],"dream"+specialMerge[l]);
  }
}
  for(let i=0;i<occList.length;i++){
    if(occList[i][1]==charid){
      sec[local[1]][local[2]][2][local[3]][4].splice(i,1);
      client.landMap.set(local[4],sec,local[0]);
      break;
    }
  }
  client.playerMap.set(charid,[],"dreamlocal");
  message.channel.send("You touch your fallen body, and claim what was on it. It fades away.");
} else {
  message.channel.send("You don't have anything to do with this command.");
}

}
