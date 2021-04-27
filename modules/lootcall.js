
const funcall = require("./funcall.js");

const alcGristCode = ["/7//////","/m//////","/b////////","/K///////","/Y////////","/e//////","/o/////","/H//////","/3//////","/v//////","/g//////","/N//////"]
const alcGristName = ["ALCHEMY GRIST TYPE- CHALK","ALCHEMY GRIST TYPE- TAR","ALCHEMY GRIST TYPE- AMBER","ALCHEMY GRIST TYPE- SHALE","ALCHEMY GRIST TYPE- RUBY","ALCHEMY GRIST TYPE- GARNET","ALCHEMY GRIST TYPE- URANIUM","ALCHEMY GRIST TYPE- IRON","ALCHEMY GRIST TYPE- AMETHYST","ALCHEMY GRIST TYPE- COBALT","ALCHEMY GRIST TYPE- MARBLE","ALCHEMY GRIST TYPE- CAULK"]

const alcTraitCode = ["//Dd////","///F////","//Uk////","///7////","///L////","///B////","///h////","///X////","///A////","///Z////","//a/////","//7/////","//c/////","//f/////","//A/////","//9/////","//T/////","//g/////"]
const alcTraitName = ["ALCHEMY TRAIT- ROCKET","ALCHEMY TRAIT- HEAVY","ALCHEMY TRAIT- LIGHT SOURCE","ALCHEMY TRAIT- MAGICAL","ALCHEMY TRAIT- SENTIENT","ALCHEMY TRAIT- SHITTY","ALCHEMY TRAIT- SCIENTIFIC","ALCHEMY TRAIT- LIGHT","ALCHEMY TRAIT- SPIRITUAL","ALCHEMY TRAIT- COMPUTER","ALCHEMY TRAIT- BOUNCY","ALCHEMY TRAIT- STICKY","ALCHEMY TRAIT- HOT","ALCHEMY TRAIT- IRRADIATED","ALCHEMY TRAIT- ELECTRIC","ALCHEMY TRAIT- COLD","ALCHEMY TRAIT- COMPUTER","ALCHEMY TRAIT- SHARP"]

const alcActionCode = [["////X///","////U///","////z///","////f///","////j///","////R///","////Y///","////w///","////a///","////s///","////M///","////Z///","////c///","////Q///","////6///","////x///","////N///","////o///","////3///","////S///"],["/////a//","/////k//","/////w//","/////c//","/////j//","/////F//","/////o//","/////n//","/////q//","/////Y//","/////x//","/////B//","/////t//","/////J//","/////p//","/////8//","/////m//","/////Q//","/////g//","/////X//"],["//////u/","//////o/","//////2/","//////y/","//////C/","//////9/","//////t/","//////T/","//////6/","//////A/","//////c/","//////U/","//////P/","//////W/","//////G/","//////s/","//////Q/","//////S/","//////R/","//////e/"],["///////2","///////U","///////o","///////X","///////G","///////r","///////u","///////H","///////D","///////R","///////p","///////J","///////q","///////n","///////7","///////t","///////6","///////h","///////z","///////v"]]
const alcActionName = ["ALCHEMY ACTION- ASSEMBLE/ARISE/ACCOUNT","ALCHEMY ACTION- ASSAULT/ARGUFY/ACCOMPLISH","ALCHEMY ACTION- ASSASSINATE/ARF/ACCLIMATE","ALCHEMY ACTION- ASSAIL/ARDOR/ACCLAIM","ALCHEMY ACTION- ASS/ARCHIVE/ACCESSORIZE","ALCHEMY ACTION- ASPIRE/ARBORIZE/ACCELERATE","ALCHEMY ACTION- ASPHIXIATE/ARBITRATE/ACCEDE","ALCHEMY ACTION- AGGRAVATE","ALCHEMY ACTION- AGGRESS","ALCHEMY ACTION- AGGREGATE","ALCHEMY ACTION- ASSERT/ARITHMATIZE/ACCUMULATE","ALCHEMY ACTION- ASSES/ARMAMENTIFY/ACCUSE","ALCHEMY ACTION- ASSEVERATE/ARRAIGN/ACERBATE","ALCHEMY ACTION- ASSIGN/ARRANGE/ACKNOWLEDGE","ALCHEMY ACTION- ASSIMILATE/ARREST/ACQUAINT","ALCHEMY ACTION- ASSIST/ARRIVE/ACQUIRE","ALCHEMY ACTION- ASSURE/ARROGATE/ACTUALIZE","ALCHEMY ACTION- ASTONISH/ARSENALIZE/ACTUATE","ALCHEMY ACTION- ASTOUND/ARTICULATE/ACUERE","ALCHEMY ACTION- ASTRICT/ARTILLERATE/ACCUPRESSURE"]

