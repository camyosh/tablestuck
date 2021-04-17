const funcall = require("./funcall.js");
const lootcall = require("./lootcall.js");
const stifecall = require("./strifecall.js");
//10 dungeons, 10 villages, 15 return nodes, 10 constructs, 1 gate, 10 random loot, 65 nothing

//var output = [AREA TYPE,NUMBER OF ROOMS,[[roomType,roomLoot,roomName,roomVisite,occ,roomInv],[room2]]];
//default empty = [0,1,[0,random number,"Clearing",false,[underlings],[items]]]

var defaultEmpty = [0,1,[[[],[],"CLEARING",false,[],[]]]];
var defaultGate = [6,1,[[[],[],"GATE",false,[],[]]]];

function dubs(x){
  return Math.floor(Math.random() * x) + Math.floor(Math.random() * x);
}
//Land Key(0-9):
//EMPTY, DUNGEON, CONSTRUCT, NODE, VILLAGE, HOUSE, GATE, WALL, BOSS, DENIZEN

//10

var aspects = ["BREATH","LIFE","LIGHT","TIME","HEART","RAGE","BLOOD","VOID","SPACE","MIND","HOPE","DOOM",]

var aspectItems = [
  ["WINDSOCK","0?mDbRTh",1,1,[]],
  ["PLANT","0PnCL1f3",1,1,[]],
  ["COIN","0hoBLIhT",1,1,[]],
  ["CLOCK","0qpAT1M3",1,1,[]],
  ["LOCKET","0iq9haRT",1,1,[]],
  ["HORN","0dr8R4g3",1,1,[]],
  ["HEIRLOOM","0Ms7bL0d",1,1,[]],
  ["ERASER","0Nt6Vo1d",1,1,[]],
  ["YARD STICK","02u5SpcE",1,1,[]],
  ["BRAIN IN JAR","05v4M1Nd",1,1,[]],
  ["RELIGIOUS SYMBOL","0sw3h0P3",1,1,[]],
  ["SKULL","0yx2d0Om",1,1,[]]
]

//let defaultDungeon =[1,2,[[],[],"ROOM 1",false,[],[]],[[],[],"ROOM 2",false,[],[]]];
var defaultConstruct =[2,1,[[[],[],"LAND CONSTRUCT",false,[],[]]]];
var defaultNode =[3,1,[[[],[],"RETURN NODE",false,[],[]]]];
var defaultVillage =[4,2,[[[],[],"ROOM 1",false,[],[]],[[],[],"ROOM 2",false,[],[]]]];

exports.landGen = function(client,sec,gateCoor,message,aspect) {

  let startTime = Date.now();
    //console.log(`Start time is ${startTime}`);

  let outpostCheck = false;
  let outpostChance = 3;
  let section = [];

  //console.log(`Generating empty land and dungeon - ${Date.now() - startTime}`);

  for(let i=0;i<11;i++){
    section.push([[0,1,[[[],[],"CLEARING",false,[],[]]]],[0,1,[[[],[],"CLEARING",false,[],[]]]],[0,1,[[[],[],"CLEARING",false,[],[]]]],[0,1,[[[],[],"CLEARING",false,[],[]]]],[0,1,[[[],[],"CLEARING",false,[],[]]]],[0,1,[[[],[],"CLEARING",false,[],[]]]],[0,1,[[[],[],"CLEARING",false,[],[]]]],[0,1,[[[],[],"CLEARING",false,[],[]]]],[0,1,[[[],[],"CLEARING",false,[],[]]]],[0,1,[[[],[],"CLEARING",false,[],[]]]],[0,1,[[[],[],"CLEARING",false,[],[]]]]]);
  }
  let dungeon = [];
  for(let i=0;i<11;i++){
    dungeon.push([[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]  , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]] , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]]);
  }

  //console.log(`Finished generating empty land and dungeon - ${Date.now() - startTime}`);

