import {
    setUrl
} from "./utils.js";
import {
    patterns
} from "./services.js"

const playButton = document.getElementById("play-button");
const shareButton = document.getElementById("note-share-button");
const refreshButton = document.getElementById("refresh-button");
const tempoSlider = document.getElementById("tempoRange");
const selectedTempo = document.getElementById("tempo") || "240";
const selectedNumberOfNotes = document.getElementById("notes");
const selectedKey = document.getElementById("key");
const selectedScale = document.getElementById("scale");
const noteObjects = document.querySelectorAll(".note-item");
const currentPattern = document.getElementById("current-pattern").innerText;

function updateUI(state) {
    //Set current playing note with color
    noteObjects[noteObjects.length - 1].classList.remove("playing");

    noteObjects[state.currentItem].classList.add("playing");

    if (state.currentItem > 0) {
        noteObjects[state.currentItem - 1].classList.remove("playing");
    }
};

var patternsInstance = new patterns(noteObjects, tempoSlider.value, updateUI);

playButton.addEventListener("click", async () => {
    const playing = await patternsInstance.play();
    playButton.innerHTML = playing ? "Stop" : "Play";
});

refreshButton.addEventListener("click", async () => {
    document.location.reload(true);
});

shareButton.addEventListener("click", async () => {
    //todo: Build the url with all selected items and current set of random notes here.
    alert(`Coming soon! But your pattern is: ${currentPattern} `);
});

tempoSlider.onchange = () => {
    const tempo = tempoSlider.value;
    patternsInstance.updateTempo(tempo);
    selectedTempo.innerHTML = tempo;
    window.localStorage.setItem("tempo", tempo);
};

const setUrlQueryParam = (key) => (sender) => {
    setUrl(key, sender.target);
}

selectedNumberOfNotes.onchange = setUrlQueryParam("notes");
selectedKey.onchange = setUrlQueryParam("key");
selectedScale.onchange = setUrlQueryParam("scale");

var href = new URL(window.location.href);
selectedNumberOfNotes.value = href.searchParams.get("notes") || 8;
selectedScale.value = href.searchParams.get("scale") || "lydian";
selectedKey.value = href.searchParams.get("key") || "C";

const initialTempo = window.localStorage.getItem("tempo") || "240"
tempoSlider.value = initialTempo;
selectedTempo.innerHTML = initialTempo;
patternsInstance.updateTempo(initialTempo);