const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
const app = express();

// إنشاء البوت
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// Express Web Server
app.get("/", (req, res) => {
  res.send("Bot is running...");
});

app.listen(3000, () => {
  console.log("Web server started");
});

// حدث تسجيل الدخول
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  // Activity ثابت
  client.user.setActivity("TikTok Skits", { type: "WATCHING" });
});

// أوامر البوت
client.on("messageCreate", msg => {
  if (msg.content === "IP") {
    msg.reply("SOON");
  }

  if (msg.content === "!ping") {
    msg.reply("Pong! 🏓");
  }
});

// تسجيل الدخول بالتوكن من Environment Variable
client.login(process.env.TOKEN);
