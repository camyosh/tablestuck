//declare requirments

const { Client, Intents, MessageEmbed, MessageAttachment } = require('discord.js');
const intents = new Intents(32767);
const client = new Client({intents: intents});
const Enmap = require('enmap');
const fs = require('fs');
const Canvas = require("canvas");

//creates data folder and auth file if they don't exist.
if (!fs.existsSync("./data")){
  fs.mkdirSync("./data");
  console.log("New data directory was created.");
}
if (!fs.existsSync("./auth.json")){
  fs.copyFileSync("./auth-template.json","./auth.json");
  console.log("new auth file was copied from template.");
}
//declare json files
const auth = require("./auth.json"); //external data: bot token, bot prefix, tournament list
const grist =require("./grist.json"); //tracks grist types and their data.
const registry =require("./registry.json"); //initial deploy list
const actionList =require("./actions.json");//covers all actions and their data.

//gets all modules
const charcall =require("./modules/charcall.js");
const traitcall =require("./modules/traitcall.js");
const hookcall =require("./modules/hookcall.js");
const funcall =require("./modules/funcall.js");
const strifecall =require("./modules/strifecall.js");
const landcall =require("./modules/landcall.js");
const imgcall =require("./modules/imgcall.js");
const lootcall =require("./modules/lootcall.js");
const tutorcall =require("./modules/tutorcall.js");
const diocall =require("./modules/diocall.js");
const questcall =require("./modules/questcall.js");

//makes all modules passable through client
client.charcall = charcall;
client.traitcall = traitcall;
client.strifecall = strifecall;
client.funcall = funcall;
client.hookcall = hookcall;
client.landcall = landcall;
client.imgcall = imgcall;
client.lootcall = lootcall;
client.tutorcall = tutorcall;
client.diocall = diocall;
client.questcall = questcall;
client.fs = fs;

//declare enmaps
//tracks all player characters (waking selves, dream selves)
const playerMap = new Enmap({
  name: "playerData",
  dataDir:"./data"
});
//tracks user data, created when a player sends their first command.
const userMap = new Enmap({
  name: "userData",
  dataDir:"./data"
});
//tracks player data that stays consistant between characters.
const sburbMap = new Enmap({
  name: "sburbData",
  dataDir:"./data"
});
//tracks all land data and the medium for each session.
const landMap= new Enmap({
  name: "landData",
  dataDir:"./data"
});
//tracks all active strifes and their participants.
const strifeMap = new Enmap({
  name: "strifeData",
  dataDir:"./data"
});
//tracks all transportalizers and where they lead.
const transMap = new Enmap({
  name: "transportalizerData",
  dataDir:"./data"
});
//tracks each game's configurations.
const configMap = new Enmap({
  name: "configData",
  dataDir:"./data"
});
//tracks npc data
const npcMap = new Enmap({
  name: "npcData",
  dataDir:"./data"
});


// a > A > 1
//list of all aspects for use all over the place.
client.aspects = ["BREATH","LIFE","LIGHT","TIME","HEART","RAGE","BLOOD","VOID","SPACE","MIND","HOPE","DOOM"];
//action list for reference by alchemy.
client.action=["no action","no action","no action","no action","accede","accelerate","accessorize","acclaim","acclimate","accomplish","account","accumulate","accuse","acerbate","acknowledge","acquaint","acquire","actualize","actuate","activate","acupressure","arbitrate","arborize","archive","ardor","arf","argufy","arise","arithmetize","armamentify","arraign",
  "arrange","arrest","arrive","arrogate","arsenalize","articulate","artillerate","asphixiate","aspire","ass","assail","assassinate","assault","assemble","assert","assess","asseverate","assign","assimilate","assist","assure","astonish","astound","astrict","arsonate","accomodate","abuse","abjure","abstain","absorb","abolish","abstract","abate"]
//declare client variables to carry across all commands
client.captchaCode = ["!","?","0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","/","#","@"],
//the way the bot mixes up actual code input into references for grist, weapontype, actions, and traits.
client.codeCypher =
[[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66],
[13,14,0,0,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12,15,15,15],
[15,16,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,0,0],
[15,16,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,0,0],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,0,0,0],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,0,0,0],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,0,0,0],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,0,0,0]];

