import { Client, VoiceChannel } from "discord.js";
import prisma from "../../lib/prisma";

export async function clearExistingVoiceChannels(client: Client) {
    // Fetch all temp channels stored in the database
    const tempChannels = await prisma.tempChannel.findMany();

    for (const tempChannel of tempChannels) {
        // Attempt to find the guild where the temp channel exists
        const guild = client.guilds.cache.get(tempChannel.guildId); // Assuming guildId is stored in the DB
        if (!guild) {
            // If the guild is no longer accessible, remove the record from the database
            await prisma.tempChannel.delete({ where: { channelId: tempChannel.channelId } });
            console.log(`Removed temp channel ${tempChannel.channelId} due to inaccessible guild.`);
            continue;
        }

        // Attempt to find the channel in the guild
        const channel = guild.channels.cache.get(tempChannel.channelId) as VoiceChannel;

        // If the channel doesn't exist in Discord, remove it from the database
        if (!channel) {
            await prisma.tempChannel.delete({ where: { channelId: tempChannel.channelId } });
            console.log(`Removed non-existing channel ${tempChannel.channelId} from the database`);
            continue;
        }

        // If the channel exists but is empty, delete it from Discord and remove from the database
        if (channel.members.size === 0) {
            await channel.delete();
            await prisma.tempChannel.delete({ where: { channelId: tempChannel.channelId } });
            console.log(`Deleted empty channel ${tempChannel.channelId} from Discord and database`);
        }
    }

    console.log("Temporary voice channels cleanup complete.");
}