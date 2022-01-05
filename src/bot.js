//https://discord.com/oauth2/authorize?client_id=882320646124736512&permissions=8&scope=bot

require("dotenv").config();

const token = process.env.DISCORDCA_BOT_TOKEN;

const { randomInt } = require("crypto");
const { channel } = require("diagnostics_channel");
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});
const PREFIX = "&";
let USER_LIST = [];
let message_channel = null;

client.on("ready", () => {
  console.log("logged in, ready to work");
});

client.on("voiceStateUpdate", (oldState, newState) => {
  //TO DO: When user leaves a voce chat they aren't removed from the list and are then queried for a voice chat when they dont have one
  const open_channels = newState.guild.channels.cache.filter(
    (c) => c.type === "GUILD_VOICE" && c.members.size < 1
  );

  var channel_index = [];
  var deafened_member_index = [];

  for (const [channelID, channel] of open_channels) {
    channel_index.push(channel);
  }

  if (channel_index.length > 0) {
    if (newState.member.voice.channel) {
      for (const [memberID, member] of newState.channel.members) {
        if (member.voice.selfDeaf) {
          deafened_member_index.push(member);
        }
      }
    }
  }

  if (channel_index.length > 0) {
    for (let i = 0; i < deafened_member_index.length; i++) {
      deafened_member_index[i].voice.setChannel(
        channel_index[randomInt(0, channel_index.length)]
      );
    }
  }
});

client.on("messageCreate", (message) => {
  if (!message.author.bot) {
    //are there people in the list
    if (USER_LIST.length > 0) {
      if (USER_LIST.includes(message.member)) {
        RespondTo(message);
        message.member.voice.setChannel(784754394339999815);
      }
    }
    //All Commands
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(" ");

      var isDev = message.author.tag === "Gamble#5626";

      switch (CMD_NAME) {
        case "cracky": {
          if (!isDev) {
            return message.reply("This command is restricted to Gamble");
          } else {
            const CMD_TYPE = args[0].toString();

            switch (CMD_TYPE) {
              case "add": {
                let targetMember = message.mentions.members.first();

                if (targetMember) {
                  if (message_channel === null) {
                    message_channel = message.channel;
                  }
                  USER_LIST.push(targetMember);
                  message.channel.send(
                    `Added <@${targetMember.user.id}> to cracky's list.`
                  );
                  return;
                } else {
                  break;
                }
              }
              case "remove": {
                let targetMember = message.mentions.members.first();

                if (targetMember) {
                  if (USER_LIST.includes(targetMember)) {
                    USER_LIST.pop(targetMember);
                    message.channel.send(
                      `Removed <@${targetMember.user.id}> from cracky's list`
                    );
                    return;
                  }
                } else {
                  break;
                }
              }
              case "clear": {
                USER_LIST = [];
                message.channel.send(`Cleared cracky's list.`);
                return;
              }
              default: {
                break;
              }
            }

            return message.reply(
              "Please provide a command type; (Add, Remove) and the " +
                "ID of the user you wish to add."
            );
          }
        }
      }
    }
  }
});

client.on("presenceUpdate", (oldMember, newMember) => {
  if (USER_LIST.includes(newMember.member)) {
    if (oldMember.status != "dnd") {
      if (newMember.status === "dnd") {
        message_channel.send(
          `<@${newMember.user.id}> Imagine being on dnd :joy:`
        );
        return;
      }
    }
  }
});

client.login(token);

var alternateCase = function (s) {
  var chars = s.toLowerCase().split("");
  for (var i = 0; i < chars.length; i += 2) {
    chars[i] = chars[i].toUpperCase();
  }
  return chars.join("");
};

var RespondTo = function (message) {
  let i = randomInt(1, 101);

  console.log(i);

  switch (i) {
    //5% Chance
    case i % 20 == 0: {
      let j = randomInt(1, 3);
      {
        switch (j) {
          case 1: {
            message.delete();
            message.channel.send(
              `<@${message.member.user.id}>Nice message LOL.`
            );
            return;
          }
          case 2: {
            if (message.member.manageable) {
              message.member.setNickname("Fortnite Enjoyer");
              message.channel.send(
                `<@${message.member.user.id}> This guy likes Fortnite :joy:`
              );
              return;
            }
            break;
          }
        }
      }
    }
    default: {
      if (message.content.length > 20) {
        if (message.attachments.size < 1) {
          message.channel.send(alternateCase(message.content));
        }
      } else {
      }
    }
  }
};

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
