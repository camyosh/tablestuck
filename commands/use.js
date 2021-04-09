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
    message.channel.send(`That is not a valid item! Check the list of items in your Sylladex with ${client.auth.prefix}sylladex`);
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
      message.channel.send(`That is not a valid item! Check the list of items in your Sylladex with ${client.auth.prefix}sylladex`);
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

      if(selectCode.charAt(0) == "/" && (sdex[selectDex][0] == "SBURB DISC")){

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
    else if(room[5][selectRoom][1].charAt(0) == "/"){
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
            message.channel.send(`Both CARD SLOTS on the TOTEM LATHE are full! Take them out using the ${client.auth.prefix}captcha command`);
            return;
          }
        } else if(selectCode == "########" && sdex[selectDex][0] == "CRUXITE DOWEL"){
          switch(room[5][selectRoom][4].length){
            case 0:
              message.channel.send("You use the CRUXITE DOWEL on the TOTEM LATHE but nothing happens! Try putting a PUNCHED CARD in the TOTEM LATHE first!");
              return;
              break;
            case 1:
              sdex[selectDex][4]=[];
              if(room[5][selectRoom][4][0][4].length == 0){
                //["PERFECTLY GENERIC OBJECT","00000000",1,1,[]]
                sdex[selectDex][0]="CARVED TOTEM";
sdex[selectDex][5]="https://media.discordapp.net/attachments/808757312520585227/810335171467280394/CARVED_DOWEL.png"
                sdex[selectDex][4].push(["PERFECTLY GENERIC OBJECT","00000000",1,1,[]]);
                message.channel.send("Carved the CRUXITE DOWEL into a CARVED TOTEM");
                client.playerMap.set(charid,sdex,"sdex");
                return;
              } else if(room[5][selectRoom][4][0][4].length == 1){
                sdex[selectDex][0]="CARVED TOTEM";
sdex[selectDex][5]="https://media.discordapp.net/attachments/808757312520585227/810335171467280394/CARVED_DOWEL.png"
                sdex[selectDex][4].push(room[5][selectRoom][4][0][4][0]);
                message.channel.send("Carved the CRUXITE DOWEL into a CARVED TOTEM");
                client.playerMap.set(charid,sdex,"sdex");
                return;
              } else{
                sdex[selectDex][0]="CARVED TOTEM";
sdex[selectDex][5]="https://media.discordapp.net/attachments/808757312520585227/810335171467280394/CARVED_DOWEL.png"
                //sdex[selectDex][4].push(funcall.oror(client,room[5][selectRoom][4][0][4][0],room[5][selectRoom][4][0][4][1]));
                sdex[selectDex][4].push(funcall.alchemize(client,room[5][selectRoom][4][0][4][0],room[5][selectRoom][4][0][4][1],"||"));
                message.channel.send("Carved the CRUXITE DOWEL into a CARVED TOTEM");
                client.playerMap.set(charid,sdex,"sdex");
                return;
              }
              break;
            case 2:
            sdex[selectDex][4]=[];
            if(room[5][selectRoom][4][0][4].length == 0 || room[5][selectRoom][4][1][4].length == 0){
              //["PERFECTLY GENERIC OBJECT","00000000",1,1,[]]
              sdex[selectDex][0]="CARVED TOTEM";
sdex[selectDex][5]="https://media.discordapp.net/attachments/808757312520585227/810335171467280394/CARVED_DOWEL.png"
              sdex[selectDex][5]="https://media.discordapp.net/attachments/808757312520585227/810335171467280394/CARVED_DOWEL.png"
              sdex[selectDex][4].push(["PERFECTLY GENERIC OBJECT","00000000",1,1,[]]);
              message.channel.send("Carved the CRUXITE DOWEL into a CARVED TOTEM");
              client.playerMap.set(charid,sdex,"sdex");
              return;
            } else if(room[5][selectRoom][4][0][4].length == 1){
              if(room[5][selectRoom][4][1][4].length == 1){
                sdex[selectDex][0]="CARVED TOTEM";
sdex[selectDex][5]="https://media.discordapp.net/attachments/808757312520585227/810335171467280394/CARVED_DOWEL.png"
                //sdex[selectDex][4].push(funcall.andand(client,room[5][selectRoom][4][0][4][0],room[5][selectRoom][4][1][4][0]));
                sdex[selectDex][4].push(funcall.alchemize(client,room[5][selectRoom][4][0][4][0],room[5][selectRoom][4][1][4][0],"&&"));
                message.channel.send("Carved the CRUXITE DOWEL into a CARVED TOTEM");
                client.playerMap.set(charid,sdex,"sdex");
                return;
              } else{
                sdex[selectDex][0]="CARVED TOTEM";
sdex[selectDex][5]="https://media.discordapp.net/attachments/808757312520585227/810335171467280394/CARVED_DOWEL.png"
                //sdex[selectDex][4].push(funcall.andand(client,room[5][selectRoom][4][0][4][0],funcall.oror(client,room[5][selectRoom][4][1][4][0],room[5][selectRoom][4][1][4][1])));
                sdex[selectDex][4].push(funcall.alchemize(client,room[5][selectRoom][4][0][4][0],funcall.alchemize(client,room[5][selectRoom][4][1][4][0],room[5][selectRoom][4][1][4][1],"||"),"&&"))
                message.channel.send("Carved the CRUXITE DOWEL into a CARVED TOTEM");
                client.playerMap.set(charid,sdex,"sdex");
                return;
              }
            } else {
              if(room[5][selectRoom][4][1][4].length == 1){
                sdex[selectDex][0]="CARVED TOTEM";
sdex[selectDex][5]="https://media.discordapp.net/attachments/808757312520585227/810335171467280394/CARVED_DOWEL.png"
                //meme
                //sdex[selectDex][4].push(funcall.andand(client,funcall.oror(client,room[5][selectRoom][4][0][4][0],room[5][selectRoom][4][0][4][0]),room[5][selectRoom][4][1][4][0]));
                sdex[selectDex][4].push(funcall.alchemize(client,funcall.alchemize(client,room[5][selectRoom][4][0][4][0],room[5][selectRoom][4][0][4][0],"||"),room[5][selectRoom][4][1][4][0],"&&"));
                message.channel.send("Carved the CRUXITE DOWEL into a CARVED TOTEM");
                client.playerMap.set(charid,sdex,"sdex");
                return;
              } else{
                sdex[selectDex][0]="CARVED TOTEM";
sdex[selectDex][5]="https://media.discordapp.net/attachments/808757312520585227/810335171467280394/CARVED_DOWEL.png"
                //sdex[selectDex][4].push(funcall.andand(client,funcall.oror(client,room[5][selectRoom][4][0][4][0],room[5][selectRoom][4][0][4][1]),funcall.oror(client,room[5][selectRoom][4][1][4][0],room[5][selectRoom][4][1][4][1])));

                sdex[selectDex][4].push(funcall.alchemize(client,funcall.alchemize(client,room[5][selectRoom][4][0][4][0],room[5][selectRoom][4][0][4][1],"||"),funcall.alchemize(client,room[5][selectRoom][4][1][4][0],room[5][selectRoom][4][1][4][1],"||"),"&&"));
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
          if(selectCode == "########"){

            let registry = client.playerMap.get(charid,"registry");

            let item = sdex[selectDex][4][0];

            if(client.traitcall.itemTrait(client,item,"SHITTY")){
              item[2]=1;
              item[1] = item[1][0] + "0" + item[1].substr(2);
            } else if(client.traitcall.itemTrait(client,item,"TRICKSTER")){
              item[2]=16;
              item[1] = item[1][0] + "?" + item[1].substr(2);
            } else if(client.traitcall.itemTrait(client,item,"EXQUISITE")){
              item[1] = item[1][0] + "!" + item[1].substr(2);
            }

            function checkCode(checkItem){
              return checkItem[1] == item[1];
            }

            if(registry.findIndex(checkCode)!= -1){
              message.channel.send("You've already registered an item with that code!");
              return;
            }

            registry.unshift(item);

            client.playerMap.set(charid,registry,"registry");

            message.channel.send("Registered totem to the alchemy athenaeum!")

            /*
            message.channel.send(`Placed the CARVED TOTEM onto the pedestal on the ALCHEMITER`)
            let targetItem = sdex.splice(selectDex,1)[0];
            room[5][selectRoom][4].push(targetItem);
            sec[local[1]][local[2]][2][local[3]] = room;
            client.landMap.set(land,sec,local[0]);
            client.playerMap.set(charid,sdex,"sdex");
            return;*/
          } else {
            message.channel.send("You can only place CARVED TOTEMS on the ALCHEMITER");
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
    } else if(sdex[selectDex][1].charAt(0) == "/"){



      if(sdex[selectDex][0]=="CRUXITE ARTIFACT"){
        let enterCheck = client.landMap.get(charid,"enter");

        if(enterCheck){
          message.channel.send("You've already entered the medium!");
          return;
        }

        let landName = client.landMap.get(charid,"name");

        let mediumPrototype = client.landMap.get(message.guild.id+"medium","prototype");

        let spriteProto = client.playerMap.get(`n${charid}`,"prototype");

        for(let i=0;i<spriteProto.length;i++){
          mediumPrototype.push(spriteProto[i]);
        }

        console.log(`Spriteproto = ${spriteProto}\nMedium Porto = ${mediumPrototype}`);

        client.landMap.set(message.guild.id+"medium",mediumPrototype,"prototype");

        client.landMap.set(charid,true,"enter");
        message.channel.send(`Entered the Land of ${landName[0]} and ${landName[1]}`);
        let targetItem = sdex.splice(selectDex,1);
        client.playerMap.set(charid,sdex,"sdex");

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

        let boonMsg = `Adding BOONDOLLARS to PORKHOLLOW...`;
        let newBoon = sdex[selectDex][3];

        if(client.traitcall.traitCheck(client,charid,"GAMBLING")[1]){

          boonMsg+=`\nGAMBLING TRAIT doubles your BOONDOLLARS!`;
          newBoon*=2;

        } else if(client.traitcall.traitCheck(client,charid,"GAMBLING")[0]){
          switch(Math.floor((Math.random() * 4))){

            case 0:
              newBoon = Math.floor(newBoon/2);
              boonMsg+=`\nGAMBLING TRAIT halves your BOONDOLLARS! Better luck next time!`;
            break;
            case 3:
              newBoon*=2;
              boonMsg+=`\nGAMBLING TRAIT doubles your BOONDOLLARS!`;
            break;

          }
        }

        let b = client.playerMap.get(charid,"b");
        b+= newBoon;
        let targetItem = sdex.splice(selectDex,1);
        client.playerMap.set(charid,b,"b");
        client.playerMap.set(charid,sdex,"sdex");

        boonMsg+=`\nAdded ${newBoon} BOONDOLLARS to PORKHOLLOW! You now have ${b} BOONDOLLARS!`
        message.channel.send(boonMsg);

      } else if(sdex[selectDex][0]=="RAINBOW GRIST"){

        let grist = client.playerMap.get(charid,"grist");

        for(let i=0;i<12;i++){
          grist[i+1]+=sdex[selectDex][3];
        }

        message.channel.send(`Added ${sdex[selectDex][3]} grist of all PRIMARY grist types!`);
        client.playerMap.set(charid,grist,"grist");
        let targetItem = sdex.splice(selectDex,1);
        client.playerMap.set(charid,sdex,"sdex");

      } else if(sdex[selectDex][0]=="STRIFE SPECIBUS"){

        let port = client.playerMap.get(charid,"port");

        console.log(`Portfolio count is currently ${port}, adding ${sdex[selectDex][3]}`);

        port+=sdex[selectDex][3];

        message.channel.send(`Added ${sdex[selectDex][3]} STRIFE PORTFOLIO`);
        client.playerMap.set(charid,port,"port");
        let targetItem = sdex.splice(selectDex,1);
        client.playerMap.set(charid,sdex,"sdex");


      }


       else {
        message.channel.send("You can't use that item!")
        return;
      }
    } else {
      message.channel.send("You can't use that item!");
      return;
    }

  }

}
