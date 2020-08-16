let dispatcher = undefined
let message = undefined
let connection = undefined

let send_file = function(filename) {
    const { MessageAttachment } = require('discord.js');
    message.channel.send(new MessageAttachment(filename));
};

let get_random_file = function(path, callback) {
    const fs = require('fs');
    fs.readdir(path, function (err, files){
        if (err) {
            console.log("Unknown error while reading directory!")
        }
        filename = `${path}/${files[Math.floor(Math.random() * files.length)]}`
        if (callback!== undefined) {
            callback(filename);
        }
        return filename;
    });
}

let play_audio = async function(filename) {
    if (message.member.voice.channel) {
        connection = await message.member.voice.channel.join();
        console.log(`file: ${filename}`)
        if (filename.startsWith('https://youtu')) {
            const ytdl = require('ytdl-core');
            console.log(`playing youtube video`)
            dispatcher = connection.play(ytdl(filename, { filter: 'audioonly' }));
        } else {
            dispatcher = connection.play(filename);
        }
    } else {
        dispatcher = undefined;
        message.reply('You need to join a voice channel first!');
    }
};

let pause_audio = function(callback) {
    if (dispatcher!==undefined) {
        dispatcher.pause();
    }
}

let disconnect_vc = function(callback) {
    if (connection!==undefined) {
        connection.disconnect();
    }
}

let resume_audio = function(callback) {
    if (dispatcher!==undefined) {
        dispatcher.resume();
    }
}

let command_parser = function(command, msg, callback) {
    message = msg
    const fs = require('fs');
    const command_lower = command.toLowerCase().split(' ')[0];
    fs.readFile('resources/json/command-output.json', function (err, json) {
        if (err) {
            console.log("default command output does not exist")
        }
        const commands = JSON.parse(json);
        if (command_lower in commands) {
            message.reply(commands[command_lower])
            return commands[command_lower];
        }
        switch (command_lower) {
            case 'cat':
                get_random_file(`resources/images/${command_lower}`, send_file);
                break;
            case 'sad-noises':
                play_audio('resources/audio/reactions/sad_violin.mp3');
                break;
            case 'bear':
                send_file('resources/images/reactions/bear_run.gif');
                break;
            case 'play':
            case 'resume':
                if (command.split(' ').length >1) {
                    play_audio(command.split(' ')[1]);
                }
                else {
                    resume_audio();
                }
                break;
            case 'pause':
                pause_audio();
                break;
            case 'leave':
                disconnect_vc();
                break;
            default:
                message.reply(commands['help'])
                break;
        }
    });
    return command_lower;
};

module.exports = {
    parsecommand : command_parser
}