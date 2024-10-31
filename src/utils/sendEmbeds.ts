import joinServerEmbed from "../embeds/joinServer";
import gameRules from "../embeds/gameRules";
import { TextChannel } from "discord.js";
import { config } from "./config";
import {goodToNowEmbed, rulesEmbed} from "../embeds/rules";

export async function sendEmbeds(client: any) {
    const guild = client.guilds.cache.get(config.DISCORD_GUILD_ID);
    const rulesId = "1301028948255182922";
    const howToJoin = "1301036971975770153";
    const gameRulesId = "1301034295841918986";

    if (guild) {
        const rulesChannel = guild.channels.cache.get(rulesId) as TextChannel;
        if (rulesChannel) {
            // Check if there are messages and clear them if so
            const rulesMessages = await rulesChannel.messages.fetch({ limit: 100 });
            if (rulesMessages.size > 0) {
                await rulesChannel.bulkDelete(rulesMessages);
            }
            // Send the embed after clearing messages
            await rulesChannel.send({embeds: [rulesEmbed, goodToNowEmbed]});
        }

        const howToJoinChannel = guild.channels.cache.get(howToJoin) as TextChannel;
        if (howToJoinChannel) {
            const howToJoinMessages = await howToJoinChannel.messages.fetch({ limit: 100 });
            if (howToJoinMessages.size > 0) {
                await howToJoinChannel.bulkDelete(howToJoinMessages);
            }
            await howToJoinChannel.send({ embeds: [joinServerEmbed] });
        }

        const gameRulesChannel = guild.channels.cache.get(gameRulesId) as TextChannel;
        if (gameRulesChannel) {
            const gameRulesMessages = await gameRulesChannel.messages.fetch({ limit: 100 });
            if (gameRulesMessages.size > 0) {
                await gameRulesChannel.bulkDelete(gameRulesMessages);
            }
            await gameRulesChannel.send({ embeds: [gameRules] });
        }
    }
}