empty =[];
  for(let i=0;i<11;i++){
    for(j=0;j<11;j++){
      empty.push([i,j]);
    }
  }

  //console.log(`Finished setting up the empty array - ${Date.now() - startTime}`);
  let dunCount;
  let denizenCheck = false;
  //Creates the Gate on the Land
  let pos = (gateCoor[0]*11)+(gateCoor[1]);
  if (sec!=3){
  let gate = empty.splice(pos,1);
  section[gate[0][0]][gate[0][1]]=[6,1,[[[],[],"GATE",false,[],[]]]];
  } else {
    denizenCheck = true;
    let temp=empty.splice(60,1);
    section[temp[0][0]][temp[0][1]]=[1,1,[[[],[],"DENIZEN LAIR ENTRANCE",false,[[]],[]]]];
    //console.log(`Calling DungeonGen for Denizen lair - ${Date.now() - startTime}`);
    dungeon = dungeonGen(client,temp,sec,dungeon,message)[0];
    //console.log(`Resolved DungeonGen - ${Date.now() - startTime}`);
  }
  if(sec>1){
    dunCount = 1;
  } else {
    dunCount =2;
  }

  //console.log(`Generating each third of the land with a for() loop - ${Date.now() - startTime}`);

  for(j=3;j>0;j--){
    let length = 40;
  //Creates Dungeons

  //console.log(`Generating ${dunCount+1} dungeons - ${Date.now() - startTime}`);

  for(let i=0;i<dunCount;i++){
    if(!denizenCheck){
  let temp=empty.splice(Math.floor(Math.random()*length)-1+(40*(j-1)),1);
  length--;
  section[temp[0][0]][temp[0][1]]=[1,1,[[[],[],"DUNGEON ENTRANCE",false,[],[]]]];
  //section[temp[0][0]][temp[0][1]]=[1,6,[funcall.roomGenCall(client,1,sec,1),funcall.roomGenCall(client,1,sec,2),funcall.roomGenCall(client,1,sec,3),funcall.roomGenCall(client,1,sec,4)]];

  //console.log(`Calling DungeonGen for normal dungeon - ${Date.now() - startTime}`);
  dungeon = dungeonGen(client,temp,sec,dungeon,message)[0];
  //console.log(`Resolved DungeonGen - ${Date.now() - startTime}`);
  }
  }

  //console.log(`Generating villages, constructs, nodes - ${Date.now() - startTime}`);
  //Creates a Village
  for(let i=0;i<3;i++){
    let temp=empty.splice(Math.floor(Math.random()*length)-1+(40*(j-1)),1);
    length--;
    section[temp[0][0]][temp[0][1]]=[4,2,[[[],[],"ROOM 1",false,[],[]],[[],[],"ROOM 2",false,[],[]]]];
  }
  //Creates the Land Constructs
  for(let i=0;i<3;i++){
    let temp=empty.splice(Math.floor(Math.random()*length)-1+(40*(j-1)),1);
    length--;
    if(Math.floor(Math.random()*4)==0){
      section[temp[0][0]][temp[0][1]]=[2,1,[[[],[],"LAND CONSTRUCT",false,[],[aspectItems[aspects.indexOf(aspect)]]]]];
    } else {
      section[temp[0][0]][temp[0][1]]=[2,1,[[[],[],"LAND CONSTRUCT",false,[],[]]]];
    }
  }
  //Creates the return nodes
  for(let i=0;i<4;i++){
    let temp=empty.splice(Math.floor(Math.random()*length)-1+(40*(j-1)),1);
    length--;
    section[temp[0][0]][temp[0][1]]=[3,1,[[[],[],"RETURN NODE",false,[],[]]]];
  }
  //Creates free loot
  for(let i=0;i<3;i++){
    let temp=empty.splice(Math.floor(Math.random()*length)-1+(40*(j-1)),1);
    length--;
    section[temp[0][0]][temp[0][1]]=[0,1,[[[],[],"CLEARING",false,[],[lootcall.lootB(client, sec, dubs(8))]]]];
  }

  //console.log(`Finished generating those things - ${Date.now() - startTime}`);
  }
  if(sec==0){

    //console.log(`Generating moon outposts - ${Date.now() - startTime}`);
    for(let i=0;i<2;i++){
      let moon=[["PROSPIT","DERSE"],["pc","dc"]];
      let temp=empty.splice(Math.floor(Math.random()*empty.length));
      let transCount = client.landMap.get(message.guild.id+"medium","transCount");
      let transList = client.landMap.get(message.guild.id+"medium","transList");
      let transCode = "0000";
      let transCode1 = "0000";
      let moonCode = "0000";

      while(transList.includes(transCode)||transCode=="0000"){
        transCode = "";
        for(k=0;k<4;k++){
          transCode+= client.captchaCode[Math.floor(Math.random()*38)]
        }
      }

      transList.push(transCode);
      transCount++;

      while(transList.includes(transCode1)||transCode1=="0000"){
        transCode1 = "";
        for(k=0;k<4;k++){
          transCode1+= client.captchaCode[Math.floor(Math.random()*38)]
        }
      }

      transList.push(transCode1);
      transCount++;

      let transLocal = client.landMap.get(message.guild.id+"medium","transLocal");

      var transSet = {
        local:["s1",temp[0][0],temp[0][1],0,message.guild.id.concat(message.author.id)],
        target:`${message.guild.id}${transCode1}`
      }

      var transSet1 = {
        local:[moon[1][i],transLocal[0],transLocal[1],0,message.guild.id+"medium"],
        target:`${message.guild.id}${transCode}`
      }

      let castle = client.landMap.get(message.guild.id+"medium",moon[1][i]);

      castle[transLocal[0]][transLocal[1]][2][0][5].push([`${message.author.username}`,`@/jG${transCode1}`,1,1,[],"https://cdn.discordapp.com/attachments/808757312520585227/814690784209010738/TRANSPORTALIZER.png"])

      section[temp[0][0]][temp[0][1]]=[11,1,[[[],[],`${moon[0][i]} OUTPOST`,false,[],[[`${moon[0][i]} TRANSPORTALIZER`,`@/jG${transCode}`,1,1,[],"https://cdn.discordapp.com/attachments/808757312520585227/814690784209010738/TRANSPORTALIZER.png"]]]]];
      client.transMap.set(`${message.guild.id}${transCode}`,transSet);
      client.transMap.set(`${message.guild.id}${transCode1}`,transSet1);
      client.landMap.set(message.guild.id+"medium",transList,"transList");
      client.landMap.set(message.guild.id+"medium",transCount,"transCount");
      client.landMap.set(message.guild.id+"medium",castle,moon[1][i]);

    }

    //console.log(`Finished generating moon outposts - ${Date.now() - startTime}`);
  }

  //console.log(`Finished generation - ${Date.now() - startTime}`);
return [section,dungeon];


}

