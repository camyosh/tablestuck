const funcall = require("../modules/funcall.js");
//const { GoogleSpreadsheet } = require('google-spreadsheet');
const landcall = require("../modules/landcall.js");
//Command usage: >register @target
//This command creates a character sheet in the player database as well as a new land in the location database

exports.run = (client, message, args) => {

  var gristTypes = ["build","uranium","amethyst","garnet","iron","marble","chalk","shale","cobalt","ruby","caulk","tar","amber"]

//checks to see if the command user is Cam, as we don't want anyone else registering players for the tournament

  if(!message.author.id == client.auth.admin) {
    message.channel.send("You don't have permission to do that!");
    return;
  }

//checks to see if the command user mentioned a target



  //declaring who the target to be registered is and their charid (The server id + the user id)
 let aspects = ["BREATH","LIFE","LIGHT","TIME","HEART","RAGE","BLOOD","DOOM","VOID","SPACE","MIND","HOPE"]
  let target = message.author;
  let charid = message.guild.id.concat(target.id);
  var occset = [true,charid];
  let preset;

  let randnum = Math.floor((Math.random() * 12));

  const armorsets = [  ["CLOTHES","sQWWm9Kn",1,1,[]],["CLOTHES","sdH21UGt",1,1,[]],["CLOTHES","s4WW1jKQ",1,1,[]],["CLOTHES","s5WWMEF3",1,1,[]],["CLOTHES","sI2WllDd",1,1,[]],["CLOTHES","shHHjXDH",1,1,[]],["CLOTHES","sKW2dTnZ",1,1,[]],["CLOTHES","sjHWZVxB",1,1,[]],["CLOTHES","sYWHt9oW",1,1,[]],["CLOTHES","slH2RSD8",1,1,[]],["CLOTHES","sOH2jCtu",1,1,[]],["CLOTHES","sDWH2ydM",1,1,[]]  ];

  const cade = [[[5,7,[
    [0,0,"BEDROOM",false,[occset],[["COMPUTER","yQiKRZH8",1,1,[]],["HANDGUN","9AHWYUuR",1,1,[]],["FLAT EARTH GLOBE","yI2f3aKN",1,1,[]],["CONSPIRACY BOARD","McWDSvSF",1,1,[]],["COFFEE","0mYWZ0hT",1,4,[]],["HOT PLATE","05c2bj6y",1,1,[]]]],
    [0,0,"LIVING ROOM",false,[],[["CRT TV","ycAQBint",1,1,[]],["ANTIQUE LAMP","yiUNVJPh",1,1,[]],["FANCY SANTA","N32bdOcn",1,1,[]],["COFFEE TABLE","yOHU3FhE",1,1,[]],["COUCH","yd2FVRHK",1,1,[]],["GLUE","0lbW2ypQ",1,1,[]],["CANDLE","0M8X8qz7",1,1,[]]]],
    [0,0,"FATHERS ROOM",false,[],[["HUNTING RIFLE","5RHHH320",1,1,[]],["BEN SHAPIRO BUST","xIMDkcDB",1,1,[]]]],
    [0,0,"STUDY",false,[],[["DESK","yLGjNwPf",1,1,[["CAPTCHALOGUE CARD","11111111",1,4,[]]]],["NEWSPAPER","XhHHoMUg",1,1,[]],["BOOK","XGW2rZ2j",1,1,[]],["DECK OF CARDS","rdW2VmtN",1,1,[]],["READING GLASSES","vSWWcavE",1,1,[]],["BOWLER HAT","uNWWBSDV",1,1,[]],["INK JAR","0yWYiwUY",1,1,[]],["OLD COMPUTER","yeiQxD2s",1,1,[]],["SCISSORS","ergWpjDh",1,1,[]]]],
    [0,0,"KITCHEN",false,[],[["FRIDGE","y9dUU1qy",1,1,[["FRUIT GUSHERS","08YWJ3ZR",1,2,[]],["STEAK","0kZjzFvm",1,2,[]],["SALAD","0DI3Mt9D",1,2,[]],["ROCKET POP","0hYdl7RH",1,2,[]],["ICE CUBE","0JdWv89f",1,4,[]]]],["TOASTER","0reHWNK3",1,1,[]],["OVEN","yAcFDFTD",1,1,[]],["FORK","6XWH1aeL",1,1,[]],["STEAK KNIFE","frCHRunB",1,1,[]]]],
    [0,0,"BATHROOM",false,[],[["TOOTHPASTE","0UbH2NUT",1,1,[]],["TOOTHBRUSH","cg23mfhd",1,1,[]],["TOILET PAPER","MhWIw0tr",1,1,[]]]],
    [0,0,"YARD",false,[],[["MAILBOX","yHkIqlBC",1,1,[["SBURB CLIENT","////////",1,1,[]],["SBURB SERVER","////////",1,1,[]]]],["LAWN GNOME","xFWMZ5R0",1,1,[]]]],
    [0,0,"SHED",false,[],[["HAMMER","2Z2WCHwF",1,1,[]],["FIREWORKS","0wDdKKDf",1,1,[]],["CHAINSAW","Ef2W6ibV",1,1,[]],["SPRING","0rLW5L4P",1,1,[]],["POWER COORD","hQAWLcfb",1,1,[]],["SHOES","tCWH7NQ8",1,1,[]]]]
  ]]]];

  const edo = [[[5,7,[
    [0,0,"BEDROOM",false,[occset],[["COMPUTER","yQiKRZH8",1,1,[]],["KNITTING NEEDLES","34W2UD3d",1,1,[]],["MAGNIFYING GLASS","0BWDQcwe",1,1,[]],["CONSPIRACY BOARD","McWDSvSF",1,1,[]],["SHOVEL","gr2HgkaC",1,4,[]],["RPG DICE","GrHWOx7c",1,1,[]],["NOKIA 7600","0oiXldWZ",1,1,[]]]],
    [0,0,"LIVING ROOM",false,[],[["CRT TV","ycAQBint",1,1,[]],["FAIRY LIGHTS","hcAkFgLX",1,1,[]],["BEAN BAG CHAIR","yJ2ImeBT",1,1,[]],["COFFEE TABLE","yOHU3FhE",1,1,[]],["COUCH","yd2FVRHK",1,1,[]],["WII","0gTDxUf6",1,1,[]],["YOYO","YuWHpv1O",1,1,[]]]],
    [0,0,"SISTERS ROOM",false,[],[["BEDAZZLED FLIP PHONE","0oiXldWZ",1,1,[]],["HELLO KITTY LAMP","yKPkJiUy",1,1,[]]]],
    [0,0,"STUDY",false,[],[["DESK","yLGjNwPf",1,1,[["CAPTCHALOGUE CARD","11111111",1,4,[]]]],["STICKER COVERED LAPTOP","02iKkCLD",1,1,[]],["BOOK","XGW2rZ2j",1,1,[]],["BERRET","udW2o0Xd",1,1,[]],["PAPER","MhWXWrRp",1,1,[]],["SCARF","uNWWBSDV",1,1,[]],["PENCIL","bbWWcFi0",1,1,[]],["PAINTBRUSH","cBW2yXyW",1,1,[]]]],
    [0,0,"KITCHEN",false,[],[["FRIDGE","y9dUU1qy",1,1,[["FRUIT GUSHERS","08YWJ3ZR",1,2,[]],["STEAK","0kZjzFvm",1,2,[]],["SALAD","0DI3Mt9D",1,2,[]],["ROCKET POP","0hYdl7RH",1,2,[]],["ICE CUBE","0JdWv89f",1,4,[]]]],["TOASTER","0reHWNK3",1,1,[]],["OVEN","yAcFDFTD",1,1,[]],["FORK","6XWH1aeL",1,1,[]],["STEAK KNIFE","frCHRunB",1,1,[]]]],
    [0,0,"BATHROOM",false,[],[["TOOTHPASTE","0UbH2NUT",1,1,[]],["TOOTHBRUSH","cg23mfhd",1,1,[]],["TOILET PAPER","MhWIw0tr",1,1,[]]]],
    [0,0,"YARD",false,[],[["MAILBOX","yHkIqlBC",1,1,[["SBURB CLIENT","////////",1,1,[]],["SBURB SERVER","////////",1,1,[]]]],["LAWN GNOME","xFWMZ5R0",1,1,[]]]],
    [0,0,"SHED",false,[],[["HAMMER","2Z2WCHwF",1,1,[]],["FIREWORKS","0wDdKKDf",1,1,[]],["CHAINSAW","Ef2W6ibV",1,1,[]],["SPRING","0rLW5L4P",1,1,[]],["POWER COORD","hQAWLcfb",1,1,[]],["SHOES","tCWH7NQ8",1,1,[]]]]
  ]]]];

  const doc = [[[5,7,[
    [0,0,"BEDROOM",false,[occset],[["LAPTOP","02iKkCLD",1,1,[]],["FLIP PHONE","0oiXldWZ",1,1,[]],["TAROT CARDS","rsWM2biu",1,1,[]],["CRYSTALS","m42elGgN",1,1,[]],["OUIJA BOARD","0v2fHxfR",1,4,[]],["CRYSTAL BALL","ld2eEi1S",1,1,[]],["AHKMED THE DEAD TERRORIST","8mW4oY6k",1,1,[]]]],
    [0,0,"LIVING ROOM",false,[],[["CRT TV","ycAQBint",1,1,[]],["JEFF DUNHAM DVD BOX SET","0ZbBNctH",1,1,[]],["WALTER","8lHNlZjx",1,1,[]],["COFFEE TABLE","yOHU3FhE",1,1,[]],["COUCH","yd2FVRHK",1,1,[]],["YOYO","YuWHpv1O",1,1,[]]]],
    [0,0,"STUDY",false,[],[["DESK","yLGjNwPf",1,1,[["CAPTCHALOGUE CARD","11111111",1,4,[]]]],["BUBBA J","8JHQK8Jp",1,1,[]],["VENTRILOQUISM FOR DUMMIES","XGW2rZ2j",1,1,[]],["PEANUT","8RbESr01",1,1,[["SBURB CLIENT","////////",1,1,[]],["SBURB SERVER","////////",1,1,[]]]],["PAPER","MhWXWrRp",1,1,[]],["SWEET DADDY D","8C6f9IKA",1,1,[]],["PENCIL","bbWWcFi0",1,1,[]],["PAINTBRUSH","cBW2yXyW",1,1,[]]]],
    [0,0,"KITCHEN",false,[],[["FRIDGE","y9dUU1qy",1,1,[["FRUIT GUSHERS","08YWJ3ZR",1,2,[]],["STEAK","0kZjzFvm",1,2,[]],["SALAD","0DI3Mt9D",1,2,[]],["ROCKET POP","0hYdl7RH",1,2,[]],["ICE CUBE","0JdWv89f",1,4,[]]]],["TOASTER","0reHWNK3",1,1,[]],["OVEN","yAcFDFTD",1,1,[]],["FORK","6XWH1aeL",1,1,[]],["JOSE JALEPENO ON A STICK","8Dcf1A5y",1,1,[]],["STEAK KNIFE","frCHRunB",1,1,[]]]],
    [0,0,"BATHROOM",false,[],[["TOOTHPASTE","0UbH2NUT",1,1,[]],["TOOTHBRUSH","cg23mfhd",1,1,[]],["TOILET PAPER","MhWIw0tr",1,1,[]]]],
    [0,0,"YARD",false,[],[["MAILBOX","yHkIqlBC",1,1,[]],["LAWN GNOME","xFWMZ5R0",1,1,[]]]],
    [0,0,"SHED",false,[],[["HAMMER","2Z2WCHwF",1,1,[]],["FIREWORKS","0wDdKKDf",1,1,[]],["LITTLE UGLY JEFF","89WRF0YB",1,1,[]],["SPRING","0rLW5L4P",1,1,[]],["POWER COORD","hQAWLcfb",1,1,[]],["SHOES","tCWH7NQ8",1,1,[]]]]
  ]]]];

  const def = [[[5,7,[
    [0,0,"BEDROOM",false,[occset],[["COMPUTER","yQiKRZH8",1,1,[]],funcall.preItem(),funcall.preItem(),funcall.preItem(),funcall.preItem(),funcall.preItem(),funcall.preItem()]],
    [0,0,"LIVING ROOM",false,[],[funcall.preItem(),funcall.preItem(),funcall.preItem(),funcall.preItem(),funcall.preItem(),funcall.preItem(),funcall.preItem()]],
    [0,0,"STUDY",false,[],[["DESK","yLGjNwPf",1,1,[["CAPTCHALOGUE CARD","11111111",1,4,[]]]],funcall.preItem(),funcall.preItem(),funcall.preItem(),funcall.preItem(),funcall.preItem(),funcall.preItem(),funcall.preItem()]],
    [0,0,"KITCHEN",false,[],[["FRIDGE","y9dUU1qy",1,1,[["FRUIT GUSHERS","08YWJ3ZR",1,2,[]],["STEAK","0kZjzFvm",1,2,[]],["SALAD","0DI3Mt9D",1,2,[]],["ROCKET POP","0hYdl7RH",1,2,[]],["ICE CUBE","0JdWv89f",1,4,[]]]],funcall.preItem(),funcall.preItem(),funcall.preItem(),funcall.preItem()]],
    [0,0,"BATHROOM",false,[],[funcall.preItem(),funcall.preItem(),funcall.preItem()]],
    [0,0,"YARD",false,[],[["MAILBOX","yHkIqlBC",1,1,[["SBURB CLIENT","////////",1,1,[]],["SBURB SERVER","////////",1,1,[]]]],funcall.preItem()]],
    [0,0,"SHED",false,[],[funcall.preItem(),funcall.preItem(),funcall.preItem(),funcall.preItem(),funcall.preItem(),funcall.preItem()]]
  ]]]];

  if(args[0]=="cade"){
    preset = cade;
  } else if(args[0]=="edo"){
    preset = edo;
  } else if(args[0]=="doc"){
    preset = doc;
  } else {
    preset = def;
  };
/*
  async function regImport() {
    var doc = new GoogleSpreadsheet(args[0]);
    await doc.useServiceAccountAuth(client.creds);
    const info = await doc.loadInfo();
    var sheet = doc.sheetsByIndex[1];
    const list = ["L5","J7","W7","H10","S10","W16","W19","W22","W25","W28","W31"];

    await sheet.loadCells(list); // loads a range of cells

    importsheet = [sheet.getCellByA1(list[0]).value,sheet.getCellByA1(list[1]).value,sheet.getCellByA1(list[2]).value,sheet.getCellByA1(list[3]).value,sheet.getCellByA1(list[4]).value,sheet.getCellByA1(list[5]).value,sheet.getCellByA1(list[6]).value,sheet.getCellByA1(list[7]).value,sheet.getCellByA1(list[8]).value,sheet.getCellByA1(list[9]).value,sheet.getCellByA1(list[10]).value]


  console.log(importsheet);
    //declaring the basic character sheet

  var charSheet = {
    name: importsheet[0],
    ping: target.id,
    channel: message.channel.id,
    sheet: args[0],
    handle: `${importsheet[1]} ${importsheet[2]}`,
    class: importsheet[3],
    aspect: importsheet[4],
    act:0,
    strife:false,
    pos:0,
    server:"NA",
    client:"NA",
    alive:true,
    local:["h",0,0,0,charid],
    deploy:[false,false,false,false,false],
    xp: 0,
    rung: 0,
    b: 0,
    bank: 0,
    vit: 100,
    gel: 100,
    stats:[importsheet[5],importsheet[6],importsheet[7],importsheet[8],importsheet[9],importsheet[10]],
    grist:[20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    port: 1,
    kinds:[],
    spec:[],
    modus: "STACK",
    cards:4,
    scards:2,
    sdex:[],
    equip:0,
    armor:[armorsets[randnum]]
  };

client.playerMap.set(charid,charSheet)
}

regImport();
  //declaring the basic land sheet
*/
  //random item - funcall.preItem()

  var charSheet = {
    name: message.author.username,
    ping: message.author.id,
    channel: message.channel.id,
    act:0,
    strife:false,
    pos:0,
    server:"NA",
    client:"NA",
    alive:true,
    local:["h",0,0,0,charid],
    deploy:[false,false,false,false,false],
    xp: 0,
    rung: 0,
    b: 0,
    bank: 0,
    vit: 100,
    gel: 100,
    grist:[20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    port: 1,
    kinds:[],
    spec:[],
    modus: "STACK",
    cards:4,
    scards:2,
    sdex:[],
    equip:0,
    armor:[armorsets[randnum]]
  };

client.playerMap.set(charid,charSheet)

let gategen = [[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))],[Math.floor((Math.random() * 11)),Math.floor((Math.random() * 11))]]

