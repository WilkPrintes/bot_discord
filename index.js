var Profile = require ("./scraping");
require('dotenv').config();

const {Client, Intents} = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
});

client.on('ready', () => {
    console.log ("Bot online");
})

client.on('messageCreate', async msg => {
    var message = msg.content;
    if (message.substr(0, 4) === '!elo')
    {
        msg.reply(`Buscando as informações de ${message.substring(5)}...`);
        let inf = await Profile(`https://www.leagueofgraphs.com/summoner/br/${message.substring(5)}`)
        if (inf[1] == undefined )
            msg.reply(`----------${msg.content.substring(5)}----------\nElo: ${inf[0]}\n`)
        else
            msg.reply(`----------${msg.content.substring(5)}----------\nElo: ${inf[0]}\nPDL: ${inf[1]}\n`)
    }
    if(msg.content.startsWith("!hello"))
    {
        msg.reply("Bot ta fml\nSó coloca um !elo (teu nick) e ggwp");
    }
})

client.login(process.env.token);