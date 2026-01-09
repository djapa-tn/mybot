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

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  // Activity ثابت
  client.user.setActivity("TikTok Skits", { type: "WATCHING" });
});


  let i = 0;

  // Activity الأول يظهر مباشرة
  client.user.setActivity(activities[0].name, { type: activities[0].type });

  // تبديل Activity كل دقيقة
  setInterval(() => {
    i = (i + 1) % activities.length;
    client.user.setActivity(activities[i].name, { type: activities[i].type });
  }, 60000); // 60000ms = 1 دقيقة
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

// تسجيل الدخول بالتوكن (Environment Variable)
client.login(process.env.TOKEN);

