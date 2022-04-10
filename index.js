const Discord = require('discord.js')
const { Intents, MessageEmbed, MessageActionRow, MessageButton } = Discord;
const fs = require('fs')
const config = require('./config.json')

const interactionCreate = require('./events/interactionCreate')

const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
  ]
}) // Intentler tam kuruludur ek bir intent eklemeye ihtiyaç duyulmaz

client.commands = new Discord.Collection();

client.on('ready', async () => {

  console.log("Rol bot hazır")
  

  // Utils and Loaders
  interactionCreate(client, Discord)

  // Activity

  client.user.setActivity(`${config.bot.activity}`, {type: 'LISTENING'}); // 
})

  

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
if (commandFiles.length === 0) {
  console.error(`Hata > Komutlar dosyası tamamen boş!`);
} else {
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    const conf = command.config;
    if (conf.aliases !== []) {
      for (const alias of conf.aliases) {
        client.commands.set(alias, command);
      };
    };
    client.commands.set(conf.name, command);
    console.log(` Komutlar => // ${conf.name} aktifleştirildi.`);
  };
};


client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (!message.guild || message.author.bot || !message.content.startsWith(config.bot.prefix)) return;
  const gövde = message.content.slice(config.bot.prefix.length, message.content.length).split(" ");
  const komut = gövde[0];
  const args = gövde.slice(1, gövde.length);

  if (!client.commands.get(komut)) return;
  try {
    return client.commands.get(komut).run(client, message, args);
  } catch (h) {
    console.error(h);
  };
});



client.login(config.bot.token).catch((e) => console.log(e))