var land = {
    name: ["Stumps","Dismay"],
    aspect: aspects[Math.floor((Math.random() * 11))],
    grist: [gristTypes.splice(Math.floor((Math.random() * 12)+1),1)[0],gristTypes.splice(Math.floor((Math.random() * 11)+1),1)[0],gristTypes.splice(Math.floor((Math.random() * 10)+1),1)[0],gristTypes.splice(Math.floor((Math.random() * 9)+1),1)[0]],
    enter:false,
    spent: 0,
    floors: 0,
    gate: 0,
    gates:gategen,
    h:preset,
    /*s1: funcall.landSecInit(client,0),
    s2: funcall.landSecInit(client,1),
    s3: funcall.landSecInit(client,2),
    s4: funcall.landSecInit(client,3)
    */
    s1:landcall.landGen(client,0,gategen[0]),
    s2:landcall.landGen(client,1,gategen[1]),
    s3:landcall.landGen(client,2,gategen[2]),
    s4:landcall.landGen(client,3,gategen[3])
}
//adds the charaacter sheet and land sheet to the database


client.landMap.set(charid,land)

message.channel.send(`${target} has been registered!`);
message.channel.send(`${message.author.username} stands in their bedroom. It just so happens that today, the 25th of July is the day of SAHCON! \n\nThank you for playing Tablestuck! For this game, you have been given completely randomized items throughout your house. If you are ever confused about how the bot functions or any of the commnands, use the >help command!\nIf at any point you die during this test, just use >register again to come back to life! This will reset your character, house and land entirely so only do this if you die or get softlocked!\n\nIf you're ever confused, feel free to use >help`);

}