function dungeonGen(client,roomCoor,sec,dungeon,message) {

  let bossList = ["unicorn","kraken","hecatoncheires"];
  let support = ["basilisk","basilisk"];

  dungeon[roomCoor[0][0]][roomCoor[0][1]]=[1,1,[[[],[],"DUNGEON EXIT",false,[],[]]]];
  let s = 0;
  let lv2 = [];
  let lv3 = [];
  if(sec==0||sec==1){
  let direction=["x+","x-","y+","y-"];
    //roomCoor[0][0]+,roomCoor[0][0]-,roomCoor[0][1]+,roomCoor[0][1]-
    if(roomCoor[0][0]>5){
      removed = direction.splice(direction.indexOf("x+"),1);
    } else if(roomCoor[0][0]<5){
      removed = direction.splice(direction.indexOf("x-"),1);
    }
    if(roomCoor[0][1]>5){
      removed = direction.splice(direction.indexOf("y+"),1);
    } else if(roomCoor[0][1]<5){
      removed = direction.splice(direction.indexOf("y-"),1);
    }

s = sec+1;
let b = 0;

  for(o=0;o<s;o++) {
    switch (direction[Math.floor((Math.random() * direction.length))]) {
      case "x+":
        removed = direction.splice(direction.indexOf("x+"),1);
        for(k=0;k<5;k++){
            b++;

          if(dungeon[roomCoor[0][0]+k] [roomCoor[0][1]] [0] != 1 && dungeon[roomCoor[0][0]+k] [roomCoor[0][1]] [0] != 8){
            if ((b==5&&sec==0)||(b==10&&sec==1)){
              dungeon[roomCoor[0][0]+k] [roomCoor[0][1]] =[8,1,[[[],[],"BOSS ROOM",false,[
                client.strifecall.dungeonSpawn(client, sec, [roomCoor[0][0]+k,roomCoor[0][1]], bossList[sec], message),
                client.strifecall.dungeonSpawn(client, sec, [roomCoor[0][0]+k,roomCoor[0][1]], support[sec], message),
                client.strifecall.dungeonSpawn(client, sec, [roomCoor[0][0]+k,roomCoor[0][1]], support[sec], message)
              ],[lootcall.lootA(client, sec, dubs(8))]]]];
            } else {

            dungeon[roomCoor[0][0]+k] [roomCoor[0][1]] = dungeonRoomGen(client,sec);
          }
        }
      }
      break;
      case "x-":
      removed = direction.splice(direction.indexOf("x-"),1);

        for(k=0;k<5;k++){
            b++;
          if(dungeon[roomCoor[0][0]-k] [roomCoor[0][1]] [0] != 1 && dungeon[roomCoor[0][0]-k] [roomCoor[0][1]] [0] != 8){
              if ((b==5&&sec==0)||(b==10&&sec==1)){
              dungeon[roomCoor[0][0]-k] [roomCoor[0][1]] =[8,1,[[[],[],"DUNGEON ROOM",false,[client.strifecall.dungeonSpawn(client, sec, [roomCoor[0][0]-k,roomCoor[0][1]], bossList[sec], message),
              client.strifecall.dungeonSpawn(client, sec, [roomCoor[0][0]+k,roomCoor[0][1]], support[sec], message),
              client.strifecall.dungeonSpawn(client, sec, [roomCoor[0][0]+k,roomCoor[0][1]], support[sec], message)
            ],[lootcall.lootA(client, sec, dubs(8))]]]];
            } else {
            dungeon[roomCoor[0][0]-k] [roomCoor[0][1]] = dungeonRoomGen(client,sec);
            }
          }
        }

      break;
      case "y+":
      removed = direction.splice(direction.indexOf("y+"),1);

        for(k=0;k<5;k++){
          b++;
          if(dungeon[roomCoor[0][0]] [roomCoor[0][1]+k] [0] != 1 && dungeon[roomCoor[0][0]] [roomCoor[0][1]+k] [0] != 8 /*&& roomCoor[0][1]+k <= 10*/){
              if ((b==5&&sec==0)||(b==10&&sec==1)){
              dungeon[roomCoor[0][0]] [roomCoor[0][1]+k] =[8,1,[[[],[],"DUNGEON ROOM",false,[client.strifecall.dungeonSpawn(client, sec, [roomCoor[0][0],roomCoor[0][1]+k], bossList[sec], message),
              client.strifecall.dungeonSpawn(client, sec, [roomCoor[0][0]+k,roomCoor[0][1]], support[sec], message),
              client.strifecall.dungeonSpawn(client, sec, [roomCoor[0][0]+k,roomCoor[0][1]], support[sec], message)],[lootcall.lootA(client, sec, dubs(8))]]]];
            } else {
            dungeon[roomCoor[0][0]] [roomCoor[0][1]+k] = dungeonRoomGen(client,sec);
          }
          }

        }

      break;
      case "y-":
      removed = direction.splice(direction.indexOf("y-"),1);

        for(k=0;k<5;k++){
          b++;
          if(dungeon[roomCoor[0][0]] [roomCoor[0][1]-k] [0] != 1 && dungeon[roomCoor[0][0]] [roomCoor[0][1]-k] [0] != 8){
            if ((b==5&&sec==0)||(b==10&&sec==1)){
              dungeon[roomCoor[0][0]] [roomCoor[0][1]-k] =[8,1,[[[],[],"DUNGEON ROOM",false,[client.strifecall.dungeonSpawn(client, sec, [roomCoor[0][0],roomCoor[0][1]-k], bossList[sec], message),
              client.strifecall.dungeonSpawn(client, sec, [roomCoor[0][0]+k,roomCoor[0][1]], support[sec], message),
              client.strifecall.dungeonSpawn(client, sec, [roomCoor[0][0]+k,roomCoor[0][1]], support[sec], message)],[lootcall.lootA(client, sec, dubs(8))]]]];
            } else {
            dungeon[roomCoor[0][0]] [roomCoor[0][1]-k] = dungeonRoomGen(client,sec);
          }
          }

        }

      break;

    }
  }
} else if(sec==2){
  for(k=0;k<11;k++){
    if(dungeon[roomCoor[0][0]] [k] [0] != 1 && dungeon[roomCoor[0][0]] [k] [0] != 8){
      dungeon[roomCoor[0][0]] [k] = dungeonRoomGen(client,sec);
    }
  }

  for(k=0;k<11;k++){
    if(dungeon[k] [roomCoor[0][1]] [0] != 1 && dungeon[k] [roomCoor[0][1]] [0] != 8){
      dungeon[k] [roomCoor[0][1]] = dungeonRoomGen(client,sec);
    }
  }
  let bosscheck = false;
  switch(Math.floor((Math.random() * 1))){
    case 0:
    while(!bosscheck){
      let random = Math.floor((Math.random() * 11))
      if(dungeon[roomCoor[0][0]][random][0]==0||dungeon[roomCoor[0][0]][random][0]==10){
        dungeon[roomCoor[0][0]][random] = [8,1,[[[],[],"BOSS ROOM",false,[
          client.strifecall.dungeonSpawn(client, sec, [roomCoor[0][0],random], bossList[sec], message)
        ],[lootcall.lootA(client, sec, dubs(8))]]]];
        bosscheck=true;
      }
    }
    break;
    case 1:
      while(!bosscheck){
      let random = Math.floor((Math.random() * 11))
      if(dungeon[random][roomCoor[0][1]][0]==0||dungeon[roomCoor[0][0]][random][0]==10){
        dungeon[random][roomCoor[0][1]] = [8,1,[[[],[],"BOSS ROOM",false,[
          client.strifecall.dungeonSpawn(client, sec, [random,roomCoor[0][1]], bossList[sec], message)
        ],[lootcall.lootA(client, sec, dubs(8))]]]];
        bosscheck=true;
      }
    }
    break;
  }
/*
[/][/][/]
[][][/]
[x][/][/]
*/
} else if(sec==3){
let emptyTiles=[];

let genDirection =["n","s","e","w"];
let pathStart = [[roomCoor[0][0],roomCoor[0][1]],[roomCoor[0][0],roomCoor[0][1]],[roomCoor[0][0],roomCoor[0][1]],[roomCoor[0][0],roomCoor[0][1]]];
let g = 0;
let denizen = false;
while(pathStart.length != 0){
let curx = pathStart[0][0];
let cury = pathStart[0][1];
let deleted = pathStart.splice(0,1);
let hitWall = false;
let curDirection;
if(g<4){
curDirection = genDirection[g];
g++;
} else {
curDirection = genDirection[Math.floor((Math.random()*4))];
}
while(!hitWall){
  //let hallLength = Math.floor((Math.random()*3))+1;
  switch (curDirection){
    case "n":
    for(m=0;m<2 && !hitWall;m++){
      if((--cury)<0){
        hitWall=true;
        if(Math.floor(Math.random()*10)==0 && denizen == false){
          dungeon[curx][0] = [9,1,[[[],[],"DENIZEN CHAMBER",false,[
            client.strifecall.dungeonSpawn(client, sec, [curx,0], 'basilisk', message),
          ],[lootcall.lootA(client, sec, dubs(8))]]]];
          denizen=true;
        }

      } else {
        if(dungeon[curx][cury][0] == 7){
        dungeon[curx][cury] = dungeonRoomGen(client,sec);
        emptyTiles.push([curx,cury]);
      }
    }
  } if (Math.floor(Math.random()*2)==1 && g<4 &&!hitWall){
    pathStart.push([curx,cury]);
  }
   deleted = genDirection.splice(1,1);
    break;
    case "s":
    for(m=0;m<2 && !hitWall;m++){
      if((++cury)>10){
        hitWall=true;
        if(Math.floor(Math.random()*10)==0 && denizen == false){
          dungeon[curx][10] = [9,1,[[[],[],"DENIZEN CHAMBER",false,[
            client.strifecall.dungeonSpawn(client, sec, [curx,10], 'basilisk', message),
          ],[lootcall.lootA(client, sec, dubs(8))]]]];
          denizen=true;
        }
      } else {
        if(dungeon[curx][cury][0] == 7){
        dungeon[curx][cury] = dungeonRoomGen(client,sec);
        emptyTiles.push([curx,cury]);
      }
    }
  } if (Math.floor(Math.random()*2)==1 && g<4 && !hitWall){
    pathStart.push([curx,cury]);
  }
deleted = genDirection.splice(0,1);
    break;
    case "e":
    for(m=0;m<2 && !hitWall;m++){
      if((++curx)>10){
        hitWall=true;
        if(Math.floor(Math.random()*10)==0 && denizen == false){
          dungeon[10][cury] = [9,1,[[[],[],"DENIZEN CHAMBER",false,[
            client.strifecall.dungeonSpawn(client, sec, [10,cury], 'basilisk', message),
          ],[lootcall.lootA(client, sec, dubs(8))]]]];
          denizen=true;
        }
      } else {
        if(dungeon[curx][cury][0] == 7){
        dungeon[curx][cury] = dungeonRoomGen(client,sec);
        emptyTiles.push([curx,cury]);
      }
    }
  }if (Math.floor(Math.random()*2)==1 && g<4 && !hitWall){
      pathStart.push([curx,cury]);
    }
    deleted = genDirection.splice(3,1);
    break;
    case "w":
    for(m=0;m<2 && !hitWall;m++){
      if((--curx)<0){
        hitWall=true;
        if(Math.floor(Math.random()*10)==0 && denizen == false){
          dungeon[0][cury] = [9,1,[[[],[],"DENIZEN CHAMBER",false,[
            client.strifecall.dungeonSpawn(client, sec, [0,cury], 'basilisk', message),
          ],[lootcall.lootA(client, sec, dubs(8))]]]];
          denizen=true;
        }
      } else {
        if(dungeon[curx][cury][0] == 7){
        dungeon[curx][cury] = dungeonRoomGen(client,sec);
        emptyTiles.push([curx,cury]);
      }
    }
  }if (Math.floor(Math.random()*2)==1 && g<4 && !hitWall){
      pathStart.push([curx,cury]);
    }
    deleted = genDirection.splice(2,1);
    break;
  }
curDirection = genDirection[Math.floor((Math.random()*genDirection.length))];
genDirection =["n","s","e","w"];
}
}
if (denizen == false){
  roomToFill = emptyTiles.splice(Math.floor(Math.random()*emptyTiles.length)-1,1);
  dungeon [roomToFill[0][0]][roomToFill[0][1]] = [9,1,[[[],[],"DENIZEN CHAMBER",false,[
    client.strifecall.dungeonSpawn(client, sec, [roomToFill[0][0],roomToFill[0][1]], 'basilisk', message),],[lootcall.lootA(client, sec, dubs(8))]]]];
}
for (d=0;d<4;d++){
  roomToFill = emptyTiles.splice(Math.floor(Math.random()*emptyTiles.length)-1,1);
  dungeon [roomToFill[0][0]][roomToFill[0][1]] = [8,1,[[[],[],"DENIZEN MINION",false,[
    client.strifecall.dungeonSpawn(client, sec, [roomToFill[0][0],roomToFill[0][1]], 'basilisk', message),],[lootcall.lootA(client, sec, dubs(8))]]]];
}

} else if(sec=="m"){
let emptyTiles=[];

let genDirection =["n","s","e","w"];
let pathStart = [[roomCoor[0][0],roomCoor[0][1]],[roomCoor[0][0],roomCoor[0][1]],[roomCoor[0][0],roomCoor[0][1]],[roomCoor[0][0],roomCoor[0][1]]];
let g = 0;
let denizen = false;
while(pathStart.length != 0){
let curx = pathStart[0][0];
let cury = pathStart[0][1];
let deleted = pathStart.splice(0,1);
let hitWall = false;
let curDirection;
if(g<4){
curDirection = genDirection[g];
g++;
} else {
curDirection = genDirection[Math.floor((Math.random()*4))];
}
while(!hitWall){
  //let hallLength = Math.floor((Math.random()*3))+1;
  switch (curDirection){
    case "n":
    for(m=0;m<2 && !hitWall;m++){
      if((--cury)<0){
        hitWall=true;
        if(Math.floor(Math.random()*10)==0 && denizen == false){
          dungeon[curx][0] = [9,1,[[[],[],"DENIZEN CHAMBER",false,[
            client.strifecall.dungeonSpawn(client, sec, [curx,0], 'basilisk', message),
          ],[lootcall.lootA(client, sec, dubs(8))]]]];
          denizen=true;
        }

      } else {
        if(dungeon[curx][cury][0] == 7){
        dungeon[curx][cury] = dungeonRoomGen(client,sec);
        emptyTiles.push([curx,cury]);
      }
    }
  } if (Math.floor(Math.random()*2)==1 && g<4 &&!hitWall){
    pathStart.push([curx,cury]);
  }
   deleted = genDirection.splice(1,1);
    break;
    case "s":
    for(m=0;m<2 && !hitWall;m++){
      if((++cury)>10){
        hitWall=true;
        if(Math.floor(Math.random()*10)==0 && denizen == false){
          dungeon[curx][10] = [9,1,[[[],[],"DENIZEN CHAMBER",false,[
            client.strifecall.dungeonSpawn(client, sec, [curx,10], 'basilisk', message),
          ],[lootcall.lootA(client, sec, dubs(8))]]]];
          denizen=true;
        }
      } else {
        if(dungeon[curx][cury][0] == 7){
        dungeon[curx][cury] = dungeonRoomGen(client,sec);
        emptyTiles.push([curx,cury]);
      }
    }
  } if (Math.floor(Math.random()*2)==1 && g<4 && !hitWall){
    pathStart.push([curx,cury]);
  }
deleted = genDirection.splice(0,1);
    break;
    case "e":
    for(m=0;m<2 && !hitWall;m++){
      if((++curx)>10){
        hitWall=true;
        if(Math.floor(Math.random()*10)==0 && denizen == false){
          dungeon[10][cury] = [9,1,[[[],[],"DENIZEN CHAMBER",false,[
            client.strifecall.dungeonSpawn(client, sec, [10,cury], 'basilisk', message),
          ],[lootcall.lootA(client, sec, dubs(8))]]]];
          denizen=true;
        }
      } else {
        if(dungeon[curx][cury][0] == 7){
        dungeon[curx][cury] = dungeonRoomGen(client,sec);
        emptyTiles.push([curx,cury]);
      }
    }
  }if (Math.floor(Math.random()*2)==1 && g<4 && !hitWall){
      pathStart.push([curx,cury]);
    }
    deleted = genDirection.splice(3,1);
    break;
    case "w":
    for(m=0;m<2 && !hitWall;m++){
      if((--curx)<0){
        hitWall=true;
        if(Math.floor(Math.random()*10)==0 && denizen == false){
          dungeon[0][cury] = [9,1,[[[],[],"DENIZEN CHAMBER",false,[
            client.strifecall.dungeonSpawn(client, sec, [0,cury], 'basilisk', message),
          ],[lootcall.lootA(client, sec, dubs(8))]]]];
          denizen=true;
        }
      } else {
        if(dungeon[curx][cury][0] == 7){
        dungeon[curx][cury] = dungeonRoomGen(client,sec);
        emptyTiles.push([curx,cury]);
      }
    }
  }if (Math.floor(Math.random()*2)==1 && g<4 && !hitWall){
      pathStart.push([curx,cury]);
    }
    deleted = genDirection.splice(2,1);
    break;
  }
curDirection = genDirection[Math.floor((Math.random()*genDirection.length))];
genDirection =["n","s","e","w"];
}
}
if (denizen == false){
  roomToFill = emptyTiles.splice(Math.floor(Math.random()*emptyTiles.length)-1,1);
  dungeon [roomToFill[0][0]][roomToFill[0][1]] = [9,1,[[[],[],"DENIZEN CHAMBER",false,[
    client.strifecall.dungeonSpawn(client, sec, [roomToFill[0][0],roomToFill[0][1]], 'basilisk', message),],[lootcall.lootA(client, sec, dubs(8))]]]];
}
for (d=0;d<4;d++){
  roomToFill = emptyTiles.splice(Math.floor(Math.random()*emptyTiles.length)-1,1);
  dungeon [roomToFill[0][0]][roomToFill[0][1]] = [8,1,[[[],[],"DENIZEN MINION",false,[
    client.strifecall.dungeonSpawn(client, sec, [roomToFill[0][0],roomToFill[0][1]], 'basilisk', message),],[lootcall.lootA(client, sec, dubs(8))]]]];
}

}

  return [dungeon,lv2,lv3];

}

