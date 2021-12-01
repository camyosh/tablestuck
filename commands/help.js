
exports.run = (client, message, args) => {

  let msg = ``
  let i;
  commands = [
    [
      ">register", "Used to create a character and begin playing TABLESTUCK."
    ],[
      ">move", "Used to move between rooms in a Player's house as well as areas of a Land"
    ],[
      ">inspect", "Used to inspect the room the player is currently in and list all items and characters in the room"
    ],[
      ">captcha", "Used to pick up items in a room and store them in the SYLLADEX (Player Inventory)"
    ],[
      ">sylladex", "Used to see all of the items in a player's SYLLADEX or inspect a specific item in the sylladex"
    ],[
      ">eject", "Used to remove items from a player's SYLLADEX and place them in the room"
    ],[
      ">use", "used to interact with an object in your SYLLADEX, or have that item interact with an object in the room"
    ],[
      ">stats", "Used to see Player information like Rung and Vitality"
    ],[
      "Sburb Commands","Select this to see a help menu on commands related to SBURB"
    ],[
      "Strife Commands","Select this to see a help menu on commands related to STRIFE"
    ]/*,[
      "Walkthrough","Select this to see a basic walkthrough of the game"
    ]*/
  ]

  strifeCommands = [
    [
      ">strife", "Used to enter STRIFE"
    ],[
      ">allocate", "Used to allocate your STRIFE SPECIBUS to a WEAPONKIND so you can EQUIP a weapon"
    ],[
      ">equip", "Used to EQUIP items to your STRIFE SPECIBUS, this must be done before entering STRIFE"
    ],[
      ">specibus","Used to see all of the items in a player's STRIFE SPECIBUS or inspect a specific weapon"
    ],[
      ">switch","Used to switch between currently equipped weapons in the STRIFE SPECIBUS"
    ],[
      ">armor","Used to inspect, eject, and equip armor"
    ],[
      ">heal","Used to be fully healed by your SPRITE, Only works in a player houses after entry"
    ],[
      ">act","Used to take ACTIONS during STRIFE and ABSCONDING from strife"
    ],[
      ">pass","Used to PASS your turn during STRIFE"
    ]
  ]

  sburbCommands = [
    [
      ">connect", "Used to connect to a CLIENT PLAYER by entering a CLIENT CODE"
    ],[
      ">deploy", "Used to deploy game constructs in a CLIENT PLAYER'S house"
    ],[
      ">grist", "Used to see your own GRIST"
    ],[
      ">cache","Used to see all of your CLIENT PLAYER'S GRIST"
    ],[
      ">alchemize","Used to ALCHEMIZE an item once a totem has been placed on the ALCHEMITER"
    ],[
      ">rename","Used to change the name of an item, useful for items created through ALCHEMY"
    ],[
      ">enter","Used to go through GATES and RETURN NODES"
    ],[
      ">build","Used to BUILD up a CLIENT PLAYERS home to reach the GATES"
    ]
  ]

    if(!args[0]){

      for(i=0;i<commands.length;i++){
        msg += `**[${i+1}] ${commands[i][0]}**\n${commands[i][1]}\n\n`
      };

      let helpSend = new client.MessageEmbed()
      .setTitle("HELP MENU")
      .addField("**INSTRUCTIONS**",`Welcome to the >HELP menu! From here, you can access information on any of the commands listed bellow.
      \nThis menu, as well as every other menu in TABLESTUCK can be interacted with using the numbers next to each listing. For example, if you want to see information on the ">captcha" command, you can do so by typing ">help 4". The first argument "help" being the parent command, and the second argument "4" being the listing selection.`)
      .addField("**COMMANDS**",msg);

      message.channel.send({embeds: [helpSend]});
      return;
    }

    let helpSend;

    value = parseInt(args[0], 10) - 1;
    if(isNaN(value)){
      message.channel.send("That is not a valid argument! Remember, you need to use the numbers next to the entries! For example, >help 3 to see information on >captcha");
      return;
    }
    if(value >= commands.length || value < 0){
      message.channel.send("That is not a valid argument! Remember, you need to use the numbers next to the entries! For example, >help 3 to see information on >captcha");
      return;
    }

    select = commands[value][0]

    switch(select) {


      case ">register":

        msg = `The REGISTER command is used to create a character so you can begin playing TABLESTUCK.
        \nWhen the REGISTER command is used, a fresh CHARACTER is created and assigned to you along with a HOUSE full of randomized items. The REGISTER command can be used at any time to completely reset your CHARACTER and LAND in the event that you die or manage to softlock the game. Please note, doing this will completely reset any progress you've made.
        \nCommand usage - >register`
        strifeSend = new client.MessageEmbed()
        .setTitle("HELP MENU")
        .addField("REGISTER COMMAND",msg);
          message.channel.send({embeds: [strifeSend]});

      break;
      case ">move":

        msg = `The MOVE command is used to move between rooms in a Player's house as well as areas of a Land.
        \nWhen the MOVE command is used, if there are no additional arguments a menu listing all of the rooms in the player's current location will be sent. Using >move with one of the numbers on this list as the second argument will move the player to that room in the area. Additionally, if the player is on a LAND, they can move between areas on their land using the direction they want to use as the second argument. For example, ">move north" will move the player north on their land.
        \nCommand usage - >move [argument 2 (optional, can be a number or a direction)]`
        strifeSend = new client.MessageEmbed()
        .setTitle("HELP MENU")
        .addField("MOVE COMMAND",msg);
          message.channel.send({embeds: [strifeSend]});

      break;
      case ">inspect":

        msg = `The INSPECT command is used to inspect the room the player is currently in and list all items and characters in the room.
        \nWhen the INSPECT command is used, if there are no additional arguments a menu listing all of the current occupants of a room (Includes PLAYERS and UNDERLINGS) and all of the items in a room (along with the QUANTITY of the item, the TIER of the item, and the CAPTCHA CODE of the item) will be sent. Using >inspect with one of the numbers on the list of items as the second argument will send a detailed breakdown of an item based on the TIER and CAPTCHA CODE. This displays important information such as the WEAPONKIND, the GRIST TYPE, the TRAITS, the COMBAT ACTIONS and the ITEM INVENTORY.
        \nCommand usage - >inspect [argument 2 (optional)]`
        strifeSend = new client.MessageEmbed()
        .setTitle("HELP MENU")
        .addField("INSPECT COMMAND",msg);
          message.channel.send({embeds: [strifeSend]});

      break;
      case ">captcha":

        msg = `The CAPTCHA command is used to pick up items in a room and store them in the SYLLADEX (Player Inventory)
        \nWhen the CAPTCHA command is used, the player will CAPTCHALOGUE an item with the second argument of the command being the item's position in the room. A list of items in a room can be seen using >inspect. If you want to CAPTCHALOGUE an item that is being stored inside another item in the room, you can do so by typing a second argumet, that argument being the position of the item in the item inventory of the first item. For example, if you want to CAPTCHALOGUE the SBURB CLIENT from a MAILBOX, if the MAILBOX is position 4 in the room and the SBURB CLIENT is position 2 in the MAILBOX, it can be CAPTCHALOGUED using >captcha 4 2. When an item is CAPTCHALOGUED, it is stored in the SYLLADEX. If the SYLLADEX is full when a new item is CAPTCHALOGUED, an item will be EJECTED to make room.
        \nCommand usage - >captcha [argument 2] [argument 3 (optional)]`
        strifeSend = new client.MessageEmbed()
        .setTitle("HELP MENU")
        .addField("CAPTCHA COMMAND",msg);
          message.channel.send({embeds: [strifeSend]});

      break;
      case ">sylladex":

        msg = `The SYLLADEX command is used to see all of the items in a player's SYLLADEX or inspect a specific item in the SYLLADEX
        \nWhen the SYLLADEX command is used, if there are no additional arguments a menu listing all of the items in the player's SYLLADEX along with all CAPTCHA CARDS and remaining INVENTORY SLOTS will be sent. Using >sylladex with one of the numbers on the list of items as the second argument will send a detailed breakdown of an item based on the TIER and CAPTCHA CODE. This displays important information such as the WEAPONKIND, the GRIST TYPE, the TRAITS, the COMBAT ACTIONS and the ITEM INVENTORY.
        \nCommand usage - >sylladex [argument 2 (optional)]`
        strifeSend = new client.MessageEmbed()
        .setTitle("HELP MENU")
        .addField("SYLLADEX COMMAND",msg);
          message.channel.send({embeds: [strifeSend]});

      break;
      case ">eject":

        msg = `The EJECT command is used to remove items from a player's SYLLADEX and place them in the room
        \nWhen the EJECT command is used, the player will eject an item from their SYLLADEX with the second argument of the command being the item's position in the SYLLADEX. Attempting to EJECT an empty inventory slot in the SYLLADEX will instead EJECT a blank CAPTCHALOGUE CARD. EJECTED ITEMS are placed in the room inventory.
        \nCommand usage - >eject [argument 2]`
        strifeSend = new client.MessageEmbed()
        .setTitle("HELP MENU")
        .addField("EJECT COMMAND",msg);
          message.channel.send({embeds: [strifeSend]});

      break;
      case ">use":

        msg = `The USE command is used to interact with an object in your SYLLADEX, or have that item interact with an object in the room
        \nThe USE command takes two arguments, the first argument is the position of an item you want to interact with in your SYLLADEX, and the second (optional) argument is the position of the item in the room you would like the item from your SYLLADEX to interact with. For example, if you wanted to use a blank captchalogue card (if it is in position 3 in your sylladex) to extend your Inventory space, you would use ">use 3". Alternatively, if you want to store the CAPTCHALOGUE CARDS in a DESK (at position 1) in your room, you would use ">use 3 1".
        \nCommand usage - >use [argument 2] [argument 3 (optional)]`
        strifeSend = new client.MessageEmbed()
        .setTitle("HELP MENU")
        .addField("USE COMMAND",msg);
          message.channel.send({embeds: [strifeSend]});

      break;
      case ">stats":

        msg = `The STATS command is used to see Player information like Rung and Vitality
        \nWhen used, the STATS commands lists important player information, this includes VITALITY, GEL VISCOSITY (The maximum VITALITY a player can have), BOONDOLLARS, XP, RUNG, and the amount of XP needed to reach the next rung.
        \nCommand usage - >stats`
        strifeSend = new client.MessageEmbed()
        .setTitle("HELP MENU")
        .addField("STATS COMMAND",msg);
          message.channel.send({embeds: [strifeSend]});

      break;


      case "Strife Commands":

        if(!args[1]){
          for(i=0;i<strifeCommands.length;i++){
            msg += `**[${i+1}] ${strifeCommands[i][0]}**\n${strifeCommands[i][1]}\n\n`
          };
          let strifeSend = new client.MessageEmbed()
          .setTitle("STRIFE HELP MENU")
          .addField("**INSTRUCTIONS**",`Welcome to the >HELP menu! From here, you can access information on any of the commands listed bellow.
          \nThis menu, as well as every other menu in TABLESTUCK can be interacted with using the numbers next to each listing. For example, if you want to see information on the ">equip" command, you can do so by typing ">help 10 3". The first argument "help" being the parent command, and the second argument "10" being the listing selection for the first >help menu to access the strife command menu, and the third argument "3" being the listing selection.`)
          .addField("**COMMANDS**",msg);
            message.channel.send({embeds: [strifeSend]});
          return;
        }

        value2 = parseInt(args[1], 10) - 1;
        if(isNaN(value2)){
          message.channel.send("That is not a valid argument! Remember, you need to use the numbers next to the entries! For example, >help 3 to see information on >captcha");
          return;
        }
        if(value2 >= strifeCommands.length || value2 < 0){
          message.channel.send("That is not a valid argument! Remember, you need to use the numbers next to the entries! For example, >help 3 to see information on >captcha");
          return;
        }

        select2 = strifeCommands[value2][0]

        switch(select2){

          case ">strife":

            msg = `The STRIFE command is used to initiate STRIFE
            \nUsing the STRIFE command will change the player's game state to STRIFE. If there are any UNDERLINGS in the room with the PLAYER, they will automatically be added to STRIFE when STRIFE is initiated. If STRIFE has already been initiated by another player in the room, joining STRIFE will allow you to either fight alongside that PLAYER or fight the player themselves if you wish. STRIFE cannot be initiated if you do not have a weapon EQUIPPED. Note that only the >act and >switch commands can be taken while STRIFE is initiated. If you want to leave STRIFE, you can ABSCOND using the >act command.
            \nCommand usage - >strife`
            strifeSend = new client.MessageEmbed()
            .setTitle("STRIFE HELP MENU")
            .addField("STRIFE COMMAND",msg);
              message.channel.send({embeds: [strifeSend]});

          break;
          case ">allocate":

            msg = `The ALLOCATE command is used to ALLOCATE a WEAPONKIND to your STRIFE SPECIBUS
            \nUsing the ALLOCATE command with the second argument being the position of a weapon in the SYLLADEX will allocate the PLAYER'S STRIFE SPECIBUS to that WEAPONKIND. This must be done before EQUIPPING a weapon and is permanent.
            \nCommand usage - >allocate [argument 2]`
            strifeSend = new client.MessageEmbed()
            .setTitle("STRIFE HELP MENU")
            .addField("ALLOCATE COMMAND",msg);
              message.channel.send({embeds: [strifeSend]});

          break;
          case ">equip":

            msg = `The EQUIP command is used to EQUIP a weapon to your STRIFE SPECIBUS
            \nUsing the EQUIP command with the second argument being the position of a weapon in the SYLLADEX will EQUIP that weapon to the STRIFE SPECIBUS under the condition that the STRIFE SPECIBUS has been ALLOCATED to that WEAPONKIND.
            \nCommand usage - >equip [argument 2]`
            strifeSend = new client.MessageEmbed()
            .setTitle("STRIFE HELP MENU")
            .addField("EQUIP COMMAND",msg);
              message.channel.send({embeds: [strifeSend]});

          break;
          case ">specibus":

            msg = `The SPECIBUS command is used to see all of the items in a player's STRIFE SPECIBUS, INSPECT a specific weapon, or EJECT a weapon
            \nUsing the SPECIBUS command with no arguments will list all the weapons in the STRIFE SPECIBUS as well as display the number of STRIFE CARDS a player has. If the second argument is a number, a detailed inspection of the weapon at that position will be sent. If the second argument is "EJECT", a third argument can be inputted to select which weapon from the SPECIBUS is to be EJECTED.
            \nCommand usage - >specibus [argument 2 (optional, number or "eject")] [argument 3 (optional)]`
            strifeSend = new client.MessageEmbed()
            .setTitle("STRIFE HELP MENU")
            .addField("SPECIBUS COMMAND",msg);
              message.channel.send({embeds: [strifeSend]});

          break;
          case ">switch":

            msg = `The SWITCH command allows a player to change what EQUIPPED weapon they are using
            \nThe SWITCH command can be used to change what WEAPON in the STRIFE SPECIBUS the player is using. This can be done both inside and outside of STRIFE. The second argument is the position of the WEAPON in the STRIFE SPECIBUS that the player would like to switch to.
            \nCommand usage - >switch [argument 2]`
            strifeSend = new client.MessageEmbed()
            .setTitle("STRIFE HELP MENU")
            .addField("SWITCH COMMAND",msg);
              message.channel.send({embeds: [strifeSend]});

          break;
          case ">armor":

            msg = `The ARMOR command is used to INSPECT, EJECT, and EQUIP ARMOR
            \nThe ARMOR command without any arguments will send detailed information on the PLAYER'S currently equipped armor. If the second argument is EJECT, the currently EQUIPPED armor will be EJECTED. If the second argument is EQUIP, a third argument can be used to select what item from the player's SYLLADEX they would like to EQUIP. This item MUST be ARMORKIND.
            \nCommand usage - >armor [argument 2 (optional, "EJECT" or "EQUIP")] [argument 3 (optional)]`
            strifeSend = new client.MessageEmbed()
            .setTitle("STRIFE HELP MENU")
            .addField("ARMOR COMMAND",msg);
              message.channel.send({embeds: [strifeSend]});

          break;
          case ">heal":

            msg = `The HEAL command is used to be fully healed by your SPRITE, Only works in a player houses after entry
            \nThe HEAL command will heal a player if they are in their house and have completed SBRUB entry.
            \nCommand usage - >heal`
            strifeSend = new client.MessageEmbed()
            .setTitle("STRIFE HELP MENU")
            .addField("HEAL COMMAND",msg);
              message.channel.send(msg);

          break;

          case ">act":

          msg = `The HEAL command is used to take ACTIONS during STRIFE and ABSCONDING from strife"
          \nThe ACT action can only be used during STRIFE. The ACT action with no arguments will send a list of ACTIONS that the PLAYER can use with their currently EQUIPPED weapon. The first 4 options are determined by the currently EQUIPPED weapon, while the actions in position 5 and 6 will always be AGGRIEVE and ABSCOND. The ACT command with a second argument (being the selected action) will display a list of all the characters currently engaged in STRIFE. The ACT command with a third argument (Being the position of the character the player wishes to TARGET) will consume the STAMINA cost of the ACTION and perform it against the chosen TARGET.
          \nCommand usage - >act [argument 2 (action)] [argument 3 (target)]`
          strifeSend = new client.MessageEmbed()
          .setTitle("STRIFE HELP MENU")
          .addField("ACT COMMAND",msg);
            message.channel.send({embeds: [strifeSend]});

          break;

          case ">pass":

          msg = `The PASS command is used to end and pass your turn during STRIFE"
          \nUsing the PASS command will end your turn during STRIFE. This needs to be done at the end of your turn.
          \nCommand usage - >pass`
          strifeSend = new client.MessageEmbed()
          .setTitle("STRIFE HELP MENU")
          .addField("PASS COMMAND",msg);
            message.channel.send({embeds: [strifeSend]});

        break;


      }

      break;
      case "Sburb Commands":

        if(!args[1]){
          for(i=0;i<sburbCommands.length;i++){
            msg += `**[${i+1}] ${sburbCommands[i][0]}**\n${sburbCommands[i][1]}\n\n`
          };
          let sburbSend = new client.MessageEmbed()
          .setTitle("SBURB HELP MENU")
          .addField("**INSTRUCTIONS**",`Welcome to the >HELP menu! From here, you can access information on any of the commands listed bellow.
          \nThis menu, as well as every other menu in TABLESTUCK can be interacted with using the numbers next to each listing. For example, if you want to see information on the ">deploy" command, you can do so by typing ">help 9 2". The first argument "help" being the parent command, and the second argument "9" being the listing selection for the first >help menu to access the sburb command menu, and the third argument "2" being the listing selection.`)
          .addField("**COMMANDS**",msg);
          message.channel.send({embeds: [sburbSend]});
          return;
        }

        value2 = parseInt(args[1], 10) - 1;
        if(isNaN(value2)){
          message.channel.send("That is not a valid argument! Remember, you need to use the numbers next to the entries! For example, >help 3 to see information on >captcha");
          return;
        }
        if(value2 >= sburbCommands.length || value2 < 0){
          message.channel.send("That is not a valid argument! Remember, you need to use the numbers next to the entries! For example, >help 3 to see information on >captcha");
          return;
        }

        select2 = sburbCommands[value2][0]


        switch(select2){

          case ">connect":

            msg = `The CONNECT command is used to connect to a CLIENT PLAYER by entering a CLIENT CODE
            \nTo use the CONNECT command, you must either be in a room with a computer that has SBURB installed, or have one in your SYLLADEX. The CONNECT command with no arguments will send your own CLIENT CODE. The CONNECT command with the second argument being your CLIENT PLAYER'S CLIENT CODE will connect that player to you as their SERVER and your CLIENT.
            \nCommand usage - >connect [argument 2 (optional)]`
            strifeSend = new client.MessageEmbed()
            .setTitle("SBURB HELP MENU")
            .addField("CONNECT COMMAND",msg);
              message.channel.send({embeds: [strifeSend]});

          break;
          case ">deploy":

            msg = `The DEPLOY command is used to deploy game constructs in a CLIENT PLAYER'S house
            \nTo use the DEPLOY command, you must either be in a room with a computer that has SBURB installed, or have one in your SYLLADEX. The DEPLOY command with no ARGUMENTS will display a list of DEPLOYABLE constructs as well as the GRIST COST for each construct. The DEPLOY command with a second argument (being the selected construct) will display a list of the rooms in a client player's house. The DEPLOY command with a third argument (being the selected room to deploy the construct in) will DEPLOY the construct.
            \nCommand usage - >deploy [argument 2] [argument 3]`
            strifeSend = new client.MessageEmbed()
            .setTitle("SBURB HELP MENU")
            .addField("DEPLOY COMMAND",msg);
              message.channel.send({embeds: [strifeSend]});

          break;
          case ">grist":

            msg = `The EQUIP command is used to see your own GRIST
            \nUsing the GRIST command will send you a list of all GRIST TYPES and how many of each GRIST TYPE you have. It also displays the GRIST CAP for your RUNG, which is the maximum amount of a grist type you can have.
            \nCommand usage - >grist`
            strifeSend = new client.MessageEmbed()
            .setTitle("SBURB HELP MENU")
            .addField("GRIST COMMAND",msg);
              message.channel.send({embeds: [strifeSend]});

          break;
          case ">cache":

            msg = `The CACHE command is used to see your CLIENT PLAYER'S GRIST
            \nTo use the CACHE command, you must either be in a room with a computer that has SBURB installed, or have one in your SYLLADEX. Using the CACHE command will send you a list of all GRIST TYPES and how many of each GRIST TYPE your CLIENT PLAYER has. It also displays the GRIST CAP for their RUNG, which is the maximum amount of a grist type they can have.
            \nCommand usage - >cache`
            strifeSend = new client.MessageEmbed()
            .setTitle("SBURB HELP MENU")
            .addField("CACHE COMMAND",msg);
              message.channel.send({embeds: [strifeSend]});

          break;
          case ">alchemize":

            msg = `The ALCHEMY command allows a player to ALCHEMIZE an item once a totem has been placed on the ALCHEMITER
            \nThe ALCHEMIZE command can only be used if you are in a room with an ALCHEMITER. If a CARVED TOTEM is placed on the ALCHEMITER (which can be done using the >use command), the ALCHEMIZE command will send the GRIST COST of the item you are about to ALCHEMIZE. To confirm you want to spend the grist, send the ALCHEMY COMMAND with a second argument, that argument being the quantity of the item you wish to ALCHEMIZE. The ALCHEMIZED item will be placed in the ROOM with the ALCHEMITER.
            \nCommand usage - >alchemize [argument 2 (optional)]`
            strifeSend = new client.MessageEmbed()
            .setTitle("SBURB HELP MENU")
            .addField("ALCHEMIZE COMMAND",msg);
              message.channel.send({embeds: [strifeSend]});

          break;
          case ">rename":

            msg = `The RENAME command is used to change the name of an item, useful for items created through ALCHEMY
            \nThe RENAME command sent with the first argument being the position of the item you would like to rename in your SYLLADEX, and everything after that being the new name of the item. Some items cannot be renamed.
            \nCommand usage - >rename [argument 2] [new item name]`
            strifeSend = new client.MessageEmbed()
            .setTitle("SBURB HELP MENU")
            .addField("RENAME COMMAND",msg);
              message.channel.send({embeds: [strifeSend]});

          break;
          case ">enter":

            msg = `The ENTER command is used to go through GATES and RETURN NODES"
            \nThe ENTER command can be used if you are at a GATE on a land, a RETURN NODE, or in your HOUSE. If you are at a GATE or NODE, you will be sent through it with just the >enter command. If you are in a house, the enter command without a second argument will list all 7 of the gates above the house and whether or not you can reach them.
            \nCommand usage - >enter [argument 2(optional)]`
            strifeSend = new client.MessageEmbed()
            .setTitle("SBURB HELP MENU")
            .addField("ENTER COMMAND",msg);
              message.channel.send({embeds: [strifeSend]});

          break;

          case ">build":

          msg = `The BUILD command is used to BUILD up a CLIENT PLAYERS house "
          \nThe BUILD command with the second argument being the amount of BUILD GRIST you want to spend on BUILDING your CLIENT PLAYERS house up towards their GATES. This number is expended from the CLIENTS BUILD GRIST.
          \nCommand usage - >build [argument 2]`
          strifeSend = new client.MessageEmbed()
          .setTitle("SBURB HELP MENU")
          .addField("BUILD COMMAND",msg);
            message.channel.send({embeds: [strifeSend]});

          break;

      }

      break;


    }

}
