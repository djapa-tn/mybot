const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
const app = express();

// إنشاء البوت مع النوايا المطلوبة
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

client.once("clientReady", () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity("TikTok Skits", { type: "WATCHING" });
});



// أوامر البوت
client.on("messageCreate", msg => {
  if (msg.content === "IP") {
    msg.reply("SOON");
  }
});

// تسجيل الدخول باستخدام التوكن
client.login(process.env.TOKEN);


