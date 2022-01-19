const Command = require('../../structures/Command')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const Utils = require('../../structures/Utils')
const utils = new Utils()
const { Dark } = require('../../structures/Colors')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'serverinfo',
            description: 'Veja informações do servidor.'
        })
    }

    run = async (interaction) => {
        const joinedAt = utils.timestampToDate(interaction.member.joinedTimestamp)
        const createdAt = utils.timestampToDate(interaction.guild.createdTimestamp)
        const invite = await Promise.resolve(utils.getBotInvite(interaction))

        const actionRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle('LINK')
                    .setEmoji('🔗')
                    .setURL(`https://lost-redirect.glitch.me/?copy=${invite}&alertText=Convite%20copiado%20para%20sua%20área%20de%20transferência!`)
            )

        const embed = new MessageEmbed()
            .setTitle(interaction.guild.name)
            .setColor(Dark.Purple)
            .setThumbnail(interaction.guild.iconURL())
            .setImage(interaction.guild.bannerURL({ format: "png", dynamic: true, size: 4096 }) || null)
            .setFields([
                {
                    name: ':placard: ID',
                    value: interaction.guild.id,
                    inline: true
                },
                {
                    name: ':crown: Dono(a)',
                    value: `<@${interaction.guild.ownerId}>`,
                    inline: true
                },
                {
                    name: ':calendar_spiral: Servidor criado em',
                    value: createdAt,
                    inline: true
                },
                {
                    name: ':busts_in_silhouette:  Membros',
                    value: `${interaction.guild.memberCount}`,
                    inline: true
                },
                {
                    name: `:hash: Canais (${interaction.guild.channels.channelCountWithoutThreads})`,
                    value: `:speech_balloon: Texto: ${interaction.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size}\n:microphone2: Voz: ${interaction.guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size}\n`,
                    inline: true
                },
                {
                    name: ':door: Entrei aqui em',
                    value: joinedAt,
                    inline: true
                }

            ])
            .setTimestamp()
            .setFooter({ text: 'Clique no 🔗 copiar o convite do servidor!' })

        interaction.reply({ content: `<@${interaction.member.id}>`, embeds: [embed], components: [actionRow] })
    }
}