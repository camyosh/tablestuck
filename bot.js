//declare requirments

const Discord = require('discord.js');
const client = new Discord.Client();
const Enmap = require('enmap');
const fs = require('fs');
//const GoogleSpreadsheet = require('google-spreadsheet');

//declare json files

//const { promisify } = require('util');
const auth = require("../auth.json");
const grist =require("./grist.json")
//const creds =require("../client_secret.json");
const registry =require("./registry.json");
const actionList =require("./actions.json");

//declare enmaps

const playerMap = new Enmap({
  name: "playerData",
  dataDir:"../data"
});
const landMap= new Enmap({
  name: "landData",
  dataDir:"../data"
});

const strifeMap = new Enmap({
  name: "strifeData",
  dataDir:"../data"
})

//declare cooldowns

//no cooldowns yet

//declare client variables to carry across all commands
client.captchaCode = ["!","?","0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","/","#"],
client.codeCypher = [[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65],[0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12,0,0],[15,16,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,0],[15,16,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,0],[21,22,0,0,17,19,4,20,15,7,14,12,6,10,13,9,2,8,1,11,3,5,16,18,11,17,16,19,14,5,20,18,9,6,8,10,4,12,2,15,13,1,3,7,14,9,2,6,10,20,13,17,18,4,12,7,1,15,11,5,3,16,19,8,0,0],[21,22,0,0,10,15,18,13,9,20,16,7,8,12,1,2,11,5,6,4,3,14,19,17,9,3,17,6,18,2,5,8,19,11,13,20,1,14,10,16,7,12,15,4,19,16,20,6,9,7,17,3,4,15,2,1,5,13,10,14,8,11,18,12,0,0],[21,22,0,0,8,9,14,17,2,10,16,5,1,18,6,3,7,12,15,19,13,11,20,4,15,7,6,13,17,19,18,3,12,5,14,8,1,2,16,4,11,9,20,10,18,11,20,3,2,8,6,19,9,13,1,14,16,4,10,17,5,12,7,15,0,0],[21,22,0,0,10,18,20,8,17,15,4,14,9,16,5,2,1,7,6,3,11,12,13,19,10,5,14,11,12,1,2,3,9,4,18,7,19,13,8,6,16,20,15,17,17,18,10,6,15,12,7,14,8,11,13,5,3,16,4,20,1,2,9,19,0,0]];
client.kind = ["customkind 1","customkind 2","artifactkind","moduskind","hammerkind","needlekind","bladekind","riflekind","utensilkind","fistkind","puppetkind","pistolkind","lancekind","thrwstarkind","sicklekind","clawkind","chainsawkind","canekind","dicekind","bowkind","clubkind","wandkind","spearkind","bunnykind","paperkind","fncysntakind","umbrellakind","broomkind","flshlghtkind","sawkind","wrenchkind","scrwdrvrkind","plierkind","nailkind","crowbarkind","bookkind","yoyokind","staplerkind","shotgunkind","pencilkind","brushkind","scythekind","scissorkind","knifekind","shovelkind","cordkind","axekind","dartkind","chainkind","ballkind","rockkind","hckystckkind","Tridentkind","razorkind","fankind","cardkind","armorkind","shoekind","hatkind","glasseskind","picturekind","bustkind","furniturekind","vehiclekind","artifactkind","artifactkind"]
client.gristTypes = ["artifact","uranium","amethyst","garnet","iron","marble","chalk","shale","cobalt","ruby","caulk","tar","amber","diamond","zillium"]
client.trait1 = ["NONE","FOOD","CANDY","MEAT","BOUNCY","STICKY","HOT","COLD","ELECTRIC","IRRADIATED","SHARP","ROCKET","COMPUTER","LIGHT SOURCE","STORAGE","CUSTOM TRAIT 1","CUSTOM TRAIT 2"];
client.trait2 = ["NONE","LIGHT","GRIMDARK","COMPUTER","SENTIENT","MAGICAL","EXQUISITE","ROCKET","SPIRITUAL","SHITTY","TRICKSTER","SCIENTIFIC","STORAGE","HEAVY","LIGHT SOURCE","CUSTOM TRAIT 3","CUSTOM TRAIT 4"]
client.action = [["no action","aggregate","aggress","aggravate","asphixiate","aspire","ass","assail","assassinate","assault","assemble","assert","assess","asseverate","assign","assimilate","assist","assure","astonish","astound","astrict","no action","no action","no action"],
["no action","aggregate","aggress","aggravate","arbitrate","arborize","archive","ardor","arf","argufy","arise","arithmetize","armamentify","arraign","arrange","arrest","arrive","arrogate","arsenalize","articulate","artillerate","no action","no action","no acrtion"],
["no action","aggregate","aggress","aggravate","accede","accelerate","accessorize","acclaim","acclimate","accomplish","account","accumulate","accuse","acerbate","acknowledge","acquaint","acquire","actualize","actuate","acuere","acupressure","no action","no action","no action"],
["no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action"]]

client.xpReq = [0,1,2,3,4,5,6,7,8,9,10,12,14,16,18,20,22,24,26,28,30,34,38,42,46,50,54,58,62,66,70,78,86,94,102,110,118,126,134,142,150,166,182,198,214,230,246,262,278,294,310,342,374,406,438,470,502,534,566,598,630,694,758,822,886,950,1014,1078,1142,1206,1270,1398,1526,1654,1782,1910,2038,2166,2294,2422,2550,2806,3062,3318,3574,3830,4086,4342,4598,4854,5110,5622,6134,6646,7158,7670,8182,8694,9206,9718,10230];
client.gvGet = [0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,20,20,20,20,20,20,20,20,20,20]
client.cache = [20,22,24,26,28,30,32,34,36,38,40,44,48,52,56,60,64,68,72,76,80,88,96,104,112,120,128,136,144,152,160,176,192,208,224,240,256,272,288,304,320,352,384,416,448,480,512,544,576,608,640,704,768,832,896,960,1024,1088,1152,1216,1280,1408,1536,1664,1792,1920,2048,2176,2304,2432,2560,2816,3072,3328,3584,3840,4096,4352,4608,4864,5120,5632,6144,6656,7168,7680,8192,8704,9216,9728,10240,11264,12288,13312,14336,15360,16384,17408,18432,19456,20480];

client.auth = auth;
client.playerMap = playerMap;
client.landMap = landMap;
client.grist = grist;
//client.creds = creds;
client.Discord = Discord;
client.registry = registry;
client.actionList = actionList;
client.weaponkinds = require("./weaponkinds.json");
client.underlings = require("./underlings.json");
client.strifeMap = strifeMap;
//client.GoogleSpreadsheet = GoogleSpreadsheet;


//starting up the bot

client.on('ready', () =>{
  console.log("You have a feeling it's going to be a long day");
});

// Using the standard .then() promise method:


// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    // If the file is not a JS file, ignore it (thanks, Apple)
    if (!file.endsWith(".js")) return;
    // Load the event file itself
    const event = require(`./events/${file}`);
    // Get just the event name from the file name
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    // without going into too many details, this means each event will be called with the client argument,
    // followed by its "normal" arguments, like message, member, etc etc.
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    // Load the command file itself
    let props = require(`./commands/${file}`);
    // Get just the command name from the file name
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    // Here we simply store the whole thing in the command Enmap. We're not running it right now.
    client.commands.set(commandName, props);
  });
});

client.login(auth.token);
