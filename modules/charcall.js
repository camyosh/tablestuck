//finds data anywhere, defaulting to userdata
exports.allData = function(client,userid,charid,datatype){

  if(client.playerMap.has(charid)){
    let sburbid = client.playerMap.get(charid,"owner");
    if(client.playerMap.get(charid).hasOwnProperty(datatype)){
      return client.playerMap.get(charid,datatype);
    } else if(client.sburbMap.get(sburbid).hasOwnProperty(datatype)){
      return client.sburbMap.get(sburbid,datatype);
    } else if(client.userMap.get(userid).hasOwnProperty(datatype)){
      return client.userMap.get(userid,datatype);
    } else{
      return "NONE";
    }
  } else {
    if(client.npcMap.get(charid).hasOwnProperty(datatype)){
      return client.npcMap.get(charid,datatype);
    } else if(client.userMap.get(userid).hasOwnProperty(datatype)){
    return client.userMap.get(userid,datatype);
    } else {
    return "NONE";
    }
  }
}
//sets data in an already existing location
exports.setAnyData = function(client,userid,charid,data,key){
  if(client.playerMap.has(charid)){
    let sburbid = client.playerMap.get(charid,"owner");
    if(client.playerMap.get(charid).hasOwnProperty(key)){
      client.playerMap.set(charid,data,key);
    }else if(client.sburbMap.get(sburbid).hasOwnProperty(key)){
      client.sburbMap.set(charid,data,key);
    }else if(client.userMap.get(userid).hasOwnProperty(key)){
      client.userMap.set(charid,data,key);
    }else{
      return;
    }
  }else{
    if(client.npcMap.get(charid).hasOwnProperty(key)){
      client.npcMap.set(charid,data,key);
    } else if(client.userMap.get(userid).hasOwnProperty(key)){
      client.userMap.set(charid,data,key);
    } else {
    return;
    }
  }
}
//finds data only related to the charid.
exports.charData = function(client,charid,datatype){
  if(client.playerMap.has(charid)){
    return client.playerMap.get(charid,datatype);
  } else {
    return client.npcMap.get(charid,datatype);
  }
}
//checks if a character has a given datatype
exports.hasData = function(client,charid,datatype){
  if(client.playerMap.has(charid)){
    if(client.playerMap.get.hasOwnProperty(datatype)){
      return true;
    }
  }
  if(client.npcMap.has(charid)){
    if(client.npcMap.get.hasOwnProperty(datatype)){
      return true;
    }
  }
}
//returns a bool based on if the charid belongs to an NPC or not.
 exports.npcCheck = function(client,charid){
   if(client.npcMap.has(userid)){
     return true;
   } else {
     return false;
   }
 }
 //checks if there is an underling present in a given occList.
 exports.underlingCheck = function(occList,client) {
   check = false;
   if(occList.length>0){
     for(i=0;i<occList.length;i++){
       if(occList[i][0]==false&&client.charcall.charData(client,occList[i][0],"faction")=="underling"){
         check=true;
       }
     }
   }
   return check;
 }
