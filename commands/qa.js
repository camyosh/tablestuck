exports.run = (client, message, args) => {
const cmd = client.commands.get("quickalch");
cmd.run(client,message,args);
}
