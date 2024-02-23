import { Bready } from "./structures/Bready.mjs";
const client = new Bready();

client.on("BREADY", () => {
    client.logger.info("Bready is now STARTING...");
    client.login(process.env.DISCORD_TOKEN);
})