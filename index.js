const { Client, GatewayIntentBits } = require("discord.js");
const fetch = require("node-fetch"); // لازم node-fetch v2
const express = require("express");
const app = express();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

// Express Web Server
app.get("/", (req, res) => res.send("Bot is running..."));
app.listen(3000, () => console.log("Web server started"));

// FiveM server info
const FIVEM_SERVER = "http://IP_SERVER:PORT/players.json"; // عوض IP + PORT متاع سيرفرك

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

  // تحديث أول مرة
  updateActivity();

  // تحديث كل دقيقة
  setInterval(updateActivity, 60000);
});

// أوامر البوت
client.on("messageCreate", msg => {
  if (msg.content === "IP") msg.reply("SOON");
  if (msg.content === "!ping") msg.reply("Pong! 🏓");
});

// تسجيل الدخول بالتوكن (Environment Variable)
client.login(process.env.TOKEN);
