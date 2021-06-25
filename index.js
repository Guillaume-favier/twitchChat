﻿const { ChatClient } = require("dank-twitch-irc");
const chalk = require('chalk');
const prompt = require("prompt-sync")()
const fs = require("fs")
const log = console.log;
let client = new ChatClient();

client.on("ready", () => console.log("Successfully connected to chat"));
client.on("close", (error) => {
  if (error != null) {
	console.error("Client closed due to error", error);
  }
});
const icons = [
        ":)",
        ":(",
        ":o",
        ":z",
        "B)",
        ":\\\\",
        ";)",
        ";p",
        ":p",
        "R)",
        "o_O",
        ":D",
        ">(",
        "<3",
        "<3",
        "R)",
        ":>",
        "<]",
        ":7",
        ":(",
        ":P",
        ";P",
        ":O",
        ":|",
        ":s",
        ":D",
        "o_O",
        ">(",
        ":)",
        "B)",
        ";)",
        "#/",
        "4Head",
        "8-)",
        ":(",
        ":)",
        ":-(",
        ":-)",
        ":-/",
        ":-D",
        ":-O",
        ":-P",
        ":-Z",
        ":-o",
        ":-p",
        ":-z",
        ":-|",
        ":/",
        ":D",
        ":O",
        ":P",
        ":Z",
        ":o",
        ":p",
        ":z",
        ":|",
        ";)",
        ";-)",
        ";-P",
        ";-p",
        ";P",
        ";p",
        "<3",
        ">(",
        "ANELE",
        "ArgieB8",
        "ArsonNoSexy",
        "AsexualPride",
        "AsianGlow",
        "B)",
        "B-)",
        "BCWarrior",
        "BOP",
        "BabyRage",
        "BatChest",
        "BegWan",
        "BibleThump",
        "BigBrother",
        "BigPhish",
        "BisexualPride",
        "BlackLivesMatter",
        "BlargNaut",
        "BloodTrail",
        "BrainSlug",
        "BrokeBack",
        "BuddhaBar",
        "CarlSmile",
        "ChefFrank",
        "CoolCat",
        "CoolStoryBob",
        "CorgiDerp",
        "CrreamAwk",
        "CurseLit",
        "DAESuppy",
        "DBstyle",
        "DansGame",
        "DarkMode",
        "DatSheffy",
        "DendiFace",
        "DogFace",
        "DoritosChip",
        "DrinkPurple",
        "DxCat",
        "EarthDay",
        "EleGiggle",
        "EntropyWins",
        "ExtraLife",
        "FBBlock",
        "FBCatch",
        "FBChallenge",
        "FBPass",
        "FBPenalty",
        "FBRun",
        "FBSpiral",
        "FBtouchdown",
        "FUNgineer",
        "FailFish",
        "FootBall",
        "FootGoal",
        "FootYellow",
        "FrankerZ",
        "FreakinStinkin",
        "FutureMan",
        "GayPride",
        "GenderFluidPride",
        "GingerPower",
        "GivePLZ",
        "GlitchCat",
        "GlitchLit",
        "GlitchNRG",
        "GrammarKing",
        "GreenTeam",
        "GunRun",
        "HSCheers",
        "HSWP",
        "HassaanChop",
        "HeyGuys",
        "HolidayCookie",
        "HolidayLog",
        "HolidayOrnament",
        "HolidayPresent",
        "HolidaySanta",
        "HolidayTree",
        "HotPokket",
        "IntersexPride",
        "InuyoFace",
        "ItsBoshyTime",
        "JKanStyle",
        "Jebaited",
        "JonCarnage",
        "KAPOW",
        "Kappa",
        "KappaClaus",
        "KappaPride",
        "KappaRoss",
        "KappaWealth",
        "Kappu",
        "Keepo",
        "KevinTurtle",
        "Kippa",
        "KomodoHype",
        "KonCha",
        "Kreygasm",
        "LUL",
        "LesbianPride",
        "MVGame",
        "Mau5",
        "MaxLOL",
        "MercyWing1",
        "MercyWing2",
        "MikeHogu",
        "MingLee",
        "MorphinTime",
        "MrDestructoid",
        "NewRecord",
        "NinjaGrumpy",
        "NomNom",
        "NonbinaryPride",
        "NotATK",
        "NotLikeThis",
        "O.O",
        "O.o",
        "OSFrog",
        "O_O",
        "O_o",
        "OhMyDog",
        "OneHand",
        "OpieOP",
        "OptimizePrime",
        "PJSalt",
        "PJSugar",
        "PMSTwin",
        "PRChase",
        "PanicVis",
        "PansexualPride",
        "PartyHat",
        "PartyTime",
        "PeoplesChamp",
        "PermaSmug",
        "PicoMause",
        "PinkMercy",
        "PipeHype",
        "PixelBob",
        "PogChamp",
        "Poooound",
        "PopCorn",
        "PorscheWIN",
        "PowerUpL",
        "PowerUpR",
        "PraiseIt",
        "PrimeMe",
        "PunOko",
        "PunchTrees",
        "PurpleStar",
        "R)",
        "R-)",
        "RaccAttack",
        "RalpherZ",
        "RedCoat",
        "RedTeam",
        "ResidentSleeper",
        "RitzMitz",
        "RlyTho",
        "RuleFive",
        "SMOrc",
        "SSSsss",
        "SabaPing",
        "SeemsGood",
        "SeriousSloth",
        "ShadyLulu",
        "ShazBotstix",
        "ShowOfHands",
        "SingsMic",
        "SingsNote",
        "SmoocherZ",
        "SoBayed",
        "SoonerLater",
        "Squid1",
        "Squid2",
        "Squid3",
        "Squid4",
        "StinkyCheese",
        "StinkyGlitch",
        "StoneLightning",
        "StrawBeary",
        "SuperVinlin",
        "SwiftRage",
        "TBAngel",
        "TF2John",
        "TPFufun",
        "TPcrunchyroll",
        "TTours",
        "TakeNRG",
        "TearGlove",
        "TehePelo",
        "ThankEgg",
        "TheIlluminati",
        "TheRinger",
        "TheTarFu",
        "TheThing",
        "ThunBeast",
        "TinyFace",
        "TombRaid",
        "TooSpicy",
        "TransgenderPride",
        "TriHard",
        "TwitchLit",
        "TwitchRPG",
        "TwitchSings",
        "TwitchUnity",
        "TwitchVotes",
        "UWot",
        "UnSane",
        "UncleNox",
        "VirtualHug",
        "VoHiYo",
        "VoteNay",
        "VoteYea",
        "WTRuck",
        "WholeWheat",
        "WutFace",
        "YouDontSay",
        "YouWHY",
        "bleedPurple",
        "cmonBruh",
        "copyThis",
        "duDudu",
        "imGlitch",
        "mcaT",
        "o.O",
        "o.o",
        "o_O",
        "o_o",
        "panicBasket",
        "pastaThat",
        "riPepperonis",
        "twitchRaid"
    ]
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