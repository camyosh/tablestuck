exports.charData = function(client,userid,charid,datatype){

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
//-----------------------
exports.charCheck = function(client,charid,datatype){
  if(client.playerMap.has(charid)){
    return client.playerMap.get(charid,datatype)
  } else {
    return client.npcMap.get(charid,datatype);
  }
}
 exports.npcCheck = function(client,userid,charid,datatype){
   if(client.charcall.charData(userid,charid,datatype)=="NONE"){
     return false;
   } else {
     return true;
   }
 }
