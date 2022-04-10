const config = require('../config.json')

module.exports = (client, Discord) => {

    client.on('interactionCreate', async (interaction) => {

        if (!interaction.isButton()) return;

        if (interaction.customId === "cekilis") {

            const user = interaction.guild.members.cache.get(interaction.user.id)
            if (user.roles.cache.has(config.roles.cekilis)) return;

            await user.roles.add(config.roles.cekilis).catch()

            interaction.reply({content: `Başarılı bir şekilde <@&${config.roles.cekilis}> rolünü aldın. Artık çekiliş bildirimlerini alacaksın.`, ephemeral: true }).catch((e) => console.log(e))

        } else if  (interaction.customId === "etkinlik") {

            const user = interaction.guild.members.cache.get(interaction.user.id)
            if (user.roles.cache.has(config.roles.etkinlik)) return;
            
            await user.roles.add(config.roles.etkinlik).catch()

            interaction.reply({content: `Başarılı bir şekilde <@&${config.roles.etkinlik}> rolünü aldın. Artık etkinlik bildirimlerini alacaksın.`, ephemeral: true }).catch((e) => console.log(e))
        }
    })
}
