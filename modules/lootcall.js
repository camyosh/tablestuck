
const funcall = require("./funcall.js");

const alcGristCode = ["/7//////","/m//////","/b////////","/K///////","/Y////////","/e//////","/o/////","/H//////","/3//////","/v//////","/g//////","/N//////"]
const alcGristName = ["ALCHEMY GRIST TYPE- CHALK","ALCHEMY GRIST TYPE- TAR","ALCHEMY GRIST TYPE- AMBER","ALCHEMY GRIST TYPE- SHALE","ALCHEMY GRIST TYPE- RUBY","ALCHEMY GRIST TYPE- GARNET","ALCHEMY GRIST TYPE- URANIUM","ALCHEMY GRIST TYPE- IRON","ALCHEMY GRIST TYPE- AMETHYST","ALCHEMY GRIST TYPE- COBALT","ALCHEMY GRIST TYPE- MARBLE","ALCHEMY GRIST TYPE- CAULK"]

const alcTraitCode = ["//Dd////","///F////","//Uk////","///7////","///L////","///B////","///h////","///X////","///A////","///Z////","//a/////","//7/////","//c/////","//f/////","//A/////","//9/////","//T/////","//g/////"]
const alcTraitName = ["ALCHEMY TRAIT- ROCKET","ALCHEMY TRAIT- HEAVY","ALCHEMY TRAIT- LIGHT SOURCE","ALCHEMY TRAIT- MAGICAL","ALCHEMY TRAIT- SENTIENT","ALCHEMY TRAIT- SHITTY","ALCHEMY TRAIT- SCIENTIFIC","ALCHEMY TRAIT- LIGHT","ALCHEMY TRAIT- SPIRITUAL","ALCHEMY TRAIT- COMPUTER","ALCHEMY TRAIT- BOUNCY","ALCHEMY TRAIT- STICKY","ALCHEMY TRAIT- HOT","ALCHEMY TRAIT- IRRADIATED","ALCHEMY TRAIT- ELECTRIC","ALCHEMY TRAIT- COLD","ALCHEMY TRAIT- COMPUTER","ALCHEMY TRAIT- SHARP"]

const alcActionCode = [["////X///","////U///","////z///","////f///","////j///","////R///","////Y///","////w///","////a///","////s///","////M///","////Z///","////c///","////Q///","////6///","////x///","////N///","////o///","////3///","////S///"],["/////a//","/////k//","/////w//","/////c//","/////j//","/////F//","/////o//","/////n//","/////q//","/////Y//","/////x//","/////B//","/////t//","/////J//","/////p//","/////8//","/////m//","/////Q//","/////g//","/////X//"],["//////u/","//////o/","//////2/","//////y/","//////C/","//////9/","//////t/","//////T/","//////6/","//////A/","//////c/","//////U/","//////P/","//////W/","//////G/","//////s/","//////Q/","//////S/","//////R/","//////e/"],["///////2","///////U","///////o","///////X","///////G","///////r","///////u","///////H","///////D","///////R","///////p","///////J","///////q","///////n","///////7","///////t","///////6","///////h","///////z","///////v"]]
const alcActionName = ["ALCHEMY ACTION- ASSEMBLE/ARISE/ACCOUNT","ALCHEMY ACTION- ASSAULT/ARGUFY/ACCOMPLISH","ALCHEMY ACTION- ASSASSINATE/ARF/ACCLIMATE","ALCHEMY ACTION- ASSAIL/ARDOR/ACCLAIM","ALCHEMY ACTION- ASS/ARCHIVE/ACCESSORIZE","ALCHEMY ACTION- ASPIRE/ARBORIZE/ACCELERATE","ALCHEMY ACTION- ASPHIXIATE/ARBITRATE/ACCEDE","ALCHEMY ACTION- AGGRAVATE","ALCHEMY ACTION- AGGRESS","ALCHEMY ACTION- AGGREGATE","ALCHEMY ACTION- ASSERT/ARITHMATIZE/ACCUMULATE","ALCHEMY ACTION- ASSES/ARMAMENTIFY/ACCUSE","ALCHEMY ACTION- ASSEVERATE/ARRAIGN/ACERBATE","ALCHEMY ACTION- ASSIGN/ARRANGE/ACKNOWLEDGE","ALCHEMY ACTION- ASSIMILATE/ARREST/ACQUAINT","ALCHEMY ACTION- ASSIST/ARRIVE/ACQUIRE","ALCHEMY ACTION- ASSURE/ARROGATE/ACTUALIZE","ALCHEMY ACTION- ASTONISH/ARSENALIZE/ACTUATE","ALCHEMY ACTION- ASTOUND/ARTICULATE/ACUERE","ALCHEMY ACTION- ASTRICT/ARTILLERATE/ACCUPRESSURE"]

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
