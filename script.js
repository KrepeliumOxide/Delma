const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const bot = new Discord.Client();

/*Code below sets up the command handler, 
taking all the JavaScript files from the 
"commands" folder*/
const { CommandHandler } = require("djs-commands");
const CH = new CommandHandler({
    folder: __dirname + '/commands/',
    prefix: ['d.', 'd:', 'd;', 'D.', 'D:', 'D']
});

/*Code below sets bot activity to "playing d.help"
you see on the online members tab*/
bot.on('ready', () => {
    console.log('Ready');
    bot.user.setActivity(`d.help`, {type: "PLAYING"});
});

/*Code below runs the commands issued and ignores
ones given by other bots or in direct
messages*/
bot.on("message", (message) => {
    if (message.channel.type === 'dm') return;
    if (message.author.type === 'bot') return;
    let args = message.content.split(" ");
    let command = args[0];
    let cmd = CH.getCommand(command);
    if (!cmd) return;
    try {
        cmd.run(bot,message,args)
    } catch(e) {
        console.log(e)
    }
 
    });

bot.login(token);
