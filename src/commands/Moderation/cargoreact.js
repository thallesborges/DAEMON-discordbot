const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('cargoreact')
    .setDescription(`Esse é o comando para adicionar cargos através de reações `)
    .addRoleOption(option => option.setName(`cargo1`).setDescription(`Adicione o primeiro cargo`).setRequired(true))
    .addRoleOption(option => option.setName(`cargo2`).setDescription(`Adicione o segundo cargo`).setRequired(true))
    .addRoleOption(option => option.setName(`cargo3`).setDescription(`Adicione o terceiro cargo`).setRequired(true)),
    async execute (interaction, client){

        const cargo1 = interaction.options.getRole(`cargo1`);
        const cargo2 = interaction.options.getRole(`cargo2`);
        const cargo3 = interaction.options.getRole(`cargo3`);

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "Apenas Kami's podem usar este comando.", ephemeral: true});

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('botao1')
            .setLabel(`${cargo1.name}`)
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId('botao2')
            .setLabel(`${cargo2.name}`)
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId('botao3')
            .setLabel(`${cargo3.name}`)
            .setStyle(ButtonStyle.Secondary)
        )

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle(`Escolha seus cargos`)
        .setDescription(`Clique nos botões abaixo para adicionar o cargo ao seu perfil`)

        await interaction.reply({ embeds: [embed], components: [button] });

        const collector = await interaction.channel.createMessageComponentCollector();

        collector.on('collect', async (i) => {
            
            const member = i.member;

            if (i.guild.members.me.roles.highest.position < cargo1.position) {
                i.update({ content: "Infelizmente não consigo dar cargos com posição superior à minha 😵‍💫\nPor favor, suba o meu cargo para que este comando possa funcionar novamente.", ephemeral: true});
                return;
            } else if (i.guild.members.me.roles.highest.position < cargo2.position){
                i.update({ content: "Infelizmente não consigo dar cargos com posição superior à minha 😵‍💫\nPor favor, suba o meu cargo para que este comando possa funcionar novamente.", ephemeral: true});
                return;
            } else if (i.guild.members.me.roles.highest.position < cargo2.position){
                i.update({ content: "Infelizmente não consigo dar cargos com posição superior à minha 😵‍💫\nPor favor, suba o meu cargo para que este comando possa funcionar novamente.", ephemeral: true});
                return;
            }

            if (i.customId === 'botao1') {
                member.roles.add(cargo1);
                i.reply({ content: `Parabéns, o cargo ${cargo1.name} foi adicionado ao seu perfil.`, ephemeral: true})
            }

            if (i.customId === 'botao2') {
                member.roles.add(cargo2);
                i.reply({ content: `Parabéns, o cargo ${cargo2.name} foi adicionado ao seu perfil.`, ephemeral: true})
            }

            if (i.customId === 'botao3') {
                member.roles.add(cargo3);
                i.reply({ content: `Parabéns, o cargo ${cargo3.name} foi adicionado ao seu perfil.`, ephemeral: true})
            }

        })

    }
}
