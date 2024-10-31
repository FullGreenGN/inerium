import {Client} from "discord.js";
import {config} from "./utils/config";
import {loadEvents} from "./handlers/eventHandler";
import {clearExistingVoiceChannels} from "./utils/voice/clearExistingVoiceChannels";

const client = new Client({
    intents: ["Guilds", "GuildMessages", "DirectMessages", "GuildVoiceStates"],
});

clearExistingVoiceChannels(client);
loadEvents(client);

client.login(config.DISCORD_TOKEN);