//references for the first 4 digits of a captcha code
client.kind = ["customkind 1","customkind 2","artifactkind","moduskind","hammerkind","needlekind","bladekind","riflekind","utensilkind","fistkind","puppetkind","pistolkind","lancekind","thrwstarkind","sicklekind","clawkind","chainsawkind","canekind","dicekind","bowkind","clubkind","wandkind","spearkind","bunnykind","paperkind","fncysntakind","umbrellakind","broomkind","flshlghtkind","sawkind","wrenchkind","scrwdrvrkind","plierkind","nailkind","crowbarkind","bookkind","yoyokind","staplerkind","shotgunkind","pencilkind","brushkind","scythekind","scissorkind","knifekind","shovelkind","cordkind","axekind","dartkind","chainkind","ballkind","rockkind","hckystckkind","Tridentkind","razorkind","fankind","cardkind","armorkind","shoekind","hatkind","glasseskind","picturekind","bustkind","furniturekind","vehiclekind","constructkind","totemkind","trnsprtlzrkind"]
client.gristTypes = ["artifact","uranium","amethyst","garnet","iron","marble","chalk","shale","cobalt","ruby","caulk","tar","amber","diamond","zillium","build","rainbow"]
client.traitList = ["CUSTOM TRAIT 1","CUSTOM TRAIT 2","NONE","NONE","COMPUTER","STORAGE","FOOD","CANDY","MEAT","HOT","COLD","ELECTRIC","SHARP","BLUNT","SHITTY","CUTE","SPOOKY","CAT","DOG","BROKEN","CUSHIONED","BUSINESS","BOUNCY","STICKY","MELEE","RANGED","MAGIC","REFINED","VAMPIRIC","FROG","HARLEQUIN","WIZARD","PLUSH","SCIENTIFIC","HEAVY","LIGHTWEIGHT","PROSPIT","DERSE","ENDURING","THORNS","ROCKET","GAMBLING","IRRADIATED","NOIR","CHARLATAN","EXQUISITE","GRIMDARK","META","WELSH", "TRICKSTER","BREATH","LIFE","LIGHT","TIME","HEART","RAGE","BLOOD","VOID","SPACE","MIND","HOPE","DOOM","NONE","NONE","NONE","NONE","NONE"];
client.traitList2 = ["CUSTOM TRAIT 1","CUSTOM TRAIT 2","NONE","NONE","DOOM","HOPE","MIND","SPACE","VOID","BLOOD","RAGE","HEART","TIME","LIGHT","LIFE","BREATH","TRICKSTER","WELSH","META","GRIMDARK","EXQUISITE","CHARLATAN","NOIR","IRRADIATED","GAMBLING","ROCKET","THORNS","ENDURING","DERSE","PROSPIT","LIGHTWEIGHT","HEAVY","SCIENTIFIC","PLUSH","WIZARD","HARLEQUIN","FROG","VAMPIRIC","REFINED","MAGIC","RANGED","MELEE","STICKY","BOUNCY","BUSINESS","CUSHIONED","BROKEN","DOG","CAT","SPOOKY","CUTE","SHITTY","BLUNT","SHARP","ELECTRIC","COLD","HOT","MEAT","CANDY","FOOD","STORAGE","COMPUTER","NONE","NONE","NONE","NONE","NONE"];

//function for a graph that has an increasing slope
function curve(level, interval, inc, scale, base) {
  var out = base;
  var brackets = Math.floor(level / interval);
  for (let i = 0; i < brackets; i++) {
    out += interval * inc;
    inc *= scale;
  }
  out += level % interval * inc;
  return out;
};
//function for a graph that bumps as it increases
function bump(level, interval, inc, base) {
  var out = base;
  var bump = Math.floor(level / interval);
  return out + bump * inc;
}

//how much xp total is required to hit each echladder tier.
client.xpReq = level => curve(level, 10, 1, 2, 0);
//how much more gel viscosity you get per echladder tier.
client.gvGet = level => bump(level - 1, 30, 5, 5);
//max grist based on echladder tier.
client.cache = level => curve(level, 10, 2, 2, 20);

//making all databases accessable via client.
client.auth = auth;
client.playerMap = playerMap;
client.landMap = landMap;
client.transMap = transMap;
client.configMap = configMap;
client.userMap = userMap;
client.sburbMap = sburbMap;
client.npcMap = npcMap;
client.grist = grist;
client.MessageEmbed = MessageEmbed
client.MessageAttachment = MessageAttachment
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

//starting up the bot

client.once('ready', () =>{
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
