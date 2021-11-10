
exports.run = (client, message, args) => {

  var userid = message.guild.id.concat(message.author.id);

 let custom = [1,1,1,1,1];

 if(args.length>custom.length){
   message.channel.send("Too many arguments!")
 }

 for(i=0;i<args.length;i++){

   let value = parseInt(args[i],10);

   if(isNaN(value)||value>4||value<1){
     message.channel.send("Please enter a value between 1 and 4");
     return;
   }

   custom[i]=value;

 }

 client.imgcall.characterImg(client, message, custom)

}
