import { Client, Interaction } from 'discord.js';
import { commands } from "../commands";

export default async (client: Client, interaction: Interaction) => {
    if (!interaction.isCommand()) {
        // Handle select menu and button interactions
        if (interaction.isSelectMenu() || interaction.isButton()) {
            await handleConfigInteraction(interaction);
            return;
        }
        return;
    }

    const { commandName } = interaction;
    if (commands[commandName as keyof typeof commands]) {
        await commands[commandName as keyof typeof commands].execute(interaction);
    }
};

// Function to handle configuration menu interactions
async function handleConfigInteraction(interaction: Interaction) {
    if (interaction.isSelectMenu()) {
        const selectedOption = interaction.values[0];
        let response = "";
        switch (selectedOption) {
            case "general":
                response = "You selected General Settings.";
                break;
            case "permissions":
                response = "You selected Permissions.";
                break;
            case "notifications":
                response = "You selected Notifications.";
                break;
            default:
                response = "Invalid selection.";
                break;
        }
        await interaction.update({ content: response, components: [] });
    }

    if (interaction.isButton()) {
        if (interaction.customId === "confirm") {
            await interaction.update({ content: "Configuration confirmed!", components: [] });
        } else if (interaction.customId === "cancel") {
            await interaction.update({ content: "Configuration canceled.", components: [] });
        }
    }
}