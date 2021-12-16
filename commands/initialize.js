exports.run = (client, message, args) => {

  if(!client.funcall.dmcheck(client,message)){
    message.channel.send("Only a DM can use this command! Make sure to give yourself a role named \"DM\" if you're in charge!");
    return;
  }
if(client.landMap.has(message.guild.id+"medium")){
  message.channel.send("Session already exists!");
  return;
}
if(!args[0]||args[0].toLowerCase()!="confirm"){
  message.channel.send(`make sure you've set up the ${client.auth.prefix}config command, some of the settings have no effect if changed after initialization! do "${client.auth.prefix}initialize confirm" when you're ready!`);
  return;
}
let castlegen = [[0,0],[0,0]];

for(i=0;i<2;i++){
  for(j=0;j<2;j++){
  castlegen[i][j]=Math.floor(Math.random()*2)+(Math.floor(Math.random()*4)*3);
}
}
  let dreamMoon = client.landcall.moonGen(client,castlegen[0],castlegen[1]);

//chumhandle [charid,chumhandle]

  var medium = {
    playerList:[],
    npcCount:0,
    prototype:[],
    prospitList:[],
    derseList:[],
    dmList:[],
    handleList:[],
    castleLocal: castlegen[0],
    towerLocal: castlegen[1],
    transLocal:dreamMoon[dreamMoon.length-1],
    p:dreamMoon[0],
    d:dreamMoon[1],
    pm:dreamMoon[2],
    dm:dreamMoon[3],
    pmd:dreamMoon[4],
    pmd1:dreamMoon[5],
    pmd2:dreamMoon[6],
    dmd:dreamMoon[7],
    dmd1:dreamMoon[8],
    dmd2:dreamMoon[9],
    pc:dreamMoon[10],
    dc:dreamMoon[11],
    transList:[],
    transCount:0,
    gristCounter:["uranium","amethyst","garnet","iron","marble","chalk","shale","cobalt","ruby","caulk","tar","amber"],
    aspectCounter:[0,0,0,0,0,0,0,0,0,0,0,0],
    bf:client.landcall.battlefieldGen(client,message),
    registerTimer:0
  }

  client.landMap.set(message.guild.id+"medium", medium);

  var leaderboard = {
    experienceGained: ["NONE",0],
    boondollarsGained: ["NONE",0],
    tilesDiscovered: ["NONE",0],
    itemsAlchemized: ["NONE",0],
    underlingsDefeated:["NONE",0],
    playersDefeated:["NONE",0],
    bossesDefeated:["NONE",0],
    itemsCaptchalogued:["NONE",0]
}
client.landMap.set(message.guild.id+"mediumlead",leaderboard);

defaultConfig = require("../config.json");
if(!client.configMap.has(message.guild.id)){
  console.log("creating a new config file!");
client.configMap.set(message.guild.id,defaultConfig);
}

  message.channel.send("Session initialized!");

}
