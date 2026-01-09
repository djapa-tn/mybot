const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
const app = express();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

app.get("/", (req, res) => {
  res.send("Bot is running...");
});

app.listen(3000, () => {
  console.log("Web server started");
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  // Activity Status
  client.user.setActivity("TikTok Skits", { type: "WATCHING" });
});


client.on("messageCreate", msg => {
  if (msg.content === "IP") {
    msg.reply("SOON");
  }
});


client.login(process.env.TOKEN);
