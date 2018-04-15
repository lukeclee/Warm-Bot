//import { userInfo } from "os";

const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();

const config = require('./config.json');

const command = require('./command.js');

client.on('ready', () => {
    console.log('Bot has started');
});

client.on('message', message => {
 
    var sender= message.author;
    var msg = message.content.toLowerCase();
    var prefix = '!'

    if(msg === prefix + 'ping') {
        message.channel.send('Pong!')
    }

    if(msg.startsWith(prefix + 'user')) {
        if(msg === prefix + 'user') {
            message.channel.send('<@' + message.author.id + '>')
        }
    }

    if(msg === prefix + 'fever') {
        command.fever(message);
    }

});

client.login(config.token);