const tourney = false;

module.exports = (client, message) => {
  //ignore all bots
  if(message.author.bot) return;
  //ignores all pms to the bot
  if(message.guild === null) return;

  //Ignore all messages not starting with the prefix
  if(message.content.indexOf(client.auth.prefix) !== 0) return;

  //lists actions that don't increase the action counter
  var freeAct = ["register","leaderboard","stats","scratch","help","initialize","trait","act"];

  //increases the number of actions that don't count for the action counter for tournaments.
  if(tourney){
    freeAct = ["register","leaderboard","stats","scratch","help","initialize","trait","heal","consume","act","strife","switch","specibus","sylladex","captcha","eject","alchemize","armor","trinket","equip","list","inspect","pass","quickalch","grist","ath","say","rename","use","allocate","push"];
  }
  //list of all commands accepted pre-registry.
  var preReg =["register","help","ping","initialize","scratch","leaderboard","config","name"];
  //list of all commands that can be taken in strife
  var strifeAct =["act","armor","bio","check","chumcheck","chumroll","config","consume","debug","givegrist","giveitem","help","initialize","leaderboard","list","pass","pester","ping","possess","push","say","scratch","spawn","specibus","stats","strife","switch","sylladex","tutorial","trinket","trait","grist"];
  //standard argument/command name definition
  const args = message.content.slice(client.auth.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);
  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  //userid is our master reference for checking who is who, unique to each person and server.
  let userid = message.guild.id.concat(message.author.id);

// Custom - [Hair,Color,Eyes,Mouth,Glasses]

    //creates user data if they send a command for the first time.
    if(!client.userMap.has(userid)){
      let userSetup = {
        possess:"NONE",
        tutor:[],
        tutcomplete:false,
        speeddial:[],
        class:"NONE",
        aspect:"NONE",
        name:message.author.username,
        likes:[],
        dislikes:[],
        housetype:"NONE",
        charCount:0,
        channel:"NONE",
        pesterchannel:"NONE",
        ping:message.author.id,
        custom:[1,1,1,1,1]
      }
      //pushes the data to the database
      client.userMap.set(userid,userSetup);
    }

//charid is how we find what creature the user is controlling.
let charid = client.userMap.get(userid,"possess");

//defaults every player to unregistered and dead
    let reg = false;
    let alive = false;

//checks if the player has a character database and is alive or not.
    if(charid!="NONE"){
        reg=true;
      if(client.charcall.charData(client,charid,"alive")){
        alive=true;
      } else {
        alive=false;
      }
    }

//allows some commands to be run by dead and unregistered players, otherwise it ends the program.
    if(!reg&&preReg.indexOf(command)==-1){
      message.channel.send("You are not registered! Register using the >register command!");
      return;
    }
    //revive has to be allowed for dead players in the case of Godtiering.
    if(reg&&!alive&&preReg.indexOf(command)==-1){
      if(command!="revive"&&command!="possess"){
      message.channel.send("It seems you are dead! Depending on your game, you might be revived, or you might be gone for good. Have fun!");
      return;
      }
    }
    if(reg&&alive&&client.charcall.charData(client,charid,"strife")&&strifeAct.indexOf(command)==-1){
      message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
      return;
    }

//check for tournaments to see if you hit the action limit. Ignored if you're a DM, or unreigstered.
    if(reg&&client.charcall.allData(client,userid,charid,"act")>=client.limit&&client.limit!=0&&!freeAct.includes(command)&&!client.funcall.dmcheck(client,message)){
      message.channel.send("You have reached your maximum number of actions for this tournament!");
      return;
    }
//sets the bot's activity status based on if it's running a torney or not
  if (client.limit != 0) {
	 client.user.setActivity("PESTERCORD TOURNAMENT");
  } else {
    client.user.setActivity("Tablestuck Development");
  }
  // Run the command

  console.log(command);
  cmd.run(client, message, args);
};
