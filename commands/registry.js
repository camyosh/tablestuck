const phernalia = ["cruxtruder","totem lathe","alchemiter","pre-punched card","punch designix","instant alchemiter"]

exports.run = async function(client, message, args) {

  var charid = message.guild.id.concat(message.author.id);

//retrieve player location and check for computer

  var local = client.playerMap.get(charid,"local");
  var room = client.landMap.get(local[4],local[0])[local[1]][local[2]][2][local[3]];

  let defaultRegistry = [client.registry["cruxtruder"].item,client.registry["totem lathe"].item,client.registry["alchemiter"].item,client.registry["pre-punched card"].item,client.registry["punch designix"].item,client.registry["instant alchemiter"].item]

  let compCheck = client.traitcall.compTest(client,message,charid,room);

  if(compCheck[0]==false){
    message.channel.send("To use SBURB commands, you must have an item with the COMPUTER trait either in your Inventory or in the room you are in.");
    return;
  }
  if(compCheck[1]==false){
    message.channel.send("It seems that you have a computer, but you don't have SBURB installed on it!");
    return;
  }

  if(client.playerMap.get(charid,"client") == "NA") {
    message.channel.send("You aren't connected to a client!");
    return;
  }

  let clientId = message.guild.id.concat(client.playerMap.get(charid,"client"));

//retrieve client information

  let clientLocal = client.playerMap.get(clientId,"local");
  let clientSec = client.landMap.get(clientId,"h");
  let gristType = client.landMap.get(clientId,"grist")[0];
  let deployCheck = client.playerMap.get(clientId,"deploy");
  let gristCheck = client.playerMap.get(clientId,"grist");
  let clientRegistry = client.playerMap.get(clientId,"registry");

  let registry = defaultRegistry.concat(clientRegistry);

  let defCost = [];
  let grist;
  let cost;

  for(i=0;i<phernalia.length;i++){
    if(phernalia[i]=="punch designix"){

      grist = gristType;
      cost = 4;

    }else{
      grist = "build";
    if(deployCheck[i]==false){
      cost = client.registry[phernalia[i]].cost;
    } else {
      cost = client.registry[phernalia[i]].costT;
    }
  }
    defCost.push([grist,cost]);

  }

  if(!args[0] || args[0] == "page"){
    let page = 0;
    if (args[0]&&args[0] == "page") {
      page = parseInt(args[1], 10) - 1;
      if (isNaN(page)||page<0) {
        message.channel.send("That is not a valid page number!");
        return;
      }
    }

    async function dexCheck(){

    const attachment = await client.imgcall.alchCheck(client,message,page,args,registry,defCost,"phernalia registry");

      message.channel.send(attachment);
    }

    dexCheck();
    return;
  }



}
