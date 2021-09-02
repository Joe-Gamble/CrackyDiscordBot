//https://discord.com/oauth2/authorize?client_id=882320646124736512&permissions=8&scope=bot

require('dotenv').config();

const token = process.env.DISCORDCA_BOT_TOKEN;

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
    console.log("logged in");
});


client.on('messageCreate', (message) => {
    console.log(`[${message.author.tag}]: ${message.content}`);
});

client.login(token);




/*
const Discord = require('discord.js');
intents = new Discord.Intents(messages = true, guilds = true)

const client = new Discord.Client(intents = intents);

client.once('ready', () => {
    console.log('Bot is online')
});

client.login('ODgyMzIwNjQ2MTI0NzM2NTEy.YS5rIg.wTa8n0vSpuiqqbTsWiu_wFmFzUo')

/*
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt)
{
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 2) == 'gg') {
        var args = message.substring(2).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'test':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            // Just add any case commands if you want to..
         }
     }

});

*/