console.log("Writing javascript for the project");
let currentAudio = new Audio(); 

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
function playAudio(track){
  currentAudio.src ="/AudioFiles/" + track;
  currentAudio.play();
}
async function main(params) {
  let Audios = await getAudios();
  //Getting the list of all the files 
  let FileUl = document.querySelector(".audioList ul");
  for (let element of Audios) {
    element = element.split("/").pop();
    //Displaying in the html playlist 
    element = element.replaceAll("%20", " ");
    FileUl.innerHTML =
      FileUl.innerHTML +
      `<li ">
    <img class="invert" src="Audio.svg" alt="Audio Icon">
    <div class="info">${element}</div>
    <img class="invert playNow" src="play.svg" alt="Play Icon">
    </li>`;
    Array.from(document.querySelector('.audioList').getElementsByTagName('li')).forEach(e=> {
      e.addEventListener('click',()=>{
        // console.log(e.querySelector('.info').innerHTML);
        playAudio(e.querySelector('.info').innerHTML.trim())

      })
    });
  }

}

main();
