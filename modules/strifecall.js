
//Declaring important variables
const tierDmg = [1,5,7,10,14,19,25,32,40,49,59,70,82,95,109,124,140];
const tierBD = [[1,2],[1,4],[1,6],[1,8],[1,10],[1,12],[2,16],[2,20],[2,24],[3,30],[3,36],[4,40],[5,50],[6,60],[7,70],[8,80],[10,100]];
const tierAv = [1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
const rungGrist = [20,22,24,26,28,30,32,34,36,38,40,44,48,52,56,60,64,68,72,76,80,88,96,104,112,120,128,136,144,152,160,176,192,208,224,240,256,272,288,304,320,352,384,416,448,480,512,544,576,608,640,704,768,832,896,960,1024,1088,1152,1216,1280,1408,1536,1664,1792,1920,2048,2176,2304,2432,2560,2816,3072,3328,3584,3840,4096,4352,4608,4864,5120,5632,6144,6656,7168,7680,8192,8704,9216,9728,10240,11264,12288,13312,14336,15360,16384,17408,18432,19456,20480];
const rungReq = [0,1,2,3,4,5,6,7,8,9,10,12,14,16,18,20,22,24,26,28,30,34,38,42,46,50,54,58,62,66,70,78,86,94,102,110,118,126,134,142,150,166,182,198,214,230,246,262,278,294,310,342,374,406,438,470,502,534,566,598,630,694,758,822,886,950,1014,1078,1142,1206,1270,1398,1526,1654,1782,1910,2038,2166,2294,2422,2550,2806,3062,3318,3574,3830,4086,4342,4598,4854,5110,5622,6134,6646,7158,7670,8182,8694,9206,9718,10230,9999999999999999];
const rungGel = [100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195,200,205,210,215,220,225,230,235,240,245,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,565,580,595,610,625,640,655,670,685,700,715,730,745,760,775,790,805,820,835,850,865,880,895,910,925,940,955,970,985,1000,1020,1040,1060,1080,1100,1120,1140,1160,1180,1200]
const rungBoon = [0,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,20,20,20,40,40,40,40,40,40,40,40,40,40,80,80,80,80,80,80,80,80,80,80,160,160,160,160,160,160,160,160,160,160,320,320,320,320,320,320,320,320,320,320,640,640,640,640,640,640,640,640,640,640,1280,1280,1280,1280,1280,1280,1280,1280,1280,1280,2560,2560,2560,2560,2560,2560,2560,2560,2560,2560,5120,5120,5120,5120,5120,5120,5120,5120,5120,5120]

const gristTypes = ["build","uranium","amethyst","garnet","iron","marble","chalk","shale","cobalt","ruby","caulk","tar","amber","artifact","zillium","diamond"];

//Function called to pass the turn in strife

function inflict(client, message, local, list, target, chance, status, attacker){
  //quickjump
    let alert = ``;
  if(!list[target][7].includes(status)){
    if(!Math.floor((Math.random() * chance))){

      if(client.traitcall.traitCheck(client,list[target][1],"BREATH")[1]){
        alert+= `**UNRESTRAINED** TARGET IS IMMUNE TO ALL STATUS EFFECTS!\n`;
        return alert;
      }
      if(client.traitcall.traitCheck(client,list[target][1],"ELECTRIC")[1]&& status=="STUN"){
        alert+= `TARGET IS IMMUNE TO STUN!\n`;
        return alert;
      }

      list[target][7].push(status);
      alert+= `INFLICTED ${status} ON OPPONENT!\n`;

      if(client.traitcall.traitCheck(client,list[target][1],"BLOOD")[1]){
        let bl;
          alert+=`**THICKER THAN WATER** Target shared status effect with everyone!\n`;
        for(bl=0;bl<list.length;bl++){
          alert+= inflict(client,message,local,list,bl,1,status,attacker);
        }
      }
      if(client.traitcall.traitCheck(client,list[attacker][1],"COLD")[1]&& status=="FROSTBITE"){
        list[target][7].push("DAZED");
        alert+= `INFLICTED DAZE ON OPPONENT!\n`;
      }
    }

}
return alert;
}

function passTurn(client, message, local) {

  let strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`;

  //chack if the strife exists in the database

  if(client.strifeMap.has(strifeLocal)){

  //Retrieve information from strife database

  let turn = client.strifeMap.get(strifeLocal,"turn");
  let list = client.strifeMap.get(strifeLocal,"list");
  let init = client.strifeMap.get(strifeLocal,"init");
  let i;
  let removed;

  //check if the player whos turn it is has any status effects
  //Steps for retrieving player information based on turn
  //Retrieve an array from the init array at the position equal to TURN
  //The first value in an initiative array is the posiion of that character in the LIST array where the data can then be retrieved for the correct character

  for(i=(list[init[turn][0]][7].length - 1);i>=0;i--){
    switch(list[init[turn][0]][7][i]){
      case "TARGFAV":
        removed = list[init[turn][0]][7].splice(i,1);
        break;
      case "GRAPPLE":
        removed = list[init[turn][0]][7].splice(i,1);
        break;
      case "PROTECT":
        removed = list[init[turn][0]][7].splice(i,1);
        break;
    }
  }

//reset favorability to 0

  list[init[turn][0]][4]=0;

  client.strifeMap.set(strifeLocal,list,"list");

  let active = client.strifeMap.get(strifeLocal,"active");

  let charid = list[init[turn][0]][1];

  let msg;

  //determine if character passing turn is a player or underling

  if(list[init[turn][0]][0]==true) {

   msg = `${client.playerMap.get(list[init[turn][0]][1],"name")} passes their turn!`;

 } else {
   msg = `The ${list[init[turn][0]][2]} ${list[init[turn][0]][1]} passes its turn!`;
 }

 //send passing turn message to every participating player's terminal channel

  for(i=0;i<active.length;i++){
    if(list[active[i]][0]==true){
      let chan = client.playerMap.get(list[active[i]][1],"channel");
      client.channels.cache.get(chan).send(msg);
    }
  }

//keep passing turn until turn is passed to a player who is still alive

  let check = false;
  var newturn;

  for(turn++;check==false;turn++){
    if(turn>=init.length){
      turn = 0;
    }
    if(active.includes(init[turn][0])){
      newturn = turn;
      check = true;
    }
  }

  //write changes and finish passing turn

  client.strifeMap.set(strifeLocal,newturn,"turn");

  //call the command to start the next character's turn

  startTurn(client,message,local);

} else {
  console.log("Stopped a crash!");
}

}

//function used to kill characters when their vitality reaches 0

function kill(client,message,local,target,pos){

  let strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`;
  let list = client.strifeMap.get(strifeLocal,"list");
  let active = client.strifeMap.get(strifeLocal,"active");
  let players = client.strifeMap.get(strifeLocal,"players");
  let playerpos = client.strifeMap.get(strifeLocal,"playerpos");

//check if dead character is an underling or player

  if(list[target][0]==true){
    client.playerMap.set(list[target][1],false,"alive");
try{
  increase = client.playerMap.get(message.guild.id.concat(message.author.id),"playersDefeated");
  increase++;
  client.playerMap.set(message.guild.id.concat(message.author.id),increase,"playersDefeated");
  if(increase>client.playerMap.get("leaderboard","playersDefeated")[1]){
    client.playerMap.set("leaderboard",[message.author.username,increase],"playersDefeated");
  }
}catch(err){

}
    let name = client.playerMap.get(list[target][1],"name");

    //send death message to all participating player's terminals

    let k;
    for(k=0;k<players;k++){

      let chan = client.playerMap.get(list[playerpos[k]][1],"channel");

      client.channels.cache.get(chan).send(`${name} died!`);

    }

    //call the function to remove the character from strife

    leaveStrife(client,message,local,target);

    if(active.length<=1){
      message.channel.send(`Last opponent defeated!`);
      leaveStrife(client,message,local,pos);

    }

  } else {
    try{
      if(list[target][1]=="unicorn"||list[target][1]=="kraken"||list[target][1]=="hecatoncheires"||list[target][1]=="denizen"){
        increase = client.playerMap.get(message.guild.id.concat(message.author.id),"bossesDefeated");
        increase++;
        client.playerMap.set(message.guild.id.concat(message.author.id),increase,"bossesDefeated");
        if(increase>client.playerMap.get("leaderboard","bossesDefeated")[1]){
          client.playerMap.set("leaderboard",[message.author.username,increase],"bossesDefeated");
        }
      } else {
      increase = client.playerMap.get(message.guild.id.concat(message.author.id),"underlingsDefeated");
      increase++;
      client.playerMap.set(message.guild.id.concat(message.author.id),increase,"underlingsDefeated");
      if(increase>client.playerMap.get("leaderboard","underlingsDefeated")[1]){
        client.playerMap.set("leaderboard",[message.author.username,increase],"underlingsDefeated");
      }
    }
    }catch(err){
    }


    //figure out what all the underling drops on death

    let primaryType = list[target][2];
    let secondType;
    let underling = list[target][1];
    let xp = client.underlings[underling].xp;
    let ranroll = (Math.floor((Math.random() * 8) + 1)) + (Math.floor((Math.random() * 20) + 1));
    let repgrist = "build";
    switch(ranroll){
      case 2:
        secondType = "rainbow";
      break;
      case 15:
        secondType = "diamond";
      break;
      case 16:
        secondType = "zillium";
      break;
      default:
        let typeRoll = Math.floor((Math.random() * 12) + 1);
        secondType = gristTypes[typeRoll];
    }

    if(list[target][7].includes("CORRUPT")){
      repgrist = "artifact";
      primaryType = "artifact";
      secondType = "artifact";
    }
    if(client.traitcall.traitCheck(client,list[pos][1],"TRICKSTER")[1]){
      repgrist = "zillium";
      primaryType = "zillium";
      secondType = "zillium";
    }
    //split rewards between all participating players

    let amount = Math.ceil(client.underlings[underling].drop / players);

    if(client.traitcall.traitCheck(client,list[pos][1],"META")[1]){
      amount*=2;
    }

    let i;

    for(i=0;i<players;i++){
      let charid = list[playerpos[i]][1];
      let rung = client.playerMap.get(charid,"rung");
      let grist = client.playerMap.get(charid,"grist");

  if(list[target][7].includes("CORRUPT")){
    if(grist[13]+(amount*4)>rungGrist[rung]){
      grist[13]=rungGrist[rung];
    } else {
      grist[13]+=(amount*4);
    }
  } else {
      if(grist[0]+(amount*4)>rungGrist[rung]){
        grist[0]=rungGrist[rung];
      } else {
        grist[0]+=(amount*4);
      }
    }
      if(grist[client.grist[primaryType].pos]+(amount*2)>rungGrist[rung]){
        grist[client.grist[primaryType].pos]=rungGrist[rung];
      } else {
        grist[client.grist[primaryType].pos]+=(amount*2);
      }
      //if rainbow grist, add to all grist types
      if(primaryType=="rainbow"){

        let j;
        for(j=1;j<13;j++){
          if(grist[j]+amount>rungGrist[rung]){
            grist[j]+=amount;
          } else {
            grist[j]=rungGrist[rung];
          }
        }

      } else {

        if(grist[client.grist[secondType].pos]+(amount)>rungGrist[rung]){
          grist[client.grist[secondType].pos]=rungGrist[rung];
        } else {
          grist[client.grist[secondType].pos]+=(amount);
        }

      }
//send message to all players currently in strife
      let chan = client.playerMap.get(charid,"channel");

      client.channels.cache.get(chan).send(`The **${primaryType} ${underling}** has been defeated! \nYou get **${client.emojis.cache.get(client.grist[repgrist].emoji)} ${amount*4}, ${client.emojis.cache.get(client.grist[primaryType].emoji)} ${amount*2}, ${client.emojis.cache.get(client.grist[secondType].emoji)} ${amount}** and **${xp} XP**`);
//call function to give players XP
      giveXp(client,charid,xp);
      client.playerMap.set(charid,grist,"grist");
}
//call function to remove the dead target from strife
      leaveStrife(client,message,local,target);
      if(active.length<=1){
        message.channel.send(`Last Underling defeated!`);
        leaveStrife(client,message,local,pos);
      }



  }

}

function giveXp(client,target,xp){
  curXp = client.playerMap.get(target,"xp");
  curRung = client.playerMap.get(target,"rung");

//check if XP gained is higher than what is needed to level up

  if((curRung==100)||(curXp+xp)<rungReq[(curRung+1)]){
    //if not levelling up, set new XP total
    client.playerMap.set(target, curXp + xp,"xp");
  } else {
    let curGv = client.playerMap.get(target,"gel");
    let curBoon = client.playerMap.get(target,"b");
    let name = client.playerMap.get(target,"name");
    let newRung = curRung;
    let newGv;
    let newBoon = curBoon;
    let i;

    //give rewards for every new rung climbed

    for(i=curRung;curXp + xp >= rungReq[(i+1)]; i++){
      newBoon+=rungBoon[i+1];
    }

    client.playerMap.set(target,curXp + xp,"xp");
    client.playerMap.set(target,rungGel[i],"gel");
    client.playerMap.set(target,i,"rung");
    client.playerMap.set(target,newBoon,"b");

    let congrats = new client.Discord.MessageEmbed()
    .setTitle(`**${name}** climbed their ECHELADDER!`)
    .addField(`**RUNG**`,`${curRung} + ${i - curRung}`,true)
    .addField(`**GEL VISCOSITY**`,`${client.emojis.cache.get('735664168400584715')} ${curGv} + ${rungGel[i] - curGv}`, true)
    .addField(`**BOONDOLLARS**`,`${client.emojis.cache.get('735664076180422758')} ${curBoon} + ${newBoon - curBoon}`,true);

    let chan = client.playerMap.get(target,"channel");

    client.channels.cache.get(chan).send(congrats);

  }
}

function giveGrist(client,target,type,amount){
  let rung = client.playerMap.get(target,"rung");
  let grist = client.playerMap.get(target,"grist");

  grist[gristTypes.indexOf(type)]+=amount

  if(grist[gristTypes.indexOf(type)]>rungGrist[rung]){
    grist[gristTypes.indexOf(type)] = rungGrist[rung];
  }

  client.playerMap.set(target,grist,"grist");

}

function leaveStrife(client,message,local,pos){

  let strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`
  let list = client.strifeMap.get(strifeLocal,"list");
  let init = client.strifeMap.get(strifeLocal,"init");
  var charid = list[pos][1];

  let turn = client.strifeMap.get(strifeLocal,"turn");
//check if target is underling or player
  if(list[pos][0]==true){

  let players = client.strifeMap.get(strifeLocal,"players");


let chan = client.playerMap.get(charid,"channel");
//if player leaving is the last in strife, delete strife database
  if(players <= 1){
    client.strifeMap.delete(strifeLocal);
    client.playerMap.set(charid,list[pos][3],"vit");
    client.playerMap.set(charid,false,"strife");

  } else {

    let active = client.strifeMap.get(strifeLocal,"active");


    let playerpos = client.strifeMap.get(strifeLocal,"playerpos");
    let sec = client.landMap.get(local[4],local[0]);
    //remove player from list of active characters, player positions, and lower player count by 1
    let removed = [active.splice(active.indexOf(pos),1),playerpos.splice(playerpos.indexOf(pos),1)];
    players --;


    client.strifeMap.set(strifeLocal,active,"active");
    client.strifeMap.set(strifeLocal,players,"players");
    client.strifeMap.set(strifeLocal,playerpos,"playerpos");
    client.landMap.set(local[4],sec,local[0]);
    client.playerMap.set(charid,false,"strife");
    client.playerMap.set(charid,list[pos][3],"vit");

    if(turn == pos){
      passTurn(client,message,local);
    }

  }
client.channels.cache.get(chan).send("Leaving Strife!");
} else {

  let active = client.strifeMap.get(strifeLocal,"active");
  let sec = client.landMap.get(local[4],local[0]);

  let removed = [active.splice(active.indexOf(pos),1),sec[local[1]][local[2]][2][local[3]][4].splice(sec[local[1]][local[2]][2][local[3]][4].findIndex(occpos => occpos[1] === list[pos][1] && occpos[2] === list[pos][2]),1)];

  /*for(i=0;i<sec[local[1]][local[2]][2][local[3]][4].length;i++){

    if(sec[local[1]][local[2]][2][local[3]][4][i][1]==list[pos][1]&&sec[local[1]][local[2]][2][local[3]][4][i][2]==list[pos][2]){

      sec[local[1]][local[2]][2][local[3]][4].splice(i,1);

    }

  }*/


  client.strifeMap.set(strifeLocal,active,"active");
  client.landMap.set(local[4],sec,local[0]);

  /*if(init[turn][0] == pos && active.length>1){
    passTurn(client,message,local);
  }*/

}

}

//used to start a player or underlings turn and initiate

function startTurn(client, message, local) {
//retrieve strife id
  let strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`;

  let turn = client.strifeMap.get(strifeLocal,"turn");
  let list = client.strifeMap.get(strifeLocal,"list");
  let init = client.strifeMap.get(strifeLocal,"init");
  let i;
//reset actions taken this turn
  list[init[turn][0]][6]=[];

  let stamina;
  let stamfav = 0;
  let stamroll;
  let stamsg;
  let carry = false;
  let removed;
  let stunned = false;
  let alert = ``;
//go through checking for status effects and applying them
  for(i=(list[init[turn][0]][7].length-1);i>=0;i--){
    switch(list[init[turn][0]][7][i]){
      case "STAMFAV":
        stamfav++;
        removed = list[init[turn][0]][7].splice(i,1);
      break;
      case "HAUNT":
        removed = list[init[turn][0]][7].splice(i,1);
        list[init[turn][0]][7].push("HAUNT2");
      break;
      case "HAUNT2":
        removed = list[init[turn][0]][7].splice(i,1);
        list[init[turn][0]][7].push("HAUNT3");
      break;
      case "HAUNT3":
        removed = list[init[turn][0]][7].splice(i,1);
      break;
      case "CARRY":
        carry=true;
        removed = list[init[turn][0]][7].splice(i,1);
      break;
      case "STUN":
        stunned=true;
        removed = list[init[turn][0]][7].splice(i,1);
      break;
      case "ALLBD":
        removed = list[init[turn][0]][7].splice(i,1);
      break;
      case "ALLFAV":
        removed = list[init[turn][0]][7].splice(i,1);
      break;
      case "ALLUNFAV":
        removed = list[init[turn][0]][7].splice(i,1);
      break;
      case "DISCOUNT":
        removed = list[init[turn][0]][7].splice(i,1);
      break;
      case "DAZED":
      stamfav--;
        removed = list[init[turn][0]][7].splice(i,1);
    }
  }
//check if player or underling
  if(list[init[turn][0]][0]==true){
//roll player stamina

if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"CHARLATAN")[0]){

  let specibus = client.playerMap.get(list[init[turn][0]][1],"spec");
  let equip = client.playerMap.get(list[init[turn][0]][1],"equip");

  let charlaCode = specibus[equip][1].substring(0,4)+client.captchaCode[Math.floor((Math.random() * (client.captchaCode.length-4)))+2]+client.captchaCode[Math.floor((Math.random() * (client.captchaCode.length-4)))+2]+client.captchaCode[Math.floor((Math.random() * (client.captchaCode.length-4)))+2]+client.captchaCode[Math.floor((Math.random() * (client.captchaCode.length-4)))+2];

  specibus[equip][1] = charlaCode;

  client.playerMap.set(list[init[turn][0]][1],specibus,"spec");

}

if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"TIME")[1]){
  stamfav++;
}

    let stamroll;

    if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"ENDURING")[1]){

      stamroll = [Math.floor((Math.random() * 4) + 5),Math.floor((Math.random() * 4) + 5)];

    } else if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"ENDURING")[0]){

      stamroll = [Math.floor((Math.random() * 6) + 3),Math.floor((Math.random() * 6) + 3)];

    } else {

    stamroll = [Math.floor((Math.random() * 8) + 1),Math.floor((Math.random() * 8) + 1)];

  }

    if(stamfav==0){
      stamina=stamroll[0];
      stamsg=`${stamroll[0]}`
    } else if(stamfav>0){
      if(stamroll[0]>stamroll[1]){
        stamina=stamroll[0];
        stamsg=`~~${stamroll[1]}~~ ${stamroll[0]}`
      } else {
        stamina=stamroll[1];
        stamsg=`~~${stamroll[0]}~~ ${stamroll[1]}`
      }
    } else {
      if(stamroll[0]<stamroll[1]){
        stamina=stamroll[0];
        stamsg=`~~${stamroll[1]}~~ ${stamroll[0]}`
      } else {
        stamina=stamroll[1];
        stamsg=`~~${stamroll[0]}~~ ${stamroll[1]}`
      }
    }

    if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"LIFE")[0]&&list[init[turn][0]][5]>0){
      //let curVit = list[init[turn][0]][3];
      let gel = client.playerMap.get(list[init[turn][0]][1],"gel");

      let heal = Math.floor((list[init[turn][0]][5]*.04)*gel);
      if((heal+list[init[turn][0]][3])>gel){
        list[init[turn][0]][3]=gel;
      } else {
        list[init[turn][0]][3]+=heal;
      }
      alert+=`\nLife trait consumed ${list[init[turn][0]][5]} stamina and restored ${heal} vitality!`;
    }

    if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"LIFE")[1]){
      let armor = client.playerMap.get(list[init[turn][0]][1],"armor");
      let gel = client.playerMap.get(list[init[turn][0]][1],"gel");
      let heal = Math.floor((Math.random() * (tierBD[armor[0][2]][1] - 1)) + tierBD[armor[0][2]][0]);

      if((heal+list[init[turn][0]][3])>gel){
        list[init[turn][0]][3]=gel;
      } else {
        list[init[turn][0]][3]+=heal;
      }
      alert+=`\n**GARDEN OF EDEN** passivley regenerated ${heal} vitality!`;
    }

    if(carry==true||client.traitcall.traitCheck(client,list[init[turn][0]][1],"BUSINESS")[0]){
      let carrystam = list[init[turn][0]][5];

      stamsg +=` + ${carrystam}`;
      stamina += carrystam;
    }

    if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"CANDY")[1]){
      stamina+=1;
      stamsg += ` + 1`;
    }
    if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"BUSINESS")[1]){
      stamina+=1;
      stamsg += ` + 1`;
    }
    if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"WELSH")[0]){
      stamina+=1;
      stamsg += ` + 1`;
    }
    if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"TIME")[0]){
      stamina+=1;
      stamsg += ` + 1`;
    }

    if(list[init[turn][0]][7].includes("FROSTBITE")){
      stamina-=1;
      stamsg += ` - 1`;
    }
    if(stunned){
      stamina = 0;
      stamsg =`0 (STUNNED)`;
    }

    //set rolled stamina to strife data
    list[init[turn][0]][5]=stamina;

    client.strifeMap.set(strifeLocal,list,"list");

    let active = client.strifeMap.get(strifeLocal,"active");

    if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"HEART")[1]){
      alert+=`\n**FEAR THE SUPEREGO** - Performed a random action for free!`;
    }