const codeList = ["s$//$$$$","022x$$$$","0O3w$$$$","0d4v$$$$","0R5u$$$$","0b6t$$$$","0g7s$$$$","0x8r$$$$","0E9q$$$$","0fAp$$$$","0IBo$$$$","00Cncccc","0qDm$$$$","0CEl$$$$","0XFk$$$$","0NGj$$$$","08Hi$$$$","0tIh$$$$","0OJg$$$$","05Kf$$$$","0bLe$$$$","0ePa$$$$","0SQZ$$$$","0cRY$$$$","0sSX$$$$","0XTW$$$$","04UV$$$$","0QVU$$$$","0rWT$$$$","0VXS$$$$","0PYR$$$$","0OZQ$$$$","0HaP$$$$","0kbO$$$$","0kcN$$$$","0IdM$$$$","0oeL$$$$","0CfK$$$$","0AgJ$$$$","0AhI%%%%","0yiH%%%%","0jjG%%%%","0JkF%%%%","0?lE%%%%","0?lE$$$$","0PnC$$$$","0hoB$$$$","0qpA$$$$","0iq9$$$$","0dr8$$$$","0Ms7$$$$","0Nt6$$$$","02u5$$$$","05v4$$$$","0sw3$$$$","0yx2$$$$","2K//O1pY","3J//0lqF","4H//K0eE","5A//dU0L","6l//E9H1","74//0CUT","89//EsUj","9A//K0W5","AU//hsV0","BH//1lSP","Cf//p0MW","D6//KW1m","Ea//1e8Z","FF//1koc","GI//H9E8","Hz//0qiI","IP//q03R","IP//q03R","Kh//fZ1G","LB//IoDi","Ma//X71X","N4//DmTk","OC//cANq","PP//1dho","Q2//Jb81","Rf//Sd1i","Sw//91Ji","Tc//hA1N","Uq//pK30","V5//l1kb","Wq//JF4M","Xt//P8KJ","Yc//sdZ0","Z6//0FHC","ak//0ep0","bb//u80I","cK//15Q3","dr//pea1","e9//LVcl","f5//0hTI","gH//i9Gx","hD//CqU1","iA//560e","jv//0Lg5","k5//Cq1U","lm//K1Jl","mZ//Tjk1","nt//1F2o","o9//ipZm","ph//pojb","qV//HM1j","r4//EY90","ALCHEMY ITEM - ITEMKIND","ALCHEMY ITEM - GRIST","ALCHEMY ITEM - ACTION","ALCHEMY ITEM - RARE ACTION","ALCHEMY ITEM - TRAIT","ALCHEMY ITEM - RARE TRAIT","RANDOM WEAPON","RANDOM ARMOR","STRIFE CARD","STRIFE SPECIBUS","BOONDOLLARS","RAINBOW GRIST"];

const nameList = ["CLOTHES","LAPTOP","LOCKBOX","BREAD","GUSHERS","STEAK","CANDLE","ICE","BATTERY","PIN","DOORSTOPPER","JPEG","RIBBON","OUIJA BOARD","CAT","DOG","SHATTERED GLASS","PILLOW","SUITCASE","SPRING","GLUE","BRICK","VAMPIRE TEETH","FROG","HARLEQUIN","CRYSTAL BALL","SMUPPET","MICROSCOPE","DUMBBELL","FEATHER","PROSPIT FLAG","DERSE FLAG","YOGA MAT","ROSE","FIREWORK","POKER CHIP","URANIUM ROD","PIPE","WHOOPIE CUSHION","DIAMOND","INK","TABLESTUCK GUIDE","CUEBALL","LOLLIPOP","FAN","PLANT","COIN","CLOCK","LOCKET","HORN","HEIRLOOM","ERASER","YARD STICK","BRAIN","RELIGIOUS SYMBOL","SKULL","HAMMER","KNITTING NEEDLES","KATANA","RIFLE","FORK","GLOVE","PUPPET","PISTOL","LANCE","THROWING STAR","SICKLE","CLAWS","CHAINSAW","CANE","DICE","BOW","BASEBALL BAT","WAND","SPEAR","STUFFED BUNNY","MAGAZINE","FANCY SANTA","UMBRELLA","BROOM","FLASHLIGHT","SAW","WRENCH","SCREWDRIVER","PLIERS","NAIL","CROWBAR","BOOK","YOYO","STAPLER","SHOTGUN","PENCIL","PAINT BRUSH","SCYTHE","SCISSORS","KNIFE","SHOVEL","ROPE","AXE","DART","CHAIN","BASKETBALL","ROCK","HOCKEY STICK","TRIDENT","RAZOR","PAPER FAN","PLAYING CARDS","ALCHEMY ITEM - ITEMKIND","ALCHEMY ITEM - GRIST","ALCHEMY ITEM - ACTION","ALCHEMY ITEM - RARE ACTION","ALCHEMY ITEM - TRAIT","ALCHEMY ITEM - RARE TRAIT","RANDOM WEAPON","RANDOM ARMOR","STRIFE CARD","STRIFE SPECIBUS","BOONDOLLARS","RAINBOW GRIST"];

