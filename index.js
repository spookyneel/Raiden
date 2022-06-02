const fs = require('fs');
const { Client, Intents, Discord } = require('discord.js');
const announce = require('./tasks/results');
const schedule = require('node-schedule');
const { Mongo } = require('./mongoClient');
require('dotenv').config();

// init bot client and load commands & events
const bot = new Client(
    {
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]
    }
);
require('@gary50613/discord.js-command-handler') (bot, {
	prefix: '!',
});

//bot.event = new Discord.Collection();
bot.commands.loadFolder("./commands");

const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    const eventName = file.split(".")[0];

    if (eventName === 'monitor') {
        bot.on('messageCreate', event.bind(null, bot));
    };
}

bot.once('ready', () => {
    console.log('Connected to Discord!')
    bot.user.setActivity(`Made with ❤️ by Neel-kun~`, { type: 'PLAYING' })
});
// login
bot.login(process.env.TOKEN)
// init connection to Mongo
Mongo();

// schedule winner annoucement
//schedule.scheduleJob({year: 2022, month: 5, date: 3, hour: 0, tz: 'Asia/Kolkata'}, async () => {
    //await announce(bot);
//});
