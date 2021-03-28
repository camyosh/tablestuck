exports.run = (client, message, args) => {


if(client.landMap.has(message.guild.id+"medium")){
  message.channel.send("Session already exists!");
  return;
}

let castlegen = [[0,0],[0,0]];

for(i=0;i<2;i++){
  for(j=0;j<2;j++){
  castlegen[i][j]=Math.floor(Math.random()*2)+(Math.floor(Math.random()*4)*3);
}
}
console.log(castlegen);
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
    bf:client.landcall.battlefieldGen(client,message)
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
client.playerMap.set("leaderboard",leaderboard);

  message.channel.send("Session initialized!");

}
