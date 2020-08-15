const Discord = require('discord.js');
const client = new Discord.Client();
const http = require('http');
const fs = require('fs');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.login(process.env.DISCORD_TOKEN);

fs.readFile('./resources/html/index.html', function (err, html) {
    if (err) {
        console.log("You will likely have to rename example.html to index.html. Find it under resources/html")
        throw err;
    }
    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    }).listen(process.env.PORT || 5000);
});