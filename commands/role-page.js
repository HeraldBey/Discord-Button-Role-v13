const Discord = require('discord.js')
const {MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')
const config = require('../config.json')

exports.run = async(client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) return
  
  const mesaj = (`Herkese selam dostlar,\n\n`
  + `Yapılan **Etkinlik** ve **Çekilişlerden** anında haber almak için yapılan bir sistem sunuyoruz.\n\n`
  + `\`➥\` Çekiliş Katılımcısı alarak **Spotify**, **Discord Nitro**, **Exxen** gibi çekilişlere katılıp ödüllerin sahibi olabilirsiniz.\n\n`
  + `\`➥\` Aşağıda ki seçim menüsünden etkinlik katılımcısı alarak da yapılan konserlerden, etkinliklerden anında haber alabilirsiniz.`
  )


  var row = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setCustomId("etkinlik")
    .setLabel(`Etkinlik Katılımcısı!`)
    .setEmoji('🎉')
    .setStyle("DANGER"),

    new MessageButton()
    .setCustomId("cekilis")
    .setLabel(`Çekiliş Katılımcısı!`)
    .setEmoji('🎁')
    .setStyle(`SUCCESS`)
  )

  await message.channel.send({content: mesaj, components: [row]}).catch((e) => {console.log(e)})
   
}

exports.config = {
    name: "Rol Verir",
    aliases: ["get-roles"]
};
