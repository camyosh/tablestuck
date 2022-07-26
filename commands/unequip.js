const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");
exports.type = "sylladex";
exports.desc = "Unequip a weapon or other equipment"
exports.use = `">unequip" removes your currently-equipped weapon from your specibus and puts it in your sylladex.
">unequip [number]" unequips the indicated weapon from your specibus.
">unequip trinket" unequips your equipped trinket instead.
">unequip armor" unequips your equipped armor instead.`
exports.run = (client, message, args) => {
	var userid = message.guild.id.concat(message.author.id);
	var charid = client.userMap.get(userid,"possess");

	let sdex = client.charcall.charData(client,charid,"sdex");
	let scards = client.charcall.charData(client,charid,"scards");
	let spec = client.charcall.charData(client,charid,"spec");
	let kinds = client.charcall.charData(client,charid,"kinds");

	var trinket = client.charcall.charData(client,charid,"trinket");
	var armor = client.charcall.charData(client,charid,"armor");
	
	let curWeapon = client.charcall.charData(client,charid,"equip");

	if(!args[0])
	{
		//make sure strife specibus is allocated
		if(kinds.length == 0){
			message.channel.send(`Your STRIFE SPECIBUS is not currently allocated to a weaponkind, you must ${client.auth.prefix}allocate it before you can ${client.auth.prefix}equip a weapon, much less unequip one!`);
			return;
		};
		
		args[0] = "" + curWeapon;
	}

	let mess = `Successfully UNEQUIPPED the `;
	let unequipItem;

	switch(args[0].toUpperCase())
	{
		case "TRINKET":
		{
			if(trinket == "NONE" || trinket.length <= 0)
			{
				message.channel.send(`You don't have a trinket equipped!`);
				return;
			}
			unequipItem = trinket.splice(0,1)[0];
			
			mess += `${unequipItem[0]} from your TRINKET SLOT`;
		}
		break;
		
		case "ARMOR":
		case "ARMOUR":
		{
			if(armor == "NONE" || armor.length <= 0)
			{
				message.channel.send(`You don't have armor equipped!`);
				return;
			}
			unequipItem = armor.splice(0,1)[0];
			mess += `${unequipItem[0]} from your ARMOR SLOT`;
		}
		break;
		
		default:
		{
			selectIndex = parseInt(args[0], 10) - 1;
			if(isNaN(selectIndex)){
				message.channel.send("That is not a valid argument!");
				return;
			}

			if(selectIndex >= scards || selectIndex < 0){
				message.channel.send(`That is not a valid item! Check the list of items in your Sylladex with ${client.auth.prefix}sylladex`);
				return;
			}


			  if(selectIndex >= spec.length){

				if(scards <= 1) {
				  message.channel.send("Cannot unequip your last STRIFE CARD!");
				  return;
				}
				
				//decrease card count, specify a normal strife card as the returned item
				scards-=1;
				unequipItem=["STRIFE CARD","////////",1,1,[]];
			  } else {
				unequipItem=spec.splice(selectIndex,1)[0];
			  }
			mess += `${unequipItem[0]} from your STRIFE SPECIBUS`;
		}
		break;
	}

	sdex.unshift(unequipItem);
	
	// If the sylladex is over capacity, pop off a card, like always.
	if(sdex.length > client.charcall.charData(client,charid,"cards"))
	{
		let dropItem = sdex.pop();
		let local = client.charcall.charData(client,charid,"local");
		let land = local[4];
		let sec = client.landMap.get(land,local[0]);
		let area = sec[local[1]][local[2]];
		let room = area[2][local[3]];
		
		room[5].push(dropItem);
		mess += `\nYour Sylladex is full, ejecting your ${dropItem[0]}!`;
		sec[local[1]][local[2]][2][local[3]] = room;
		client.landMap.set(land,sec,local[0]);
	}
	
	client.charcall.setAnyData(client,userid,charid,scards,"scards");
	client.charcall.setAnyData(client,userid,charid,spec,"spec");
	client.charcall.setAnyData(client,userid,charid,trinket,"trinket");
	client.charcall.setAnyData(client,userid,charid,armor,"armor");
	client.charcall.setAnyData(client,userid,charid,sdex,"sdex");
	client.funcall.actionCheck(client,message,"item");
	client.funcall.tick(client,message);
	message.channel.send(mess);
}
