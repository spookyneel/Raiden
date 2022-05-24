const { Command } = require('@gary50613/discord.js-command-handler');
const { MessageEmbed } = require('discord.js');
const { fetchUserStats } = require('../database/functions');

class FetchUser extends Command {
    constructor() {
        super(
            'stats',
            'fetches user\'s stats',
            '!stats <id or mention>',
            'everyone',
            ['']
        );
    };

    async execute(bot, message, args) {
        if (message.mentions.members.first()) {
            var user = message.mentions.members.first().id;
        } else if (args.length >= 1) {
            var user = args[0];
        } else {
            var user = message.author.id;
        }
        
        const stats = await fetchUserStats(user, message.guild.id);
        if (!stats) return;
        const avatar = async () => {
            var res = await message.client.users.fetch(user)
            return res.avatar;
        };
        const embed = new MessageEmbed()
        .setTitle(`Stats for ${stats.user.username}`)
        .setColor('#FFC0CB')
        .setDescription(`**XP:** \`${stats.user.xp}\`\n**Position:** \`${stats.position}\``)
        .setTimestamp()
        .setThumbnail('https://cdn.discordapp.com/avatars/'+user+'/'+await avatar()+'.jpeg')
        await message.reply({ embeds: [embed] });
    };

};

module.exports = FetchUser;