const { SlashCommandBuilder } = require('@discordjs/builders');
const { createMember } = require('../utils/utilities');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Configuration du bot'),
	async execute(interaction) {
		return interaction.reply("Bienvenue merci d'avoir choisie ce bot !")
	},
};