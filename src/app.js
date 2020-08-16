const Discord = require('discord.js');
const client = new Discord.Client();
const http = require('http');
const fs = require('fs');
const discordbot = require('./discordbot');
const botprefix = '##';


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.startsWith(botprefix)) {
    discordbot.parsecommand(msg.content.substring(botprefix.length), msg);
  }
});

client.login(process.env.DISCORD_TOKEN);

fs.readFile('resources/html/index.html', function (err, html) {
  if (err) {
      console.log("Problem fetching html file...")
  }
  http.createServer(function(request, response) {
      response.writeHeader(200, {"Content-Type": "text/html"});
      response.write(html);
      response.end();
  }).listen(process.env.PORT || 5000);
});