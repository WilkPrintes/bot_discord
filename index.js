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
        let i = 0;
        let nicks = message.substring(5).split(",");
        msg.reply(`Buscando as informações de ${nicks}...`);
        while(nicks[i])
        {
            let inf = await Profile(`https://www.leagueofgraphs.com/summoner/br/${nicks[i]}`);
            if (inf[1] == undefined )
                msg.reply(`----------${nicks[i]}----------\nElo: ${inf[0]}\n`)
            else
                msg.reply(`----------${nicks[i]}----------\nElo: ${inf[0]}\nPDL: ${inf[1]}\n`)
            i++;    
        }
    }
    if(msg.content.startsWith("!hello"))
    {
        msg.reply("Bot ta ON fml (Agora 24/7)\nSó coloca um !elo (teu nick) e GG");
    }
    if(msg.content.startsWith("!help"))
    {
        msg.reply("!elo (nick), (nick) - Mostra seu Elo e seu PDL.\npode ser passado mais de 1 nick separado por ','");
        msg.reply("!v - Mostra a versão do bot");
        msg.reply("!relese - Mostra as novas funções ou atualizações do bot");
    }
    if(msg.content.startsWith("!v"))
    {
        msg.reply("!elo (nick), (nick) - Mostra seu Elo e seu PDL, pode ser passado mais de 1 nick separado por ','");
    }
    if(msg.content.startsWith("!relese"))
    {
        msg.reply("- Adicionado !v e !release\n-Atualização no !elo podendo passar mais de 1 nick por vez.");
    }
})

client.login(process.env.token);
