# discord-bot
Discord bot for single server usage (Please fork and customize to your needs)

## Installation
 - Requirements:
  - `node`
  - `npm`
 - Install the node packages:
 `npm i`
  - Set Discord token:
   - linux: `export DISCORD_TOKEN=<YOURTOKEN>`

## Run
 - `npm start`
  - Note: must set `DISCORD_TOKEN` environment variable

## Deploy to Heroku
 - Requirements:
  - `heroku cli`
  - `git cli`
 - `heroku create <YOURAPPNAME>`
 - `git push heroku master -a <YOURAPPNAME>`

## Modifying code
 - Add new folders under images folder with a folder name that should match the command name
  - This will return a random image/file from that folder when you add that command below `cat` in discordbot.js
  - Follow format used for accessing file in existing commands to expand audio play and image share

## HAVE FUN! :)
 - Most importantly this is for you to have fun with your friends