import {Client, ActivityType} from 'discord.js';
import {deployCommands} from "../utils/deploy-commands";
import {config} from "../utils/config";
import {sendEmbeds} from "../utils/sendEmbeds";

export default async (client: Client) => {
    console.log(`${client.user?.tag} is ready!`);
    client.user?.setActivity(client.guilds.cache.get(config.DISCORD_GUILD_ID)?.memberCount + ' users', { type: ActivityType.Watching });
    await deployCommands({ guildId: config.DISCORD_GUILD_ID });
    await sendEmbeds(client)
};