const tables = {
  bedroom:[2,6,8,9,10,11,12,13,14,15,17,22,23,24,25,27,28,29,32,58,65,67,71,72,73,75,88,92,103],
  study:[2,8,9,10,11,12,13,16,17,18,20,22,25,26,27,29,37,56,57,59,63,74,85,87,91,107],
  living:[1,6,8,11,14,15,17,18,23,24,26,27,28,32,38,61,69,70,78,80,99,106],
  kitchen:[1,9,10,11,13,16,18,19,20,21,33,60,79,93,94,95,97,100],
  bathroom:[1,2,6,11,12,19,20,21,22,24,25,26,33,62,76,77,105],
  yard:[11,14,15,16,19,21,23,28,29,32,33,64,66,68,81,82,83,84,86,89,90,96,98,101,102,104],
  shed:[1,2,6,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,32,33,34,35,36,37,38,39,40,41,42,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107],
  weapon:[56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107],
  artifact:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55],
  simpleloot:[108,109,110,112,114,115,116,117,118,119],
  allloot:[108,109,110,111,112,113,114,115,116,117,118,119],
  rareloot:[111,113,114,115,116,117,118,119]
}
const randomChar = {
  allRandom: ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
  allWeapons: ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","x"],
  allTrinkets:["t","u","v"],
  simpleActions:["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q"],
  simpleTraits1: ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","y","z"],
  simpleTraits2: ["z","y","x","w","v","u","t","s","r","q","p","o","n","m","l","k","j","i","h","g","f","e","d","c","b","a","Z","Y","X","W","V","U","T","S","R","Q","P","O","1","0"],
  allTraits1: ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","y","z","c","d","e","f","g","h","i","j","k","l"],
  allTraits2: ["z","y","x","w","v","u","t","s","r","q","p","o","n","m","l","k","j","i","h","g","f","e","d","c","b","a","Z","Y","X","W","V","U","T","S","R","Q","P","O","1","0","N","M","L","K","J","I","H","G","F","E"],
  rareActions:["r","s","t","u","v","w","x","y","z"],
  rareTraits1:["c","d","e","f","g","h","i","j","k","l"],
  rareTraits2:["N","M","L","K","J","I","H","G","F","E"],
  aspectTraits1:["m","n","o","p","q","r","s","t","u","v","w","x"],
  aspectTraits2:["D","C","B","A","9","8","7","6","5","4","3","2"],
  gristRef:["2","3","4","5","6","7","8","9","A","B","C","D"],
  gristNameRef:["uranium","amethyst","garnet","iron","marble","chalk","shale","cobalt","ruby","caulk","tar","amber"]

}

exports.itemGen = function(table,gristList) {

  let select = tables[table][Math.floor(Math.random()*tables[table].length)];

  let defCode = codeList[select];
  let code = ``;
  for(let i=0;i<defCode.length;i++){
    if(defCode.charAt(i)=="$"){
      switch(i){
        case 0:
        code += `${randomChar.allWeapons[Math.floor(Math.random()*randomChar.allWeapons.length)]}`
        break;
        case 1:
        code += `${randomChar.allRandom[Math.floor(Math.random()*randomChar.allRandom.length)]}`
        break;
        case 2:
        code += `${randomChar.simpleTraits1[Math.floor(Math.random()*randomChar.simpleTraits1.length)]}`
        break;
        case 3:
        code += `${randomChar.simpleTraits2[Math.floor(Math.random()*randomChar.simpleTraits2.length)]}`
        break;
        default:
        code += `${randomChar.simpleActions[Math.floor(Math.random()*randomChar.simpleActions.length)]}`
        break;
      }
    }else if(defCode.charAt(i)=="%"){

      switch(i){
        case 2:
        code += `${randomChar.allTraits1[Math.floor(Math.random()*randomChar.allTraits1.length)]}`
        break;
        case 3:
        code += `${randomChar.allTraits2[Math.floor(Math.random()*randomChar.allTraits2.length)]}`
        break;
        default:
          code+=`${randomChar.allRandom[Math.floor(Math.random()*randomChar.allRandom.length)]}`;
        break;
      }
    }else if(i==1&&code.charAt(0)!="0"&&code.charAt(0)!="/"){
      code += `${randomChar.gristRef[randomChar.gristNameRef.indexOf(gristList[Math.floor(Math.random()*4)])]}`

    }else{
      code+=`${defCode.charAt(i)}`
    }
  }

return [nameList[select],code,1,1,[]];

}

