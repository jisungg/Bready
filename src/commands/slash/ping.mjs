/** @type {import("../../data/BotTypes.mjs").CommandExport} */
export default {
    name: "ping",
    description: "Shows Bready's ping!",
    async execute(client, interaction) {
        await interaction.reply({
            ephemeral: true,
            content: `Pong! \`${client.ws.ping}ms\``
        });
    }
}