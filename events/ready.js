module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Le bot est bien connecté ${client.user.tag}`);
	},
};