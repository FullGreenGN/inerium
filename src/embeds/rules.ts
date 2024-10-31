import {EmbedBuilder} from "discord.js";

export const rulesEmbed = new EmbedBuilder()
    .setColor('#ff7f50')
    .setTitle('📜 Server Rules')
    .setDescription('Please follow the rules to ensure a positive experience for everyone.')
    .addFields(
        { name: '📵 No Piracy', value: 'Piracy topics will result in a warning or ban from this server.', inline: false },
        { name: '❌ No Hate Speech', value: 'No hate speech or disrespectful language towards users or staff.', inline: false },
        { name: '🚫 No Spam/Follow Ads', value: 'Advertising (including affiliate links and profile links) is not allowed.', inline: false },
        { name: '🔞 Sensitive Topics', value: 'Do not post adult or offensive content.', inline: false },
        { name: '❗ Do NOT PM Staff Members', value: 'Only PM staff if they reach out to you first.', inline: false }
    )


export const goodToNowEmbed = new EmbedBuilder()
    .setColor('#ff7f50')
    .addFields({ name: '⚠️ Good to Know', value: 'Violating any of these rules may lead to warnings or bans.', inline: false})
