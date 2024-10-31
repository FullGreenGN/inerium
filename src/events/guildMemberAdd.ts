import {config} from "../utils/config";
import {GuildMember, TextChannel} from "discord.js";

export default async (member: GuildMember) => {
    const channel = member.guild.channels.cache.get(config.DISCORD_WELCOME_CHANNEL_ID) as TextChannel;
    if (!channel) return;

    if (member.guild.id !== config.DISCORD_GUILD_ID) return;

    await member.roles.add(config.DISCORD_MEMBER_ROLE_ID);

    await channel.send(`Bienvenue sur le serveur, ${member} !`);
}