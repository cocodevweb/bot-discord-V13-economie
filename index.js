// Exiger les classes discord.js nécessaires
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

// Créer une nouvelle instance client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Lorsque le client est prêt, exécutez ce code (une seule fois)
client.once('ready', () => {
	console.log('Ready!');
});

// Connectez-vous à Discord avec le token de votre client
client.login(token);