exports.lootGen = function(client,level){
 
  tierVary = [1,3,6,9,12];
  quantityMin = [5,25,125,625,3125];
  quantityMax = [10,50,250,1250,6250];

let loot = (level>2?tables.allloot:tables.simpleloot);

if(level==4){
  loot=tables.rareloot;
}

let name = nameList[loot[Math.floor(Math.random()*loot.length)]];

let quantity = 1;
let tier = 1;

let code="";
let actpos;
switch(name){
  case "ALCHEMY ITEM - ITEMKIND":
  roll = randomChar.allRandom[Math.floor(Math.random()*randomChar.allRandom.length)]

  name = `ALCHEMY ITEM - ${client.kind[client.codeCypher[0][client.captchaCode.indexOf(roll)]]}`

  code = `${roll}///////`;
  break;
  case "ALCHEMY ITEM - GRIST":

  roll = randomChar.allRandom[Math.floor(Math.random()*randomChar.allRandom.length)];

  code = `/${roll}//////`;

  name = `ALCHEMY ITEM - ${client.gristTypes[client.codeCypher[1][client.captchaCode.indexOf(roll)]]}`
  break;
  case "ALCHEMY ITEM - ACTION":
  actpos=Math.floor(Math.random()*4)+4;
  roll = randomChar.simpleActions[Math.floor(Math.random()*randomChar.simpleActions.length)]
  for(let i=0;i<8;i++){
    (i!=actpos?code+="/":code += roll);
  }

  name = `ALCHEMY ITEM - ${client.action[client.weaponkinds["hammerkind"].t][client.codeCypher[4][client.captchaCode.indexOf(roll)]]}`
  break;
  case "ALCHEMY ITEM - RARE ACTION":

  roll = randomChar.rareActions[Math.floor(Math.random()*randomChar.rareActions.length)];

  actpos=Math.floor(Math.random()*4)+4;
  for(let i=0;i<8;i++){
    (i!=actpos?code+="/":code += roll);
  }

  name = `ALCHEMY ITEM - ${client.action[client.weaponkinds["hammerkind"].t][client.codeCypher[4][client.captchaCode.indexOf(roll)]]}`

  break;
  case "ALCHEMY ITEM - TRAIT":

    roll1 = randomChar.simpleTraits1[Math.floor(Math.random()*randomChar.simpleTraits1.length)];
    roll2 = randomChar.simpleTraits2[Math.floor(Math.random()*randomChar.simpleTraits2.length)];

    code+="//";
    if(Math.floor(Math.random()*2)==0){
      code+=roll1
      code+="/";

      name = `ALCHEMY ITEM - ${client.traitList[client.captchaCode.indexOf(roll1)]}`

    }else{
      code+="/";
      code+=roll2

      name = `ALCHEMY ITEM - ${client.traitList2[client.captchaCode.indexOf(roll2)]}`
    }
    code+="////"
  break;
  case "ALCHEMY ITEM - RARE TRAIT":

  roll1 = randomChar.rareTraits1[Math.floor(Math.random()*randomChar.rareTraits1.length)];
  roll2 = randomChar.rareTraits2[Math.floor(Math.random()*randomChar.rareTraits2.length)];

    code+="//";
    if(Math.floor(Math.random()*2)==0){
      code+=roll1
      code+="/";
      name = `ALCHEMY ITEM - ${client.traitList[client.captchaCode.indexOf(roll1)]}`
    }else{
      code+="/";
      code+=roll2
      name = `ALCHEMY ITEM - ${client.traitList2[client.captchaCode.indexOf(roll2)]}`
    }
    code+="////"
  break;
  case "RANDOM WEAPON":

    for(let i=0;i<8;i++){
      switch(i){
        case 0:
        code += `${randomChar.allWeapons[Math.floor(Math.random()*randomChar.allWeapons.length)]}`
        break;
        case 1:
        code += `${randomChar.allRandom[Math.floor(Math.random()*randomChar.allRandom.length)]}`
        break;
        case 2:
        code += `${randomChar.simpleTraits1[Math.floor(Math.random()*randomChar.simpleTraits1.length)]}`
        break;
        case 3:
        code += `${randomChar.simpleTraits2[Math.floor(Math.random()*randomChar.simpleTraits2.length)]}`
        break;
        default:
        code += `${randomChar.simpleActions[Math.floor(Math.random()*randomChar.simpleActions.length)]}`
        break;
      }
    }

    tier = tierVary[level];

  break;
  case "RANDOM ARMOR":

  code+="s";
  for(let i=1;i<8;i++){
    switch(i){
      case 1:
      code += `${randomChar.allRandom[Math.floor(Math.random()*randomChar.allRandom.length)]}`
      break;
      case 2:
      code += `${randomChar.simpleTraits1[Math.floor(Math.random()*randomChar.simpleTraits1.length)]}`
      break;
      case 3:
      code += `${randomChar.simpleTraits2[Math.floor(Math.random()*randomChar.simpleTraits2.length)]}`
      break;
      default:
      code += `${randomChar.simpleActions[Math.floor(Math.random()*randomChar.simpleActions.length)]}`
      break;
    }
  }
  tier = tierVary[level];
  break;
  case "STRIFE CARD":

  code="////////"
  quantity = level+1;

  break;
  case "STRIFE SPECIBUS":

  code="////////"
  quantity = Math.ceil(level+1/2);

  break;
  case "BOONDOLLARS":

  code="////////"

  quantity = Math.ceil(Math.random()*(quantityMax[level]-quantityMin[level]))+quantityMin[level];

  break;
  case "RAINBOW GRIST":

  code="////////"

  quantity = Math.ceil(Math.random()*(quantityMax[level]-quantityMin[level]))+quantityMin[level];

  break;

}

  return [name,code,tier,quantity,[]];

}

