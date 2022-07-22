exports.run = (client, message, args) => {
const cmd = client.commands.get("pester");
cmd.run(client,message,args);
}
