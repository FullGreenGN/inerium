import { ButtonStyle, CommandInteraction, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, EmbedBuilder, StringSelectMenuBuilder } from "discord.js";

const configOptions = [
    { label: "General Settings", description: "Configure general bot settings", value: "general" },
    { label: "Permissions", description: "Set permissions for channels or users", value: "permissions" },
    { label: "Notifications", description: "Adjust notification settings", value: "notifications" }
];

export const data = new SlashCommandBuilder()
    .setName("config")
    .setDescription("Open the configuration menu");

export async function execute(interaction: CommandInteraction) {
    // Create the embed for the configuration menu
    const configEmbed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Bot Configuration Menu")
        .setDescription("Choose a setting from the menu below to configure:");

    // Create the select menu
    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId("config-select")
        .setPlaceholder("Select a configuration option")
        .addOptions(configOptions);

    // Create the buttons
    const confirmButton = new ButtonBuilder()
        .setCustomId("confirm")
        .setLabel("Confirm")
        .setStyle(ButtonStyle.Success);

    const cancelButton = new ButtonBuilder()
        .setCustomId("cancel")
        .setLabel("Cancel")
        .setStyle(ButtonStyle.Danger);

    // Create action rows for the select menu and buttons separately
    const selectMenuRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu);
    const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(confirmButton, cancelButton);

    // Send the embed with the select menu and buttons
    await interaction.reply({ embeds: [configEmbed], components: [selectMenuRow, buttonRow] });
}