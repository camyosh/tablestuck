//declare requirments

const Discord = require('discord.js');
const client = new Discord.Client();
const Enmap = require('enmap');
const fs = require('fs');
const Canvas = require("canvas");
//const GoogleSpreadsheet = require('google-spreadsheet');

//declare json files

//const { promisify } = require('util');
const auth = require("../auth.json");
const grist =require("./grist.json")
//const creds =require("../client_secret.json");
const registry =require("./registry.json");
const actionList =require("./actions.json");



const traitcall =require("./modules/traitcall.js");
const hookcall =require("./modules/hookcall.js");
const funcall =require("./modules/funcall.js");
const strifecall =require("./modules/strifecall.js");
const landcall =require("./modules/landcall.js");
const imgcall =require("./modules/imgcall.js");
const lootcall =require("./modules/lootcall.js");

client.traitcall = traitcall;
client.strifecall = strifecall;
client.funcall = funcall;
client.hookcall = hookcall;
client.landcall = landcall;
client.imgcall = imgcall;
client.lootcall = lootcall;
//declare enmaps
if (!fs.existsSync("../data")){
  console.log("Data directory missing, please create it!")
}


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

const transMap = new Enmap({
  name: "transportalizerData",
  dataDir:"../data"
})

//declare cooldowns

//no cooldowns yet
/*const actionList = ["accede","accelerate","accessorize","acclaim","acclimate","accomplish","account","accumulate","accuse","acerbate","acknowledge","acquaint","acquire","actualize","actuate","activate","acupressure","arbitrate","arborize","archive","ardor","arf","argufy","arise","arithmetize","armamentify","arraign","arrange","arrest","arrive","arrogate","arsenalize","articulate","artillerate","asphixiate","aspire","ass","assail","assassinate","assault","assemble","assert","assess","asseverate","assign","assimilate","assist","assure","astonish","astound","astrict","arsonate","accomodate","abuse","abjure","abstain","absorb","abolish","abstract","abate"]*/
// 1 > a > A > 1
client.action=[["no action","no action","no action","no action","accede","accelerate","accessorize","acclaim","acclimate","accomplish","account","accumulate","accuse","acerbate","acknowledge","acquaint","acquire","actualize","actuate","activate","acupressure","arbitrate","arborize","archive","ardor","arf","argufy","arise","arithmetize","armamentify","arraign","arrange","arrest","arrive","arrogate","arsenalize","articulate","artillerate","asphixiate","aspire","ass","assail","assassinate","assault","assemble","assert","assess","asseverate","assign","assimilate","assist","assure","astonish","astound","astrict","arsonate","accomodate","abuse","abjure","abstain","absorb","abolish","abstract","abate"],["no action","no action","no action","no action","accede","accelerate","accessorize","acclaim","acclimate","accomplish","account","accumulate","accuse","acerbate","acknowledge","acquaint","acquire","actualize","actuate","activate","acupressure","arbitrate","arborize","archive","ardor","arf","argufy","arise","arithmetize","armamentify","arraign","arrange","arrest","arrive","arrogate","arsenalize","articulate","artillerate","asphixiate","aspire","ass","assail","assassinate","assault","assemble","assert","assess","asseverate","assign","assimilate","assist","assure","astonish","astound","astrict","arsonate","accomodate","abuse","abjure","abstain","absorb","abolish","abstract","abate"],["no action","no action","no action","no action","accede","accelerate","accessorize","acclaim","acclimate","accomplish","account","accumulate","accuse","acerbate","acknowledge","acquaint","acquire","actualize","actuate","activate","acupressure","arbitrate","arborize","archive","ardor","arf","argufy","arise","arithmetize","armamentify","arraign","arrange","arrest","arrive","arrogate","arsenalize","articulate","artillerate","asphixiate","aspire","ass","assail","assassinate","assault","assemble","assert","assess","asseverate","assign","assimilate","assist","assure","astonish","astound","astrict","arsonate","accomodate","abuse","abjure","abstain","absorb","abolish","abstract","abate"],["no action","no action","no action","no action","accede","accelerate","accessorize","acclaim","acclimate","accomplish","account","accumulate","accuse","acerbate","acknowledge","acquaint","acquire","actualize","actuate","activate","acupressure","arbitrate","arborize","archive","ardor","arf","argufy","arise","arithmetize","armamentify","arraign","arrange","arrest","arrive","arrogate","arsenalize","articulate","artillerate","asphixiate","aspire","ass","assail","assassinate","assault","assemble","assert","assess","asseverate","assign","assimilate","assist","assure","astonish","astound","astrict","arsonate","accomodate","abuse","abjure","abstain","absorb","abolish","abstract","abate"]]
//declare client variables to carry across all commands
client.captchaCode = ["!","?","0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","/","#","@"],
client.codeCypher =
[[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66],
[13,14,0,0,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12,15,15,15],
[15,16,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,0,0],
[15,16,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,0,0],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,0,0,0],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,0,0,0],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,0,0,0],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,0,0,0]];

