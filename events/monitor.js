const json = require('edit-json-file');
const { addXP } = require('../database/functions');
const blacklist = json('jsons/data.json').data.blacklist;

module.exports = async (bot, message) => {
    if (message.author.bot) return;
    if (message.channel.id !== process.env['CHANNEL']) return;
    const commands = ['!stats', '!lb', '!deduct', '!delete'];
    if (commands.some(el => message.content.toLowerCase().includes(el))) return;
    if (!blacklist.includes(message.author.id)) {
        await addXP(message.author.id, message.guild.id, message.author.username, 1);
    };
};
