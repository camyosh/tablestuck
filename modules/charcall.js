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
//finds data only related to the charid.
exports.charData = function(client,charid,datatype){
  if(client.playerMap.has(charid)){
    return client.playerMap.get(charid,datatype);
  } else {
    return client.npcMap.get(charid,datatype);
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
