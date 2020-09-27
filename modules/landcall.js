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

exports.landGen = function(client,sec,gateCoor) {


  section = [];
  for(i=0;i<11;i++){
    section.push([[0,1,[[0,0,"CLEARING",false,[],[]]]],[0,1,[[0,0,"CLEARING",false,[],[]]]],[0,1,[[0,0,"CLEARING",false,[],[]]]],[0,1,[[0,0,"CLEARING",false,[],[]]]],[0,1,[[0,0,"CLEARING",false,[],[]]]],[0,1,[[0,0,"CLEARING",false,[],[]]]],[0,1,[[0,0,"CLEARING",false,[],[]]]],[0,1,[[0,0,"CLEARING",false,[],[]]]],[0,1,[[0,0,"CLEARING",false,[],[]]]],[0,1,[[0,0,"CLEARING",false,[],[]]]],[0,1,[[0,0,"CLEARING",false,[],[]]]]]);
  }
empty =[];
  for(i=0;i<11;i++){
    for(j=0;j<11;j++){
      empty.push([i,j]);
    }
  }
//Creates the Gate on the Land
let pos = (gateCoor[0]*11)+(gateCoor[1]);
let gate = empty.splice(pos,1);
section[gate[0][0]][gate[0][1]]=defaultGate;
//Creates Dungeons (just basic for now)
for(i=0;i<10;i++){
let temp=empty.splice((Math.floor(Math.random()*empty.length)-1),1);
section[temp[0][0]][temp[0][1]]=[1,6,[funcall.roomGenCall(client,1,sec,1),funcall.roomGenCall(client,1,sec,2),funcall.roomGenCall(client,1,sec,3),funcall.roomGenCall(client,1,sec,4)]];
}
//Creates a Village
for(i=0;i<10;i++){
let temp=empty.splice((Math.floor(Math.random()*empty.length)-1),1);
section[temp[0][0]][temp[0][1]]=[4,2,[[0,0,"ROOM 1",false,[],[]],[0,0,"ROOM 2",false,[],[]]]];
}
//Creates the Land Constructs
for(i=0;i<10;i++){
let temp=empty.splice((Math.floor(Math.random()*empty.length)-1),1);
section[temp[0][0]][temp[0][1]]=[2,1,[[0,0,"LAND CONSTRUCT",false,[],[]]]];
}
//Creates the return nodes
for(i=0;i<15;i++){
let temp=empty.splice((Math.floor(Math.random()*empty.length)-1),1);
section[temp[0][0]][temp[0][1]]=[3,1,[[0,0,"RETURN NODE",false,[],[]]]];
}
//Creates free loot

for(i=0;i<10;i++){
let temp=empty.splice((Math.floor(Math.random()*empty.length)-1),1);
section[temp[0][0]][temp[0][1]]=[0,1,[[0,0,"CLEARING",false,[],[lootcall.lootA(client, sec, dubs(8))]]]];
}


return section;

}
