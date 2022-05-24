const { Command } = require('@gary50613/discord.js-command-handler');
const { MessageEmbed } = require('discord.js');
const { deleteUser } = require('../database/functions');
const json = require('edit-json-file');

class DeleteAndBan extends Command {
    constructor() {
        super(
            'delete',
            'deletes the user and adds them to the blacklist',
            '!delete <id>',
            'owner',
            ['']
        );
    };
    async execute(bot, message, args) {
        if (message.author.id !== process.env['OWNER']) return;
        var userId = args[0];
        var guildId = message.guild.id;

        await deleteUser(userId, guildId).then(async(user, err) => {
            if (!err) {
                let file = json('jsons/data.json');
                file.append('blacklist', userId);
                file.save();
                const embed = new MessageEmbed()
                .setColor('#FFC0CB')
                .setDescription(`I've deleted <@${userId}> and added them to the blacklist.`)
                .setTimestamp()
                await message.reply({ embeds: [embed] });
            } else if (err) {
                console.log(err);
                await message.reply(`Ran into an error. Check console <@${process.env['OWNER']}>`);
            };
        });
    };
};

module.exports = DeleteAndBan;