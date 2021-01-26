const funcall = require("./funcall.js");
const lootcall = require("./lootcall.js");
const stifecall = require("./strifecall.js");
//10 dungeons, 10 villages, 15 return nodes, 10 constructs, 1 gate, 10 random loot, 65 nothing

//var output = [AREA TYPE,NUMBER OF ROOMS,[[roomType,roomLoot,roomName,roomVisite,occ,roomInv],[room2]]];
//default empty = [0,1,[0,random number,"Clearing",false,[underlings],[items]]]

var defaultEmpty = [0,1,[[0,0,"CLEARING",false,[],[]]]];
var defaultGate = [6,1,[[0,0,"GATE",false,[],[]]]];

function dubs(x){
  return Math.floor(Math.random() * x) + Math.floor(Math.random() * x);
}
//Land Key(0-9):
//EMPTY, DUNGEON, CONSTRUCT, NODE, VILLAGE, HOUSE, GATE, WALL, BOSS, DENIZEN

//10

//let defaultDungeon =[1,2,[0,0,"ROOM 1",false,[],[]],[0,0,"ROOM 2",false,[],[]]];
var defaultConstruct =[2,1,[[0,0,"LAND CONSTRUCT",false,[],[]]]];
var defaultNode =[3,1,[[0,0,"RETURN NODE",false,[],[]]]];
var defaultVillage =[4,2,[[0,0,"ROOM 1",false,[],[]],[0,0,"ROOM 2",false,[],[]]]];

exports.landGen = function(client,sec,gateCoor,gristSet) {
  let section = [];
  for(i=0;i<11;i++){
    section.push([[0,1,[[0,0,"CLEARING",false,[],[]]]],[0,1,[[0,0,"CLEARING",false,[],[]]]],[0,1,[[0,0,"CLEARING",false,[],[]]]],[0,1,[[0,0,"CLEARING",false,[],[]]]],[0,1,[[0,0,"CLEARING",false,[],[]]]],[0,1,[[0,0,"CLEARING",false,[],[]]]],[0,1,[[0,0,"CLEARING",false,[],[]]]],[0,1,[[0,0,"CLEARING",false,[],[]]]],[0,1,[[0,0,"CLEARING",false,[],[]]]],[0,1,[[0,0,"CLEARING",false,[],[]]]],[0,1,[[0,0,"CLEARING",false,[],[]]]]]);
  }
  let dungeon = [];
  for(i=0;i<11;i++){
    dungeon.push([[7,1,[[0,0,"OUT OF BOUNDS",false,[],[]]]]  , [7,1,[[0,0,"OUT OF BOUNDS",false,[],[]]]] , [7,1,[[0,0,"OUT OF BOUNDS",false,[],[]]]],[7,1,[[0,0,"OUT OF BOUNDS",false,[],[]]]],[7,1,[[0,0,"OUT OF BOUNDS",false,[],[]]]],[7,1,[[0,0,"OUT OF BOUNDS",false,[],[]]]],[7,1,[[0,0,"OUT OF BOUNDS",false,[],[]]]],[7,1,[[0,0,"OUT OF BOUNDS",false,[],[]]]],[7,1,[[0,0,"OUT OF BOUNDS",false,[],[]]]],[7,1,[[0,0,"OUT OF BOUNDS",false,[],[]]]],[7,1,[[0,0,"OUT OF BOUNDS",false,[],[]]]]]);
  }
empty =[];
  for(i=0;i<11;i++){
    for(j=0;j<11;j++){
      empty.push([i,j]);
    }
  }

  let dunCount;
  let denizenCheck = false;
  //Creates the Gate on the Land
  let pos = (gateCoor[0]*11)+(gateCoor[1]);
  if (sec!=3){
  let gate = empty.splice(pos,1);
  section[gate[0][0]][gate[0][1]]=[6,1,[[0,0,"GATE",false,[],[]]]];
  } else {
    denizenCheck = true;
    let temp=empty.splice(60,1);
    section[temp[0][0]][temp[0][1]]=[1,1,[[0,0,"DENIZEN LAIR ENTRANCE",false,[],[]]]];
    dungeon = dungeonGen(client,temp,sec,dungeon,gristSet)[0];
  }
  if(sec>1){
    dunCount = 1;
  } else {
    dunCount =2;
  }
  for(j=3;j>0;j--){
    let length = 40;
  //Creates Dungeons
  for(i=0;i<dunCount;i++){
    if(!denizenCheck){
  let temp=empty.splice(Math.floor(Math.random()*length)-1+(40*(j-1)),1);
  length--;
  section[temp[0][0]][temp[0][1]]=[1,1,[[0,0,"DUNGEON ENTRANCE",false,[],[]]]];
  //section[temp[0][0]][temp[0][1]]=[1,6,[funcall.roomGenCall(client,1,sec,1),funcall.roomGenCall(client,1,sec,2),funcall.roomGenCall(client,1,sec,3),funcall.roomGenCall(client,1,sec,4)]];
  dungeon = dungeonGen(client,temp,sec,dungeon,gristSet)[0];
  }
  }
  //Creates a Village
  for(i=0;i<3;i++){
    let temp=empty.splice(Math.floor(Math.random()*length)-1+(40*(j-1)),1);
    length--;
    section[temp[0][0]][temp[0][1]]=[4,2,[[0,0,"ROOM 1",false,[],[]],[0,0,"ROOM 2",false,[],[]]]];
  }
  //Creates the Land Constructs
  for(i=0;i<3;i++){
    let temp=empty.splice(Math.floor(Math.random()*length)-1+(40*(j-1)),1);
    length--;
    section[temp[0][0]][temp[0][1]]=[2,1,[[0,0,"LAND CONSTRUCT",false,[],[]]]];
  }
  //Creates the return nodes
  for(i=0;i<4;i++){
    let temp=empty.splice(Math.floor(Math.random()*length)-1+(40*(j-1)),1);
    length--;
    section[temp[0][0]][temp[0][1]]=[3,1,[[0,0,"RETURN NODE",false,[],[]]]];
  }
  //Creates free loot
  for(i=0;i<3;i++){
    let temp=empty.splice(Math.floor(Math.random()*length)-1+(40*(j-1)),1);
    length--;
    section[temp[0][0]][temp[0][1]]=[0,1,[[0,0,"CLEARING",false,[],[lootcall.lootA(client, sec, dubs(8))]]]];
  }
  }
return [section,dungeon];


}

