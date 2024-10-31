import {EmbedBuilder} from "discord.js";

const serverRulesEmbed = new EmbedBuilder()
    .setColor('#5865F2') // Discord blue color
    .setTitle('⚔️ Règles du serveur')
    .setDescription("⚠️ Si nous devons vous sanctionner sur le serveur Minecraft, vous serez aussi sanctionné sur Discord !")
    .addFields(
        { name: '\u200B', value: '• Toute forme de cheat est interdit\n• Le respect entre les joueurs est obligatoire\n• Détruire les constructions des autres joueurs est interdit\n• Voler dans le coffre des autres joueurs est interdit\n• Insultes entre joueurs est interdit\n• Il ne s\'agit pas d\'un serveur PVP\n• Toute action provoquant du lag est interdit\n• Les mods clients soft sont autorisés (map, tri d\'inventaire, etc)' },
        { name: 'En cas de problème', value: 'Contactez <@216936486875037699>', inline: false }
    )
    .setFooter({ text: 'Merci de respecter ces règles pour une meilleure expérience de jeu !' });
export default serverRulesEmbed;