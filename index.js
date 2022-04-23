const fs = require('node:fs');
const { Client, Intents, Collection } = require('discord.js');
const { token, database_uri } = require('./config.json');
const mongoose = require("mongoose");
const { collection } = require('./utils/models');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	} else {
		client.on(event.name, (...args) => event.execute(client, ...args));
	}
}

process.on("ext", code => {
	collection.log(`Exiting with code ${code}`);
});

process.on("uncaughtException", (err, origin) => {
	collection.error(`Uncaught exception: ${err}`);
	console.error(`Origin: ${origin}`);
});

process.on("unhandledRejection", (reason, promise) => {
	console.error(`Unhandled rejection: ${reason}`);
	console.error(`Promise: ${promise}`);
});

process.on("warning", (...args) => console.log(...args));

mongoose.connect(database_uri, {
	autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
}).then(() => console.log("La base de donnée est bien connecté !")).catch(err => console.error(err));

client.login(token);