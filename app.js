//import { userInfo } from "os";

const Discord = require('discord.js');
const fs = require('fs');
const YTDL = require('ytdl-core');

const client = new Discord.Client();

const config = require('./config.json');

const command = require('./command.js');

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

var servers = {};

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

    if(msg === prefix + 'missus') {
        command.missus(message);
    }

    if(msg.startsWith(prefix + 'play')) {
        var args = message.content.substring(1).split(" ");
        if(!args[1]) {
            message.channel.send('You must provide a link!');
            return;
        }

        if(!message.member.voiceChannel) {
            message.channel.send("You must be in a voice channel!");
        }

        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue:[]
        };

        var server = servers[message.guild.id];

        server.queue.push(args[1]);

        if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
            play(connection, message);
        });
    }

    if(msg === prefix + 'skip') {
        var server = servers[message.guild.id];

        if(server.dispatcher) server.dispatcher.end();
    }

    if(msg.startsWith(prefix + 'stop')) {
        var server = servers[message.guild.id];

        if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
    }

});

client.login(config.token);