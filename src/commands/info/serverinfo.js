const Command = reuire('../../infra/structures/Command')
const { MessageEmbed, MessageButton, MessageActionRow }
const ttd = require('../../infra/utils/TimestampToDate')
const getBotInvite = require('../../infra/utils/Invites')
const { Dark } =  require('../../infra/utils/Colors')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'serverinfo',
            description: 'Veja algumas informações do servidor atual.'
        })
    }

    run = async (interaction) => {
        const joinedAt = ttd(interaction.member.joinedTimestamp)
        const createdAt = ttd(interaction.guild.createdTimestamp)
        const invite = await Promise.resolve(getBotInvite(interaction))

        const inviteButton = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle('LINK')
                    .setEmoji('🔗')
                    .setURL(`https://lost-redirect.vercel.app/?copy=${invite}&alertText=Convite%20copiado%20para%20sua%20área%20de%20transferência!`)
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

        interaction.reply({ content: `<@${interaction.member.id}>`, embeds: [embed], components: [inviteButton] })
    }
}