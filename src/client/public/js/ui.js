import {
  setUrl,
  createSharableUrl
} from "./utils.js";
import {
  patterns
} from "./patterns.js";

const defaultTempo = "240"

const playButton = document.getElementById("play-button");
const shareButton = document.getElementById("note-share-button");
const refreshButton = document.getElementById("refresh-button");
const tempoSlider = document.getElementById("tempoRange");
const selectedTempo = document.getElementById("tempo") || defaultTempo;
const selectedNumberOfNotes = document.getElementById("notes");
const selectedKey = document.getElementById("key");
const selectedScale = document.getElementById("scale");
const noteObjects = document.querySelectorAll(".note-item");
const currentPattern = document.getElementById("current-pattern").innerText;

const sharePanel = document.getElementById("share-url");

function updateUI(state) {
  //Set current playing note with color
  noteObjects[noteObjects.length - 1].classList.remove("playing");

  noteObjects[state.currentItem].classList.add("playing");

  if (state.currentItem > 0) {
    noteObjects[state.currentItem - 1].classList.remove("playing");
  }
}

var patternsInstance = new patterns(noteObjects, tempoSlider.value, updateUI);

playButton.addEventListener("click", async () => {
  const playing = await patternsInstance.play();
  playButton.innerHTML = playing ? "Stop" : "Play";
});

refreshButton.addEventListener("click", async () => {
  document.location.reload(true);
});

shareButton.addEventListener("click", async () => {
  function shareParameter(name, value) {
    this.name = name;
    this.value = value;
  }

  const shareParameterArray = [];
  shareParameterArray.push(new shareParameter("key", selectedKey.value));
  shareParameterArray.push(new shareParameter("scale", selectedScale.value));
  shareParameterArray.push(
    new shareParameter("notes", selectedNumberOfNotes.value)
  );
  shareParameterArray.push(
    new shareParameter("tempo", window.localStorage.getItem("tempo"))
  );
  shareParameterArray.push(
    new shareParameter("pattern", currentPattern.replace(",", ""))
  );

  const shareableUrl = createSharableUrl(shareParameterArray);
  sharePanel.innerHTML = shareableUrl;
  console.log("shareableUrl", shareableUrl);
});

tempoSlider.onchange = () => {
  const tempo = tempoSlider.value;
  patternsInstance.updateTempo(tempo);
  selectedTempo.innerHTML = tempo;
  window.localStorage.setItem("tempo", tempo);
};

const setUrlQueryParam = (key) => (sender) => {
  setUrl(key, sender.target);
};

selectedNumberOfNotes.onchange = setUrlQueryParam("notes");
selectedKey.onchange = setUrlQueryParam("key");
selectedScale.onchange = setUrlQueryParam("scale");

const initialTempo = window.localStorage.getItem("tempo") || defaultTempo;
tempoSlider.value = initialTempo;
selectedTempo.innerHTML = initialTempo;
patternsInstance.updateTempo(initialTempo);