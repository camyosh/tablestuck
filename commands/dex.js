exports.run = async function(client, message, args) {

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");

      let sdex = client.playerMap.get(charid,"sdex");
      let cards = client.playerMap.get(charid,"cards");

      let page =0;

const attachment = await client.imgcall.sdexCheck(client,message,page,args,0,sdex,cards);

  message.channel.send(attachment)

}
