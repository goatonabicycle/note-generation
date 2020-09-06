import { setUrl } from "./utils.js";
import { patterns } from "./patterns.js";

const selectedNumberOfNotes = document.getElementById("notes");
const selectedScale = document.getElementById("scale");
const selectedTempo = document.getElementById("tempo");
const playButton = document.getElementById("play-button");
const refreshButton = document.getElementById("refresh-button");
const noteObjects = document.querySelectorAll(".note-item");
const setTempo = document.querySelectorAll(".tempo") || 120;

selectedNumberOfNotes.onchange = (sender) => {
  setUrl("notes", sender.value);
};

selectedScale.onchange = (sender) => {
  setUrl("scale", sender.value);
};

selectedTempo.onchange = (sender) => {
  setUrl("tempo", sender.value);
};

var href = new URL(window.location.href);
selectedNumberOfNotes.value = href.searchParams.get("notes") || 4;
selectedScale.value = href.searchParams.get("mode") || "ionian";
selectedTempo.value = href.searchParams.get("tempo") || "120";

var patternsInstance = new patterns(noteObjects);

playButton.addEventListener("click", patternsInstance.playbuttonClickHandler);
refreshButton.addEventListener("click", patternsInstance.refreshClickHandler);
