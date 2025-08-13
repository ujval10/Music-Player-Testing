async function getSongs() {
  try {
    // Load songs from the songs.json file instead of local server
    const response = await fetch("songs.json");
    const songList = await response.json();
    
    // Convert relative paths to absolute URLs that work on any hosting platform
    const songs = songList.map(songPath => {
      // Create a full URL based on the current page location
      const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/');
      return baseUrl + songPath;
    });
    
    return songs;
  } catch (err) {
    console.error("Failed to load songs:", err);
    return [];
  }
}

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "Invalid input";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  
  return `${formattedMinutes}:${formattedSeconds}`;
}

async function main() {
  try {
    let songs = await getSongs();
    console.log(songs);

   let songUL= document.querySelector(".songList").getElementsByTagName("ul")[0]
   for (const song of songs) {
    songUL.innerHTML = songUL.innerHTML+song
    
   }
    
    if (songs.length > 0) {
      let audio = new Audio(songs[0]); // ✅ correct usage
      audio.play();
    } else {
      console.warn("No songs found.");
    }
  } catch (error) {
    console.error("Error fetching songs:", error);
  }

  play.addEventListener("click", ()=>{
    if(currentSong.paused){
      currentSong.play()
      play.src = "pause.svg"
    }
    else{
      currentSong.pause()
      play.src = "play.svg"
    }
  })

  currentSong.addEventListener("timeupdate",()=>{
    console.log(currentSong.currentTime,currentSong.duration);
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
    document.querySelector(".circle").style.left = (currentSong.currentTime/ currentSong.duration)*100 + "%"
  }) 

  document.querySelector(".seekbar").addEventListener("click", e=>{
    let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = ((currentSong.duration)* percent)/100
  })
}

main();
