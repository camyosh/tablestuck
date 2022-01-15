exports.checkQuest = function(client,userid,charid,occList) {

let messageCount = 0;
let message = [];
let boons = 0;
let questProgress = client.charcall.allData(client,userid,charid,"questProgress");
    if(questProgress=="NONE"){
      return [messageCount,message];
    }
let questIdList = [];
    for(let i=0;i<questProgress.length;i++){
      questIdList.push(questProgress[i].id);
    }

    for(let i=0;i<occList.length;i++){
      if(client.charcall.hasData(client,occList[i][1],"questData")){
        questData = client.charcall.charData(client,occList[i][1],"questData");
        for(let j=0;j<questData.length;j++){
          if(questData[j].completion==0){
            if(!questIdList.includes(questData[j].id)){
              messageCount++;
              message.push(questData[j].dialogue[0]);
            }
          } else if(questData[j].completion==1){
            if(questIdList.includes(questData[j].id)&&questProgress[questIdList.indexOf(questData[j].id)].completed){
              messageCount++;
              message.push(questData[j].dialogue[1]);
              boons+=questData[j].boon;
              questProgress.splice(questIdList.indexOf(questData[j].id),1);
              client.charcall.setAnyData(client,userid,charid,questProgress,"questProgress");
              questData[j].completion=2;
              client.charcall.setAnyData(client,`~`,occList[i][1],questData,"questData");
              //remove player quest here
            }
          }
        }
      }
    }
return [messageCount,message,boons];
}
exports.stepQuest = function(client,userid,charid,type){
  let questProgress = client.charcall.allData(client,userid,charid,"questProgress");
  if(questProgress=="NONE"){
    return;
  }
  console.log(type);
  for(let i=0;i<questProgress.length;i++){
    if(type==questProgress[i].type&&!questProgress[i].completed){
      questProgress[i].progress++;
      if(questProgress[i].progress>=questProgress[i].goal){
        questProgress[i].progress=questProgress[i].goal;
        questProgress[i].completed=true;
      }
    }
  }
client.charcall.setAnyData(client,userid,charid,questProgress,"questProgress");
}
exports.createQuest = function(client,name,questid,local,type){
  let questData =
  {
  id:`${questid}01`,
  title:``,
  desc:[``,``],
  dialogue:[``,``],
  goal:0,
  type:``,
  boon:0,
  completion:0
}
  switch (type){
    case "kill":
    let choice = Math.floor(Math.random()*3);
    let count = Math.ceil(Math.random()*4)+4;
    let underData = [
      ["Imps","little gremlins",10],
      ["Ogres","huge beasts",50],
      ["Basilisks","big lizards",100],
      ["Liches","large skullheads",300],
      ["Giclopses","ginormous one-eyed things",600],
      ["Titachnids","terrifying abominations",1500]
      ]
      switch(local[0]){
        case "s1":
        underlingChoice = ["imp","ogre","basilisk"];
        break;
        case "s2":
        underlingChoice = ["ogre","basilisk","lich"];
        case "s3":
        underlingChoice = ["basilisk","lich","giclopse"];
        break;
        case "s4":
        underlingChoice = ["lich","giclopse","titachnid"];
        break;
        default:
        underlingChoice = ["imp","imp","imp"];
        break;
      }
      let underlingRef = ["imp","ogre","basilisk","lich","giclopse","titachnid"];
      let dataIndex = underlingRef.indexOf(underlingChoice[choice]);
      questData.title = `Kill ${count} ${underData[dataIndex][0]}`;
      questData.desc =  [
                        `${name} asked you to protect their village from ${underData[dataIndex][0]}.`,
                        `Return to ${name} (${local[2]},${local[1]}) to claim your prize!`
                        ];
      questData.dialogue =  [
                            `Help! ${underData[dataIndex][1]} have surrounded our village! Kill them!`,
                            `Thank you! Have these candies I found!`
                            ];
      questData.goal = count;
      questData.type=`kill${underlingChoice[choice]}`;
      questData.boon=Math.floor(underData[dataIndex][2]*count+underData[dataIndex][2]*Math.random().toFixed(2));
    break;
  }

  return questData;
}