function dungeonRoomGen(client,sec) {
  switch(Math.floor((Math.random() * 4))){

case 3:
return [10,1,[[[],[],"DUNGEON ROOM",false,[],[lootcall.lootB(client, sec, dubs(8))]]]];
break;
  default:
  return [10,1,[[[],[],"DUNGEON ROOM",false,[],[]]]];
  }

}
//==========================================================================================
exports.battlefieldGen = function(client,message){
let battleMap = [];
let battleLine = [];
let lastBlack = true;
for(let u=0;u<11;u++){
  for (let m=0;m<11;m++){
    if (lastBlack){
      battleLine.push([0,1,[[[],[],"CLEARING",false,[],[]]]])
      lastBlack = false;
    } else {
      battleLine.push([7,1,[[[],[],"CLEARING",false,[],[]]]])
      lastBlack = true;
    }
    battleMap.push(battleLine);
    battleLine = [];
  }
}
return battleMap;
}

exports.moonGen = function(client,castleLocal,towerLocal,message){

  let section = [[],[],[],[],[],[],[],[],[],[]];
  for(i=0;i<11;i++){
//   prospit,derse,prospitmoon,dersemoon,pdungeon1,2,3,ddungeon1,2,3
    section[0].push([[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]]]);
    section[1].push([[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]]]);
    section[2].push([[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]]]);
    section[3].push([[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]]]);

    section[4].push([[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]]]);
    section[5].push([[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]]]);
    section[6].push([[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]]]);

    section[7].push([[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]]]);
    section[8].push([[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]]]);
    section[9].push([[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]]]);


  }

  let dungeon = [[],[],[],[]];
  for(i=0;i<11;i++){

    for(j=0;j<dungeon.length;j++){
      dungeon[j].push([[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]  , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]] , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]])
    }
    /*
    dungeon[0].push([[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]  , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]] , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]]);
    dungeon[1].push([[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]  , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]] , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]]);
    dungeon[2].push([[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]  , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]] , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]]);
    dungeon[3].push([[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]  , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]] , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]]);*/
  }

  let castle = [[],[]];
  for(i=0;i<11;i++){

    for(j=0;j<castle.length;j++){
      castle[j].push([[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]  , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]] , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]])
    }
}



  //dungeon = dungeonGen(client,temp,sec,dungeon,message)[0];

  let select = [0,1,3,4,6,7,9,10]
  let empty = [];
  let empty2 = [];
  let empty3 = [];
  let empty4 = [];
  let empty5 = [];

  for(i=0;i<8;i++){
    for(j=0;j<8;j++){
      empty.push([select[i],select[j]]);
      empty2.push([select[i],select[j]]);
      empty3.push([select[i],select[j]]);
      empty4.push([select[i],select[j]]);
      empty5.push([select[i],select[j]]);
    }
  }
