const { Client, GatewayIntentBits } = require("discord.js");
const fetch = require("node-fetch");
const express = require("express");
const app = express();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

// Express server
app.get("/", (req, res) => res.send("Bot is running..."));
app.listen(3000, () => console.log("Web server started"));

// FiveM server IP + PORT
const FIVEM_SERVER = "http://IP_SERVER:PORT/players.json"; // عوض IP + PORT

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

  updateActivity();
  setInterval(updateActivity, 60000);
});

// Commands
client.on("messageCreate", msg => {
  if (msg.content === "IP") msg.reply("SOON");
  if (msg.content === "!ping") msg.reply("Pong! 🏓");
});

// Login with token
client.login(process.env.TOKEN);
