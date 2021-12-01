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
  } else if(client.npcMap.has(charid)){
    if(client.npcMap.get(charid).hasOwnProperty(datatype)){
      return client.npcMap.get(charid,datatype);
    } else if(client.userMap.get(userid).hasOwnProperty(datatype)){
    return client.userMap.get(userid,datatype);
    } else {
    return "NONE";
    }
  } else {
    return "NONE";
  }
}
//sets data in an already existing location
exports.setAnyData = function(client,userid,charid,data,key){
  if(client.playerMap.has(charid)){
    let sburbid = client.playerMap.get(charid,"owner");
    if(client.playerMap.get(charid).hasOwnProperty(key)){
      client.playerMap.set(charid,data,key);
    }else if(client.sburbMap.get(sburbid).hasOwnProperty(key)){
      client.sburbMap.set(sburbid,data,key);
    }else if(client.userMap.get(userid).hasOwnProperty(key)){
      client.userMap.set(userid,data,key);
    }else{
      console.log(`Couldn't assign data ${data} to key ${key} for ${charid}.`);
      return;
    }
  }else{
    if(client.npcMap.get(charid).hasOwnProperty(key)){
      client.npcMap.set(charid,data,key);
    } else if(client.userMap.get(userid).hasOwnProperty(key)){
      client.userMap.set(userid,data,key);
    } else {
    console.log(`Couldn't assign data ${data} to key ${key} for ${charid}.`);
    return;
    }
  }
}
//finds data only related to the charid.
exports.charData = function(client,charid,datatype){
  if(client.playerMap.has(charid)){
    if(client.playerMap.get(charid).hasOwnProperty(datatype)){
    return client.playerMap.get(charid,datatype);
  }else{
    return "NONE";
  }
  } else if(client.npcMap.has(charid)){
    if(client.npcMap.get(charid).hasOwnProperty(datatype)){
    return client.npcMap.get(charid,datatype);
  }else{
    return "NONE";
  }
  } else {
    return "NONE";
  }
}
//changes a sburbid to a charid, or keeps it as a charid for npcs.
exports.charGet = function(client,checkid){
  if(client.sburbMap.has(checkid)){
    if(client.sburbMap.get(checkid,"dreamer")){
      return client.sburbMap.get(checkid,"dreamingID");
    } else{
      return client.sburbMap.get(checkid,"wakingID");
    }
  } else if (client.npcMap.has(checkid)){
    return checkid;
  }
  return "NONE";
}
//changes a charid to a sburbid, or keeps it as a charid for npcs.
exports.sburbGet = function(client,checkid){
 if(client.playerMap.has(checkid)){
   return client.playerMap.get(checkid,"owner");
 } else if(client.npcMap.has(checkid)){
   return checkid;
 }
 return "NONE";
}
//checks if a character has a given datatype
exports.hasData = function(client,charid,datatype){
  if(client.playerMap.has(charid)){
    if(client.playerMap.get(charid).hasOwnProperty(datatype)){
      return true;
    }
  }
  if(client.npcMap.has(charid)){
    if(client.npcMap.get(charid).hasOwnProperty(datatype)){
      return true;
    }
  }
  return false;
}
//returns a bool based on if the charid belongs to an NPC or not.
 exports.npcCheck = function(client,charid){
   if(client.npcMap.has(charid)){
     return true;
   }
     return false;
 }
 //checks if a character is being controlled by a user.
 exports.controlCheck = function(client,charid){
   if(client.charcall.charData(client,charid,"control").length>0){
     return true;
   }
   return false;
 }
 //checks if there is an underling present in a given occList.
 exports.underlingCheck = function(occList,client) {
   check = false;
   if(occList.length>0){
     for(i=0;i<occList.length;i++){
       if(occList[i][0]==false&&client.charcall.charData(client,occList[i][0],"control")=="NONE"){
         check=true;
       }
     }
   }
   return check;
 }