function dungeonGen(client,roomCoor,sec,dungeon,gristSet) {
  dungeon[roomCoor[0][0]][roomCoor[0][1]]=[1,1,[[0,0,"DUNGEON EXIT",false,[],[]]]];
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
              dungeon[roomCoor[0][0]+k] [roomCoor[0][1]] =[8,1,[[0,0,"BOSS ROOM",false,[
                [false,'basilisk',gristSet[Math.floor((Math.random() * 4))]],
                [false,'basilisk',gristSet[Math.floor((Math.random() * 4))]],
                [false,'basilisk',gristSet[Math.floor((Math.random() * 4))]],
              ],[lootcall.lootA(client, sec, dubs(8))]]]];
            } else {

            dungeon[roomCoor[0][0]+k] [roomCoor[0][1]] = dungeonRoomGen(client,sec,gristSet);
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
              dungeon[roomCoor[0][0]-k] [roomCoor[0][1]] =[8,1,[[0,0,"DUNGEON ROOM",false,[[false,'imp',gristSet[Math.floor((Math.random() * 4))]]],[lootcall.lootA(client, sec, dubs(8))]]]];
            } else {
            dungeon[roomCoor[0][0]-k] [roomCoor[0][1]] = dungeonRoomGen(client,sec,gristSet);
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
              dungeon[roomCoor[0][0]] [roomCoor[0][1]+k] =[8,1,[[0,0,"DUNGEON ROOM",false,[[false,'imp',gristSet[Math.floor((Math.random() * 4))]]],[lootcall.lootA(client, sec, dubs(8))]]]];
            } else {
            dungeon[roomCoor[0][0]] [roomCoor[0][1]+k] = dungeonRoomGen(client,sec,gristSet);
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
              dungeon[roomCoor[0][0]] [roomCoor[0][1]-k] =[8,1,[[0,0,"DUNGEON ROOM",false,[[false,'imp',gristSet[Math.floor((Math.random() * 4))]]],[lootcall.lootA(client, sec, dubs(8))]]]];
            } else {
            dungeon[roomCoor[0][0]] [roomCoor[0][1]-k] = dungeonRoomGen(client,sec,gristSet);
          }
          }

        }

      break;

    }
  }
} else if(sec==2){
  for(k=0;k<11;k++){
    if(dungeon[roomCoor[0][0]] [k] [0] != 1 && dungeon[roomCoor[0][0]] [k] [0] != 8){
      dungeon[roomCoor[0][0]] [k] = dungeonRoomGen(client,sec,gristSet);
    }
  }

  for(k=0;k<11;k++){
    if(dungeon[k] [roomCoor[0][1]] [0] != 1 && dungeon[k] [roomCoor[0][1]] [0] != 8){
      dungeon[k] [roomCoor[0][1]] = dungeonRoomGen(client,sec,gristSet);
    }
  }
  let bosscheck = false;
  switch(Math.floor((Math.random() * 1))){
    case 0:
    while(!bosscheck){
      let random = Math.floor((Math.random() * 11))
      if(dungeon[roomCoor[0][0]][random][0]==0){
        dungeon[roomCoor[0][0]][random] = [8,1,[[0,0,"BOSS ROOM",false,[
          [false,'basilisk',gristSet[Math.floor((Math.random() * 4))]],
          [false,'basilisk',gristSet[Math.floor((Math.random() * 4))]],
          [false,'basilisk',gristSet[Math.floor((Math.random() * 4))]],
        ],[lootcall.lootA(client, sec, dubs(8))]]]];
        bosscheck=true;
      }
    }
    break;
    case 1:
      while(!bosscheck){
      let random = Math.floor((Math.random() * 11))
      if(dungeon[random][roomCoor[0][1]][0]==0){
        dungeon[random][roomCoor[0][1]] = [8,1,[[0,0,"BOSS ROOM",false,[
          [false,'basilisk',gristSet[Math.floor((Math.random() * 4))]],
          [false,'basilisk',gristSet[Math.floor((Math.random() * 4))]],
          [false,'basilisk',gristSet[Math.floor((Math.random() * 4))]],
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
} else {
let emptyTiles=[];

let genDirection =["n","s","e","w"];
let pathStart = [[roomCoor[0][0],roomCoor[0][1]],[roomCoor[0][0],roomCoor[0][1]],[roomCoor[0][0],roomCoor[0][1]],[roomCoor[0][0],roomCoor[0][1]]];
let g = 0;
let denizen = false;
while(pathStart.length != 0){
console.log(pathStart);
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
          dungeon[curx][0] = [9,1,[[0,0,"DENIZEN CHAMBER",false,[
            [false,'basilisk',gristSet[Math.floor((Math.random() * 4))]],
          ],[lootcall.lootA(client, sec, dubs(8))]]]];
          denizen=true;
        }

      } else {
        if(dungeon[curx][cury][0] == 7){
        dungeon[curx][cury] = dungeonRoomGen(client,sec,gristSet);
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
          dungeon[curx][10] = [9,1,[[0,0,"DENIZEN CHAMBER",false,[
            [false,'basilisk',gristSet[Math.floor((Math.random() * 4))]],
          ],[lootcall.lootA(client, sec, dubs(8))]]]];
          denizen=true;
        }
      } else {
        if(dungeon[curx][cury][0] == 7){
        dungeon[curx][cury] = dungeonRoomGen(client,sec,gristSet);
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
          dungeon[10][cury] = [9,1,[[0,0,"DENIZEN CHAMBER",false,[
            [false,'basilisk',gristSet[Math.floor((Math.random() * 4))]],
          ],[lootcall.lootA(client, sec, dubs(8))]]]];
          denizen=true;
        }
      } else {
        if(dungeon[curx][cury][0] == 7){
        dungeon[curx][cury] = dungeonRoomGen(client,sec,gristSet);
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
          dungeon[0][cury] = [9,1,[[0,0,"DENIZEN CHAMBER",false,[
            [false,'basilisk',gristSet[Math.floor((Math.random() * 4))]],
          ],[lootcall.lootA(client, sec, dubs(8))]]]];
          denizen=true;
        }
      } else {
        if(dungeon[curx][cury][0] == 7){
        dungeon[curx][cury] = dungeonRoomGen(client,sec,gristSet);
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
  dungeon [roomToFill[0][0]][roomToFill[0][1]] = [9,1,[[0,0,"DENIZEN CHAMBER",false,[
    [false,'basilisk',gristSet[Math.floor((Math.random() * 4))]],],[lootcall.lootA(client, sec, dubs(8))]]]];
}
for (d=0;d<4;d++){
  roomToFill = emptyTiles.splice(Math.floor(Math.random()*emptyTiles.length)-1,1);
  dungeon [roomToFill[0][0]][roomToFill[0][1]] = [8,1,[[0,0,"DENIZEN MINION",false,[
    [false,'basilisk',gristSet[Math.floor((Math.random() * 4))]],],[lootcall.lootA(client, sec, dubs(8))]]]];
}

}

  return [dungeon,lv2,lv3];

}

function dungeonRoomGen(client,sec,gristSet) {
  switch(Math.floor((Math.random() * 4))){

case 3:
return [0,1,[[0,0,"DUNGEON ROOM",false,[],[lootcall.lootB(client, sec, dubs(8))]]]];
break;
  default:
  return [0,1,[[0,0,"DUNGEON ROOM",false,[],[]]]];
  }

}


exports.moonGen = function(client,castleLocal,towerLocal){

  let section = [[],[],[],[]];
  for(i=0;i<11;i++){
//   prospit,derse,prospitmoon,dersemoon
    section[0].push([[10,1,[[0,0,"STREET",false,[],[]]]],[10,1,[[0,0,"STREET",false,[],[]]]],[10,1,[[0,0,"STREET",false,[],[]]]],[10,1,[[0,0,"STREET",false,[],[]]]],[10,1,[[0,0,"STREET",false,[],[]]]],[10,1,[[0,0,"STREET",false,[],[]]]],[10,1,[[0,0,"STREET",false,[],[]]]],[10,1,[[0,0,"STREET",false,[],[]]]],[10,1,[[0,0,"STREET",false,[],[]]]],[10,1,[[0,0,"STREET",false,[],[]]]],[10,1,[[0,0,"STREET",false,[],[]]]]]);
    section[1].push([[10,1,[[0,0,"ALLEYWAY",false,[],[]]]],[10,1,[[0,0,"ALLEYWAY",false,[],[]]]],[10,1,[[0,0,"ALLEYWAY",false,[],[]]]],[10,1,[[0,0,"ALLEYWAY",false,[],[]]]],[10,1,[[0,0,"ALLEYWAY",false,[],[]]]],[10,1,[[0,0,"ALLEYWAY",false,[],[]]]],[10,1,[[0,0,"ALLEYWAY",false,[],[]]]],[10,1,[[0,0,"ALLEYWAY",false,[],[]]]],[10,1,[[0,0,"ALLEYWAY",false,[],[]]]],[10,1,[[0,0,"ALLEYWAY",false,[],[]]]],[10,1,[[0,0,"ALLEYWAY",false,[],[]]]]]);
    section[2].push([[10,1,[[0,0,"STREET",false,[],[]]]],[10,1,[[0,0,"STREET",false,[],[]]]],[10,1,[[0,0,"STREET",false,[],[]]]],[10,1,[[0,0,"STREET",false,[],[]]]],[10,1,[[0,0,"STREET",false,[],[]]]],[10,1,[[0,0,"STREET",false,[],[]]]],[10,1,[[0,0,"STREET",false,[],[]]]],[10,1,[[0,0,"STREET",false,[],[]]]],[10,1,[[0,0,"STREET",false,[],[]]]],[10,1,[[0,0,"STREET",false,[],[]]]],[10,1,[[0,0,"STREET",false,[],[]]]]]);
    section[3].push([[10,1,[[0,0,"ALLEYWAY",false,[],[]]]],[10,1,[[0,0,"ALLEYWAY",false,[],[]]]],[10,1,[[0,0,"ALLEYWAY",false,[],[]]]],[10,1,[[0,0,"ALLEYWAY",false,[],[]]]],[10,1,[[0,0,"ALLEYWAY",false,[],[]]]],[10,1,[[0,0,"ALLEYWAY",false,[],[]]]],[10,1,[[0,0,"ALLEYWAY",false,[],[]]]],[10,1,[[0,0,"ALLEYWAY",false,[],[]]]],[10,1,[[0,0,"ALLEYWAY",false,[],[]]]],[10,1,[[0,0,"ALLEYWAY",false,[],[]]]],[10,1,[[0,0,"ALLEYWAY",false,[],[]]]]]);

  }
  let select = [0,1,3,4,6,7,9,10]
  let empty = [];
  for(i=0;i<8;i++){
    for(j=0;j<8;j++){
      empty.push([select[i],select[j]]);
    }
  }

  let empty2 = [];
  for(i=0;i<8;i++){
    for(j=0;j<8;j++){
      empty2.push([select[i],select[j]]);
    }
  }

  section[0][5][5]=[13,1,[[0,0,"CHAIN",false,[],[]]]];
  section[1][5][5]=[13,1,[[0,0,"CHAIN",false,[],[]]]];
  section[2][5][5]=[13,1,[[0,0,"CHAIN",false,[],[]]]];
  section[3][5][5]=[13,1,[[0,0,"CHAIN",false,[],[]]]];

  section[2][towerLocal[0]][towerLocal[1]]=[11,1,[[0,0,"PROSPIT TOWER BASE",true,[],[]]]];
  section[3][towerLocal[0]][towerLocal[1]]=[11,1,[[0,0,"DERSE TOWER BASE",true,[],[]]]];
  empty.splice(select.indexOf(towerLocal[0])*8+select.indexOf(towerLocal[1]),1);

  section[0][castleLocal[0]][castleLocal[1]]=[12,1,[[0,0,"PROSPIT CASTLE",true,[],[]]]];
  section[0][castleLocal[0]][castleLocal[1]]=[12,1,[[0,0,"DERSE CASTLE",true,[],[]]]];
  empty2.splice(select.indexOf(castleLocal[0])*8+select.indexOf(castleLocal[1]),1);

//Dreamplanet Proper
//63 to cover
//general store 14 // 10
//Bakery/Butcher 15 // 4
//Resturant/Pub 16 // 4
//Habadashery/Armory 17
//Theather/Arena 18
//Police station 19
//Bingo Hall/Casino 20
//court 21
//appartment building/slum 22
//Public Park/Abandoned Building 23
//post office 24
//bank 25

//Dream Moon
//63 to cover
//post Office //
//Bingo hall/Casino //
//court //
//court //
//police station //
//appartment building/slum

//general store
for(i=0;i<10;i++){//53
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[14,1,[[0,0,"GENERAL STORE",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[14,1,[[0,0,"GENERAL STORE",false,[],[]]]];
}
for(i=0;i<4;i++){//49
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[15,1,[[0,0,"CANDY SHOP",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[26,1,[[0,0,"BUTCHER",false,[],[]]]];
}
for(i=0;i<4;i++){//45
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[16,1,[[0,0,"RESTAURANT",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[16,1,[[0,0,"PUB",false,[],[]]]];
}
for(i=0;i<4;i++){//41
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[17,1,[[0,0,"FINE APPAREL",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[27,1,[[0,0,"ARMORY",false,[],[]]]];
}
for(i=0;i<2;i++){//39
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[18,1,[[0,0,"THEATRE",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[18,1,[[0,0,"ARENA",false,[],[]]]];
}
for(i=0;i<2;i++){//37
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[19,1,[[0,0,"POLICE STATION",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[19,1,[[0,0,"POLICE STATION",false,[],[]]]];
}
for(i=0;i<4;i++){//33
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[20,1,[[0,0,"BINGO HALL",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[20,1,[[0,0,"CASINO",false,[],[]]]];
}
for(i=0;i<2;i++){//31
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[21,1,[[0,0,"court",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[21,1,[[0,0,"court",false,[],[]]]];
}
for(i=0;i<2;i++){//29
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[22,1,[[0,0,"BANK",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[22,1,[[0,0,"BANK",false,[],[]]]];
}
for(i=0;i<2;i++){//27
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[23,1,[[0,0,"POST OFFICE",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[23,1,[[0,0,"POST OFFICE",false,[],[]]]];
}
for(i=0;i<10;i++){//17
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[24,1,[[0,0,"APPARTMENT BUILDING",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[24,1,[[0,0,"APPARTMENT BUILDING",false,[],[]]]];
}

while(empty2.length>0){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[0,1,[[0,0,"PUBLIC PARK",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[0,1,[[0,0,"ABANDONED BUILDING",false,[],[]]]];
}


for(i=0;i<10;i++){//53
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[14,1,[[0,0,"GENERAL STORE",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[14,1,[[0,0,"GENERAL STORE",false,[],[]]]];
}
for(i=0;i<4;i++){//49
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[15,1,[[0,0,"CANDY SHOP",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[26,1,[[0,0,"BUTCHER",false,[],[]]]];
}
for(i=0;i<4;i++){//45
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[16,1,[[0,0,"RESTAURANT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[16,1,[[0,0,"PUB",false,[],[]]]];
}
for(i=0;i<4;i++){//41
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[17,1,[[0,0,"FINE APPAREL",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[27,1,[[0,0,"ARMORY",false,[],[]]]];
}
for(i=0;i<2;i++){//39
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[18,1,[[0,0,"THEATRE",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[18,1,[[0,0,"ARENA",false,[],[]]]];
}
for(i=0;i<2;i++){//37
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[19,1,[[0,0,"POLICE STATION",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[19,1,[[0,0,"POLICE STATION",false,[],[]]]];
}
for(i=0;i<4;i++){//33
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[20,1,[[0,0,"BINGO HALL",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[20,1,[[0,0,"CASINO",false,[],[]]]];
}
for(i=0;i<2;i++){//31
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[21,1,[[0,0,"COURT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[21,1,[[0,0,"COURT",false,[],[]]]];
}
for(i=0;i<2;i++){//29
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[22,1,[[0,0,"BANK",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[22,1,[[0,0,"BANK",false,[],[]]]];
}
for(i=0;i<2;i++){//27
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[23,1,[[0,0,"POST OFFICE",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[23,1,[[0,0,"POST OFFICE",false,[],[]]]];
}
for(i=0;i<10;i++){//17
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[25,1,[[0,0,"APPARTMENTS",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[25,1,[[0,0,"SLUMS",false,[],[]]]];
}

while(empty.length>0){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[0,1,[[0,0,"PUBLIC PARK",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[0,1,[[0,0,"ABANDONED BUILDING",false,[],[]]]];
}

  return section;
}




exports.drawMap = async function(client,message,mini) {

let charid = message.guild.id.concat(message.author.id);
let local = client.playerMap.get(charid,`local`);
let input = client.landMap.get(local[4],local[0]);
let aspect;

try {
  aspect = client.landMap.get(local[4],"aspect");
  if(aspect = `undefined`){
    aspect = "BREATH";
  }
} catch(err){
  aspect = "BREATH";
}
//loading all of the images I need. This might be stupid inefficent, but I need to at least see what it looks like at it's worst.
const ax = await client.Canvas.loadImage(`./MAP/x.png`);
const ax0 = await client.Canvas.loadImage(`./MAP/0.png`);
const ax1 = await client.Canvas.loadImage(`./MAP/1.png`);
const ax2 = await client.Canvas.loadImage(`./MAP/2.png`);
const ax3 = await client.Canvas.loadImage(`./MAP/3.png`);
const ax4 = await client.Canvas.loadImage(`./MAP/4.png`);
const ax5 = await client.Canvas.loadImage(`./MAP/5.png`);
const ax6 = await client.Canvas.loadImage(`./MAP/6.png`);
const ax7 = await client.Canvas.loadImage(`./MAP/7.png`);
const ax8 = await client.Canvas.loadImage(`./MAP/8.png`);
const ax9 = await client.Canvas.loadImage(`./MAP/9.png`);
const ax10 = await client.Canvas.loadImage(`./MAP/10.png`);
const blank = await client.Canvas.loadImage(`./MAP/BLANK.png`);
const plblank = await client.Canvas.loadImage(`./MAP/PLBLANK.png`);
const fog = await client.Canvas.loadImage(`./MAP/FOGBLANK.png`);
const player = await client.Canvas.loadImage(`./MAP/PLAYER.png`);
const plplayer = await client.Canvas.loadImage(`./MAP/PLPLAYER.png`);
const playerf = await client.Canvas.loadImage(`./MAP/PLAYERF.png`);
const dungeon = await client.Canvas.loadImage(`./MAP/DUNGEON.png`);
const pldungeon = await client.Canvas.loadImage(`./MAP/PLDUNGEON.png`);
const dungeonf = await client.Canvas.loadImage(`./MAP/DUNGEONF.png`);
const village = await client.Canvas.loadImage(`./MAP/VILLAGE.png`);
const plvillage = await client.Canvas.loadImage(`./MAP/PLVILLAGE.png`);
const villagef = await client.Canvas.loadImage(`./MAP/VILLAGEF.png`);
const maspect = await client.Canvas.loadImage(`./MAP/${aspect}.png`);
const plaspect = await client.Canvas.loadImage(`./MAP/PL${aspect}.png`);
const aspectf = await client.Canvas.loadImage(`./MAP/${aspect}F.png`);
const node = await client.Canvas.loadImage(`./MAP/NODE.png`);
const plnode = await client.Canvas.loadImage(`./MAP/PLNODE.png`);
const nodef = await client.Canvas.loadImage(`./MAP/NODEF.png`);
const gate = await client.Canvas.loadImage(`./MAP/GATE.gif`);
const plgate = await client.Canvas.loadImage(`./MAP/PLGATE.gif`);
const drgate = await client.Canvas.loadImage(`./MAP/DRGATE.gif`);
const boss = await client.Canvas.loadImage(`./MAP/BOSS.png`);
const plboss = await client.Canvas.loadImage(`./MAP/BOSSPL.png`);
const bossf = await client.Canvas.loadImage(`./MAP/BOSSFOG.png`);
const denizen = await client.Canvas.loadImage(`./MAP/DENIZEN.png`);
const pldenizen = await client.Canvas.loadImage(`./MAP/DENIZENPL.png`);
const denizenf = await client.Canvas.loadImage(`./MAP/DENIZENFOG.png`);
const darkblank = await client.Canvas.loadImage(`./MAP/DARKBLANK.png`);

const plprison = await client.Canvas.loadImage(`./MAP/PLPRISON.png`);
const prison = await client.Canvas.loadImage(`./MAP/PRISON.png`);
const plbank = await client.Canvas.loadImage(`./MAP/PLBANK.png`);
const bank = await client.Canvas.loadImage(`./MAP/BANK.png`);
const pllibrary = await client.Canvas.loadImage(`./MAP/PLLIBRARY.png`);
const library = await client.Canvas.loadImage(`./MAP/LIBRARY.png`);
const plpolice = await client.Canvas.loadImage(`./MAP/PLPOLICE.png`);
const police = await client.Canvas.loadImage(`./MAP/POLICE.png`);
const plpostal = await client.Canvas.loadImage(`./MAP/PLPOSTAL.png`);
const postal = await client.Canvas.loadImage(`./MAP/POSTAL.png`);
const plcasino = await client.Canvas.loadImage(`./MAP/PLCASINO.png`);
const casino = await client.Canvas.loadImage(`./MAP/CASINO.png`);
const plstore = await client.Canvas.loadImage(`./MAP/PLSTORE.png`);
const store = await client.Canvas.loadImage(`./MAP/STORE.png`);
const plrestaurant = await client.Canvas.loadImage(`./MAP/PLRESTAURANT.png`);
const restaurant = await client.Canvas.loadImage(`./MAP/RESTAURANT.png`);
const pltheatre = await client.Canvas.loadImage(`./MAP/PLTHEATRE.png`);
const theatre = await client.Canvas.loadImage(`./MAP/THEATRE.png`);
const plarmory = await client.Canvas.loadImage(`./MAP/PLARMORY.png`);
const armory = await client.Canvas.loadImage(`./MAP/ARMORY.png`);
const plhaberdashery = await client.Canvas.loadImage(`./MAP/PLHABERDASHERY.png`);
const haberdashery = await client.Canvas.loadImage(`./MAP/HABERDASHERY.png`);
const plcandyshop = await client.Canvas.loadImage(`./MAP/PLCANDYSHOP.png`);
const candyshop = await client.Canvas.loadImage(`./MAP/CANDYSHOP.png`);
const plbutcher = await client.Canvas.loadImage(`./MAP/PLBUTCHER.png`);
const butcher = await client.Canvas.loadImage(`./MAP/BUTCHER.png`);
const plcourt = await client.Canvas.loadImage(`./MAP/PLCOURT.png`);
const court = await client.Canvas.loadImage(`./MAP/COURT.png`);
const plappartment = await client.Canvas.loadImage(`./MAP/PLAPPARTMENT.png`);
const appartment = await client.Canvas.loadImage(`./MAP/APPARTMENT.png`);
const plroad = await client.Canvas.loadImage(`./MAP/PLROAD.png`);
const road = await client.Canvas.loadImage(`./MAP/ROAD.png`);
const chain = await client.Canvas.loadImage(`./MAP/CHAIN.png`);
const plchain = await client.Canvas.loadImage(`./MAP/PLCHAIN.png`);
const tower = await client.Canvas.loadImage(`./MAP/TOWERS.png`);
const pltower = await client.Canvas.loadImage(`./MAP/PLTOWERS.png`);
const castle = await client.Canvas.loadImage(`./MAP/CASTLE.png`);
const plcastle = await client.Canvas.loadImage(`./MAP/PLCASTLE.png`);
let legend = [ax,ax0,ax1,ax2,ax3,ax4,ax5,ax6,ax7,ax8,ax9,ax10,blank,plblank,fog,player,plplayer,playerf,dungeon,pldungeon,dungeonf,village,plvillage,villagef,maspect,plaspect,aspectf,node,plnode,nodef,gate,plgate,drgate,boss,plboss,bossf,denizen,pldenizen,denizenf,prison,plprison,bank,plbank,library,pllibrary,police,plpolice,postal,plpostal,casino,plcasino,store,plstore,restaurant,plrestaurant,theatre,pltheatre,armory,plarmory,haberdashery,plhaberdashery,candyshop,plcandyshop,butcher,plbutcher,court,plcourt,appartment,plappartment,road,plroad,chain,plchain,tower,pltower,castle,plcastle];
if(!mini){
const canvas = client.Canvas.createCanvas(404,424);
const ctx = canvas.getContext('2d');
const background = await client.Canvas.loadImage('./background.jpg');
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
ctx.strokeStyle = '#3e3e3e';
ctx.lineWidth = 10;
ctx.strokeRect(0, 0, canvas.width, canvas.height);
 //landcall.landGen(client,0,[5,5]);
/*
section[gate[0][0]][gate[0][1]]=defaultGate;
*/

let sectionTitleImg = await client.Canvas.loadImage(`./MAP/SECTION 1.png`);
  switch(local[0]){
    case "s2":
    sectionTitleImg = await client.Canvas.loadImage(`./MAP/SECTION 2.png`);
    break;
    case "s3":
    sectionTitleImg = await client.Canvas.loadImage(`./MAP/SECTION 3.png`);
    break;
    case "s4":
    sectionTitleImg = await client.Canvas.loadImage(`./MAP/SECTION 4.png`);
    break;
    case "s1d":
    case "s2d":
    case "s3d":
    sectionTitleImg = await client.Canvas.loadImage(`./MAP/DUNGEONTITLE.png`);
    break;
    case "s4d":
    sectionTitleImg = await client.Canvas.loadImage(`./MAP/DENIZENLAIRTITLE.png`);
    break;
    case "p":
    sectionTitleImg = await client.Canvas.loadImage(`./MAP/PR.png`);
    break;
    case "pm":
    sectionTitleImg = await client.Canvas.loadImage(`./MAP/PROSPIT_MOON.png`);
    break;
    case "d":
    sectionTitleImg = await client.Canvas.loadImage(`./MAP/DERSE.png`);
    case "dm":
    sectionTitleImg = await client.Canvas.loadImage(`./MAP/DERSE_MOON.png`);

    break;
  }

ctx.drawImage(sectionTitleImg,5,5,394,32);


 for(k=0;k<12;k++){
   ctx.drawImage(legend[k],5+(32.8*k),37,32.8,32.8);
}
for(i=0;i<11;i++){
  ctx.drawImage(legend[i+1],5,5+(32*(i+2)),32.8,31);
    for(j=0;j<11;j++){
            //comment out this if check to turn off fog of war on the main map
      if(!input[i][j][2][0][3]&&local[0].charAt(0)!="p"&&local[0].charAt(0)!="d"){
          ctx.drawImage(fog,5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);

      } else {
        let tile = 0;
        if(i==local[1]&& j==local[2]){
          tile = 1;
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
         if(player){

           ctx.drawImage(legend[15+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
         } else {

           ctx.drawImage(legend[12+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
         }
         break;
         case 1:
           ctx.drawImage(legend[18+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
         break;
         case 2:
          ctx.drawImage(legend[24+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
         break;
         case 3:
           ctx.drawImage(legend[27+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
         break;
         case 4:
           ctx.drawImage(legend[21+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
         break;
         case 6:
           ctx.drawImage(legend[30+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
         break;
         case 7:
          ctx.drawImage(darkblank,5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 8:
            ctx.drawImage(legend[33+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 9:
            ctx.drawImage(legend[36+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 10:
          ctx.drawImage(legend[legend.indexOf(road)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 11:
          ctx.drawImage(legend[legend.indexOf(tower)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 12:
          ctx.drawImage(legend[legend.indexOf(castle)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 13:
          ctx.drawImage(legend[legend.indexOf(chain)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 14:
          ctx.drawImage(legend[legend.indexOf(store)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 15:
          ctx.drawImage(legend[legend.indexOf(candyshop)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 16:
          ctx.drawImage(legend[legend.indexOf(restaurant)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 17:
          ctx.drawImage(legend[legend.indexOf(haberdashery)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 18:
          ctx.drawImage(legend[legend.indexOf(theatre)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 19:
          ctx.drawImage(legend[legend.indexOf(police)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 20:
          ctx.drawImage(legend[legend.indexOf(casino)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 21:
          ctx.drawImage(legend[legend.indexOf(court)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 22:
          ctx.drawImage(legend[legend.indexOf(bank)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 23:
          ctx.drawImage(legend[legend.indexOf(postal)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 24:
          ctx.drawImage(legend[legend.indexOf(appartment)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 25:
          ctx.drawImage(legend[legend.indexOf(appartment)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 26:
          ctx.drawImage(legend[legend.indexOf(butcher)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 27:
          ctx.drawImage(legend[legend.indexOf(armory)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;

         default:
           ctx.drawImage(ax,5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
       }
    }
  }
}

let attachment = new client.Discord.MessageAttachment(canvas.toBuffer(), 'landmap.png');
message.channel.send(attachment);
} else {

const canvas = client.Canvas.createCanvas(192,192);
const ctx = canvas.getContext('2d');

for(i=-1;i<2;i++){
  for (j=-1;j<2;j++){
    let tile = 0;
     if(j + local[2] > 10 || j + local[2] < 0 || i +local[1] > 10 || i + local[1] <0){
    ctx.drawImage(darkblank,(64*(j+1)),(64*(i+1)),64,64);
    } else {
      if(i==0 && j==0){
        tile = 1;
      } else if(!input[i+local[1]][j+local[2]][2][0][3]&&local[0].charAt(0)!="p"&&local[0].charAt(0)!="d"){
        tile = 2;
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
        if(player){

          ctx.drawImage(legend[15+tile],(64*(j+1)),(64*(i+1)),64,64);
        } else {

          ctx.drawImage(legend[12+tile],(64*(j+1)),(64*(i+1)),64,64);
        }
        break;
        case 1:
          ctx.drawImage(legend[18+tile],(64*(j+1)),(64*(i+1)),64,64);
        break;
        case 2:
         ctx.drawImage(legend[24+tile],(64*(j+1)),(64*(i+1)),64,64);
        break;
        case 3:
          ctx.drawImage(legend[27+tile],(64*(j+1)),(64*(i+1)),64,64);
        break;
        case 4:
          ctx.drawImage(legend[21+tile],(64*(j+1)),(64*(i+1)),64,64);
        break;
        case 6:
          ctx.drawImage(legend[30+tile],(64*(j+1)),(64*(i+1)),64,64);
        break;
        case 7:
         ctx.drawImage(darkblank,(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 8:
           ctx.drawImage(legend[33+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 9:
           ctx.drawImage(legend[36+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 10:
         ctx.drawImage(legend[legend.indexOf(road)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 11:
         ctx.drawImage(legend[legend.indexOf(tower)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 12:
         ctx.drawImage(legend[legend.indexOf(castle)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 13:
         ctx.drawImage(legend[legend.indexOf(chain)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 14:
         ctx.drawImage(legend[legend.indexOf(store)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 15:
         ctx.drawImage(legend[legend.indexOf(candyshop)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 16:
         ctx.drawImage(legend[legend.indexOf(restaurant)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 17:
         ctx.drawImage(legend[legend.indexOf(haberdashery)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 18:
         ctx.drawImage(legend[legend.indexOf(theatre)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 19:
         ctx.drawImage(legend[legend.indexOf(police)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 20:
         ctx.drawImage(legend[legend.indexOf(casino)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 21:
         ctx.drawImage(legend[legend.indexOf(court)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 22:
         ctx.drawImage(legend[legend.indexOf(bank)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 23:
         ctx.drawImage(legend[legend.indexOf(postal)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 24:
         ctx.drawImage(legend[legend.indexOf(appartment)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 25:
         ctx.drawImage(legend[legend.indexOf(appartment)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 26:
         ctx.drawImage(legend[legend.indexOf(butcher)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 27:
         ctx.drawImage(legend[legend.indexOf(armory)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
          ctx.drawImage(ax,(64*(j+1)),(64*(i+1)),64,64);
      }
    }
  }
  }
  attachment = new client.Discord.MessageAttachment(canvas.toBuffer(), 'landmap.png');
  message.channel.send(attachment);
return;
}
}

exports.underlingCheck = function(occList) {
  check = false;
  if(occList.length>0){
    for(i=0;i<occList.length;i++){
      if(occList[i][0]==false){
        check=true;
      }
    }
  }

  return check;
}
