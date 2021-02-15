exports.run = async function(client, message, args) {

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");

      let sdex = client.playerMap.get(charid,"sdex");
      let cards = client.playerMap.get(charid,"cards");

      value = parseInt(args[0], 10) - 1;
      if(isNaN(value)){
        message.channel.send("That is not a valid argument!");
        return;
    }

      if(value >= sdex.length || value < 0) {
        message.channel.send("That is not a valid argument!")
        return; 
      };

      //decypher captcha code and convert into weapon information

const attachment = await client.imgcall.inspect(client,message,args,0,sdex[value]);

  message.channel.send("Inspecting item",attachment);

}
