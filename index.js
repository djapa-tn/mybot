const { Client, GatewayIntentBits } = require("discord.js");
const fetch = require("node-fetch"); // لازم تثبت node-fetch
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const FIVEM_SERVER = "http://IP_SERVER:PORT/players.json";

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  async function updateActivity() {
    try {
      const res = await fetch(FIVEM_SERVER);
      const players = await res.json();
      const playerCount = players.length;

      client.user.setActivity(`🟢 ${playerCount} Players on Server`, { type: "PLAYING" });
    } catch (err) {
      console.error("Error fetching FiveM data:", err);
      client.user.setActivity("Server Offline", { type: "PLAYING" });
    }
  }

  // أول تحديث
  updateActivity();

  // تحديث كل دقيقة
  setInterval(updateActivity, 60000);
});

client.login(process.env.TOKEN);
