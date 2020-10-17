/* eslint-disable no-undef */
import {
  setUrl,
  createSharableUrl,
  removeUrlParameter,
  copyStringToClipboard,
} from "./utils.js";
import { pattern } from "./patterns.js";

const defaultTempo = "240";

const playButton = document.getElementById("play-button");
const shareButton = document.getElementById("note-share-button");
const refreshButton = document.getElementById("refresh-button");
const tempoSlider = document.getElementById("tempo-range");
const tempoTextbox = document.getElementById("tempo-text") || defaultTempo;
const selectedNumberOfNotes = document.getElementById("notes");
const selectedEmptyNotes = document.getElementById("empty-notes");
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

var patternInstance = new pattern(
  Tone,
  noteObjects,
  tempoSlider.value,
  updateUI,
);

playButton.addEventListener("click", async () => {
  const playing = await patternInstance.play();
  playButton.innerHTML = playing ? "Stop" : "Play";
});

refreshButton.addEventListener("click", async () => {
  document.location = removeUrlParameter(document.location + "", "pattern");
});

shareButton.addEventListener("click", async () => {
  function shareParameter(name, value) {
    this.name = name;
    this.value = value;
  }

  const shareParameterArray = new Set();
  shareParameterArray.add(new shareParameter("key", selectedKey.value));
  shareParameterArray.add(new shareParameter("scale", selectedScale.value));

  shareParameterArray.add(
    new shareParameter("notes", selectedNumberOfNotes.value),
  );
  shareParameterArray.add(
    new shareParameter("empty", selectedEmptyNotes.value),
  );
  shareParameterArray.add(new shareParameter("tempo", tempoSlider.value));
  shareParameterArray.add(new shareParameter("pattern", currentPattern));

  const shareableUrl = createSharableUrl(shareParameterArray);
  sharePanel.innerText = shareableUrl;

  const copiedNotification = document.createElement("div");
  const copiedTextElement = document.createTextNode(
    "Copied to your clipboard!",
  );
  copiedNotification.appendChild(copiedTextElement);
  sharePanel.append(copiedNotification);

  copyStringToClipboard(shareableUrl);
  console.log("shareableUrl", shareableUrl);
});

const tempoOnchange = (event) => {
  let tempo;
  if (event.target.id === "tempo-range") {
    tempo = tempoSlider.value;
    tempoTextbox.value = tempo;
  }

  if (event.target.id === "tempo-text") {
    tempo = tempoTextbox.value;
    tempoRange.value = tempo;
  }

  patternInstance.updateTempo(tempo);
  window.localStorage.setItem("tempo", tempo);
};

tempoSlider.onchange = tempoOnchange;
tempoTextbox.onchange = tempoOnchange;
tempoTextbox.onkeypress = tempoOnchange;
tempoTextbox.onpaste = tempoOnchange;
tempoTextbox.oninput = tempoOnchange;

const setUrlQueryParam = (key) => (sender) => {
  setUrl(key, sender.target);
};

selectedNumberOfNotes.onchange = setUrlQueryParam("notes");
selectedEmptyNotes.onchange = setUrlQueryParam("empty");
selectedKey.onchange = setUrlQueryParam("key");
selectedScale.onchange = setUrlQueryParam("scale");

const initialTempo = window.localStorage.getItem("tempo") || defaultTempo;
tempoSlider.value = initialTempo;
tempoTextbox.value = initialTempo;
patternInstance.updateTempo(initialTempo);
