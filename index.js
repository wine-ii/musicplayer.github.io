import {naats} from "./naats.js";

const play = document.getElementById("play");
const music = document.querySelector("audio");
const img = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const progress = document.getElementById("progress");
const totalDuration = document.getElementById("duration");
const totalCurrentTime = document.getElementById("current-time");
const progressDiv = document.getElementById("progress-div"); 


let isPlay = false;

const musicPlay = ()=>{
    isPlay = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    img.classList.add("anim");
}


const pauseMusic = ()=>{
    isPlay = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    img.classList.remove("anim");
}

play.addEventListener("click",()=>{
    isPlay? pauseMusic() : musicPlay(); 
})


const loadNaat = (naats) =>{
    title.textContent = naats.title;
    artist.textContent = naats.artist;
    music.src = `./Naats/${naats.name}.mp3`;
    img.src = `./images/${naats.img_name}.jpg`;
}

let naatIndex = 0;
loadNaat(naats[naatIndex]);

const nextNaat = ()=>{
    naatIndex = (naatIndex + 1) % naats.length;
    loadNaat(naats[naatIndex]);
    musicPlay();
}

const prevNaat = ()=>{
    naatIndex = (naatIndex - 1 + naats.length) % naats.length;
    loadNaat(naats[naatIndex]);
    musicPlay();
}

next.addEventListener("click", nextNaat);
prev.addEventListener("click", prevNaat);

music.addEventListener("timeupdate",(event)=>{
    const {currentTime, duration} = event.srcElement;
    let progress_time = (currentTime/duration) *100;
    progress.style.width = `${progress_time}%`;

    let min = Math.floor((duration/60));
    let sec = Math.floor((duration%60));
    let tot_duration = `${min}:${sec}`;
    if(duration){
        totalDuration.textContent = `${tot_duration}`;
    }    

    // current 

    let min_current = Math.floor((currentTime/60));
    let sec_current = Math.floor((currentTime%60));
    if(sec_current < 10){
        sec_current = `0${sec_current}`;
    }
    let tot_currentTime = `${min_current}:${sec_current}`;
    totalCurrentTime.textContent = `${tot_currentTime}`; 

});

music.addEventListener("ended",nextNaat);

progressDiv.addEventListener("click",(event)=>{
    const{duration} = music;
    const move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
    music.currentTime = move_progress;
})