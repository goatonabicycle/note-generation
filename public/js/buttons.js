const playButton = document.getElementById("play-button");

playButton.addEventListener("click", async () => {
    await Tone.start();
    console.log("audio is ready");
    if (playButton.innerHTML === "Stop") {
        clearInterval(timer);
        playButton.innerHTML = "Play";
        return;
    }
    playButton.innerHTML = "Stop";
    applyToAllNotes();

    const tempo = 60000 / tempoSlider.value;
    console.log("tempo", tempo);
    timer = setInterval(applyToAllNotes, tempo);
});

const refreshButton = document.getElementById("refresh-button");

refreshButton.addEventListener("click", async () => {
    document.location.reload(true);
});

const shareButton = document.getElementById("note-share-button"); // "Share button is blocked by ad blockers. Amazing."
shareButton.addEventListener("click", async () => {
    const currentPattern = document.getElementById("current-pattern").innerText;
    //todo: Build the url with all selected items and current set of random notes here.
    alert(`Coming soon! But your pattern is: ${currentPattern} `);
});