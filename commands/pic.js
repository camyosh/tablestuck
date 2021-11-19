exports.run = (client, message, args) => {

let pic = args[0];
var userid = message.guild.id.concat(message.author.id);
var charid = client.userMap.get(userid,"possess");
client.charcall.setAnyData(client,userid,charid,pic,"img");
message.channel.send(`Set image url! Players can see this when they ${client.auth.prefix}check your character. If the image URL is broken, it and any character bio won't appear.`)

}
