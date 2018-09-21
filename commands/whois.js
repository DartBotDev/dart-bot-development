const Discord = require("discord.js");
const fs = require("fs");
const status = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline/Invisible"
};

module.exports.run = async (bot, message, args) => {
  const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
  if (!member) return message.reply("Please provide a vaild Mention or USER ID");
  let isbot;
  if (member.user.bot === true) {
    isbot = "Yes";
  } else {
    isbot = "No";
  }
  const embed = new Discord.MessageEmbed()
    .setColor(3447003)
    .setThumbnail(`${member.user.displayAvatarURL()}`)
    .setAuthor(`${member.user.tag} (${member.id})`, `${member.user.avatarURL()}`)
    .addField("Nickname:", `${member.nickname !== null ? `Nickname: ${member.nickname}` : "No nickname"}`, true)
    .addField("Bot?", `${bot}`, true)
    .addField("Guild", `${bot}`, true)
    .addField("Status", `${status[member.user.presence.status]}`, true)
    .addField("Playing", `${member.user.presence.game ? `${member.user.presence.game.name}` : "not playing anything."}`, true)
    .addField("Roles", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`, true)

  message.channel.send({
    embed
  });
}

module.exports.help = {
	name: "whois",
	usage: "whois <user>",
	description: "nil",
	longdes: "Gets information about a user.",
	mentionedperm: "None",
  category: "Moderation"
}
