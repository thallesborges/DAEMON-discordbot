const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.apikey_chatgpt
});

const openai = new OpenAIApi(configuration);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('chatgpt')
    .setDescription('Faça uma pergunta ao ChatGPT')
    .addStringOption(option => option.setName('pergunta').setDescription(`Essa será a pergunta ao ChatGPT`).setRequired(true))
    .setDMPermission(false),
    async execute (interaction) {

        await interaction.deferReply();

        const question = interaction.options.getString('pergunta');

        try {
            const res = await openai.createCompletion({
                model: 'text-davinci-003',
                max_tokens: 2048,
                temperature: 0.5,
                prompt: question
            })

            const embed = new EmbedBuilder()
            .setColor('#74a89b')
            .setDescription(`\`\`\`${res.data.choices[0].text}\`\`\``)

            await interaction.editReply({ embeds: [embed] });

        } catch(e) {
            return await interaction.editReply({ content: `Falha no requerimento: **${e.response.status}**`, ephemeral: true})

        }
    }
}
