import {
    setUrl
} from "./utils.js";
import {
    patterns
} from "./patterns.js"

const playButton = document.getElementById("play-button");
const shareButton = document.getElementById("note-share-button"); // "Share button is blocked by ad blockers. Amazing."
const refreshButton = document.getElementById("refresh-button");
const tempoSlider = document.getElementById("tempoRange");
const selectedTempo = document.getElementById("tempo") || "240";
const selectedNumberOfNotes = document.getElementById("notes");
const selectedKey = document.getElementById("key");
const selectedScale = document.getElementById("scale");

var patternsInstance = new patterns();

playButton.addEventListener("click", async () => {
    await Tone.start();
    console.log("audio is ready");
    if (playButton.innerHTML === "Stop") {
        clearInterval(timer);
        playButton.innerHTML = "Play";
        return;
    }
    playButton.innerHTML = "Stop";
    patternInstance.applyToAllNotes();

    const tempo = 60000 / tempoSlider.value;
    console.log("tempo", tempo);
    timer = setInterval(applyToAllNotes, tempo);
});

refreshButton.addEventListener("click", async () => {
    document.location.reload(true);
});

shareButton.addEventListener("click", async () => {
    const currentPattern = document.getElementById("current-pattern").innerText;
    //todo: Build the url with all selected items and current set of random notes here.
    alert(`Coming soon! But your pattern is: ${currentPattern} `);
});

// tempoSlider.value = window.localStorage.getItem("tempo");

//selectedTempo.innerHTML = tempoSlider.value; // Display the default slider value


function updateTempoUI(tempo) {
    selectedTempo.innerHTML = tempo;
    window.localStorage.setItem("tempo", tempo);
}

tempoSlider.onchange = patternsInstance.updateTempo(tempoSlider.value, updateTempoUI)
// Update the current slider value (each time you drag the slider handle)
// tempoSlider.onchange = (tempo) => {
//     selectedTempo.innerHTML = tempoSlider.value;
//     window.localStorage.setItem("tempo", tempoSlider.value);

//     if (playButton.innerHTML == "Stop") {
//         clearInterval(timer);
//         const tempo = 60000 / tempoSlider.value;
//         console.log("tempo", tempo);
//         timer = setInterval(applyToAllNotes, tempo);
//     }
// };

const setUrlQueryParam = (key) => (sender) => {
    setUrl(key, sender.target);
}

selectedNumberOfNotes.onchange = setUrlQueryParam("notes");
selectedKey.onchange = setUrlQueryParam("key");
selectedScale.onchange = setUrlQueryParam("scale");

var href = new URL(window.location.href);
selectedNumberOfNotes.value = href.searchParams.get("notes") || 8;
selectedScale.value = href.searchParams.get("scale") || "lydian";
selectedTempo.value = href.searchParams.get("tempo") || "240";
selectedKey.value = href.searchParams.get("key") || "C";