//retrieve player channel information
    let chan = client.playerMap.get(list[init[turn][0]][1],"channel");
    let ping = client.playerMap.get(list[init[turn][0]][1],"ping");
//send message to player's channel
    client.channels.cache.get(chan).send(`${message.guild.members.cache.get(ping)} it's your turn!\nYou have ${stamsg} STAMINA and ${list[init[turn][0]][3]} VITALITY remaining!\n See the list of actionList you can take with >act, and >pass your turn once you're done!${alert}`);

    for(i=0;i<active.length;i++){
      if(list[active[i]][0]==true && active[i]!=init[turn][0]){
        let chan = client.playerMap.get(list[active[i]][1],"channel");
        client.channels.cache.get(chan).send(`${client.playerMap.get(list[init[turn][0]][1],"name")} starts their turn with ${stamsg} STAMINA!${alert}`);
      }
    }

    if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"HEART")[1]){

    let heartTarg;
    let heartAttack =false;

    while(!heartAttack){

      heartTarg=active[Math.floor(Math.random()*active.length)];
      if(heartTarg!=init[turn][0]){
        heartAttack=true;
      }

    }
    let action = client.action[Math.floor(Math.random()*3)][Math.floor(Math.random()*20)+1];
    act(client,message,local,action,heartTarg)
    }

  } else {

    //list[init[turn][0]][5]=0;
//if turn is underling, roll stamina based on underling document
    stamroll = [Math.floor((Math.random() * client.underlings[list[init[turn][0]][1]].stm) + 1),Math.floor((Math.random() * client.underlings[list[init[turn][0]][1]].stm) + 1)];

    if(stamfav==0){
      stamina=stamroll[0];
      stamsg=`${stamroll[0]}`
    } else if(stamfav>0){
      if(stamroll[0]>stamroll[1]){
        stamina=stamroll[0];
        stamsg=`~~${stamroll[1]}~~ ${stamroll[0]}`
      } else {
        stamina=stamroll[1];
        stamsg=`~~${stamroll[0]}~~ ${stamroll[1]}`
      }
    } else {
      if(stamroll[0]<stamroll[1]){
        stamina=stamroll[0];
        stamsg=`~~${stamroll[1]}~~ ${stamroll[0]}`
      } else {
        stamina=stamroll[1];
        stamsg=`~~${stamroll[0]}~~ ${stamroll[1]}`
      }
    }

    if(list[init[turn][0]][7].includes("FROSTBITE")){
      stamina-=1;
      stamsg += ` - 1`;
    }
    if(stunned){
      stamina = 0;
      stamsg =`0 (STUNNED)`;
    }
    list[init[turn][0]][5]=stamina;
    client.strifeMap.set(strifeLocal,list,"list");

    let i;
    let active = client.strifeMap.get(strifeLocal,"active");

    for(i=0;i<active.length;i++){
      if(list[active[i]][0]==true){
        let chan = client.playerMap.get(list[active[i]][1],"channel");
        client.channels.cache.get(chan).send(` The ${list[init[turn][0]][2]} ${list[init[turn][0]][1]} starts its turn with ${stamsg} STAMINA!${alert}`);
      }
    }


    underTurn(client,message,local,list[init[turn][0]][1]);

  }

}

