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

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  const activities = [
    { name: "TikTok Skits", type: "WATCHING" },
    { name: "Rap Beats", type: "LISTENING" },
    { name: "with Node.js", type: "PLAYING" },
    { name: "Competition", type: "COMPETING" }
  ];

  let i = 0;

  setInterval(() => {
    client.user.setActivity(activities[i].name, { type: activities[i].type });
    i = (i + 1) % activities.length;
  }, 60000);

  client.user.setActivity(activities[0].name, { type: activities[0].type });
});


// أوامر البوت
client.on("messageCreate", msg => {
  if (msg.content === "IP") {
    msg.reply("SOON");
  }
});

// تسجيل الدخول باستخدام التوكن
client.login(process.env.TOKEN);
