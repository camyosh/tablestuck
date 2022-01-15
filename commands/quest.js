exports.run = (client, message, args) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");

  var questProgress = client.charcall.allData(client,userid,charid,"questProgress");
  if(questProgress=="NONE"){
    message.channel.send("This character can't complete quests!");
    return;
  }
  let length = questProgress.length;
  let noQuests = false;
  if(length==0){
    length = 1;
    noQuests = true;
  }
  client.Canvas.registerFont("./miscsprites/fontstuck.ttf",{family:`FONTSTUCK`});
  client.Canvas.registerFont("./miscsprites/Courier Std Bold.otf",{family:`Courier Standard Bold`});

  let lines = 1;
  function splitText(canvas,ctx,msg,width){

    let i = 0;
    let k = 0;
    let buildmsg = "";
    while(k<msg.length){
      if(msg.charAt(k)==`\n`){
        i = 0;
        buildmsg = "";
        lines++;
      } else {
      buildmsg += msg.charAt(k);
      if(msg.charAt(k)==` `&&ctx.measureText(buildmsg).width>=width){
        var msg1 = msg.substring(0,k);
        var msg2 = msg.substring(k+1);
        msg = msg1+`\n`+msg2;
        buildmsg = "";
        lines++;
        i=0;
      }
      }
      k++;
      i++;
    }
      return(msg);
  }

  if(!args[0]){
    const canvas = client.Canvas.createCanvas(400,50+50*length);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = "#ffffff";
    ctx.strokeRect(0,0,canvas.width,50);
    ctx.font = "bold 20px FONTSTUCK";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("quests:",200,28);
    if(noQuests){
      ctx.strokeRect(0,50,canvas.width,100);
      ctx.font = "bold 14px FONTSTUCK";
      ctx.fillText("no quests",200,78);
    } else {
      for(let i=1;i<=length;i++){
      ctx.font = "bold 12px FONTSTUCK";
      ctx.strokeRect(0,50*i,canvas.width,50+50*i);
      ctx.textAlign = "left";
      ctx.fillText(`${i}) ${questProgress[i-1].title}`,15,28+50*i);
      ctx.textAlign = "right";
      ctx.fillText(`${questProgress[i-1].progress}/${questProgress[i-1].goal}`,385,28+50*i);
      }
    }

      let attachment = new client.MessageAttachment(canvas.toBuffer(), 'dialogue.png');
      message.channel.send({files: [attachment]});
      return;

  }
  let select = parseInt(args[0],10);
  if(!isNaN(select)){
    if(noQuests){
      message.channel.send("You have no active quests to check!");
      return;
    }
    if(select<=0||select>length){
      message.channel.send(`That's not a valid quest number, you only have ${length} quests right now!`);
      return;
    }
    const canvas = client.Canvas.createCanvas(400,200);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = "#ffffff";
    ctx.strokeRect(0,0,canvas.width,50);
    ctx.font = "bold 20px FONTSTUCK";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${questProgress[select-1].title}:`,200,28);
    ctx.strokeRect(0,50,canvas.width,200);
    ctx.font = "bold 20px Courier Standard Bold";
    msg = questProgress[select-1].desc[(questProgress[select-1].completed?1:0)]
      msg = splitText(canvas,ctx,msg,300);
    ctx.fillText(`${msg}`,200,150-20*lines);
    let attachment = new client.MessageAttachment(canvas.toBuffer(), 'dialogue.png');
    message.channel.send({files: [attachment]});
    return;
  }
  if(args[0]=="accept"){
    let questFound = false;
    let local = client.charcall.charData(client,charid,"local");
    let sec = client.landMap.get(local[4],local[0]);
    let occList = sec[local[1]][local[2]][2][local[3]][4];

    let questIdList = [];
        for(let i=0;i<questProgress.length;i++){
          questIdList.push(questProgress[i].id);
        }

    for(let i=0;i<occList.length;i++){
      if(client.charcall.hasData(client,occList[i][1],"questData")){
        questData = client.charcall.charData(client,occList[i][1],"questData");
      for(let j=0;j<questData.length;j++){
        if(questData[j].completion==0&&!questIdList.includes(questData[j].id)){
          message.channel.send("Quest accepted! Check your quest list to monitor your progress.");
          questProgress.push({
                              id:questData[j].id,
                              title:questData[j].title,
                              desc:questData[j].desc,
                              progress:0,
                              goal:questData[j].goal,
                              type:questData[j].type,
                              completed:false});
          client.charcall.setAnyData(client,userid,charid,questProgress,"questProgress");
          questData[j].completion=1;
          client.charcall.setAnyData(client,`~`,occList[i][1],questData,"questData");
          return;
        }
      }
    }
    }
    if(!questFound){
      message.channel.send("No availible quest was found at this location!");
    }
  }
}