exports.pass = function(client, message, local) {
  passTurn(client,message,local);
}

exports.start = function(client, message, local) {
  startTurn(client,message,local);
}

exports.strifeTest = function(client, message, target) {

    if(client.playerMap.get(message.guild.id.concat(target.id),"strife")==false){

      return false;
    }
    else{

      return true;
    }
}

exports.turnTest = function(client, message, local) {
//test if it's a player's turn
  let strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`;

  let turn = client.strifeMap.get(strifeLocal,"turn");
  let init = client.strifeMap.get(strifeLocal,"init");

  var charid = message.guild.id.concat(message.author.id);

  let pos = client.playerMap.get(charid,"pos");


  if(init[turn][0] == pos) {
    return true;
  } else {
    return false;
  }

}

exports.underSpawn = function(client, local, sec) {
//chance to spawn an underling everytime a player moves in house or on underling tile
//roll random numbers to decide what underlings spawn where under specific circumstance
  let area = sec[local[1]][local[2]];
  let room = area[2][local[3]];

let underlingChoice;
let rung = client.playerMap.get(local[4],"rung");
if(client.landMap.get(local[4],"enter")==false&&local[0]=="h"){
return sec;
}

switch (local[0]){
  case "h":
    if(rung < 15){
    underlingChoice=["imp"];
      } else {
    underlingChoice = ["imp","ogre"];
  }
  break;
  case "s1":
  underlingChoice = ["imp","ogre","basilisk"];
  break;
  case "s1d":
  underlingChoice = ["ogre","basilisk"];
  break;
  case "s2":
  underlingChoice = ["ogre","basilisk","lich"];
  break;
  case "s2d":
  underlingChoice = ["basilisk"];
  break;
  case "s3":
  underlingChoice = ["basilisk","lich","giclopse"];
  break;
  case "s3d":
  underlingChoice = ["ogre","basilisk"];
  break;
  case "s4":
  underlingChoice = ["lich","giclopse","titachnid"];
  break;
  case "s4d":
  underlingChoice = ["ogre","basilisk"];
  break;
}
if(rung < 5){
spawnBank = Math.ceil(Math.random() * 2);
} else if( rung < 10){
  spawnBank = Math.ceil(Math.random() * 3);
} else {
spawnBank = Math.ceil(Math.random() * 6);
}
while(spawnBank!=0){
let cost = Math.ceil(Math.random() * underlingChoice.length);

  if((spawnBank-(cost)) >= 0){
  sec[local[1]][local[2]][2][local[3]][4].push(underSpawn(client,local,underlingChoice[cost-1]));
  spawnBank = spawnBank - (cost);
}
}
return sec;
}

exports.leaveStrife = function(client,message,local,target){
  leaveStrife(client,message,local,target);
}

exports.underRally = function(client, local) {
//check if any underlings are in room, if so they will be added to the strife
  let sec = client.landMap.get(local[4],local[0]);
  let occList = sec[local[1]][local[2]][2][local[3]][4];

  let strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`

  let i;

  for(i=0;i<occList.length;i++){

    if(occList[i][0]==false){

      let profile = [false,occList[i][1],occList[i][2],client.underlings[occList[i][1]].vit,0,0,[],[]]

      let list = client.strifeMap.get(strifeLocal,"list");
      let init = client.strifeMap.get(strifeLocal,"init");
      let active = client.strifeMap.get(strifeLocal,"active");

      var pos = list.length;

      let initRoll = [pos, Math.floor((Math.random() * 20) + 1)];

      list.push(profile);
      active.push(pos);

      let j;
      let placed = false;

      for(j=0;j<init.length  && placed==false;j++){
        if(init[j][1]<initRoll[1]){
          placed = true;
          let removed = init.splice(j,0,initRoll);
        } else {
          if(j+1==init.length){
            init.push(initRoll);
            placed = true;
          }
        }
      }



      client.strifeMap.set(strifeLocal,list,"list");
      client.strifeMap.set(strifeLocal,init,"init");
      client.strifeMap.set(strifeLocal,active,"active");

    }

  }

  }


  function act(client,message,local,action,target){

    let strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`;
//if strife database does not exist, cancel code
    if(client.strifeMap.has(strifeLocal)==false){
      console.log("Stopped another crash!");
      return;
    }

    var turn = client.strifeMap.get(strifeLocal,"turn");
    let list = client.strifeMap.get(strifeLocal,"list");
    let active = client.strifeMap.get(strifeLocal,"active");
    let init = client.strifeMap.get(strifeLocal,"init");
    let alert = ``;
//check action tags
    let aa = client.actionList[action].add;

    if(aa.includes("INSTANT")){
      let pos = client.playerMap.get(message.guild.id.concat(message.author.id),"pos");
      let t;
      let setTurn = 0;

      for(t=0;t<init.length;t++){

        if(init[t][0] == pos){
          setTurn=t;
        }

      }

      turn = setTurn;
    }

    let bd = 0;
    let br = 0;
    let fav = list[init[turn][0]][4];
    let bdmax = false;
    let strikeBonus = 0;

    let att = client.actionList[action].att;

    let grist;
    let dmg;
    let bdroll;
    let absorb = false;
    let tarGrist;

    if(client.traitcall.traitCheck(client,list[target][1],"BLOOD")[0]){
      if(!Math.floor(Math.random()*12)&&active.length>2){
          let bloodCheck = false;
          while(!bloodCheck){
            let newTarget = active[Math.floor(Math.random()*active.length)];
            if(newTarget!=target&&newTarget!=init[turn][0]){
              target = newTarget;
              bloodCheck=true;

            }
          }
        alert+=`The target was changed!\n`;
      }
    }

    try{
      //retrieve target grist
    tarGrist = list[target][2];
  } catch(err) {
    console.log(message.author.username);
    console.log("THIS IS THE GUY, TAKE HIM OUT");
  }
    let targName = "Target"
    let attName = "Attacker"
//check if current turn is a player
    if(list[init[turn][0]][0]==true){

      try{
        //retrieve player information
        let specibus = client.playerMap.get(list[init[turn][0]][1],"spec");
        let equip = client.playerMap.get(list[init[turn][0]][1],"equip");

        grist = client.gristTypes[client.codeCypher[1][client.captchaCode.indexOf(specibus[equip][1].charAt(1))]];
        dmg = tierDmg[specibus[equip][2]];
        bdroll = tierBD[specibus[equip][2]];
        attName = client.playerMap.get(list[init[turn][0]][1],"name");
      } catch(err) {


        grist = "artifact";
        dmg = 5;
        bdroll = [1,4];
        attName = client.playerMap.get(list[init[turn][0]][1],"name");
      }

    } else {
      //if player is underling, get information from underling document
      dmg = client.underlings[list[init[turn][0]][1]].d;
      bdroll = client.underlings[list[init[turn][0]][1]].bd;
      grist = list[init[turn][0]][2];
      attName = `${list[init[turn][0]][2]} ${list[init[turn][0]][1]}`
    }
//if target is player, retrieve name from database, if underling default underling name
    if(list[target][0]==true){
      targName = client.playerMap.get(list[target][1],"name");
    } else {
      targName = `${list[target][2]} ${list[target][1]}`
    }

    let brroll;
    let av;
//if target is player
    if(list[target][0]==true){
//retrieve target armor
      try{
        let armor = client.playerMap.get(list[target][1],"armor");

        av = tierAv[armor[0][2]];
        brroll = tierBD[armor[0][2]];
      } catch(err) {
        av = 1;
        brroll = [1,2];
      }

    } else {
      //if underling, retrieve armor information from underling doc
      av = client.underlings[list[target][1]].av;
      brroll = client.underlings[list[target][1]].bd;
    }

    let effective = "HIT!"

    try{
//check for grist effectivity, if effective change message accordingly and increase BR or BD accordingly
  /*  if(grist=="artifact"){
      if(tarGrist!="artifact"&&tarGrist!="diamond"&&tarGrist!="zillium"){
        br++;
        effective="INEFFECTIVE!"
      } else if(tarGrist=="zillium"){
        bd++;
        effective="EFFECTIVE!"
      }
    } else if(grist=="zillium"){
      if(tarGrist!="artifact"&&tarGrist!="diamond"&&tarGrist!="zillium"){
        bd++;
        effective="EFFECTIVE!"
      } else if(tarGrist=="artifact"){
        br++;
        effective="INEFFECTIVE!"
      }
    } else*/ if(client.grist[tarGrist].ineffective.includes(grist)){
      bd++
      effective="EFFECTIVE!"
      if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"REFINED")[0]){
        strikeBonus+=2;
      }
    } else if(client.grist[tarGrist].effective.includes(grist)){
      br++
      effective="INEFFECTIVE!"
    }
    if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"NOIR")[0]){
      strikeBonus += Math.ceil(Math.random()*4);
    }

} catch(err) {
  console.log("What is this one")
  console.log(grist);
  console.log(tarGrist);
}
    //check for each action tag that is NONCOMBATIVE

    let pre;
    for(pre=(aa.length - 1);pre>=0;pre--){
      switch(aa[pre]){
        case "FAV":
          fav++;
          break;
        case "UNFAV":
          fav--;
          break;
        case "CARRY":
          list[init[turn][0]][7].push("CARRY");
          break;
        case "ALLBD":
          list[init[turn][0]][7].push("ALLBD");
          break;
        case "CARRY":
          list[init[turn][0]][7].push("CARRY");
          break;
        case "ALLFAV":
          list[init[turn][0]][7].push("ALLFAV");
          break;
        case "ALLUNFAV":
          list[init[turn][0]][7].push("ALLUNFAV");
          break;
        case "NEXTFAV":
          list[init[turn][0]][7].push("NEXTFAV");
          break;
        case "STAMFAV":
          list[init[turn][0]][7].push("STAMFAV");
          break;
        case "STAMADD":
          let newStam = Math.ceil(Math.random() * 4);
          list[init[turn][0]][5]+= newStam;
          let j;
          for(j=0;j<active.length;j++){
            if(list[active[j]][0]==true){
              let chan = client.playerMap.get(list[active[j]][1],"channel");
              alert+=`${attName} gains ${newStam} STAMINA, they now have ${list[init[turn][0]][5]} STAMINA!\n`
            }
          }
          break;
        case "DISCOUNT":
          list[init[turn][0]][7].push("DISCOUNT");
          break;
        case "PROTECT":
          list[target][7].push("PROTECT");
          break;
      }
    }

    //
    //if action deals damage or imposes effect

    let costMsg = `${client.actionList[action].cst}`;

    if(list[init[turn][0]][7].includes("DISCOUNT")){
      if(client.actionList[action].cst>1){
      alert += `ACTIONS DISCOUNTED THIS TURN`;
      costMsg +=` - 1`;
       }
     }
   //closing here
    if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"MIND")[1]){
      if(client.actionList[action].cst > 1){
        alert += `**BUTTERFLY EFFECT** - ACTIONS DISCOUNTED`;
        costMsg += ` - 1`;
      }
    }
    if(att == true) {

      let precon;
      for(precon=(list[init[turn][0]][7].length - 1);precon>=0;precon--){
        let removed;

        //check for COMBATATIVE tags
        switch(list[init[turn][0]][7][precon]){
          case "ALLFAV":
            fav++;
            break;
          case "CORRUPT":
            fav--;
            break;
            case "HAUNT":
            case "HAUNT2":
            case "HAUNT3":
              fav--;
              break;
          case "NEXTFAV":
            if(att == true){
              fav++;
              removed = list[init[turn][0]][7].splice(precon,1);
            }
            break;
            case "ALLBD":
              bd++
              break;
          case "GRAPPLE":
            fav--;
            break;
        }
      }

      //check enemy tags

      let precont;
        for(precont=(list[target][7].length - 1);precont>=0;precont--){
          let removed;

          switch(list[target][7][precont]){
            case "CORRUPT":
              fav++
            break;
            case "HAUNT":
            case "HAUNT2":
            case "HAUNT3":
              fav++
            break;
            case "GRAPPLE":
              fav++
            break;
            case "ALLUNFAV":
              fav--;
              break;
            case "PROTECT":
              fav--;
              break;
            case "TARGFAV":
              fav++;
              break;
          }

}

if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"BROKEN")[0]){
  fav--;
}
if(client.traitcall.traitCheck(client,list[target][1],"VOID")[1]){
  fav--;
}

    let strikeCheck;
    let strikemsg;
//roll to hit, similar to how stamina is handled
    let strikeRoll = [Math.floor((Math.random() * 20) + 1),Math.floor((Math.random() * 20) + 1)];

    if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"META")[0]){
      if(strikeRoll[0]==1||strikeRoll[0]==20||strikeRoll[1]==1||strikeRoll[1]==20){
        alert += `YOUR META GEAR AVOIDED A 1 (OR A 20...)\n`;
        let metaCheck = true;
        while(metaCheck) {

          strikeRoll = [Math.floor((Math.random() * 20) + 1),Math.floor((Math.random() * 20) + 1)];
          if(strikeRoll[0]!=1&&strikeRoll[0]!=20&&strikeRoll[1]!=1&&strikeRoll[1]!=20){
            metaCheck=false;
          }

        }

      }
    }

    if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"WELSH")[1]||client.traitcall.traitCheck(client,list[init[turn][0]][1],"LIGHT")[0]){
      if(strikeRoll[0]==1){
        alert+=`TURNED A 1 INTO A 20!\n`;
        strikeRoll[0]=20;
      }
      if(strikeRoll[1]==1){
        if(fav!=0){
          alert+=`TURNED A 1 INTO A 20!\n`;
          strikeRoll[1]=20;
        }

      }
    }
    if(client.traitcall.traitCheck(client,list[target][1],"WELSH")[1]||client.traitcall.traitCheck(client,list[target][1],"VOID")[0]){
      if(strikeRoll[0]==20){
        alert+=`TARGET TURNED A 20 INTO A 1!\n`;
        strikeRoll[0]=1;
      }
      if(strikeRoll[1]==20){
        if(fav!=0){
        alert+=`TARGET TURNED A 20 INTO A 1!\n`;
        strikeRoll[1]=1;
        }
      }
    }
    if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"LIGHT")[1]){
      if(strikeRoll[0]<6){
        alert+=`**BORN LUCKY** - Rerolled a roll less than 5\n`
        let lightCheck=true;
        while (lightCheck){
          strikeRoll[0] = Math.floor((Math.random() * 20) + 1)
          if(strikeRoll[0]>5){
            lightCheck=false;
          } else if(strikeRoll[0]==1){
            strikeRoll[0]=20;
            lightCheck=false;
            alert+=`TURNED A 1 INTO A 20!\n`
          }
        }
      }
      if(strikeRoll[1]<6&&fav!=0){
        alert+=`**BORN LUCKY** - Rerolled a roll less than 5\n`
        let lightCheck=true;
        while (lightCheck){
          strikeRoll[1] = Math.floor((Math.random() * 20) + 1)
          if(strikeRoll[1]>5){
            lightCheck=false;
          } else if(strikeRoll[1]==1){
            strikeRoll[1]=20;
            lightCheck=false;
            alert+=`TURNED A 1 INTO A 20!\n`
          }
        }
      }
    }
strikeRoll[0]=20;
    if(fav == 0) {
      strikeCheck = strikeRoll[0];
      strikeMsg = `${strikeRoll[0]}`;
    }
    if(fav>0) {

      if(strikeRoll[0]>strikeRoll[1]){
        strikeCheck=strikeRoll[0];
        strikeMsg = `~~${strikeRoll[1]}~~ ${strikeRoll[0]}`;
      } else {
        strikeCheck=strikeRoll[1]
        strikeMsg = `~~${strikeRoll[0]}~~ ${strikeRoll[1]}`;
      }
    } else if(fav<0){
      if(strikeRoll[0]>strikeRoll[1]){
        strikeCheck=strikeRoll[1];
        strikeMsg = `~~${strikeRoll[0]}~~ ${strikeRoll[1]}`;
      } else {
        strikeCheck=strikeRoll[0]
        strikeMsg = `~~${strikeRoll[1]}~~ ${strikeRoll[0]}`;
      }
    }
if(strikeBonus>0){
  strikeMsg += ` + ${strikeBonus} = ${strikeCheck+strikeBonus}`;
}
if(strikeBonus<0){
  strikeMsg += ` - ${strikeBonus} = ${strikeCheck+strikeBonus}`;
}


  if(client.traitcall.traitCheck(client,list[target][1],"FROG")[0]){
    av++;
  }
  if(client.traitcall.traitCheck(client,list[target][1],"EXQUISITE")[1]){
    av = av+2;
  }
  if(client.traitcall.traitCheck(client,list[target][1],"BREATH")[0]){
    av = av+2;
  }

  if((strikeCheck+strikeBonus)>av && (client.traitcall.traitCheck(client,list[target][1],"FROG")[1] && !(Math.floor((Math.random() * 12))))){
    strikeCheck=0;
    alert+=`TARGET JUMPED OUT OF THE WAY! FROGGERS!!!\n`;
  }


  if((strikeCheck+strikeBonus)>av){

    //check traits that inflict status effects on hit

    //if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"CANDY")[1]==true){

    if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"HOT")[0]){
    alert+=inflict(client, message, local, list, target, 12, "BURN", init[turn][0]);
    }
    if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"IRRADIATED")[0]){
    alert+=inflict(client, message, local, list, target, 12, "BURN", init[turn][0]);
    }
    if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"SHARP")[0]){
    alert+=inflict(client, message, local, list, target, 12, "BLEED", init[turn][0]);
    }
    if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"VAMPIRIC")[0]){
    alert+=inflict(client, message, local, list, target, 12, "BLEED", init[turn][0]);
    }
if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"COLD", init[turn][0])[0]){
  alert+=inflict(client, message, local, list, target, 12, "FROSTBITE", init[turn][0]);
}
if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"ELECTRIC")[0]){
   alert+=inflict(client, message, local, list, target, 12, "STUN", init[turn][0]);
}
if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"RAGE")[0]){
   alert+=inflict(client, message, local, list, target, 6, "STUN", init[turn][0]);
}
  if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"BLUNT")[0]){
    let dchance=12;
  if(!list[target][7].includes("DAZED")){
    if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"BLUNT")[1]){
      dchance = 6;
    }
    alert+=inflict(client, message, local, list, target, dchance, "DAZED", init[turn][0]);
  }
  }
  if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"SHITTY")[1]){
  alert+=inflict(client, message, local, list, target, 12, "CORRUPT", init[turn][0]);
  }
  if(client.traitcall.traitCheck(client,list[target][1],"THORNS")[0]){
  alert+=inflict(client, message, local, list, init[turn][0], 12, "BLEED", target);
  }
  if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"SPOOKY")[0]){
  if(!list[target][7].includes("HAUNT")&&!list[target][7].includes("HAUNT2")&&!list[target][7].includes("HAUNT3")){
      alert+=inflict(client, message, local, list, init[turn][0], 12, "HAUNT", target);
  }
  }
  if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"GRIMDARK")[0]){
  if(!list[target][7].includes("HAUNT")&&!list[target][7].includes("HAUNT2")&&!list[target][7].includes("HAUNT3")){
    alert+=inflict(client, message, local, list, init[turn][0], 12, "HAUNT", target);
  }
  }
if(client.traitcall.traitCheck(client,list[target][1],"CAT")[0]){
  br++;
}
if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"BROKEN")[1]){
  if(!Math.floor((Math.random() * 12))){
    bdmax = true;
  }
}
if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"STICKY")[0]){
  alert+=inflict(client, message, local, list, target, 12, "GRAPPLE", init[turn][0]);
}
  if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"STICKY")[1] && list[target][7].includes("GRAPPLE")){
    bd++;
  }


if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"IRRADIATED")[1]&&strikeCheck==20){

let radioburn=false;

  for(let ir=0;ir<list.length;ir++){
    if((init[turn][0]!=ir)&&(!list[ir][7].includes("BURN"))){
      if(client.traitcall.traitCheck(client,list[ir][1],"BREATH")[1]){
        alert+= `**UNRESTRAINED** - TARGET IS IMMUNE TO ALL STATUS EFFECTS!`;
      } else {
      list[ir][7].push("BURN");
      radioburn = true;
      if(client.traitcall.traitCheck(client,list[ir][1],"BLOOD")[1]){
        if(!list[init[turn][0]][7].includes("BURN")){
          list[init[turn][0]][7].push("BURN");
          alert+=`**THICKER THAN WATER** - Target shared status effect with everyone!\n`;
        }
      }
    }
    }
  }
    if(radioburn){
    alert+=`RADIOACTIVE!!! BURNED ALL OPPONENTS!\n`;
  }
}


if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"CHARLATAN")[1]){
  let rageList = ["BURN","GRAPPLE","BLEED","FROSTBITE","DAZED","STUN","CORRUPT","HAUNT"];
alert+=inflict(client, message, local, list, target, 6, rageList[Math.floor((Math.random() * rageList.length))], init[turn][0]);
};

    //check for all COMBATATIVE COMBAT TAGS
    //check target status effects

    let postcon;
    for(postcon=(list[target][7].length-1);postcon>=0;postcon--){

      switch(list[target][7][postcon]){
        case "BURN":
          bd++;
          if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"HOT")[1]){
            bd++;
          }
          break;
        case "BLEED":
          bd++;
      }

    }

    let post;
    for(post=0;post<aa.length;post++){
      switch(aa[post]){
        case "BD":
          bd++;
          break;
        case "TARGFAV":
        alert+=inflict(client, message, local, list, target, 1, "TARGFAV", init[turn][0]);
          break;
        case "GRAPPLE":
        alert+=inflict(client, message, local, list, target, 1, "GRAPPLE", init[turn][0]);
          break;
        case "BURN":
        alert+=inflict(client, message, local, list, target, 1, "BURN", init[turn][0]);
          break;
        case "FROSTBITE":
        alert+=inflict(client, message, local, list, target, 1, "FROSTBITE", init[turn][0]);
          break;
        case "STUN":
        alert+=inflict(client, message, local, list, target, 1, "STUN", init[turn][0]);
          break;
        case "ABSORB":
          absorb = true;
          break;

      }
    }

    //if check passed, calculate all bonus damage

    let bonusDmg = 0;
    let bonusRes = 0;

    let k;
    for(k=0;k<list[init[turn][0]][7].length;k++){
    try{
      if(`${list[init[turn][0]][7][k].charAt(0)}${list[init[turn][0]][7][k].charAt(1)}${list[init[turn][0]][7][k].charAt(2)}${list[init[turn][0]][7][k].charAt(3)}`==`MEAT`){
        let meat = list[init[turn][0]][7].splice(k,1);
        meat = meat[0].substring(4);

        meatVal = parseInt(meat, 10);

        bd+=meatVal;

      }

    } catch(err) {
      console.log(err);
    }
  }


  let damagemsg = `${dmg * client.actionList[action].dmg}`;
  let equals = false;

    if(bd>0){
      equals=true;
      if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"MEAT")[1]){
        bd++;
      }
      let i;
      for(i=0;i<bd;i++){
        let bddice =[Math.floor((Math.random() * (bdroll[1] - bdroll[0])) + bdroll[0]),Math.floor((Math.random() * (bdroll[1] - bdroll[0])) + bdroll[0])];
        if (bdmax){
          bddice = [bdroll[1],bdroll[1]];
        }
        if(client.traitcall.traitCheck(client,list[target][1],"CUTE")[1]||client.traitcall.traitCheck(client,list[target][1],"REFINED")[1]){
          bddice[0]= Math.floor(bddice[0]/2);
          bddice[1]= Math.floor(bddice[1]/2);
        }

        let bdadd;
        if(!client.traitcall.traitCheck(client,list[init[turn][0]][1],"SHARP")[1]){
          bdadd = bddice[0];
          damagemsg+= ` + ${bdadd}`;
        } else {
          if (bddice[0]>bddice[1]){
            damagemsg += ` + (~~${bddice[1]}~~ ${bddice[0]})`
            bdadd = bddice[0];
          } else{
            damagemsg += ` + (~~${bddice[0]}~~ ${bddice[1]})`
            bdadd = bddice[1];
          }
      }
      bonusDmg += bdadd;

    }
    if(client.traitcall.traitCheck(client,list[target][1],"CUTE")[1]){
      alert += `TARGET IS TOO CUTE, THEY TOOK REDUCED BD!\n`
    }
    if(client.traitcall.traitCheck(client,list[target][1],"REFINED")[1]){
      alert += `TARGET IS REFINED, THEY TOOK REDUCED BD!\n`
    }
  }

    if(br>0){
      equals=true;
      if(client.traitcall.traitCheck(client,list[target][1],"CUTE")[0]){
        br++;
      }
      let i;
      for(i=0;i<br;i++){
        let bradd = Math.floor((Math.random() * (brroll[1] - 1)) + brroll[0]);
        bonusRes += bradd;
        damagemsg+= ` - ${bradd}`;
      }
    }

  let damage = ((dmg * client.actionList[action].dmg) + bonusDmg) - bonusRes;

    if(client.traitcall.traitCheck(client,list[target][1],"SPOOKY")[1]&&(list[init[turn][0]][7].includes("HAUNT2")||list[init[turn][0]][7].includes("HAUNT")||list[init[turn][0]][7].includes("HAUNT3"))){
      equals=true;
      damage=Math.floor(damage/2);
      damagemsg +=` / 2`;
    }

    if(strikeCheck == 20 && !client.traitcall.traitCheck(client,list[init[turn][0]][1],"DOOM")[1]){

      if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"HOPE")[0]){

        let hopeStam = client.actionList[action].cst;
        alert+=`ACTION IS FREE!\n`;

        if(list[init[turn][0]][7].includes("DISCOUNT")){
          if(client.actionList[action].cst>1){
          hopeStam--;
           }
         }
       //closing here
        if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"MIND")[1]){
          if(client.actionList[action].cst > 1){
            hopeStam--;
          }
        }

        if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"HOPE")[1]){
          alert+=`**BURNING SPIRIT** - GOT ${hopeStam} STAMINA!\n`
          hopeStam*=2;
        }

        list[init[turn][0]][5]+=hopeStam;

      }

      equals=true;
      if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"RAGE")[1]){
        damage *= 4;
        damagemsg += ` * 4`;
        alert +=`**BLASPHEMOUS WORD** - QUADRUPLE DAMAGE!`;
      } else if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"NOIR")[1]){
        damage *= 3;
        damagemsg += ` * 3`;
        alert +=`1000/1000 CLOCKS DESTROYED! TRIPPLE DAMAGE!`;
      } else {
      damage *= 2;
      damagemsg += ` * 2`
    }
    };

    if(damage < 0 || att == false) {
      damage = 0;
    };


    if(equals)
    damagemsg+= ` = **${damage}**`;






    if(client.traitcall.traitCheck(client,list[target][1],"HEART")[0]){
      if(!Math.floor(Math.random()*20)){
        list[target][3]+= damage;
        alert+=`The pain fuels their soul, damage converted to ${damage} points of healing!\n`;
        damage=0;
        if(client.playerMap.get(list[target][1],"gel")<list[target][3]){
          list[target][3]=client.playerMap.get(list[target][1],"gel");
        }

      }
    }

    let last = [list[init[turn][0]][1],list[target][1],damage];

    if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"VAMPIRIC")[1]&&list[target][7].includes("BLEED") ){
      list[init[turn][0]][3]+= bonusDmg;
      alert+= `VAMPIRICALLY SIPHONED ${bonusDmg} VITALITY!\n`

      if(client.playerMap.get(list[init[turn][0]][1],"gel")<list[init[turn][0]][3]){
        list[init[turn][0]][3]=client.playerMap.get(list[init[turn][0]][1],"gel");
      }

    }

    if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"DOOM")[1]&&strikeCheck==20){

      if(active.length>2){
        alert+= `**MORTAL DECAY** YOUR DAMAGE SPREADS TO ALL FOES.\n`;
        let id;
        for(id=0;id<active.length;id++){
          if(active[id]!=init[turn][0]&&active[id]!=target){
            list[id][3]-= damage;
            if(list[id][3] < 1 && client.traitcall.traitCheck(client,list[id][1],"CAT")[1] && !list[id][7].includes("NINELIVES")) {
              list[id][3] = 1;
              alert += `ONE TARGET USED ITS LAST OF 9 LIVES, SURVIVED AT 1 HP!\n`;
              list[id][7].push("NINELIVES");
            }
          }
        }
      }
    }

    list[target][3] -= damage;
    if(absorb==true){
      list[init[turn][0]][3]+= damage;
    }


if(client.traitcall.traitCheck(client,list[target][1],"THORNS")[1]){
  let thornDmg = Math.floor((Math.random() * (brroll[1] - 1)) + brroll[0]);
  list[init[turn][0]][3]-= thornDmg;
  alert += `TOOK ${thornDmg} DAMAGE FROM TARGET THORNS!`;

}


if(list[target][3] < 1 && client.traitcall.traitCheck(client,list[target][1],"CAT")[1] && !list[target][7].includes("NINELIVES")) {
  list[target][3] = 1;
  alert += `THE TARGET USED ITS LAST OF 9 LIVES, SURVIVED AT 1 HP!\n`;
  list[target][7].push("NINELIVES");

}





    //if(list[target][3] < 1){
      //kill(client,message,local,target,turn);
    //}

    client.strifeMap.set(strifeLocal,last,"last");

    if(alert.length==0){
      alert=`NONE`;
    }

    let embed = new client.Discord.MessageEmbed()
    .setTitle(`${attName.toUpperCase()} ${client.actionList[action].name}S ${targName.toUpperCase()}!`)
    .addField('CST', costMsg, true)
    .addField('DMG', `${(dmg * client.actionList[action].dmg)}`, true)
    .addField("ADDITIONAL ACTION", client.actionList[action].aa )
    .addField("STRIKE",strikeMsg,true)
    .addField("TARGET AV",av,true)
    .addField("HIT",`${effective}`)
    .addField("DAMAGE", damagemsg, true)
    .addField("ADDITIONAL ALERTS", alert)
    .setColor(client.actionList[action].col)
    .setImage(client.actionList[action].img);

    for(i=0;i<active.length;i++){
      if(list[active[i]][0]==true){
        let chan = client.playerMap.get(list[active[i]][1],"channel");
        client.channels.cache.get(chan).send(embed);
      }
    }

  } else {

    //if attack misses

    if(alert.length==0){
      alert=`NONE`;
    }

    let embed = new client.Discord.MessageEmbed()
    .setTitle(`${attName.toUpperCase()} ${client.actionList[action].name}S ${targName.toUpperCase()}!`)
    .addField('CST', costMsg, true)
    .addField('DMG', `${(dmg * client.actionList[action].dmg)}`, true)
    .addField("ADDITIONAL ACTION", client.actionList[action].aa )
    .addField("STRIKE",strikeMsg,true)
    .addField("TARGET AV",av,true)
    .addField("HIT",`${`MISS!`}`)
    .addField("ADDITIONAL ALERTS", alert)
    .setColor(client.actionList[action].col)
    .setImage(client.actionList[action].img);

    for(i=0;i<active.length;i++){
      if(list[active[i]][0]==true){
        let chan = client.playerMap.get(list[active[i]][1],"channel");
        client.channels.cache.get(chan).send(embed);
      }
    }

  }

  } else {
    //if att is false

    if(alert.length==0){
      alert=`NONE`;
    }

    let embed = new client.Discord.MessageEmbed()
    .setTitle(`${attName.toUpperCase()} ${client.actionList[action].name}S ${targName.toUpperCase()}!`)
    .addField('CST', costMsg, true)
    .addField('DMG', `${(dmg * client.actionList[action].dmg)}`, true)
    .addField("ADDITIONAL ACTION", client.actionList[action].aa )
    .addField("ADDITIONAL ALERTS", alert)
    .setColor(client.actionList[action].col)
    .setImage(client.actionList[action].img);

    for(i=0;i<active.length;i++){
      if(list[active[i]][0]==true){
        let chan = client.playerMap.get(list[active[i]][1],"channel");
        client.channels.cache.get(chan).send(embed);
      }
    }


  }

  let bounceChance=12;
  if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"BOUNCY")[1]){

    bounceChance=6;
  }

  client.strifeMap.set(strifeLocal,list,"list");


for(ik=0;ik<active.length;ik++){
if(list[ik][3] < 1){
  setTimeout(kill,1000,client,message,local,ik,init[turn][0]);
}else{
  if(client.traitcall.traitCheck(client,list[init[turn][0]][1],"BOUNCY")[0] && !Math.floor((Math.random() * bounceChance))){
    setTimeout(act,3000,client,message,local,"aggrieve",ik);
}
}
}

  }

  exports.act = function(client,message,local,action,target){
    act(client,message,local,action,target);
  }


  function underTurn(client, message, local, underling) {

    let strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`;

    let playerpos = client.strifeMap.get(strifeLocal,"playerpos")
    let active = client.strifeMap.get(strifeLocal,"active")

    let list = client.strifeMap.get(strifeLocal,"list")
    let turn = client.strifeMap.get(strifeLocal,"turn")
    let init = client.strifeMap.get(strifeLocal,"init")

    let stamina = list[init[turn][0]][5];
    console.log(stamina);
    console.log(list[init[turn][0]][5]);
//randomly decide target from list
    let target = playerpos[Math.floor((Math.random() * playerpos.length))];

    try{
      //depending on underling, take actions in order before passing turn with 3 second delay between each
    switch (underling){
      case "imp":
        switch(stamina){
          case 0:
            setTimeout(passTurn,3000,client,message,local);
          break;
          case 1:
            setTimeout(passTurn,3000,client,message,local);
          break;
          case 2:
            setTimeout(act,3000,client,message,local,"aggrieve",target);
            setTimeout(passTurn,6000,client,message,local);
          break;
          case 3:
            setTimeout(act,3000,client,message,local,"aggress",target);
            setTimeout(passTurn,6000,client,message,local);
          break;
          case 4:
            setTimeout(act,3000,client,message,local,"aggravate",target);
            setTimeout(passTurn,6000,client,message,local);
          break;
        }
      break;
      case "ogre":
        switch(stamina){
          case 0:
            setTimeout(passTurn,3000,client,message,local);
          break;
          case 1:
            setTimeout(passTurn,3000,client,message,local);
          break;
          case 2:
            setTimeout(act,3000,client,message,local,"assail",target);
            setTimeout(passTurn,6000,client,message,local);
          break;
          case 3:
            setTimeout(act,3000,client,message,local,"assault",target);
            setTimeout(passTurn,6000,client,message,local);
          break;
          case 4:
            setTimeout(act,3000,client,message,local,"assail",target);
            setTimeout(act,6000,client,message,local,"assail",target);
            setTimeout(passTurn,9000,client,message,local);
          break;
        }
      break;
      case "basilisk":
        switch(stamina){
          case 0:
            setTimeout(passTurn,3000,client,message,local);
          break;
          case 1:
            setTimeout(act,3000,client,message,local,"arborize",target);
            setTimeout(passTurn,6000,client,message,local);
          break;
          case 2:
            setTimeout(act,3000,client,message,local,"arborize",target);
            setTimeout(act,6000,client,message,local,"arborize",target);
            setTimeout(passTurn,9000,client,message,local);
          break;
          case 3:
            setTimeout(act,3000,client,message,local,"arborize",target);
            setTimeout(act,6000,client,message,local,"arborize",target);
            setTimeout(act,9000,client,message,local,"arborize",target);
            setTimeout(passTurn,12000,client,message,local);
          break;
          case 4:

          list = client.strifeMap.get(strifeLocal,"list")
          if(list[target][7].includes("BURN")){
            setTimeout(act,3000,client,message,local,"arborize",target);
            setTimeout(act,6000,client,message,local,"arborize",target);
            setTimeout(act,9000,client,message,local,"arborize",target);
            setTimeout(act,12000,client,message,local,"arborize",target);
            setTimeout(passTurn,15000,client,message,local);
          } else {
            setTimeout(act,3000,client,message,local,"arsonate",target);
            setTimeout(passTurn,6000,client,message,local);
          }
          break;
        }
      break;
      case "lich":
        switch(stamina){
          case 0:
            setTimeout(passTurn,3000,client,message,local);
          break;
          case 1:
            setTimeout(act,3000,client,message,local,"acupressure",target);
            setTimeout(passTurn,6000,client,message,local);

          break;
          default:
            list[init[turn][0]][5]-=2;
            client.strifeMap.set(strifeLocal,list,"list");
            setTimeout(act,3000,client,message,local,"acquire",target);

            setTimeout(lichTurn,6000,client,message,local,underling,target);
          break;
        }
        break;
        case "giclopse":
          switch(stamina){
            case 0:
              setTimeout(passTurn,3000,client,message,local);
            break;
            case 1:
              setTimeout(passTurn,6000,client,message,local);
            break;
            case 2:
              setTimeout(act,3000,client,message,local,"assail",target);
              setTimeout(passTurn,6000,client,message,local);
            break;
            case 3:
              setTimeout(act,3000,client,message,local,"assure",target);
              setTimeout(passTurn,6000,client,message,local);
            break;
            case 4:

              setTimeout(act,3000,client,message,local,"assert",target);
              setTimeout(passTurn,6000,client,message,local);
            break;
            case 5:
              setTimeout(act,3000,client,message,local,"assail",target);
              setTimeout(act,6000,client,message,local,"assure",target);
              setTimeout(passTurn,9000,client,message,local);
            break;
            case 6:
              setTimeout(act,3000,client,message,local,"annul",target);
              setTimeout(passTurn,6000,client,message,local);
            break;
          }
        break;
        case "titachnid":
          switch(stamina){
            case 0:
              setTimeout(passTurn,3000,client,message,local);
            break;
            case 1:
              setTimeout(act,3000,client,message,local,"abuse",target);
              setTimeout(passTurn,6000,client,message,local);
            break;
            case 2:
              setTimeout(act,3000,client,message,local,"abuse",target);
              setTimeout(act,6000,client,message,local,"abuse",target);
              setTimeout(passTurn,9000,client,message,local);
            break;
            case 3:
              setTimeout(act,3000,client,message,local,"abuse",target);
              setTimeout(act,6000,client,message,local,"abuse",target);
              setTimeout(act,9000,client,message,local,"abuse",target);
              setTimeout(passTurn,12000,client,message,local);
            break;
            case 4:
            list = client.strifeMap.get(strifeLocal,"list")
            if(list[target][7].includes("BURN")){
              setTimeout(act,3000,client,message,local,"absorb",target);
              setTimeout(passTurn,6000,client,message,local);
            } else {
              setTimeout(act,3000,client,message,local,"arsonate",target);
              setTimeout(passTurn,6000,client,message,local);
            }
            break;
            case 5:
            list = client.strifeMap.get(strifeLocal,"list")
            if(list[target][7].includes("BURN")){
              setTimeout(act,3000,client,message,local,"artillerate",target);
              setTimeout(act,6000,client,message,local,"abuse",target);
              setTimeout(act,9000,client,message,local,"abuse",target);
              setTimeout(act,12000,client,message,local,"abuse",target);
              setTimeout(passTurn,15000,client,message,local);
            } else {
              setTimeout(act,3000,client,message,local,"arsonate",target);
              setTimeout(passTurn,6000,client,message,local);
            }
            break;
            case 6:

            list = client.strifeMap.get(strifeLocal,"list")


            if(list[target][7].includes("BURN")){
              setTimeout(act,3000,client,message,local,"artillerate",target);
              setTimeout(act,6000,client,message,local,"absorb",target);
              setTimeout(passTurn,9000,client,message,local);
            } else {
              setTimeout(act,3000,client,message,local,"artillerate",target);
              setTimeout(act,6000,client,message,local,"arsonate",target);
              setTimeout(passTurn,9000,client,message,local);
            }
            break;
          }
        break;
    }
  } catch(err){

  }
}

  function underSpawn(client,local,underling){
    let landGrist = client.landMap.get(local[4],"grist");
    let occset = [false,underling,landGrist[Math.floor((Math.random() * 4))]];

    let sec = client.landMap.get(local[4],local[0]);

    //sec[local[1]][local[2]][2][local[3]][4].push(occset);

    //client.landMap.set(local[4],sec,local[0]);

    return(occset);
  }

  function lichTurn(client,message,local,underling,target) {

    let strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`;

  let init = client.strifeMap.get(strifeLocal,"init");
  list = client.strifeMap.get(strifeLocal,"list")
  turn = client.strifeMap.get(strifeLocal,"turn")
  stamina = list[init[turn][0]][5];

  switch(stamina){
    case 1:
      setTimeout(act,3000,client,message,local,"acupressure",target);
      setTimeout(passTurn,6000,client,message,local);
    case 2:
      setTimeout(act,3000,client,message,local,"acerbate",target);
      setTimeout(passTurn,6000,client,message,local);
    break;
    case 3:
      setTimeout(act,3000,client,message,local,"acerbate",target);
      setTimeout(act,6000,client,message,local,"acupressure",target);
      setTimeout(passTurn,9000,client,message,local);
    break;
    case 4:
      setTimeout(act,3000,client,message,local,"acerbate",target);
      setTimeout(act,6000,client,message,local,"acupressure",target);
      setTimeout(act,9000,client,message,local,"acupressure",target);
      setTimeout(passTurn,12000,client,message,local);
    break;
    case 5:
      setTimeout(act,3000,client,message,local,"acerbate",target);
      setTimeout(act,6000,client,message,local,"acupressure",target);
      setTimeout(act,9000,client,message,local,"acupressure",target);
      setTimeout(act,12000,client,message,local,"acupressure",target);
      setTimeout(passTurn,15000,client,message,local);
    break;
    case 6:
      setTimeout(act,3000,client,message,local,"annihalate",target);
      setTimeout(passTurn,6000,client,message,local);
    break;
  }

}
