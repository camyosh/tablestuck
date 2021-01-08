const funcall = require("../modules/funcall.js");
const strifecall = require("../modules/strifecall.js");
//simple ping command to check if the bot is online.

exports.run = (client, message, args) => {

  if(funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

  if(strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
    return;
  }

  var charid = message.guild.id.concat(message.author.id);

  let local = client.playerMap.get(charid,"local");
  let land = local[4];
  let sec = client.landMap.get(land,local[0]);
  let area = sec[local[1]][local[2]];
  let room = area[2][local[3]];
  let sdex = client.playerMap.get(charid,"sdex");

  selectDex = parseInt(args[0], 10) - 1;
  if(isNaN(selectDex)){

    message.channel.send("That is not a valid argument!");
    return;
  }
  if(selectDex >= sdex.length || selectDex< 0){
    message.channel.send("That is not a valid item! Check the list of items in your Sylladex with >sylladex");
    return;
  }
  var selectCode
  try{
  selectCode = sdex[selectDex][1];
} catch(err){
  console.log("WHAT THE FUCK IS THIS");
  console.log(sdex);
  console.log(selectDex);
}
  if(args[1]) {
    selectRoom = parseInt(args[1], 10) - 1;
    if(isNaN(selectRoom)){
      message.channel.send("That is not a valid argument!");
      return;
    }
    if(selectRoom >= room[5].length || selectRoom < 0){
      message.channel.send("That is not a valid item! Check the list of items in your Sylladex with >sylladex");
      return;
    }
    //var roomCode = room[5][selectRoom][1]

    //if(client.traitList[client.captchaCode.indexOf(roomCode.charAt(2))] == "STORAGE" || client.traitList[client.captchaCode.indexOf(roomCode.charAt(3))] == "STORAGE"){
    if(client.traitcall.itemTrait(client,room[5][selectRoom],"STORAGE")){
      message.channel.send(`Stored the ${sdex[selectDex][0]} in the ${room[5][selectRoom][0]}`)
      let targetItem = sdex.splice(selectDex,1)[0];
      room[5][selectRoom][4].push(targetItem);
      sec[local[1]][local[2]][2][local[3]] = room;
      client.landMap.set(land,sec,local[0]);
      client.playerMap.set(charid,sdex,"sdex");
      return;
    }
    //else if(client.traitList[client.captchaCode.indexOf(roomCode.charAt(2))] == "COMPUTER" || client.traitList[client.captchaCode.indexOf(roomCode.charAt(3))] == "COMPUTER"){
    else if(client.traitcall.itemTrait(client,room[5][selectRoom],"COMPUTER")){

      if(selectCode == "////////" && (sdex[selectDex][0] == "SBURB SERVER" || sdex[selectDex][0] == "SBURB CLIENT")){

      message.channel.send(`Installed the ${sdex[selectDex][0]} onto the ${room[5][selectRoom][0]}`)
      let targetItem = sdex.splice(selectDex,1)[0];
      room[5][selectRoom][4].push(targetItem);
      sec[local[1]][local[2]][2][local[3]] = room;
      client.landMap.set(land,sec,local[0]);
      client.playerMap.set(charid,sdex,"sdex");
      return;
    } else {
      message.channel.send("You can only install SBURB DISCS onto a computer!");
      return;
    }
    }
    else if(room[5][selectRoom][1] == "////////"){
      if(room[5][selectRoom][0] == "TOTEM LATHE"){
        if(selectCode == "11111111"){
          if(room[5][selectRoom][4].length<2){

            message.channel.send(`Inserted the ${sdex[selectDex][0]} into a CARD SLOT on the TOTEM LATHE`)
            let targetItem = sdex.splice(selectDex,1)[0];
            room[5][selectRoom][4].push(targetItem);
            sec[local[1]][local[2]][2][local[3]] = room;
            client.landMap.set(land,sec,local[0]);
            client.playerMap.set(charid,sdex,"sdex");
            return;

          } else {
            message.channel.send("Both CARD SLOTS on the PUNCH DESIGNIX are full! Take them out using the >captcha command");
            return;
          }
        } else if(selectCode == "########" && sdex[selectDex][0] == "CRUXITE DOWEL"){
          switch(room[5][selectRoom][4].length){
            case 0:
              message.channel.send("You use the CRUXITE DOWEL on the TOTEM LATHE but nothing happens! Try putting a PUNCHED CARD in the TOTEM LATHE first!");
              return;
              break;
            case 1:
              if(room[5][selectRoom][4][0][4].length == 0){
                //["PERFECTLY GENERIC OBJECT","00000000",1,1,[]]
                sdex[selectDex][0]="CARVED TOTEM";
                sdex[selectDex][4].push(["PERFECTLY GENERIC OBJECT","00000000",1,1,[]]);
                message.channel.send("Carved the CRUXITE DOWEL into a CARVED TOTEM");
                client.playerMap.set(charid,sdex,"sdex");
                return;
              } else if(room[5][selectRoom][4][0][4].length == 1){
                sdex[selectDex][0]="CARVED TOTEM";
                sdex[selectDex][4].push(room[5][selectRoom][4][0][4][0]);
                message.channel.send("Carved the CRUXITE DOWEL into a CARVED TOTEM");
                client.playerMap.set(charid,sdex,"sdex");
                return;
              } else{
                sdex[selectDex][0]="CARVED TOTEM";
                sdex[selectDex][4].push(funcall.oror(client,room[5][selectRoom][4][0][4][0],room[5][selectRoom][4][0][4][1]));
                message.channel.send("Carved the CRUXITE DOWEL into a CARVED TOTEM");
                client.playerMap.set(charid,sdex,"sdex");
                return;
              }
              break;
            case 2:
            if(room[5][selectRoom][4][0][4].length == 0 || room[5][selectRoom][4][1][4].length == 0){
              //["PERFECTLY GENERIC OBJECT","00000000",1,1,[]]
              sdex[selectDex][0]="CARVED TOTEM";
              sdex[selectDex][4].push(["PERFECTLY GENERIC OBJECT","00000000",1,1,[]]);
              message.channel.send("Carved the CRUXITE DOWEL into a CARVED TOTEM");
              client.playerMap.set(charid,sdex,"sdex");
              return;
            } else if(room[5][selectRoom][4][0][4].length == 1){
              if(room[5][selectRoom][4][1][4].length == 1){
                sdex[selectDex][0]="CARVED TOTEM";
                sdex[selectDex][4].push(funcall.andand(client,room[5][selectRoom][4][0][4][0],room[5][selectRoom][4][1][4][0]));
                message.channel.send("Carved the CRUXITE DOWEL into a CARVED TOTEM");
                client.playerMap.set(charid,sdex,"sdex");
                return;
              } else{
                sdex[selectDex][0]="CARVED TOTEM";
                sdex[selectDex][4].push(funcall.andand(client,room[5][selectRoom][4][0][4][0],funcall.oror(client,room[5][selectRoom][4][1][4][0],room[5][selectRoom][4][1][4][1])));
                message.channel.send("Carved the CRUXITE DOWEL into a CARVED TOTEM");
                client.playerMap.set(charid,sdex,"sdex");
                return;
              }
            } else {
              if(room[5][selectRoom][4][1][4].length == 1){
                sdex[selectDex][0]="CARVED TOTEM";
                //meme
                sdex[selectDex][4].push(funcall.andand(client,funcall.oror(client,room[5][selectRoom][4][0][4][0],room[5][selectRoom][4][0][4][0]),room[5][selectRoom][4][1][4][0]));
                message.channel.send("Carved the CRUXITE DOWEL into a CARVED TOTEM");
                client.playerMap.set(charid,sdex,"sdex");
                return;
              } else{
                sdex[selectDex][0]="CARVED TOTEM";
                sdex[selectDex][4].push(funcall.andand(client,funcall.oror(client,room[5][selectRoom][4][0][4][0],room[5][selectRoom][4][0][4][1]),funcall.oror(client,room[5][selectRoom][4][1][4][0],room[5][selectRoom][4][1][4][1])));
                message.channel.send("Carved the CRUXITE DOWEL into a CARVED TOTEM");
                client.playerMap.set(charid,sdex,"sdex");
                return;
              }
            }
            break;
          }
        } else {
          message.channel.send("That is not a valid item!")
          return;
        }
      } else if(room[5][selectRoom][0] == "ALCHEMITER") {
        if(room[5][selectRoom][4].length==0){
          if(selectCode == "########"){
            message.channel.send(`Placed the CARVED TOTEM onto the pedestal on the ALCHEMITER`)
            let targetItem = sdex.splice(selectDex,1)[0];
            room[5][selectRoom][4].push(targetItem);
            sec[local[1]][local[2]][2][local[3]] = room;
            client.landMap.set(land,sec,local[0]);
            client.playerMap.set(charid,sdex,"sdex");
            return;
          } else {
            message.channel.send("You can only place CARVED TOTEMS on the ALCHEMITER");
          }
        } else {
          message.channel.send("The ALCHEMITER already has a TOTEM in it!")
          return;
        }
      } else if(room[5][selectRoom][0] == "PUNCH DESIGNIX"){
        if(room[5][selectRoom][4].length==0){
          if(selectCode == "11111111"){
            message.channel.send(`Inserted the ${sdex[selectDex][0]} into the CARD SLOT on the PUNCH DESIGNIX`);
            let targetItem = sdex.splice(selectDex,1)[0];
            room[5][selectRoom][4].push(targetItem);
            sec[local[1]][local[2]][2][local[3]] = room;
            client.landMap.set(land,sec,local[0]);
            client.playerMap.set(charid,sdex,"sdex");
            return;
          } else {
            message.channel.send("Before you can use the PUNCH DESIGNIX, you must first load a CAPTCHALOGUE CARD into it!")
          }
        } else {
          if(room[5][selectRoom][4][0][4].length<2){
            message.channel.send(`Punched the code for the ${sdex[selectDex][0]} onto the PUNCHED CARD`);
            let targetItem = sdex[selectDex];
            room[5][selectRoom][4][0][0]="PUNCHED CARD";
            room[5][selectRoom][4][0][4].push(targetItem);
            sec[local[1]][local[2]][2][local[3]] = room;
            client.landMap.set(land,sec,local[0]);
          } else {
            message.channel.send("You can only punch a single card twice!");
            return;
          }
        }
      }
    }
    //if only 1 argument
  } else {
    if(sdex[selectDex][0]=="CAPTCHALOGUE CARD" && sdex[selectDex][1]=="11111111"){
      message.channel.send(`Added ${sdex[selectDex][3]} CAPTCHALOGUE CARDS to your SYLLADEX`);

      let cards = client.playerMap.get(charid,"cards");
      cards += sdex[selectDex][3];

      let targetItem = sdex.splice(selectDex,1);
      client.playerMap.set(charid,sdex,"sdex");
      client.playerMap.set(charid,cards,"cards");
      return;
    } else if(sdex[selectDex][1]=="////////"){



      if(sdex[selectDex][0]=="CRUXITE ARTIFACT"){

        /*let sec1 = client.landMap.get(charid,"s1");
        let sec2 = client.landMap.get(charid,"s2");
        let sec3 = client.landMap.get(charid,"s3");
        let gates = client.landMap.get(charid,"gates");

        // sec[local[1]][local[2]][2][local[3]][4]

        sec1[gates[0][1]][gates[0][2]][0]=6;
        sec1[gates[0][1]][gates[0][2]][1]=1;
        sec1[gates[0][1]][gates[0][2]][2]=[[0,0,"GATE 2",false,[],[]]];

        sec2[gates[1][1]][gates[1][2]][0]=6;
        sec2[gates[1][1]][gates[1][2]][1]=1;
        sec2[gates[1][1]][gates[1][2]][2]=[[0,0,"GATE 4",false,[],[]]];

        sec3[gates[2][1]][gates[2][2]][0]=6;
        sec3[gates[2][1]][gates[2][2]][1]=1;
        sec3[gates[2][1]][gates[2][2]][2]=[[0,0,"GATE 6",false,[],[]]];*/

        let landName = client.landMap.get(charid,"name");
        client.landMap.set(charid,true,"enter");
        message.channel.send(`Entered the Land of ${landName[0]} and ${landName[1]}`)




        return;



      }
      if(sdex[selectDex][0]=="STRIFE CARD"){

        message.channel.send(`Added ${sdex[selectDex][3]} STRIFE CARDS to your STRIFE SPECIBUS`);

        let cards = client.playerMap.get(charid,"scards");
        cards += sdex[selectDex][3];

        let targetItem = sdex.splice(selectDex,1);
        client.playerMap.set(charid,sdex,"sdex");
        client.playerMap.set(charid,cards,"scards");
        return;
      }
      if(sdex[selectDex][0]=="BOONDOLLARS"){

        message.channel.send(`Added ${sdex[selectDex][3]} BOONDOLLARS to your PORKHOLLOW`);
        let b = client.playerMap.get(charid,"b");
        b+= sdex[selectDex][3];
        let targetItem = sdex.splice(selectDex,1);
        client.playerMap.set(charid,b,"b");
        client.playerMap.set(charid,sdex,"sdex");

      } else {
        message.channel.send("You can't use that item!")
        return;
      }
    } else {
      message.channel.send("You can't use that item!");
      return;
    }

  }

}
