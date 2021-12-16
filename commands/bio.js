exports.run = (client, message, args) => {

if(!args[0]){
  message.channel.send("Bio cannot be empty!");
  return;
}

var userid = message.guild.id.concat(message.author.id);
var charid = client.userMap.get(userid,"possess");

  var i=0;
  var output ="";
  while(args[i]){
    if(args[i].includes("@")){
      args[i]=args[i].slice(args[i].indexOf("@")+1);
    }
    output = output + args[i]+" ";
    i++
  }
  output = output.slice(0,-1);

client.charcall.setAnyData(client,userid,charid,output,"bio");
client.tutorcall.progressCheck(client,message,17,["text",`Saving Bio, players can see it using the ${client.auth.prefix}check command on you! Note, if the bio is too long, it won't appear!`]);

}
