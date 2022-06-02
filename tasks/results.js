const { fetchLeaderboard } = require('../database/functions');
const { MessageEmbed } = require('discord.js');

const announce = async (bot) => {
    // fetch top 4
    const leaderboard = await fetchLeaderboard(process.env['GUILD_ID']);
    const top4 = leaderboard.slice(0, 4);
    const top4Embed = [];
    top4.forEach((user, rank) => {
        let text = `**${rank+1}.** <@${user.userID}> - (\`${user.username}\`) **with** \`${user.xp}\` **points**`
        top4Embed.push(text);
    })
    // top 4 list
    let description = top4Embed.toString().replaceAll(',', '\n');
    let message = 'While I\'ve been overseeing the conversations that happened during my time of reign, I have found those worthy of their positions and those who are not. Making the choices while pursuing Eternity has never been an easy task. But I have now decided who truly deserve the rewards.\
    With the decree intact, I congratulate everyone who came here and withheld your desires to cheat through this event I\'ve made. The list of people who I\'ve deemed worthy to receive the rewards are:'
    let congrats = 'Congratulations winners, contact the Event Managers to receive your rewards. With this, I shall be taking my leave and continue overseeing the nation of Inazuma.'
    // announce leaderboard
    const imageEmbed = new MessageEmbed()
    .setImage('https://cdn.discordapp.com/attachments/758359822567211008/981805662092816404/1213867.jpg')
    .setColor('#e559ff');
    const textEmbed = new MessageEmbed()
    .setDescription(`${message}\n\n${description}\n\n${congrats}`)
    .setColor('#e559ff')
    .setFooter({ text: 'Note: Due to one of my Shogunate Neel taking place in the list, his reward shall be passed down to the ones below him (3rd gets 2nd and so on).' });
    const channel = await bot.channels.fetch(process.env['EVENT_CHANNEL']);
    await channel.send({ content: `<@&${process.env['EVENT_ROLE']}>`, embeds: [imageEmbed, textEmbed] });
};

module.exports = announce;