exports.get = function(client, message, datatype){
	return get(client, message.guild.id, datatype.toUpperCase());
}

exports.getWithGuildID = function(client, guildID, datatype){
	return get(client, guildID, datatype.toUpperCase());
}

function get(client, guildID, datatype){
	let retVal = "NONE";
	
	if(!client.configMap.has(guildID) || (client.configMap.get(guildID).settings == undefined)){
		generateSettings(client, guildID);
	}
	
	if(client.configMap.has(guildID)){
		let settings = client.configMap.get(guildID).settings;
		if(settings[datatype] == undefined){
			let index = client.optionsNames.indexOf(datatype);
			if(index >= 0){
				retVal = client.configMap.get(guildID).options[index].selection;
			}
			else{
				let options = client.configMap.get(guildID).options;
				for(let i=client.optionsNames.length; i<options.length; i++){
					if(options[i].name == datatype){
						retVal = options[i];
						break;
					}
				}
			}
		}
		else{
			retVal = settings[datatype];
		}
	}
	return retVal;
}

exports.generateSettings = function (client, guildID){
	generateSettings(client, guildID);
}

function generateSettings(client, guildID){
	let options = undefined;
	let settings = {};
	
	// Populate options Array
	if(!client.configMap.has(guildID)){
		let defaultConfig = require("../config.json");
		console.log("creating a new config file!");
		client.configMap.set(guildID,defaultConfig);

		let options = client.configMap.get(guildID);
		
		// If the default options file contains a settings dictionary, then we can just use that.
		if(options.settings != undefined){
			settings = options.settings;
		}
		
		options = options.options;
	}
	else{
		options = client.configMap.get(guildID).options;
	}
	
	for(let i=0; i<options.length; i++){
//	In terms of performance, it may be better to skip this part, and simply load EVERYTHING into settings.
//		// All options created before the "default" field was added had a default value of 0.
//		// If "option.default" is undefined, "(option.default || 0)" should evaluate to 0.
//		// Why? Because Javascript is terrible.
//		if(options[i].selection === (option.default || 0)){
//			continue;
//		}
		let name = options[i].name;
		settings[name] = options[i].selection;
	}
	client.configMap.set(guildID, {options: options, settings: settings});
	return settings;
}



exports.set = function(client, message, datatype, value){
	datatype = datatype.toUpperCase();
	let guildID = message.guild.id;
	let options;
	let settings;
	
	if(!client.configMap.has(guildID) || (client.configMap.has(guildID).settings == undefined)){
		settings = generateSettings(client, guildID);
		options = client.configMap.get(guildID).options;
	}
	else{
		let config = client.configMap.get(guildID);
		settings = config.settings;
		options = config.options;
	}
	
	settings[datatype] = value;
	client.configMap.set(guildID, {options: options, settings: settings});
}
