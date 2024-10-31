import {EmbedBuilder} from "discord.js";

const joinServerEmbed = new EmbedBuilder()
    .setColor('#5865F2') // Discord blue color
    .setTitle('💬 Comment rejoindre le serveur ?')
    .setDescription("Pour rejoindre vous devez avoir **Minecraft Java Edition** et le modpack [All The Mods 9](https://www.curseforge.com/minecraft/modpacks/all-the-mods-9) !")
    .addFields(
        { name: '⚠️ Avant de rejoindre', value: "Vous devez lire <#1301034295841918986> !", inline: false },
        { name: '🔗 IP du serveur', value: '`87.98.134.219:27015`', inline: false },
    )
    .setFooter({ text: 'Il s\'agit d\'un serveur fun, ne l\'oubliez pas ! 🙏' })
    .setTimestamp();

export default joinServerEmbed;