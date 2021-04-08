exports.run = (client, message, args) => {

    if(client.strifecall.strifeTest(client, message, message.author) == true){
      message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
      return;
    }

  //defining the costs to alchemize the item based on the tier

    const tierCost = [0,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768,65536,131072]

  //defining important variables

    var charid = message.guild.id.concat(message.author.id);
    var local = client.playerMap.get(charid,"local");
    let land = local[4];
    let sec = client.landMap.get(land,local[0]);
    let area = sec[local[1]][local[2]];
    let room = area[2][local[3]];
    var gristCheck = client.playerMap.get(charid,"grist");
    let sdex = client.playerMap.get(charid,"sdex");
    let registry = client.playerMap.get(charid,"registry");

  //define variables for the FOR loop

    let i;
    let alchemiter = false;
    let item;
    let cost1;
    let cost2;
    let grist;
    let quick = false;

  //Check every item in the room to find alchemiter, if there is check for any cruxite artifact


    for(i=0;i<room[5].length;i++){
      if(room[5][i][1].charAt(0) == "/"&&(room[5][i][0]=="ALCHEMITER"||room[5][i][0]=="INSTANT ALCHEMITER")){
        alchemiter=true;
        if(room[5][i][0]=="INSTANT ALCHEMITER"){
          quick=true;
        }
      }
    }

   if(alchemiter==true||client.traitcall.compTest(client,message,charid,room)[1]){

     if(!args[0] || args[0] == "page"){
       let page = 0;
       if (args[1]&&args[0] == "page") {
         page = parseInt(args[1], 10) - 1;
         if (isNaN(page)||page<0) {
           message.channel.send("That is not a valid page number!");
           return;
         }
       }

       async function dexCheck(){

       const attachment = await client.imgcall.alchCheck(client,message,page,args,registry,[],"alchemy athenaeum");

         message.channel.send(attachment);
       }

       dexCheck();
       return;
   } else if(!isNaN(parseInt(args[0], 10) - 1)){

     let value = parseInt(args[0], 10) - 1;

     if(value<0||value>=registry.length){
       message.channel.send("That is not a valid selection!");
     }

     async function itemInspect(){
     const attachment = await client.imgcall.inspect(client,message,args,4,registry[value]);

       message.channel.send("Inspecting item",attachment);
     }
     itemInspect()

   } else if(args[0]=="delete"){

     if(!args[1]){
       message.channel.send("Select an item from the athenaeum to delete!");
       return;
     }

     let value = parseInt(args[1], 10) - 1;

     if(isNaN(value)||value<0||value>=registry.length){
       message.channe.send("That is not a valid selection!");
     }

     let deleted = registry.splice(value,1);
     message.channel.send(`Deleted the ${deleted[0][0]} from the athenaeum!`);

     client.playerMap.set(charid,registry,"registry");

   } else if(args[0]=="push"){

     if(!args[1]){
       message.channel.send("Select an item to push to the front of your athenaeum!");
       return;
     }

     let value = parseInt(args[1], 10) - 1;

     if(isNaN(value)||value<0||value>=registry.length){
       message.channe.send("That is not a valid selection!");
       return;
     }

     let temp = registry.splice(value,1);

     registry.unshift(temp[0]);

     message.channel.send(`moved the ${temp[0][0]} to the first position in the athenaeum!`);
     client.playerMap.set(charid,registry,"registry");

   } else if(args[0]=="tier"){
     if(!quick){
       message.channel.send("You need an INSTANT ALCHEMITER for that!");
       return;
     }

     if(!args[1]){
       message.channel.send(`Select an item in the ATHENAEUM to change the TIER of using the INSTANT ALCHEMITER'S ENLARGER. \n${client.auth.prefix}athenaeum tier [item] [tier]`);
       return;
     }

     if(!args[2]){
       message.channel.send("Select a desired TIER between 1 and 16");
       return;
     }

     let value = parseInt(args[1], 10) - 1;

     if(isNaN(value)||value<0||value>=registry.length){
       message.channe.send("That is not a valid selection!");
       return;
     }

     let tier = parseInt(args[2], 10);

     if(isNaN(tier)||tier<1||tier>16){
       message.channel.send("That is not a valid TIER");
       return;
     }

     registry[value][2]=tier;
     client.playerMap.set(charid,registry,"registry");
     message.channel.send(`Scaled the ${registry[value][0]} to TIER ${tier}!`);
     return;

   }
 }else{
   message.channel.send("To see and interact with your athenaeum, you need to be in a room with an ALCHEMITER or COMPUTER with SBURB installed");
   return;
 }

}
