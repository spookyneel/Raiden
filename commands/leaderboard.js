const { Command } = require('@gary50613/discord.js-command-handler');
const { MessageEmbed, MessageButton } = require('discord.js');
const { fetchLeaderboard } = require('../database/functions');
const paginationEmbed = require('../utils/pagination');

class FetchLeaderboard extends Command {
    constructor() {
        super(
            'leaderboard',
            'fetches leaderboard',
            '!leaderboard or !lb',
            'everyone',
            ['lb']
        );
    };

    async execute(bot, message, args) {
        const subs = (array, size) => array.map((e,i) => (i % size === 0) ? array.slice(i, i + size) : null).filter((e) => e)
        await fetchLeaderboard(message.guild.id).then(async(leaderboard) => {
            const ranks = [];
            leaderboard.forEach(async(rank, index) => {
                const user = `**${index+1}.** <@${rank.userID}> - \`${rank.xp} points\``;
                ranks.push(user);
            });
            if (ranks.length <= 10) {
                let description = ranks.toString().replaceAll(',', '\n');
                const embed = new MessageEmbed()
                .setTitle('Leaderboard')
                .setColor('#FFC0CB')
                .setDescription(description)
                await message.reply({ embeds: [embed] });
            } else {
                const embeds = [];
                const pages = subs(ranks, 10);
                const next = new MessageButton()
                .setCustomId("previousbtn")
                .setLabel("Previous")
                .setStyle("DANGER");

                const previous = new MessageButton()
                .setCustomId("nextbtn")
                .setLabel("Next")
                .setStyle("SUCCESS");

                const buttonList = [
                    next,
                    previous
                ];
                pages.forEach((items, index) => {
                    let description = items.toString().replaceAll(',', '\n');
                    console.log(description)
                    const embed = new MessageEmbed()
                    .setTitle('Leaderboard')
                    .setColor('#FFC0CB')
                    .setDescription(description)
                    .setFooter({ text: `Page: ${index+1}/${items.length}`})
                    embeds.push(embed)
                });
                paginationEmbed(message, embeds, buttonList);
            };
        });
    };
};

module.exports = FetchLeaderboard;