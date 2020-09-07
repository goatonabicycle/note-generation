import {
    setUrl
} from "./utils.js";
import {
    patterns
} from "./services.js"

const playButton = document.getElementById("play-button");
const shareButton = document.getElementById("note-share-button"); // "Share button is blocked by ad blockers. Amazing."
const refreshButton = document.getElementById("refresh-button");
const tempoSlider = document.getElementById("tempoRange");
const selectedTempo = document.getElementById("tempo") || "240";
const selectedNumberOfNotes = document.getElementById("notes");
const selectedKey = document.getElementById("key");
const selectedScale = document.getElementById("scale");
const noteObjects = document.querySelectorAll(".note-item");
const currentPattern = document.getElementById("current-pattern").innerText;

const setStyleToPlaying = function(nodeItem){
  nodeItem.classList.add("playing");
};

const setStyleToDefault = function(nodeItem){
  nodeItem.classList.remove("playing");
};

function updateNotePlaying(index) {
  //Clear out the last item
  setStyleToDefault(noteObjects[noteObjects.length - 1]);

  //Which item are we dealing with?
  setStyleToPlaying(noteObjects[index]);

  //Reset the note prior
  if (index > 0) {
    setStyleToDefault(noteObjects[index - 1]);
  }
};

var patternsInstance = new patterns(noteObjects, tempoSlider.value, updateNotePlaying);

playButton.addEventListener("click", async () => {
    const playing = await patternsInstance.play(updateNotePlaying);
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
selectedTempo.value = href.searchParams.get("tempo") || "240";
selectedKey.value = href.searchParams.get("key") || "C";