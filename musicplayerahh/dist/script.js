(function IIFE() {
	const list = [
	{
		id: 1,
		class: 'jerryHerman',
		url: "https://github.com/dx3ie/images/raw/main/y2mate.com%20-%20Beabadoobee%20%20Apple%20Cider.mp3",
		author: "beabadoobee",
		title: "apple cider "
	},
	{
		id: 2,
		class: 'elvisPresley',
		url: "https://github.com/dx3ie/images/raw/main/y2mate.com%20-%20Billie%20Eilish%20%20BIRDS%20OF%20A%20FEATHER%20Official%20Lyric%20Video.mp3",
		author: "billie eilish",
		title: "birds of a feather ˊˎ-"
	},
	{
		id: 3,
		class: 'royOrbison',
		url: "https://github.com/dx3ie/images/raw/main/y2mate.com%20-%20Clairo%20%20Softly.mp3",
		author: "clairo",
		title: "softly ˊˎ-"
	},
	{
		id: 4,
		class: 'frankSinatra',
		url: "https://github.com/dx3ie/images/raw/main/y2mate.com%20-%20beabadoobee%20%20Coming%20Home%20Official%20Lyric%20Video.mp3",
		author: "beabadoobee",
		title: "coming home "
	},
	{
		id: 5,
		class: 'jimCroce',
		url: "https://github.com/dx3ie/images/raw/main/y2mate.com%20-%20BETWEEN%20FRIENDS%20%20Pleasure%20delayer%20official%20audio.mp3",
		author: "BETWEEN FRIENDS",
		title: "pleasure delayer ˊˎ-"
	},
	{
		id: 6,
		class: 'redHotChiliPeppers',
		url: "https://github.com/dx3ie/images/raw/main/y2mate.com%20-%20Chappell%20Roan%20%20Good%20Luck%20Babe%20Official%20Lyric%20Video.mp3",
		author: "chappell roan",
		title: "good luck, babe! ˊˎ-"
	},
	{
		id: 7,
		class: 'stephaneGrappelli',
		url: "https://github.com/dx3ie/images/raw/main/y2mate.com%20-%20FLETCHER%20%20Shh%20%20%20Dont%20Say%20It%20Lyrics.mp3",
		author: "FLETCHER",
		title: "shh... dont say it ˊˎ-"
	},
	{
		id: 8,
		class: 'evanKing',
		url: "https://github.com/dx3ie/images/raw/main/y2mate.com%20-%20Clairo%20%20Sexy%20to%20Someone.mp3",
		author: "clairo",
		title: "sexy to someone ˊˎ-"
	},
	{
		id: 9,
		class: 'JR',
		url: "https://github.com/dx3ie/images/raw/main/y2mate.com%20-%20The%20Rose%20%E1%84%83%E1%85%A5%E1%84%85%E1%85%A9%E1%84%8C%E1%85%B3%20Time%20Official%20Audio.mp3",
		author: "the rose",
		title: "time ˊˎ-"
	},
	{
		id: 10,
		class: 'theDeli',
		url: "https://github.com/dx3ie/images/raw/main/y2mate.com%20-%20Billie%20Eilish%20%20LAMOUR%20DE%20MA%20VIE%20First%20Part%20Only.mp3",
		author: "billie eilish",
		title: "l'amour de ma vie ˊˎ-"
	}
];

let currentId = 0;
let isPlaying = false;
let isLoop = true;
let loopOne = false;
let isShuffle = false;
let currentAudio = "music1";
let timer = null;

const albumWrap = document.querySelector(".album");
const currentTimeIndicator = document.querySelector(".musicTime__current");
const leftTimeIndicator = document.querySelector(".musicTime__last");
const progressBar = document.getElementById("length");
const title = document.querySelector(".musicInfo__name");
const author = document.querySelector(".musicInfo__author");

const albumClass = document.getElementById("jsAlbum");
const playBtn = document.getElementById("play");
const loopBtn = document.getElementById("loop");
const shuffleBtn = document.getElementById("shuffle");
const forwardBtn = document.getElementById("forward");
const backwardBtn = document.getElementById("backward");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressDiv = document.getElementById("progress");

// BUTTON PLAY
function play(e) {
	if (!isPlaying) {
		e.target.classList.remove("_play");
		e.target.classList.add("_pause");

		albumWrap.classList.remove("_play");
		albumWrap.classList.add("_pause");

		isPlaying = true;
		document.getElementById(currentAudio).play();
		showTime();
	} else {
		e.target.classList.remove("_pause");
		e.target.classList.add("_play");

		albumWrap.classList.remove("_pause");
		albumWrap.classList.add("_play");

		isPlaying = false;
		document.getElementById(currentAudio).pause();
		clearInterval(timer);
	}
}

// TIME
function changeBar() {
	const audio = document.getElementById(currentAudio);
	const percentage = (audio.currentTime / audio.duration).toFixed(3);
	progressBar.style.transition = "";

	//set current time
	const minute = Math.floor(audio.currentTime / 60);
	const second = Math.floor(audio.currentTime % 60);
	const leftTime = audio.duration - audio.currentTime;
	currentTimeIndicator.innerHTML = ("0" + minute).substr(-2) + ":" + ("0" + second).substr(-2);

	//set left time
	const leftMinute = Math.floor(leftTime / 60);
	const leftSecond = Math.floor(leftTime % 60);

	leftTimeIndicator.innerHTML = ("0" + leftMinute).substr(-2) + ":" + ("0" + leftSecond).substr(-2);

	//set time bar
	progressBar.style.width = percentage * 100 + "%";
}

function showTime() {
	timer = setInterval(() => changeBar(), 500);
}

// SWITCHING MUSIC
function nextMusic(mode) {
	playBtn.classList.remove("_pause");
	playBtn.classList.add("_play");

	albumWrap.classList.remove("_pause");
	albumWrap.classList.add("_play");

	document.getElementById(currentAudio).pause();
	isPlaying = false;
	clearInterval(timer);

	if (mode === "next") {
		currentId = currentId + 1 > list.length - 1 ? 0 : currentId + 1;
		init();
	} else {
		currentId = currentId - 1 < 0 ? list.length - 1 : currentId - 1;
		init();
	}
}

// STARTING A RANDOM TRACK
function shuffle(e) {
	isShuffle = !isShuffle;
	if (isShuffle) {
		e.target.classList.add("_shuffle");
	} else {
		e.target.classList.remove("_shuffle");
	}
}

// 5 SECONDS AGO
function backward() {
	const audio = document.getElementById(currentAudio);
	audio.currentTime -= 5;
	if (!isPlaying) {
		changeBar();
	}
}

// 5 SECONDS AHEAD
function forward() {
	const audio = document.getElementById(currentAudio);
	audio.currentTime += 5;
	if (!isPlaying) {
		changeBar();
	}
}

// STOP MUSIC
function stopMusic() {
	playBtn.classList.add("_play");
	albumWrap.classList.add("_play");
	isPlaying = false;
}

// THE START OF THE NEXT TRACK
function goToNextMusic() {
	let newId = currentId;
	while (isShuffle && !loopOne && newId === currentId) {
		newId = Math.floor(Math.random() * Math.floor(list.length - 1));
	}

	if (!isShuffle && !loopOne) {
		currentId = currentId + 1 > list.length - 1 ? 0 : currentId + 1;
	}
	if (!isShuffle && loopOne) {
		currentId = currentId;
	}

	if (isShuffle) {
		currentId = newId;
	}
	init();
	document.getElementById(currentAudio).play();
}

// THE PLAYBACK MODE OF THE TRACK
function loop(e) {
	const audio = document.getElementById(currentAudio);

	if (!isLoop && !loopOne) {
		isLoop = true;
		loopOne = false;
		e.target.classList.remove("_off");
		e.target.classList.add("_loop");
		audio.loop = false;
		audio.onended = e => goToNextMusic();
		console.log(isLoop, loopOne);
	} else if (isLoop && !loopOne) {
		isLoop = true;
		loopOne = true;
		e.target.classList.remove("_loop");
		e.target.classList.add("_repeat");
		audio.loop = true;
		audio.onended = e => goToNextMusic();
		console.log(isLoop, loopOne);
	} else {
		isLoop = false;
		loopOne = false;
		e.target.classList.remove("_repeat");
		e.target.classList.add("_off");
		audio.loop = false;
		audio.onended = e => stopMusic();
		console.log(isLoop, loopOne);
	}
}

// PROGRESS 
function progress(e) {
	const audio = document.getElementById(currentAudio);
	const pos = (e.pageX - progressDiv.getClientRects()[0].x) / progressDiv.getClientRects()[0].width;
	audio.currentTime = pos * audio.duration;
	changeBar();
}

function init() {
	const audio = document.getElementById(currentAudio) === null ? new Audio() : document.getElementById(currentAudio);
	audio.src = list[currentId].url;
	audio.id = currentAudio;
	document.getElementById(currentAudio) === null ? document.body.appendChild(audio) : "";

	progressBar.style.transition = "none";
	progressBar.style.width = "0%";
	document.getElementById(currentAudio).currentTime = 0;

	albumClass.classList = (list[currentId].class);
	title.innerHTML = list[currentId].title;
	author.innerHTML = list[currentId].author;

	//set current time
	audio.addEventListener("loadedmetadata", function () {
		const leftMinute = Math.floor(audio.duration / 60);
		const leftSecond = Math.floor(audio.duration % 60);
		currentTimeIndicator.innerHTML = "00:00";
		leftTimeIndicator.innerHTML = ("0" + leftMinute).substr(-2) + ":" + ("0" + leftSecond).substr(-2);
		progressBar.style.transition = "";
	});

	document.getElementById(currentAudio).onended = e => goToNextMusic(e);
}

	playBtn.addEventListener("click", play);
	loopBtn.addEventListener("click", loop);

	shuffleBtn.addEventListener("click", shuffle);
	forwardBtn.addEventListener("click", forward);
	backwardBtn.addEventListener("click", backward);

	prevBtn.addEventListener("click", e => nextMusic("prev"));
	nextBtn.addEventListener("click", e => nextMusic("next"));
	progressDiv.addEventListener("click", e => {
		progress(e);
	});

	init();
})();