/*
  let empty2 = [];
  for(i=0;i<8;i++){
    for(j=0;j<8;j++){
      empty2.push([select[i],select[j]]);
    }
  }

  let empty3 = [];
  for(i=0;i<8;i++){
    for(j=0;j<8;j++){
      empty3.push([select[i],select[j]]);
    }
  }

  let empty4 = [];
  for(i=0;i<8;i++){
    for(j=0;j<8;j++){
      empty4.push([select[i],select[j]]);
    }
  }

  let empty5 = [];
  for(i=0;i<8;i++){
    for(j=0;j<8;j++){
      empty5.push([select[i],select[j]]);
    }
  }
*/

  section[0][5][5]=[13,1,[[[],[],"CHAIN",false,[],[]]]];
  section[1][5][5]=[13,1,[[[],[],"CHAIN",false,[],[]]]];
  section[2][5][5]=[13,1,[[[],[],"CHAIN",false,[],[]]]];
  section[3][5][5]=[13,1,[[[],[],"CHAIN",false,[],[]]]];

  section[2][towerLocal[0]][towerLocal[1]]=[11,1,[[[],[],"PROSPIT TOWER BASE",true,[],[]]]];
  section[3][towerLocal[0]][towerLocal[1]]=[11,1,[[[],[],"DERSE TOWER BASE",true,[],[]]]];
  empty.splice(select.indexOf(towerLocal[0])*8+select.indexOf(towerLocal[1]),1);

  section[0][castleLocal[0]][castleLocal[1]]=[12,1,[[[],[],"PROSPIT CASTLE",true,[],[]]]];
  section[1][castleLocal[0]][castleLocal[1]]=[12,1,[[[],[],"DERSE CASTLE",true,[],[]]]];
  empty2.splice(select.indexOf(castleLocal[0])*8+select.indexOf(castleLocal[1]),1);
  let transLocal=[0,0];
  //castle generation
  castle[0][5][5]=[12,1,[[[],[],"CASTLE ENTRANCE",true,[],[]]]];
  castle[1][5][5]=[12,1,[[[],[],"CASTLE ENTRANCE",true,[],[]]]];

  castle[0][4][5]=[10,1,[[[],[],"HALL",true,[],[]]]];
  castle[0][3][5]=[8,1,[[[],[],"THRONE ROOM",true,[],[]]]];
  castle[0][5][4]=[19,1,[[[],[],"TRANSPORTALIZER HUB",true,[],[]]]];

  castle[1][4][5]=[10,1,[[[],[],"HALL",true,[],[]]]];
  castle[1][3][5]=[8,1,[[[],[],"THRONE ROOM",true,[],[]]]];
  castle[1][5][4]=[19,1,[[[],[],"TRANSPORTALIZER HUB",true,[],[]]]];

  transLocal=[5,4];
  //end castle generation

  section.push(castle[0]);
  section.push(castle[1]);
  section.push(transLocal);
