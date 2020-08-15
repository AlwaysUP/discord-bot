const Discord = require('discord.js');
const client = new Discord.Client();
var http = require('http');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.login(process.env.DISCORD_TOKEN);

http.createServer(function (req, res) {
    res.write('Hello World!'); //write a response to the client
    res.end(); //end the response
  }).listen(process.env.PORT || 5000);