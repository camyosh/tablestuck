exports.type = "alchemy";
exports.desc = "List of all things alchemized"
exports.use = `">ath" lists all items you've alchemized or added to your atheneum through other means.
">ath [number]" lets you inspect an item in your atheneum.
">ath delete [number]" deletes an item from your atheneum.
">ath push [number]" moves an item in your atheneum to the front of the list for easy use.
">ath rename [number]" renames and item in your atheneum.
">ath tier [number] [tier number]" changes the tier of an item in your atheneum to the specified number, for cheaper experimentation with traits.
">ath page [pagenumber]" changes the page of your atheneum.
">ath search" will explain further arguments that can be given to the "search" subcommand.`
exports.run = (client, message, args) => {
  //defining the costs to alchemize the item based on the tier
  const tierCost = [0,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768,65536,131072];

  //defining important variables

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");


    var local = client.charcall.charData(client,charid,"local");
    let land = local[4];
    let sec = client.landMap.get(land,local[0]);
    let area = sec[local[1]][local[2]];
    let room = area[2][local[3]];
    let sdex = client.charcall.charData(client,charid,"sdex");
    let registry = client.charcall.allData(client,userid,charid,"registry");

    if(registry=="NONE"){
      message.channel.send("You don't have a registry to check!");
      return;
    }
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

  if(client.traitcall.traitCheck(client,charid,"COMPUTER")[1])
  {
    quick = true;
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

      const attachment = await client.imgcall.alchCheck(client,message,page,args,registry,[],"alchemy atheneum");

        message.channel.send({files: [attachment]});
      }

      dexCheck();
      return;
    } else if(!isNaN(parseInt(args[0], 10) - 1)){

      let value = parseInt(args[0], 10) - 1;

      if(value<0||value>=registry.length){
        message.channel.send("That is not a valid selection!");
        return;
      }

      async function itemInspect(){
      const attachment = await client.imgcall.inspect(client,message,args,4,registry[value]);

        message.channel.send({content: "Inspecting item", files: [attachment]});
      }
      itemInspect()

    } else{
      switch(args[0])
      {
      case "delete":
      {

        if(!args[1]){
          message.channel.send("Select an item from the atheneum to delete!");
          return;
        }

        let value = parseInt(args[1], 10) - 1;

        if(isNaN(value)||value<0||value>=registry.length){
          message.channel.send("That is not a valid selection!");
        }

        let deleted = registry.splice(value,1);
        message.channel.send(`Deleted the ${deleted[0][0]} from the atheneum!`);

        client.charcall.setAnyData(client,userid,charid,registry,"registry");
        break;

        }
        case "push":
        {

        if(!args[1]){
          message.channel.send("Select an item to push to the front of your atheneum!");
          return;
        }

        let value = parseInt(args[1], 10) - 1;

        if(isNaN(value)||value<0||value>=registry.length){
          message.channel.send("That is not a valid selection!");
          return;
        }

        let temp = registry.splice(value,1);

        registry.unshift(temp[0]);

        message.channel.send(`moved the ${temp[0][0]} to the first position in the atheneum!`);
        client.charcall.setAnyData(client,userid,charid,registry,"registry");
        break;

      }
      case "tier":
      {
        if(!quick){
          message.channel.send("You need an INSTANT ALCHEMITER for that!");
          return;
        }

        if(!args[1]){
          message.channel.send(`Select an item in the ATHENEUM to change the TIER of using the INSTANT ALCHEMITER'S ENLARGER. \n${client.auth.prefix}atheneum tier [item] [tier]`);
          return;
        }

        if(!args[2]){
          message.channel.send("Select a desired TIER between 1 and 16");
          return;
        }

        let value = parseInt(args[1], 10) - 1;

        if(isNaN(value)||value<0||value>=registry.length){
          message.channel.send("That is not a valid selection!");
          return;
        }

        let tier = parseInt(args[2], 10);

        if(isNaN(tier)||tier<1||tier>16){
          message.channel.send("That is not a valid TIER");
          return;
        }
        if(client.traitcall.itemTrait(client,registry[value],"SHITTY")||client.traitcall.itemTrait(client,registry[value],"TRICKSTER")){
          message.channel.send(`You can't change the tier of a ${(client.traitcall.itemTrait(client,registry[value],"SHITTY")?`SHITTY`:`TRICKSTER`)} item!`);
          return;
        }
        registry[value][2]=tier;
        client.charcall.setAnyData(client,userid,charid,registry,"registry");
        message.channel.send(`Scaled the ${registry[value][0]} to TIER ${tier}!`);
        return;

      }
      case "rename":
      {
        if(!args[1]){
          message.channel.send(`Select an item in the ATHENEUM to change the NAME of that item. \n${client.auth.prefix}atheneum name [item] [desired name]`);
          return;
        }

        if(!args[2]){
          message.channel.send("Please enter a desired name for the item!");
          return;
        }

        let value = parseInt(args[1], 10) - 1;

        if(isNaN(value)||value<0||value>=registry.length){
          message.channel.send("That is not a valid selection!");
          return;
        }

        let selectItem = registry[value];

        //combine all args except for selection
        let name = client.funcall.combineArgs(args,2);

        let code = selectItem[1];
        let oldName = selectItem[0];

        if(code == "11111111" || code.charAt(0) == "/") {
          message.channel.send("The name of that item cannot be changed!");
          return;
        }

        if(name.length > 20) {
          message.channel.send("That name is too long!");
          return;
        }

        registry[value][0]=name;

        client.charcall.setAnyData(client,userid,charid,registry,"registry");

        message.channel.send(`Changed the name of the ${oldName} to ${name}`);
        return;
      }
      case "search":
      {
        let mess = "";
        if(!args[1]){
          mess += `"${client.auth.prefix}ath search" needs additional arguments to work. Each set of two arguments acts as a search filter.`;
          // mess += `\n"code 7__00", for example, means that the item's captchalogue code must start with 7, and the 4th and 5th characters must both be 0.`;
          mess += `\n"name meat" means that the item's name must contain the substring "MEAT". Can only accept one word, but can be used more than once.`;
          mess += `\n"grist tar" means that the item's grist type must be TAR.`;
          mess += `\n"tier 3" means that the item's tier must be 3.`;
          mess += `\n"trait meta" means that the item must have the META trait. "trait same" means an item's two traits must be the same trait.`;
          mess += `\n"action accrue" means that the item must have the move ACCRUE in (at least) one of its four action slots.`;
          mess += `\n"kind bladekind" means that the item must be a BLADEKIND weapon. "kind" can accept "trinket" and "weapon" in addition to specific kinds.`;
          mess += `\nAll of these are simply examples of possible search criteria.`;
          message.channel.send(mess);
          return;
        }

        mess += "Showing filtered atheneum contents!";
        // Populate a list containing all indexes of items in the registry.
        let numbers = [];
        for(i=0; i<registry.length; i++)
        {
          numbers.push(i);
        }
        let page = 0;

        // Iterate across pairs of arguments, and apply filters each time.
        for(i = 1; args[i] && args[i+1]; i+=2)
        {
          switch(args[i].toLowerCase())
          {
          case "page":
            page = (parseInt(args[i+1], 10) - 1) || 0;
            if(page < 0)
              page = 0;
            break;
          case "tier":
            let tier = (parseInt(args[i+1], 10));
            if(isNaN(tier) || tier < 0 || tier > 16)
            {
              mess += `\n"${args[i+1]}" is not a valid tier, so that filter condition was ignored.`;
              break;
            }
            for(var j=0; j<numbers.length; j++)
            {
              if(tier != registry[numbers[j]][2])
              {
                numbers.splice(j, 1);
                j--;
              }
            }
            break;
          case "trait":
          {
            let trait = args[i+1].toUpperCase();

            if(trait == "SAME")
            {
              for(var j=0; j<numbers.length; j++)
              {
                if(registry[numbers[j]][1].charAt(2) == registry[numbers[j]][1].charAt(3))
                {
                  let character = registry[numbers[j]][1].charAt(2);
                  if(character == "/" || character == "0" || character == "1" || character == "!" || character == "?")
                  {
                    continue;
                  }
                  else
                  {
                    numbers.splice(j, 1);
                    j--;
                  }
                }
                
                // TODO: Consider adding functionality for different types of NONE being treated as the same.
                if(client.captchaCode.indexOf(registry[numbers[j]][1].charAt(2)) + client.captchaCode.indexOf(registry[numbers[j]][1].charAt(3)) != client.captchaCode.length - 2)
                {
                  numbers.splice(j, 1);
                  j--;
                }
              }
              break;
            }

            if(client.traitList.indexOf(trait) < 0)
            {
              mess += `\n"${trait}" is not a valid trait, so that filter condition was ignored.`;
              break;
            }

            for(var j=0; j<numbers.length; j++)
            {
              if(client.traitcall.itemTrait(client, registry[numbers[j]], trait) != true)
              {
                numbers.splice(j, 1);
                j--;
              }
            }
            break;
          }
          case "grist":
          {
            let goodMod = -1;
            let testChar = "?";
            let build = 15;

            switch(args[i+1].toLowerCase())
            {
            // Go ahead and get the complicated ones out of the way.
            case "diamond":
              testChar = "!";
              // fallthrough
            case "zillium":
              for(var j=0; j<numbers.length; j++)
              {
                if(registry[numbers[j]][1].charAt(1) != testChar)
                {
                  numbers.splice(j, 1);
                  j--;
                }
              }
              break;
            case "artifact":
              build = 0;
              // fallthrough
            case "build":
              for(var j=0; j<numbers.length; j++)
              {
                if(client.codeCypher[1][client.captchaCode.indexOf(registry[numbers[j]][1].charAt(1))] != build)
                {
                  numbers.splice(j, 1);
                  j--;
                }
              }
              break;
            case "rainbow":
              mess += `\nI hope you realize rainbow isn't actually a grist type.`;
              break;
            default:
              goodMod = (client.gristTypes.indexOf(args[i+1].toLowerCase()) - 1);
              if(goodMod < 0)
              {
                mess += `\n"${args[i+1]}" is not a recognized grist type, so that filter condition was ignored.`;
                break;
              }
              else
              {
                // Just in case.
                goodMod = goodMod % 12;
              }
              break;
            }

            if(goodMod >= 0)
            {
              for(var j=0; j<numbers.length; j++)
              {
                let index = client.captchaCode.indexOf(registry[numbers[j]][1].charAt(1));
                if(index < 4 || index > 63)
                {
                  numbers.splice(j, 1);
                  j--;
                }
                else if((index - 4) % 12 != goodMod)
                {
                  numbers.splice(j, 1);
                  j--;
                }
              }
            }
            break;
          }
          case "kind":
          {
            let hasRun = false;
            let goodChar = "";

            switch(args[i+1].toLowerCase())
            {
            // Go ahead and get the simple ones out of the way.
            case "construct":
              goodChar = "/";
              break;
            case "artifact":
              goodChar = "0";
              break;
            case "modus":
              goodChar = "1";
              break;
            case "armor":
              goodChar = "s";
              break;

            // Filters out anything that's not a weapon. All weapons go between 2 (hammer) and r (card).
            case "weapon":
              for(var j=0; j<numbers.length; j++)
              {
                if(registry[numbers[j]][1].charAt(0) < "2" || registry[numbers[j]][1].charAt(0) > "r")
                {
                  numbers.splice(j, 1);
                  j--;
                }
              }
              hasRun = true;
              break;
            case "trinket":
              for(var j=0; j<numbers.length; j++)
              {
                switch(registry[numbers[j]][1].charAt(0))
                {
                  case "t":
                  case "u":
                  case "v":
                  break;

                  default:
                    numbers.splice(j, 1);
                    j--;
                  break;
                }
              }
              hasRun = true;
              break;
            default:
              goodChar = client.captchaCode[client.kind.indexOf(args[i+1].toLowerCase())];
              break;
            }

            if(!hasRun)
            {
              for(var j=0; j<numbers.length; j++)
              {
                if(registry[numbers[j]][1].charAt(0) != goodChar)
                {
                  numbers.splice(j, 1);
                  j--;
                }
              }
            }
            break;
          }
          case "name":
          {
            let nameSubstring = args[i+1].toLowerCase();
            for(var j=0; j<numbers.length; j++)
            {
              if(registry[numbers[j]][0].toLowerCase().indexOf(nameSubstring) < 0)
              {
                numbers.splice(j, 1);
                j--;
              }
            }
            break;
          }
          case "action":
          case "act":
          case "move":
          {
            let moveName = args[i+1].toLowerCase();
            let moveIndex = client.action.indexOf(moveName);
            if(moveIndex < 0){
              mess += `\n"${args[i+1]}" is not a recognized action, so that filter condition was ignored.`;
              break;
            }
            
            let moveNumber = client.codeCypher[4][moveIndex];
            let moveCode = client.captchaCode[moveNumber];
            
            for(var j=0; j<numbers.length; j++)
            {
              let flag = false;
              for(let k=4; k<8; k++){
                if(registry[numbers[j]][1].charAt(k) == moveCode){
                  flag = true;
                  break;
                }
              }
              if(!flag)
              {
                numbers.splice(j, 1);
                j--;
              }
            }
            break;
          }
          default:
            mess += `\n"${args[i]}" is not a recognized filter, so it was ignored.`;
            break;
          }
          if(numbers.length == 0)
          {
            mess += `\nAfter applying "${args[i]} ${args[i+1]}", result set was empty.`;
            break;
          }
        }

        async function dexCheck(){
          const attachment = await client.imgcall.alchCheckFiltered(client,message,page,args,registry,[],"alchemy atheneum", numbers);
          message.channel.send({files: [attachment]});
        }

        dexCheck();


        message.channel.send(mess);
        return;
      }
      default:
      {
        message.channel.send(`${args[0]} is not a valid subcommand.`);
        let cmd = client.commands.get("help");
        cmd.run(client,message,["ath"]);
        return;
      }
      }
    }
  }else{
    message.channel.send("To see and interact with your atheneum, you need to be in a room with an ALCHEMITER or COMPUTER with SBURB installed");
    return;
  }
}
