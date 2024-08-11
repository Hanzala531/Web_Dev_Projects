console.log("Writing javascript for the project");
let currentAudio = new Audio();
let previousAudio;
let nextAudio;

function convertSecondsToMinutes(seconds) {
  // Calculate minutes and remaining seconds
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = Math.floor(seconds % 60);

  // Ensure both minutes and seconds are two digits
  minutes = minutes < 10 ? '0' + minutes : minutes;
  remainingSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

  // Return the formatted time string
  return `${minutes}:${remainingSeconds}`;
}


async function getAudios() {
  let a = await fetch("http://127.0.0.1:3000/AudioFiles/");
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let Anchor_Tags = div.getElementsByTagName("a");
  let Audios = [];
  for (i = 0; i < Anchor_Tags.length; i++) {
    const element = Anchor_Tags[i];
    if (element.href.endsWith(".mp3")) {
      Audios.push(element.href);
    }
  }
  return Audios;
}
//Function to play the music
function playAudio(track ) {
  currentAudio.src = "/AudioFiles/" + track;
    currentAudio.play();
    play.src = "pause.svg";

  //the below line will display the name of current audio being played
  console.log(track); 
  document.querySelector(".audioName").innerHTML = `<spam>${track}</span>`;
}

async function main() {
  let Audios = await getAudios();
  console.log(Audios);


  //Getting the list of all the files
  let FileUl = document.querySelector(".audioList ul");
  for (let element of Audios) {
    element = element.split("/").pop();
    //Displaying in the html playlist
    element = element.replaceAll("%20", " ");
    FileUl.innerHTML =
      FileUl.innerHTML +
      `<li class="pointer">
    <img class="invert" src="Audio.svg" alt="Audio Icon">
    <div class="info">${element}</div>
    <img  class="invert playNow" src="play.svg" alt="Play Icon">
    </li>`;

    Array.from(
      document.querySelector(".audioList").getElementsByTagName("li")
    ).forEach((e) => {
      e.addEventListener("click", () => {
        // console.log(e.querySelector('.info').innerHTML);
        playAudio(e.querySelector(".info").innerHTML.trim());
      });  
      


      play.addEventListener("click", () => {
        if (currentAudio.paused) {
          currentAudio.play();
          play.src = "pause.svg";
        } else {
          currentAudio.pause();
          play.src = "play.svg";
        }
      });
    });
  }

  // Listen for time update event
  currentAudio.addEventListener('timeupdate' , ()=>{
    // console.log(currentAudio.currentTime , currentAudio.duration);
    document.querySelector('.audioDuration').innerHTML = `<span>${convertSecondsToMinutes(currentAudio.currentTime)} / ${convertSecondsToMinutes(currentAudio.duration)}</span>`
    // console.log(convertSecondsToMinutes(currentAudio.currentTime) ,  convertSecondsToMinutes(currentAudio.duration));
    //making seekbar funtional

  document.querySelector('.circle').style.left = (currentAudio.currentTime / currentAudio.duration)*100 +"%";
    
  });
  
  document.querySelector('.seekbar').addEventListener('click' , (e)=>{
    let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
    // console.log(percent);
    document.querySelector('.circle').style.left = percent + "%"
    currentAudio.currentTime = ((currentAudio.duration)*percent)/100;
    

    
  })

}

main();