exports.lootA = function(client,section){

  return ["BOSS CHEST","y!3IXhgi",1,1,[client.lootcall.lootGen(client,section+1),client.lootcall.lootGen(client,section+1),client.lootcall.lootGen(client,section+1)]];

}

exports.lootB = function(client,section){
  return ["CHEST","y03wX2Ze",1,1,[client.lootcall.lootGen(client,section),client.lootcall.lootGen(client,section)]];
}
/*
exports.lootA = function(client, section, loot) {
  let lootTable;
  let ranKind = client.captchaCode[Math.floor(Math.random()*52)+4]
  let ranGrist = Math.floor(Math.random()*12);
  let ranTrait =  Math.floor(Math.random()*18);
  let ranAction = Math.floor(Math.random()*20);
  if(section==0){
    lootTable =[
    ["RANDOM ARMOR",`s${funcall.ranChar(client,7)}`,4,1,[]],
    ["STRIFE SPECIBUS","////////",1,1,[]],
    ["PRIMARY GRIST","////////",1,40,[]],
    ["DUNGEON CANDY",`00J${funcall.ranChar(client,5)}`,4,1,[]],
    [alcGristName[ranGrist],alcGristCode[ranGrist],1,1,[]],
    ["BOONDOLLARS","////////",1,800,[]],
    ["BOONDOLLARS","////////",1,400,[]],
    ["BOONDOLLARS","////////",1,200,[]],
    ["BOONDOLLARS","////////",1,400,[]],
    ["BOONDOLLARS","////////",1,800,[]],
    [alcGristName[ranGrist],alcGristCode[ranGrist],1,1,[]],
    ["DUNGEON MEAT",`00K${funcall.ranChar(client,5)}`,4,1,[]],
    ["PRIMARY GRIST","////////",1,40,[]],
    ["STRIFE SPECIBUS","////////",1,1,[]],
    ["RANDOM WEAPON",`${ranKind}${funcall.ranChar(client,7)}`,4,1,[]]
  ]
  //4 from bottom 8 from top
  }
  else if(section==1){
    lootTable =[
    ["RANDOM ARMOR",`s${funcall.ranChar(client,7)}`,8,1,[]],
    ["STRIFE SPECIBUS","////////",1,1,[]],
    ["PRIMARY GRIST","////////",1,200,[]],
    ["DUNGEON CANDY",`00J${funcall.ranChar(client,5)}`,8,1,[]],
    [alcTraitName[ranTrait],alcTraitCode[ranTrait],1,1,[]],
    ["BOONDOLLARS","////////",1,1600,[]],
    ["BOONDOLLARS","////////",1,800,[]],
    ["BOONDOLLARS","////////",1,400,[]],
    ["BOONDOLLARS","////////",1,800,[]],
    ["BOONDOLLARS","////////",1,1600,[]],
    [alcTraitName[ranTrait],alcTraitCode[ranTrait],1,1,[]],
    ["DUNGEON MEAT",`00K${funcall.ranChar(client,5)}`,8,1,[]],
    ["PRIMARY GRIST","////////",1,200,[]],
    ["STRIFE SPECIBUS","////////",1,1,[]],
    ["RANDOM WEAPON",`${ranKind}${funcall.ranChar(client,7)}`,8,1,[]]
  ]
  }
  else if(section==2){
    lootTable =[
    ["RANDOM ARMOR",`s${funcall.ranChar(client,7)}`,12,1,[]],
    ["STRIFE SPECIBUS","////////",1,2,[]],
    ["PRIMARY GRIST","////////",1,1000,[]],
    ["DUNGEON CANDY",`00J${funcall.ranChar(client,5)}`,12,1,[]],
    [alcActionName[ranAction],alcActionCode[Math.floor(Math.random()*4)][ranAction],1,1,[]],
    ["BOONDOLLARS","////////",1,2400,[]],
    ["BOONDOLLARS","////////",1,1200,[]],
    ["BOONDOLLARS","////////",1,600,[]],
    ["BOONDOLLARS","////////",1,1200,[]],
    ["BOONDOLLARS","////////",1,2400,[]],
    [alcActionName[ranAction],alcActionCode[Math.floor(Math.random()*4)][ranAction],1,1,[]],
    ["DUNGEON MEAT",`00K${funcall.ranChar(client,5)}`,12,1,[]],
    ["PRIMARY GRIST","////////",1,1000,[]],
    ["STRIFE SPECIBUS","////////",1,2,[]],
    ["RANDOM WEAPON",`${ranKind}${funcall.ranChar(client,7)}`,12,1,[]]
  ]
  }
  else if(section==3){
    lootTable =[
    ["RANDOM ARMOR",`s${funcall.ranChar(client,7)}`,16,1,[]],
    ["STRIFE SPECIBUS","////////",1,2,[]],
    ["PRIMARY GRIST","////////",1,5000,[]],
    ["DUNGEON CANDY",`00J${funcall.ranChar(client,5)}`,16,1,[]],
    [alcActionName[ranAction],alcActionCode[Math.floor(Math.random()*4)][ranAction],1,1,[]],
    ["BOONDOLLARS","////////",1,3200,[]],
    ["BOONDOLLARS","////////",1,1600,[]],
    ["BOONDOLLARS","////////",1,800,[]],
    ["BOONDOLLARS","////////",1,1600,[]],
    ["BOONDOLLARS","////////",1,3200,[]],
    [alcActionName[ranAction],alcActionCode[Math.floor(Math.random()*4)][ranAction],1,1,[]],
    ["DUNGEON MEAT",`00K${funcall.ranChar(client,5)}`,16,1,[]],
    ["PRIMARY GRIST","////////",1,5000,[]],
    ["STRIFE SPECIBUS","////////",1,2,[]],
    ["RANDOM WEAPON",`${ranKind}${funcall.ranChar(client,7)}`,16,1,[]]
  ]
  }
  return lootTable[loot];
}

exports.lootB = function(client, section, loot) {
  let lootTable;
  let ranKind = client.captchaCode[Math.floor(Math.random()*52)+4]
  let ranGrist = Math.floor(Math.random()*12);
  let ranTrait =  Math.floor(Math.random()*18);
  let ranAction = Math.floor(Math.random()*20);
  if(section==0){
    lootTable =[
    ["RANDOM ARMOR",`s${funcall.ranChar(client,7)}`,3,1,[]],
    [alcGristName[ranGrist],alcGristCode[ranGrist],1,1,[]],
    ["DUNGEON CANDY",`00J${funcall.ranChar(client,5)}`,4,1,[]],
    ["PRIMARY GRIST","////////",1,20,[]],
    ["STRIFE CARD","////////",1,1,[]],
    ["BOONDOLLARS","////////",1,200,[]],
    ["BOONDOLLARS","////////",1,100,[]],
    ["BOONDOLLARS","////////",1,50,[]],
    ["BOONDOLLARS","////////",1,100,[]],
    ["BOONDOLLARS","////////",1,200,[]],
    ["STRIFE CARD","////////",1,1,[]],
    ["PRIMARY GRIST","////////",1,20,[]],
    ["DUNGEON MEAT",`00K${funcall.ranChar(client,5)}`,4,1,[]],
    [alcGristName[ranGrist],alcGristCode[ranGrist],1,1,[]],
    ["RANDOM WEAPON",`${ranKind}${funcall.ranChar(client,7)}`,3,1,[]]
  ]
  //4 from bottom 8 from top
  }
  else if(section==1){
    lootTable =[
      ["RANDOM ARMOR",`s${funcall.ranChar(client,7)}`,6,1,[]],
      [alcTraitName[ranTrait],alcTraitCode[ranTrait],1,1,[]],
      ["DUNGEON CANDY",`00J${funcall.ranChar(client,5)}`,8,1,[]],
      ["PRIMARY GRIST","////////",1,100,[]],
      ["STRIFE CARD","////////",1,2,[]],
      ["BOONDOLLARS","////////",1,400,[]],
      ["BOONDOLLARS","////////",1,200,[]],
      ["BOONDOLLARS","////////",1,100,[]],
      ["BOONDOLLARS","////////",1,200,[]],
      ["BOONDOLLARS","////////",1,400,[]],
      ["STRIFE CARD","////////",1,2,[]],
      ["PRIMARY GRIST","////////",1,100,[]],
      ["DUNGEON MEAT",`00K${funcall.ranChar(client,5)}`,8,1,[]],
      [alcTraitName[ranTrait],alcTraitCode[ranTrait],1,1,[]],
      ["RANDOM WEAPON",`${ranKind}${funcall.ranChar(client,7)}`,6,1,[]]
  ]
  }
  else if(section==2){
    lootTable =[
      ["RANDOM ARMOR",`s${funcall.ranChar(client,7)}`,9,1,[]],
      [alcActionName[ranAction],alcActionCode[Math.floor(Math.random()*4)][ranAction],1,1,[]],
      ["DUNGEON CANDY",`00J${funcall.ranChar(client,5)}`,12,1,[]],
      ["PRIMARY GRIST","////////",1,500,[]],
      ["STRIFE CARD","////////",1,3,[]],
      ["BOONDOLLARS","////////",1,600,[]],
      ["BOONDOLLARS","////////",1,300,[]],
      ["BOONDOLLARS","////////",1,150,[]],
      ["BOONDOLLARS","////////",1,300,[]],
      ["BOONDOLLARS","////////",1,600,[]],
      ["STRIFE CARD","////////",1,3,[]],
      ["PRIMARY GRIST","////////",1,500,[]],
      ["DUNGEON MEAT",`00K${funcall.ranChar(client,5)}`,12,1,[]],
      [alcActionName[ranAction],alcActionCode[Math.floor(Math.random()*4)][ranAction],1,1,[]],
      ["RANDOM WEAPON",`${ranKind}${funcall.ranChar(client,7)}`,9,1,[]]
  ]
  }
  else if(section==3){
    lootTable =[
      ["RANDOM ARMOR",`s${funcall.ranChar(client,7)}`,12,1,[]],
      [alcActionName[ranAction],alcActionCode[Math.floor(Math.random()*4)][ranAction],1,1,[]],
      ["DUNGEON CANDY",`00J${funcall.ranChar(client,5)}`,16,1,[]],
      ["PRIMARY GRIST","////////",1,2500,[]],
      ["STRIFE CARD","////////",1,4,[]],
      ["BOONDOLLARS","////////",1,800,[]],
      ["BOONDOLLARS","////////",1,400,[]],
      ["BOONDOLLARS","////////",1,200,[]],
      ["BOONDOLLARS","////////",1,400,[]],
      ["BOONDOLLARS","////////",1,800,[]],
      ["STRIFE CARD","////////",1,4,[]],
      ["PRIMARY GRIST","////////",1,2500,[]],
      ["DUNGEON MEAT",`00K${funcall.ranChar(client,5)}`,16,1,[]],
      [alcActionName[ranAction],alcActionCode[Math.floor(Math.random()*4)][ranAction],1,1,[]],
      ["RANDOM WEAPON",`${ranKind}${funcall.ranChar(client,7)}`,12,1,[]]
  ]
  }
  return lootTable[loot];
}

exports.lootC = function(client, section, loot) {
  let lootTable;
  let ranKind = client.captchaCode[Math.floor(Math.random()*52)+4]
  let ranGrist = Math.floor(Math.random()*12);
  let ranTrait =  Math.floor(Math.random()*18);
  if(section==0){
    lootTable =[
    [alcGristName[ranGrist],alcGristCode[ranGrist],1,1,[]],
    ["STRIFE CARD","////////",1,1,[]],
    ["PRIMARY GRIST","////////",1,10,[]],
    ["BOONDOLLARS","////////",1,100,[]],
    ["BOONDOLLARS","////////",1,80,[]],
    ["BOONDOLLARS","////////",1,60,[]],
    ["BOONDOLLARS","////////",1,40,[]],
    ["BOONDOLLARS","////////",1,20,[]],
    ["BOONDOLLARS","////////",1,40,[]],
    ["BOONDOLLARS","////////",1,60,[]],
    ["BOONDOLLARS","////////",1,80,[]],
    ["BOONDOLLARS","////////",1,100,[]],
    ["PRIMARY GRIST","////////",1,10,[]],
    ["STRIFE CARD","////////",1,1,[]],
    [alcGristName[ranGrist],alcGristCode[ranGrist],1,1,[]]
  ]
  //4 from bottom 8 from top
  }
  else if(section==1){
    lootTable =[
      [alcGristName[ranGrist],alcGristCode[ranGrist],1,1,[]],
      ["STRIFE CARD","////////",1,2,[]],
      ["PRIMARY GRIST","////////",1,50,[]],
      ["BOONDOLLARS","////////",1,200,[]],
      ["BOONDOLLARS","////////",1,160,[]],
      ["BOONDOLLARS","////////",1,120,[]],
      ["BOONDOLLARS","////////",1,80,[]],
      ["BOONDOLLARS","////////",1,40,[]],
      ["BOONDOLLARS","////////",1,80,[]],
      ["BOONDOLLARS","////////",1,120,[]],
      ["BOONDOLLARS","////////",1,160,[]],
      ["BOONDOLLARS","////////",1,200,[]],
      ["PRIMARY GRIST","////////",1,50,[]],
      ["STRIFE CARD","////////",1,2,[]],
      [alcGristName[ranGrist],alcGristCode[ranGrist],1,1,[]]
  ]
  }
  else if(section==2){
    lootTable =[
      [alcTraitName[ranTrait],alcTraitCode[ranTrait],1,1,[]],
      ["STRIFE CARD","////////",1,3,[]],
      ["PRIMARY GRIST","////////",1,250,[]],
      ["BOONDOLLARS","////////",1,300,[]],
      ["BOONDOLLARS","////////",1,240,[]],
      ["BOONDOLLARS","////////",1,180,[]],
      ["BOONDOLLARS","////////",1,120,[]],
      ["BOONDOLLARS","////////",1,60,[]],
      ["BOONDOLLARS","////////",1,120,[]],
      ["BOONDOLLARS","////////",1,180,[]],
      ["BOONDOLLARS","////////",1,240,[]],
      ["BOONDOLLARS","////////",1,300,[]],
      ["PRIMARY GRIST","////////",1,250,[]],
      ["STRIFE CARD","////////",1,3,[]],
      [alcTraitName[ranTrait],alcTraitCode[ranTrait],1,1,[]],
  ]
  }
  else if(section==3){
    lootTable =[
      [alcTraitName[ranTrait],alcTraitCode[ranTrait],1,1,[]],
      ["STRIFE CARD","////////",1,4,[]],
      ["PRIMARY GRIST","////////",1,1250,[]],
      ["BOONDOLLARS","////////",1,400,[]],
      ["BOONDOLLARS","////////",1,320,[]],
      ["BOONDOLLARS","////////",1,240,[]],
      ["BOONDOLLARS","////////",1,160,[]],
      ["BOONDOLLARS","////////",1,80,[]],
      ["BOONDOLLARS","////////",1,160,[]],
      ["BOONDOLLARS","////////",1,240,[]],
      ["BOONDOLLARS","////////",1,320,[]],
      ["BOONDOLLARS","////////",1,400,[]],
      ["PRIMARY GRIST","////////",1,1250,[]],
      ["STRIFE CARD","////////",1,4,[]],
      [alcTraitName[ranTrait],alcTraitCode[ranTrait],1,1,[]],
  ]
  }
  return lootTable[loot];
}
*/
