const { Command } = require('@gary50613/discord.js-command-handler');
const { MessageEmbed } = require('discord.js');
const { deductXP } = require('../database/functions')

class Deduct extends Command {
    constructor() {
        super(
            'deduct',
            'deducts XP',
            '!deduct <id>',
            'owner',
            ['']
        );
    };
    
    async execute(bot, message, args) {
        if (message.author.id !== process.env['OWNER']) return;
        var userId = args[0]
        var guildId = message.guild.id;
        var XP = args[1];
        await deductXP(userId, guildId, XP).then(async(user, err) => {
            if (!err) {
                const embed = new MessageEmbed()
                .setColor('#FFC0CB')
                .setDescription(`I've deducted \`${XP}\` points from <@${userId}>`)
                .setTimestamp()
                await message.reply({ embeds: [embed] });
            } else if (err) {
                console.log(err);
                await message.reply(`Ran into an error. Check console <@${process.env['OWNER']}>`);
            };
        });
    };
};

module.exports = Deduct;