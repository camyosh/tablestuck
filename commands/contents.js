exports.run = (client, message, args) => {
  if (client.strifecall.strifeTest(client, message, message.author) == true) {
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
    return;
  }

  if (!args[0]) {
    message.channel.send("Choose an item from the room to view its contents!");
    return;
  }

  let value = parseInt(args[0], 10) - 1;
  if (isNaN(value)) {
    message.channel.send("That is not a valid argument!");
    return;
  }

  let charid = message.guild.id.concat(message.author.id);
  let local = client.playerMap.get(charid, "local");
  let land = local[4];
  let sec = client.landMap.get(land, local[0]);
  let area = sec[local[1]][local[2]];
  let room = area[2][local[3]];
  let dex = room[5];

  if (value >= dex.length || value < 0) {
    message.channel.send("That is not a valid argument!")
    return;
  }

  let page = 0;
  if (args[1] == "page") {
    page = parseInt(args[2], 10) - 1;
    if (isNaN(page)||page<0) {
      message.channel.send("That is not a valid argument!");
      return;
    }
  } else if (args[1]) {
    // Viewing a specific item in the container
    subValue = parseInt(args[1], 10) - 1;
    if(isNaN(subValue)){
      message.channel.send("That is not a valid argument!");
      return;
    }
    
    if(subValue >= dex.length || subValue < 0) {
      message.channel.send("That is not a valid argument!")
      return;
    }

    async function itemInspect(){
      const attachment = await client.imgcall.inspect(client,message,args,0,dex[value][4][subValue]);
    
      message.channel.send("Inspecting item",attachment);
    }
    itemInspect()
    return;
  }

  // View a page of items
  async function dexCheck() {
    const attachment = await client.imgcall.sdexCheck(client,message,page,args,2,dex[value][4],dex[value][4].length,dex[value][0]);
    message.channel.send(attachment);
    client.tutorcall.progressCheck(client,message,12);
  }

  dexCheck();
}