//Prospit / Derse Main

for(i=0;i<2;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[14,1,[[[],[],"POLICE STATION",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[14,1,[[[],[],"POLICE STATION",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[15,1,[[[],[],"PRISON",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[15,1,[[[],[],"PRISON",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[16,1,[[[],[],"COURT",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[16,1,[[[],[],"COURT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[17,1,[[[],[],"HOSPITAL",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[17,1,[[[],[],"HOSPITAL",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[18,1,[[[],[],"BANK",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[18,1,[[[],[],"BANK",false,[],[]]]];
}
for(i=0;i<2;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[19,1,[[[],[],"POST OFFICE",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[19,1,[[[],[],"POST OFFICE",false,[],[]]]];
}
for(i=0;i<4;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[20,1,[[[],[],"MILITARY OUTPOST",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[20,1,[[[],[],"MILITARY OUTPOST",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[21,1,[[[],[],"GUILD HALL",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[21,1,[[[],[],"GUILD HALL",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[22,1,[[[],[],"THEATRE",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[22,1,[[[],[],"THEATRE",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[23,1,[[[],[],"BINGO HALL",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[23,1,[[[],[],"CASINO",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[24,1,[[[],[],"MUSEUM",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[24,1,[[[],[],"MUSEUM",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[25,1,[[[],[],"LIBRARY",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[25,1,[[[],[],"LIBRARY",false,[],[]]]];
}
for(i=0;i<5;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[26,1,[[[],[],"RESTAURANT",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[26,1,[[[],[],"RESTAURANT",false,[],[]]]];
}
for(i=0;i<5;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[27,1,[[[],[["CAPTCHALOGUE CARD","11111111",1,4,[]]],"GENERAL STORE",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[27,1,[[[],[["CAPTCHALOGUE CARD","11111111",1,4,[]]],"GENERAL STORE",false,[],[]]]];
}
for(i=0;i<5;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[28,1,[[[],[],"CANDY SHOP",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[29,1,[[[],[],"BUTCHER",false,[],[]]]];
}
for(i=0;i<5;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[31,1,[[[],[],"TAILOR",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[30,1,[[[],[],"ARMORY",false,[],[]]]];
}
for(i=0;i<5;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[32,1,[[[],[],"JEWELER",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[32,1,[[[],[],"JEWELER",false,[],[]]]];
}





while(empty2.length>0){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  let ran = Math.floor(Math.random()*6);

  if(ran == 0){
    section[0][temp[0][0]][temp[0][1]]=[0,1,[[[],[],"PUBLIC PARK",false,[],[]]]];
    section[1][temp[0][0]][temp[0][1]]=[0,1,[[[],[],"ABANDONED BUILDING",false,[],[]]]];
  } else {
  section[0][temp[0][0]][temp[0][1]]=[45,1,[[[],[],"APPARTMENT",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[45,1,[[[],[],"SLUMS",false,[],[]]]];
}
}


for(i=0;i<2;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[14,1,[[[],[],"POLICE STATION",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[14,1,[[[],[],"POLICE STATION",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[17,1,[[[],[],"HOSPITAL",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[17,1,[[[],[],"HOSPITAL",false,[],[]]]];
}
for(i=0;i<2;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[19,1,[[[],[],"POST OFFICE",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[19,1,[[[],[],"POST OFFICE",false,[],[]]]];
}
for(i=0;i<4;i++){
  let tempRan = Math.floor(Math.random()*empty.length)-1;
  let temp=empty.splice(tempRan,1);

  section[2][temp[0][0]][temp[0][1]]=[1,1,[[[],[],"DUNGEON ENTRANCE",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[1,1,[[[],[],"DUNGEON ENTRANCE",false,[],[]]]];
  section[4][temp[0][0]][temp[0][1]]=[1,1,[[[],[],"DUNGEON EXIT",false,[],[]]]];
  section[7][temp[0][0]][temp[0][1]]=[1,1,[[[],[],"DUNGEON EXIT",false,[],[]]]];

  empty3.splice(empty3.findIndex(tile => tile[0] == temp[0][0] && tile[1] == temp[0][1]),1)
}
for(i=0;i<5;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[26,1,[[[],[],"RESTAURANT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[26,1,[[[],[],"RESTAURANT",false,[],[]]]];
}
for(i=0;i<5;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[27,1,[[[],[],"GENERAL STORE",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[27,1,[[[],[],"GENERAL STORE",false,[],[]]]];
}
for(i=0;i<5;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[32,1,[[[],[],"JEWELER",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[32,1,[[[],[],"JEWELER",false,[],[]]]];
}

for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[33,1,[[[],[],"TIME MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[33,1,[[[],[],"TIME MONUMENT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[34,1,[[[],[],"SPACE MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[34,1,[[[],[],"SPACE MONUMENT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[35,1,[[[],[],"LIGHT MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[35,1,[[[],[],"LIGHT MONUMENT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[36,1,[[[],[],"VOID MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[36,1,[[[],[],"VOID MONUMENT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[37,1,[[[],[],"LIFE MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[37,1,[[[],[],"LIFE MONUMENT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[38,1,[[[],[],"DOOM MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[38,1,[[[],[],"DOOM MONUMENT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[39,1,[[[],[],"BREATH MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[39,1,[[[],[],"BREATH MONUMENT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[40,1,[[[],[],"BLOOD MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[40,1,[[[],[],"BLOOD MONUMENT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[41,1,[[[],[],"HOPE MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[41,1,[[[],[],"HOPE MONUMENT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[42,1,[[[],[],"RAGE MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[42,1,[[[],[],"RAGE MONUMENT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[43,1,[[[],[],"MIND MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[43,1,[[[],[],"MIND MONUMENT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[44,1,[[[],[],"HEART MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[44,1,[[[],[],"HEART MONUMENT",false,[],[]]]];
}

while(empty.length>0){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  let ran = Math.floor(Math.random()*6);

  if(ran == 0){
    section[2][temp[0][0]][temp[0][1]]=[0,1,[[[],[],"PUBLIC PARK",false,[],[]]]];
    section[3][temp[0][0]][temp[0][1]]=[0,1,[[[],[],"ABANDONED BUILDING",false,[],[]]]];
  } else {
  section[2][temp[0][0]][temp[0][1]]=[45,1,[[[],[],"APPARTMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[45,1,[[[],[],"SLUMS",false,[],[]]]];
}
}

  for(i=0;i<3;i++){
    let tempRan = Math.floor(Math.random()*empty3.length)-1;
    let temp=empty3.splice(tempRan,1);

    section[4][temp[0][0]][temp[0][1]]=[46,1,[[[],[],"DESCENDING STAIRS",false,[],[]]]];
    section[7][temp[0][0]][temp[0][1]]=[46,1,[[[],[],"DESCENDING STAIRS",false,[],[]]]];
    section[5][temp[0][0]][temp[0][1]]=[47,1,[[[],[],"ASCENDING STAIRS",false,[],[]]]];
    section[8][temp[0][0]][temp[0][1]]=[47,1,[[[],[],"ASCENDING STAIRS",false,[],[]]]];

    empty4.splice(empty4.findIndex(tile => tile[0] == temp[0][0] && tile[1] == temp[0][1]),1)
  }

  for(i=0;i<2;i++){
    let tempRan = Math.floor(Math.random()*empty4.length)-1;
    let temp=empty4.splice(tempRan,1);

    section[5][temp[0][0]][temp[0][1]]=[46,1,[[[],[],"DOWNSTAIRS ENTRANCE",false,[],[]]]];
    section[8][temp[0][0]][temp[0][1]]=[46,1,[[[],[],"DOWNSTAIRS ENTRANCE",false,[],[]]]];
    section[6][temp[0][0]][temp[0][1]]=[47,1,[[[],[],"ASCENDING STAIRS",false,[],[]]]];
    section[9][temp[0][0]][temp[0][1]]=[47,1,[[[],[],"ASCENDING STAIRS",false,[],[]]]];

    empty5.splice(empty5.findIndex(tile => tile[0] == temp[0][0] && tile[1] == temp[0][1]),1)
  }

  while(empty3.length>0){
    let temp=empty3.splice(Math.floor(Math.random()*empty3.length)-1,1);
    section[4][temp[0][0]][temp[0][1]]=[15,1,[[[],[],"PRISON CELL",false,[],[]]]];
    section[7][temp[0][0]][temp[0][1]]=[15,1,[[[],[],"PRISON CELL",false,[],[]]]];
  }
  while(empty4.length>0){
    let temp=empty4.splice(Math.floor(Math.random()*empty4.length)-1,1);
    section[5][temp[0][0]][temp[0][1]]=[15,1,[[[],[],"PRISON CELL",false,[],[]]]];
    section[8][temp[0][0]][temp[0][1]]=[15,1,[[[],[],"PRISON CELL",false,[],[]]]];
  }
  while(empty5.length>0){
    let temp=empty5.splice(Math.floor(Math.random()*empty5.length)-1,1);
    section[6][temp[0][0]][temp[0][1]]=[15,1,[[[],[],"PRISON CELL",false,[],[]]]];
    section[9][temp[0][0]][temp[0][1]]=[15,1,[[[],[],"PRISON CELL",false,[],[]]]];
  }

  return section;
}




exports.drawMap = async function(client,message,mini) {

  let charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");
let local = client.playerMap.get(charid,`local`);
let input = client.landMap.get(local[4],local[0]);
let aspect;

try {
  aspect = client.landMap.get(local[4],"aspect");
  if(aspect == undefined){
    aspect = "BREATH";
  }
} catch(err){
  aspect = "BREATH";
}
let aspectindex = ["TIME","SPACE","LIGHT","VOID","LIFE","DOOM","BREATH","BLOOD","HOPE","RAGE","MIND","HEART"];


const titlebar = await client.Canvas.loadImage("./miscsprites/TITLE.png");
const numbers = await client.Canvas.loadImage("./miscsprites/NUMBERS.png");
const tiles = await client.Canvas.loadImage("./miscsprites/MAPSHEET.png");
const gate = await client.Canvas.loadImage("./miscsprites/DRGATE.gif");
const plgate = await client.Canvas.loadImage("./miscsprites/PLGATE.gif");


client.Canvas.registerFont("./miscsprites/fontstuck.ttf",{family:`fontstuck`});
client.Canvas.registerFont("./miscsprites/Courier Std Bold.otf",{family:`Courier Standard Bold`});
if(!mini){
const canvas = client.Canvas.createCanvas(404,424);
const ctx = canvas.getContext('2d');
function applyText(canvas, msg, width){
let fontsize = 30
   while (ctx.measureText(msg).width > width){
ctx.font = `bold ${fontsize -= 2}px Courier Standard Bold`;
}
  return ctx.font;
}
let titlebarindex=0;
let landname;
 switch(local[0].slice(0,2)){
   case "pm":
   landname="PROSPIT MOON";
   break;
    case "p":
    landname="PROSPIT";
    break;
    case "pd":
    landname = `PROSPIT DUNGEON F${local[0].charAt(2)}`;
    break;
    case "pc":
    landname = `PROSPIT CASTLE`;
    break;
    case "dm":
    landname="DERSE MOON";
    break;
     case "d":
     landname="DERSE";
     break;
     case "dd":
     landname = `DERSE DUNGEON F${local[0].charAt(2)}`;
     break;
     case "dc":
     landname = `DERSE CASTLE`;
     break;
    default:
    let name = client.landMap.get(local[4],"name");
    landname = `Land of ${name[0]} and ${name[1]} [${local[0]}]`.toUpperCase();
  }
if(local[0].slice(0,1)=="p"){
  titlebarindex=1;
} else if(local[0].slice(0,1)=="d"){
  titlebarindex=2;
}
  ctx.drawImage(titlebar,0,32*titlebarindex,394,32,5,5,404,32);

  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.font = `bold 30px Courier Standard Bold`;
  ctx.font = applyText(canvas,landname,380);
  ctx.lineWidth = 10;
  ctx.fillStyle = '#969696';
  if(titlebarindex) {
    ctx.fillStyle = `#3e3e3e`;
  }
  ctx.fillText(landname,200,23);

 for(k=0;k<12;k++){
   ctx.drawImage(numbers,32*k,0,32,32,5+(32.8*k),37,32.8,32.8);
}
for(i=0;i<11;i++){
  ctx.drawImage(numbers,32*(i+1),0,32,32,5,5+(32*(i+2)),32.8,31);
    for(j=0;j<11;j++){
            //comment out this if check to turn off fog of war on the main map
      if(!input[i][j][2][0][3]&&local[0]!="p"&&local[0]!="d"&&local[0]!="pm"&&local[0]!="dm"&&local[0]!="pc"&&local[0]!="dc"){
      //if(false){
         ctx.drawImage(tiles,0,32,32,32,5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);

      } else {
        let tile = 0;
        if(i==local[1]&& j==local[2]){
          tile = 2;
        }
       //str=`${client.emojis.cache.get("760188336245309512")}`;
       switch(input[i][j][0]){
         case 0:
         let player = false;
         if(input[i][j][2][0][4].length > 0){
         for(k=0;k<input[i][j][2][0][4].length;k++){
           if(input[i][j][2][0][4][k][0]&& input[i][j][2][0][4][k][1]!=charid){
             player=true;
           }
         }}
         ctx.drawImage(tiles,0,32*tile,32,32,5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
         if(player){
           ctx.drawImage(tiles,32,32*tile,32,32,5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
         }
         break;
         case 2:
         ctx.drawImage(tiles,0,32*tile,32,32,5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          ctx.drawImage(tiles,32+32*(33+aspectindex.indexOf(aspect)),32*tile,32,32,5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);//aspect
         break;
         case 6:
          ctx.drawImage(tiles,0,32*tile,32,32,5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
         if(tile==2){
           ctx.drawImage(plgate,5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
         }
           ctx.drawImage(gate,5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);//gate
         break;
        default:
          ctx.drawImage(tiles,0,32*tile,32,32,5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          ctx.drawImage(tiles,32+32*input[i][j][0],32*tile,32,32,5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
       }
    }
  }
}

let attachment = new client.Discord.MessageAttachment(canvas.toBuffer(), 'landmap.png');
//message.channel.send(attachment);
return attachment;
} else {

const canvas = client.Canvas.createCanvas(192,192);
const ctx = canvas.getContext('2d');

for(i=-1;i<2;i++){
  for (j=-1;j<2;j++){
    let tile = 0;
     if(j + local[2] > 10 || j + local[2] < 0 || i +local[1] > 10 || i + local[1] <0){
    ctx.drawImage(tiles,32*8,32*tile,32,32,(64*(j+1)),(64*(i+1)),64,64);
    } else {
      if(i==0 && j==0){
        tile = 2;
      } else if(!input[i+local[1]][j+local[2]][2][0][3]&&local[0]!="p"&&local[0]!="d"&&local[0]!="pm"&&local[0]!="dm"){
        tile = 1;
      //} else if(i==local[1]&& j==local[2]){
      }
      switch(input[i+local[1]][j+local[2]][0]){
        case 0:
        let player = false;

        if(input[i+local[1]][j+local[2]][2][0][4].length > 0){
        for(k=0;k<input[i+local[1]][j+local[2]][2][0][4].length;k++){
          if(input[i+local[1]][j+local[2]][2][0][4][k][0] && input[i+local[1]][j+local[2]][2][0][4][k][1]!=charid){
            player=true;
          }
        }}
        ctx.drawImage(tiles,0,32*tile,32,32,(64*(j+1)),(64*(i+1)),64,64);
        if(player){
          ctx.drawImage(tiles,32,32*tile,32,32,(64*(j+1)),(64*(i+1)),64,64);
        }

        break;
         case 2:
         ctx.drawImage(tiles,0,32*tile,32,32,(64*(j+1)),(64*(i+1)),64,64);
          ctx.drawImage(tiles,32+32*(33+aspectindex.indexOf(aspect)),32*tile,32,32,(64*(j+1)),(64*(i+1)),64,64);//aspect
         break;
        case 6:
         ctx.drawImage(tiles,0,32*tile,32,32,(64*(j+1)),(64*(i+1)),64,64);
        if(tile==2){
          ctx.drawImage(plgate,(64*(j+1)),(64*(i+1)),64,64);
        }
          ctx.drawImage(gate,(64*(j+1)),(64*(i+1)),64,64);//gate
        break;
         default:
          ctx.drawImage(tiles,0,32*tile,32,32,(64*(j+1)),(64*(i+1)),64,64);
          ctx.drawImage(tiles,32+32*input[i+local[1]][j+local[2]][0],32*tile,32,32,(64*(j+1)),(64*(i+1)),64,64);
      }
    }
  }
  }
  attachment = new client.Discord.MessageAttachment(canvas.toBuffer(), 'landmap.png');
return attachment;
}
}

exports.underlingCheck = function(occList,client) {
  check = false;
  if(occList.length>0){
    for(i=0;i<occList.length;i++){
      if(occList[i][0]==false&&client.playerMap.get(occList[i][1],"faction")=="underling"){
        check=true;
      }
    }
  }

  return check;
}

exports.carSpawn = function(client,local,lunar,sessionID){

  let picList = [["https://media.discordapp.net/attachments/808757312520585227/814739963824439296/dersite_short.png","https://media.discordapp.net/attachments/808757312520585227/814739982748221480/dersite_normal.png","https://media.discordapp.net/attachments/808757312520585227/814740004618240050/dersite_tall.png","https://media.discordapp.net/attachments/808757312520585227/814740019902021652/dersite_beefy.png"],["https://media.discordapp.net/attachments/808757312520585227/814740073681518612/prospitian_short.png","https://media.discordapp.net/attachments/808757312520585227/814740091306115112/prospitian_normal.png","https://media.discordapp.net/attachments/808757312520585227/814740144933830666/prospitian_tall.png","https://media.discordapp.net/attachments/808757312520585227/814740171705548861/prospitian_beefy.png"]];
  let typeList = ["stout carapacian","medium carapacian","tall carapacian","large carapacian"];
  let lunarList = [["derse","prospit"],["dersite","prospitian"]];
  let repList = [[1000000,-1000000],[-1000000,1000000]]

  let num = Math.floor(Math.random()*4);

  let npcCount = client.landMap.get(sessionID+"medium","npcCount");

  let occ = []

  for(i=0;i<num;i++){

    npcCount++;

  let type = Math.floor(Math.random()*4);

  let npcSet = {
    name: `${lunarList[1][lunar]}`,
    possess:[],
    type: typeList[type],
    faction: lunarList[0][lunar],
    vit:client.underlings[typeList[type]].vit,
    gel:client.underlings[typeList[type]].vit,
    grist: "diamond",
    strife:false,
    pos:0,
    alive:true,
    local:local,
    sdex:[],
    equip:0,
    trinket:[],
    armor:[],
    spec:[],
    equip:0,
    scards:1,
    kinds:[],
    port:1,
    modus:"STACK",
    cards:4,
    prototype:[],
    prospitRep:repList[lunar][1],
    derseRep:repList[lunar][0],
    underlingRep:0,
    playerRep:0,
    consortRep:0,
    prefTarg:[],
    xp:0,
    rung:0,
    b:0,
    bio:`A ${lunarList[1][lunar]} ${typeList[type]}`,
    img:picList[lunar][type]
  }

  let id = `n${sessionID}/${npcCount}`;

  client.playerMap.set(id,npcSet);

  let occSet = [false,id];

  occ.push(occSet)
}
client.landMap.set(sessionID+"medium",npcCount,"npcCount");
return occ;
}