client.kind = ["customkind 1","customkind 2","artifactkind","moduskind","hammerkind","needlekind","bladekind","riflekind","utensilkind","fistkind","puppetkind","pistolkind","lancekind","thrwstarkind","sicklekind","clawkind","chainsawkind","canekind","dicekind","bowkind","clubkind","wandkind","spearkind","bunnykind","paperkind","fncysntakind","umbrellakind","broomkind","flshlghtkind","sawkind","wrenchkind","scrwdrvrkind","plierkind","nailkind","crowbarkind","bookkind","yoyokind","staplerkind","shotgunkind","pencilkind","brushkind","scythekind","scissorkind","knifekind","shovelkind","cordkind","axekind","dartkind","chainkind","ballkind","rockkind","hckystckkind","Tridentkind","razorkind","fankind","cardkind","armorkind","shoekind","hatkind","glasseskind","picturekind","bustkind","furniturekind","vehiclekind","constructkind","totemkind","trnsprtlzrkind"]
client.gristTypes = ["artifact","uranium","amethyst","garnet","iron","marble","chalk","shale","cobalt","ruby","caulk","tar","amber","diamond","zillium","build","rainbow"]
client.traitList = ["CUSTOM TRAIT 1","CUSTOM TRAIT 2","NONE","NONE","COMPUTER","STORAGE","FOOD","CANDY","MEAT","HOT","COLD","ELECTRIC","SHARP","BLUNT","SHITTY","CUTE","SPOOKY","CAT","DOG","BROKEN","CUSHIONED","BUSINESS","BOUNCY","STICKY","MELEE","RANGED","MAGIC","REFINED","VAMPIRIC","FROG","HARLEQUIN","WIZARD","PLUSH","SCIENTIFIC","HEAVY","LIGHTWEIGHT","PROSPIT","DERSE","ENDURING","THORNS","ROCKET","GAMBLING","IRRADIATED","NOIR","CHARLATAN","EXQUISITE","GRIMDARK","META","WELSH", "TRICKSTER","BREATH","LIFE","LIGHT","TIME","HEART","RAGE","BLOOD","VOID","SPACE","MIND","HOPE","DOOM","NONE","NONE","NONE","NONE","NONE"];
client.traitList2 = ["CUSTOM TRAIT 1","CUSTOM TRAIT 2","NONE","NONE","DOOM","HOPE","MIND","SPACE","VOID","BLOOD","RAGE","HEART","TIME","LIGHT","LIFE","BREATH","TRICKSTER","WELSH","META","GRIMDARK","EXQUISITE","CHARLATAN","NOIR","IRRADIATED","GAMBLING","ROCKET","THORNS","ENDURING","DERSE","PROSPIT","LIGHTWEIGHT","HEAVY","SCIENTIFIC","PLUSH","WIZARD","HARLEQUIN","FROG","VAMPIRIC","REFINED","MAGIC","RANGED","MELEE","STICKY","BOUNCY","BUSINESS","CUSHIONED","BROKEN","DOG","CAT","SPOOKY","CUTE","SHITTY","BLUNT","SHARP","ELECTRIC","COLD","HOT","MEAT","CANDY","FOOD","STORAGE","COMPUTER","NONE","NONE","NONE","NONE","NONE"];

/*client.action = [["no action","aggregate","aggress","aggravate","asphixiate","aspire","ass","assail","assassinate","assault","assemble","assert","assess","asseverate","assign","assimilate","assist","assure","astonish","astound","astrict","no action","no action","no action"],
["no action","aggregate","aggress","aggravate","arbitrate","arborize","archive","ardor","arf","argufy","arise","arithmetize","armamentify","arraign","arrange","arrest","arrive","arrogate","arsenalize","articulate","artillerate","no action","no action","no acrtion"],
["no action","aggregate","aggress","aggravate","accede","accelerate","accessorize","acclaim","acclimate","accomplish","account","accumulate","accuse","acerbate","acknowledge","acquaint","acquire","actualize","actuate","acuere","acupressure","no action","no action","no action"],
["no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action","no action"]]
*/

client.xpReq = [0,1,2,3,4,5,6,7,8,9,10,12,14,16,18,20,22,24,26,28,30,34,38,42,46,50,54,58,62,66,70,78,86,94,102,110,118,126,134,142,150,166,182,198,214,230,246,262,278,294,310,342,374,406,438,470,502,534,566,598,630,694,758,822,886,950,1014,1078,1142,1206,1270,1398,1526,1654,1782,1910,2038,2166,2294,2422,2550,2806,3062,3318,3574,3830,4086,4342,4598,4854,5110,5622,6134,6646,7158,7670,8182,8694,9206,9718,10230];
client.gvGet = [0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,20,20,20,20,20,20,20,20,20,20]
client.cache = [20,22,24,26,28,30,32,34,36,38,40,44,48,52,56,60,64,68,72,76,80,88,96,104,112,120,128,136,144,152,160,176,192,208,224,240,256,272,288,304,320,352,384,416,448,480,512,544,576,608,640,704,768,832,896,960,1024,1088,1152,1216,1280,1408,1536,1664,1792,1920,2048,2176,2304,2432,2560,2816,3072,3328,3584,3840,4096,4352,4608,4864,5120,5632,6144,6656,7168,7680,8192,8704,9216,9728,10240,11264,12288,13312,14336,15360,16384,17408,18432,19456,20480];

client.auth = auth;
client.playerMap = playerMap;
client.landMap = landMap;
client.transMap = transMap;
client.grist = grist;
//client.creds = creds;
client.Discord = Discord;
client.registry = registry;
client.actionList = actionList;
client.weaponkinds = require("./weaponkinds.json");
client.underlings = require("./underlings.json");
client.traitDesc =require("./traits.json");
client.strifeMap = strifeMap;
client.map = require("./map.json");
client.limit = 0;
client.Canvas = Canvas;
client.resources = require("./resources.json");
//client.GoogleSpreadsheet = GoogleSpreadsheet;


//starting up the bot

client.on('ready', () =>{
  console.log("You have a feeling it's going to be a long day");
  client.user.setActivity("Tablestuck Development");
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
