exports.checkQuest = function(client,userid,charid,occList) {

let messageCount = 0;
let message = [];
let questProgress = client.charcall.allData(client,userid,charid,"questProgress");
    if(questProgress=="NONE"){
      return [messageCount,message];
    }
let questIdList = [];
    for(let i=0;i<questProgress.length;i++){
      questIdList.push(questProgress[i][0]);
    }

    for(let i=0;i<occList.length;i++){
      if(client.charcall.hasData(client,occList[i][1],"questData")){
        questData = client.charcall.charData(client,occList[i][1],"questData");
        for(let j=0;j<questData.length;j++){
          if(questData[j][7]==0){
            if(!questIdList.includes(questData[j][0])){
              messageCount++;
              message.push(questData[j][3][0]);
            }
          } else if(questData[j][7]==1){
            if(questIdList.includes(questData[j][0])){
              messageCount++;
              message.push(questData[j][3][1]);
              questProgress.splice(questIdList.indexOf(questData[j][0]),1);
              client.charcall.setAnyData(client,userid,charid,questProgress,"questProgress");
              questData[j][7]=2;
              client.charcall.setAnyData(client,`~`,occList[i][1],questData,"questData");
              //remove player quest here
            }
          }
        }
      }
    }

return [messageCount,message];


}
