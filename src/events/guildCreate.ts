import {Guild} from "discord.js";
import {deployCommands} from "../utils/deploy-commands";

export default async (guild: Guild) => {
    await deployCommands({ guildId: guild.id });
}