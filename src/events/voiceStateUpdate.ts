import { ChannelType, PermissionsBitField, VoiceChannel, Client, VoiceState } from "discord.js";
import { PrismaClient } from "@prisma/client";
import { config } from "../utils/config";

const prisma = new PrismaClient();

export default async (client: Client, oldState: VoiceState, newState: VoiceState) => {
    const guild = newState.guild;

    // Check if we should ignore this event
    if (!guild || (newState.channelId === config.TEMP_VOICE_CHANNEL_ID && newState.member?.user.bot)) return;

    // User joins the designated voice channel
    const user = newState.member;
    if (newState.channelId === config.TEMP_VOICE_CHANNEL_ID && user) {
        // Find any existing channel owned by this user
        const existingChannel = await prisma.tempChannel.findFirst({
            where: { ownerId: user.id }
        });

        if (!existingChannel) {
            try {
                // Create a new voice channel with user-specific permissions
                const tempChannel = await guild.channels.create({
                    name: `${user.displayName}'s Channel`,
                    type: ChannelType.GuildVoice,
                    parent: newState.channel?.parentId,
                    permissionOverwrites: [
                        {
                            id: user.id,
                            allow: [
                                PermissionsBitField.Flags.Connect,
                                PermissionsBitField.Flags.ManageChannels,
                                PermissionsBitField.Flags.Speak
                            ]
                        },
                        {
                            id: guild.roles.everyone.id,
                            deny: [PermissionsBitField.Flags.Connect]
                        }
                    ]
                });

                await user.voice.setChannel(tempChannel);
                await prisma.tempChannel.create({
                    data: {
                        channelId: tempChannel.id,
                        ownerId: user.id
                    }
                });
            } catch (error) {
                console.error("Error creating or moving to the temporary channel:", error);
            }
        }
    }

    // User leaves a temporary voice channel
    if (oldState.channel && oldState.channelId) {
        const tempChannel = await prisma.tempChannel.findFirst({ where: { channelId: oldState.channelId } });

        if (tempChannel) {
            const voiceChannel = guild.channels.cache.get(tempChannel.channelId) as VoiceChannel;

            if (voiceChannel && voiceChannel.members.size === 0) {
                await voiceChannel.delete();
                await prisma.tempChannel.delete({ where: { channelId: tempChannel.channelId } });
            } else if (voiceChannel && voiceChannel.members.size > 0) {
                const newOwner = voiceChannel.members.random();
                if (newOwner) {
                    await voiceChannel.permissionOverwrites.edit(newOwner.id, {
                        Connect: true,
                        ManageChannels: true,
                        Speak: true
                    });
                    await voiceChannel.permissionOverwrites.delete(tempChannel.ownerId);
                    await prisma.tempChannel.update({
                        where: { channelId: tempChannel.channelId },
                        data: { ownerId: newOwner.id }
                    });
                }
            }
        }
    }
};