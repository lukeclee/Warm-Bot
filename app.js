
const Discord = require('discord.js');
const fs = require('fs');
const YTDL = require('ytdl-core');
const schedule = require('node-schedule');
const googleapis = require('googleapis');
googleapis.client.setApiKey('AIzaSyAELimaZmTaXOeViD2veqkiFSBOMLKsNf4');

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
    channel1 = client.channels.get('320110100130037760');
    channel2 = client.channels.get('421916876340330498');
    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = 3;
    rule.hour = 12;
    rule.minute = 0;

    var j = schedule.scheduleJob(rule, function() {
        channel1.send('It is Wednesday my dudes!\n')
        channel1.send({file: './wednesday.jpg'})
        channel2.send('It is Wednesday my dudes!\n')
        channel2.send({file: './wednesday.jpg'})
    });
});

client.on('message', message => {
 
    var sender= message.author;
    var msg = message.content.toLowerCase();
    var prefix = '!'

    if(msg === prefix + 'ping') {
        message.channel.send('Pong!')
        /*var channel = client.channels.get('435546907163492363')
        channel.send('Pong!')*/
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
        userID = client.users.get('289641925689212930')
        command.missus(message, userID);
    }

    if(msg.startsWith(prefix + 'play')) {
        var args = message.content.slice(1).split(" ");
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

    if(msg.startsWith(prefix + 'mister')) {
        userID = client.users.get('143615219418005504')
        command.mister(message, userID)
    }

    if(msg.startsWith(prefix + 'antone')) {
        message.channel.send('"Sellmack wants to know if antone wants to play" - Borfighter 2018')
    }

    if(msg.startsWith(prefix + 'rp3')) {
        message.channel.send('Everyone welcome Raymond Payne III to the server! ' + client.users.get('150762608922722304') + '\n')
        message.channel.send({file: './rp3.jpg'})
    }



});

client.login(config.token);