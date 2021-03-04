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
  if (args[1]) {
    page = parseInt(args[1], 10) - 1;
    if (isNaN(page)||page<0) {
      message.channel.send("That is not a valid argument!");
      return;
    }
  }

  async function dexCheck(){

  const attachment = await client.imgcall.sdexCheck(client,message,page,args,2,dex[value][4],dex[value][4].length,dex[value][0]);

    message.channel.send(attachment);
  }

  dexCheck();
  return;

/*  let item = dex[value];

  if (page > item[4].length / 20) {
    message.channel.send("Cannot view that page, only " + Math.floor(item[4].length / 20 + 1) + " pages exist");
    return;
  }

  let inventory = ``;
  if (item[4].length > 0) {
    let i;
    for (i = 0 + 20 * page; i < item[4].length && i < 20 + (20 * page); i++) {
      inventory += `**[${i + 1}] ${item[4][i][0]} x${item[4][i][3]}** \n${item[4][i][1]} TIER - ${item[4][i][2]}\n\n`
    }
    if (item[4].length > 20) {
      inventory += `**Page ` + (page + 1) + `/` + Math.floor(item[4].length / 20 + 1) + `**\n\n`
    }
  } else {
    inventory = "N/A"
  }

  output = new client.Discord.MessageEmbed()
    .setTitle(`**${item[0]} CONTENTS**`)
    .addField(`**ITEM INVENTORY**`, inventory)

  message.channel.send(output);*/
}
