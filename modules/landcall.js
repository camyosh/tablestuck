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
//Land Key(0-6):
//EMPTY, DUNGEON, CONSTRUCT, NODE, VILLAGE, HOUSE, GATE

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
  case 0:
   return [0,1,[[0,0,"DUNGEON ROOM",false,[
     [false,'ogre',gristSet[Math.floor((Math.random() * 4))]],
     [false,'ogre',gristSet[Math.floor((Math.random() * 4))]],
     [false,'ogre',gristSet[Math.floor((Math.random() * 4))]],
     [false,'ogre',gristSet[Math.floor((Math.random() * 4))]],
   ],[]]]];
  break;
  case 1:
  return [0,1,[[0,0,"DUNGEON ROOM",false,[
    [false,'ogre',gristSet[Math.floor((Math.random() * 4))]],
    [false,'ogre',gristSet[Math.floor((Math.random() * 4))]],
    [false,'basilisk',gristSet[Math.floor((Math.random() * 4))]]
  ],[]]]];
 break;
 case 2:
 return [0,1,[[0,0,"DUNGEON ROOM",false,[
   [false,'basilisk',gristSet[Math.floor((Math.random() * 4))]],
   [false,'basilisk',gristSet[Math.floor((Math.random() * 4))]]
 ],[]]]];
break;
case 3:
return [0,1,[[0,0,"DUNGEON ROOM",false,[],[lootcall.lootB(client, sec, dubs(8))]]]];
break;


  default:
  return [0,1,[[0,0,"DUNGEON ROOM",false,[],[]]]];
  }

}








exports.miniMap = function(client,message) {

let charid = message.guild.id.concat(message.author.id);
let local = client.playerMap.get(charid,`local`);
let input = client.landMap.get(local[4],local[0]);

let aspect;

try {
  aspect = client.landMap.get(local[4],"aspect");
} catch(err){
  aspect = "BREATH";
}


let msg =``;
let str =``;
for(i=-1;i<2;i++){
  for (j=-1;j<2;j++){
    let tile = "TILE";
     if(j + local[2] > 10 || j + local[2] < 0 || i +local[1] > 10 || i + local[1] <0){
    str = `${client.emojis.cache.get("761001131035066378")}`
    } else {
      if(i==0 && j==0){
        tile = `PLTILE`;
      } else if(!input[i+local[1]][j+local[2]][2][0][3]){
        tile = `FOGTILE`;
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
          str=`${client.emojis.cache.get(client.map[tile].PLAYER)}`;
        } else {
          str=`${client.emojis.cache.get(client.map[tile].BLANK)}`;
        }
        break;
        case 1:
          str=`${client.emojis.cache.get(client.map[tile].DUNGEON)}`;
        break;
        case 2:
         str = `${client.emojis.cache.get(client.map[tile][aspect])}`;
        break;
        case 3:
          str = `${client.emojis.cache.get(client.map[tile].NODE)}`;
        break;
        case 4:
          str=`${client.emojis.cache.get(client.map[tile].VILLAGE)}`;
        break;
        case 6:
          str=`${client.emojis.cache.get(client.map[tile].GATE)}`;
        break;
        case 7:
         str=`${client.emojis.cache.get("761001131035066378")}`;
         break;
         case 8:
           str=`${client.emojis.cache.get(client.map[tile].BOSS)}`;
         break;
         case 9:
           str=`${client.emojis.cache.get(client.map[tile].DENIZEN)}`;
         break;
        default:
          str=`:x:`;
      }
    }
 msg += `${str}`;
  }
 msg += '\n';
  }
message.channel.send(msg);
return;
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
