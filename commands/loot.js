exports.run = (client, message, args,merge = false) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  let local = client.charcall.charData(client,charid,"local");
if(client.charcall.allData(client,userid,charid,"dreamingID")=="NONE"){
  message.channel.send("You don't have any body to go and loot, not for now at least!");
  return;
}
  let sleepid;

  if(client.charcall.allData(client,userid,charid,"dreamer")){
      sleepid = client.charcall.allData(client,userid,charid,"wakingID");
    } else {
      sleepid = client.charcall.allData(client,userid,charid,"dreamingID");
    }

  dreamlocal = client.charcall.charData(client,sleepid,"local");

//check if player and dream self have same coordinates
  let matching = true;
for(let n=0;n<local.length;n++){
  if(local[n]!=dreamlocal[n]){
    matching=false;
  }
}



if(merge||matching&&client.charcall.allData(client,userid,charid,"revived")){

  //if same location AND revived

  let sec = client.landMap.get(local[4],local[0]);
  let occList = sec[local[1]][local[2]][2][local[3]][4];

let simpleMerge = ["port","cards","scards"];
for(let j=0;j<simpleMerge.length;j++){
  client.charcall.setAnyData(client,userid,charid,client.charcall.charData(client,sleepid,simpleMerge[j])+client.charcall.charData(client,charid,simpleMerge[j]),simpleMerge[j]);
  client.charcall.setAnyData(client,userid,sleepid,0,simpleMerge[j]);
}
let arrayMerge = ["kinds","spec","sdex"];
for(let k=0;k<arrayMerge.length;k++){
  current = client.charcall.charData(client,charid,arrayMerge[k]);
  temp = client.charcall.charData(client,sleepid,arrayMerge[k]);
  while(temp.length>0){
    current.push(temp.pop());
  }
  client.charcall.setAnyData(client,userid,charid,current,arrayMerge[k]);
  client.charcall.setAnyData(client,userid,sleepid,temp,arrayMerge[k]);
}
let specialMerge = ["armor","trinket"];
for(let l=0;l<specialMerge.length;l++){
  if(client.charcall.charData(client,sleepid,specialMerge[l]).length>0){
    if(client.charcall.charData(client,charid,specialMerge[l]).length==0){
      client.charcall.charData(client,charid,client.charcall.charData(client,sleepid,specialMerge[l]),specialMerge[l]);
    } else {
      sdex = client.charcall.charData(client,charid,"sdex");
      cardcount = client.charcall.charData(client,charid,"cards");
      client.charcall.setAnyData(client,userid,charid,cardcount+1,"cards");
      sdex.push(client.charcall.charData(client,sleepid,specialMerge[l])[0]);
      client.charcall.setAnyData(client,userid,charid,sdex,"sdex");
    }
    client.charcall.setAnyData(client,userid,sleepid,[],specialMerge[l]);
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
  client.charcall.setAnyData(client,userid,sleepid,[],"local");
  if(!merge){
  message.channel.send("You touch your fallen body, and claim what was on it. It fades away.");
}
} else {
  message.channel.send("You don't have anything to do with this command.");
}

}
