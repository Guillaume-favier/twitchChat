const { ChatClient } = require("dank-twitch-irc");
const chalk = require('chalk');
const prompt = require("prompt-sync")()
const path = require("path")
const fs = require("fs")
const log = console.log;
let client = new ChatClient();

client.on("ready", () => console.log("Successfully connected to chat"));
client.on("close", (error) => {
  if (error != null) {
	console.error("Client closed due to error", error);
  }
});
const icons = JSON.parse(fs.readFileSync(path.join(__dirname, 'test.json')))["list"];
const testTheMess = (mess) => {
	let res = mess+" "
	for (let i = 0; i < icons.length; i++) {
		const element = icons[i];
		res = res.split(element+" ").join(chalk.green(element+" "))
	}
	return res
}

client.on("PRIVMSG", (msg) => {
	let badges = ""
	const Rbadges = msg.ircTags["badges"].split(',')
	for (let i = 0; i < Rbadges.length; i++) {
		const element = Rbadges[i].split("/")[0];
		switch (element) {
			case "moderator":
				badges += chalk.green("⚔")
				break;
			case "premium":
				badges += chalk.blue("👑")
				break;
			case "subscriber":
				badges += chalk.hex("#8A2BE2")("☆")
			default:
				break;
		}
	}
	console.log(`${badges}[${chalk.hex(msg.colorRaw)(msg.displayName)}] : ${testTheMess(msg.messageText)}`);
	// console.log(msg.ircTags["badges"])
});

// See below for more events
let ch = prompt("Chanel name : ")
client.connect();
client.join(ch.toLowerCase())
