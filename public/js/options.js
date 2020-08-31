const selectedNumberOfNotes = document.getElementById("notes");
const selectedMode = document.getElementById("mode");
const selectedTempo = document.getElementById("tempo");

const setUrl = (parameterName, parameterValue) => {
  if (this.selectedIndex !== 0) {
    var href = new URL(window.location.href);
    href.searchParams.set(parameterName, parameterValue);
    window.location.href = href;
  }
};

selectedNumberOfNotes.onchange = () => {
  setUrl("notes", selectedNumberOfNotes.value);
};

selectedMode.onchange = () => {
  setUrl("mode", selectedMode.value);
};

selectedTempo.onchange = () => {
  setUrl("tempo", selectedTempo.value);
};

var href = new URL(window.location.href);
selectedNumberOfNotes.value = href.searchParams.get("notes") || 4;
selectedMode.value = href.searchParams.get("mode") || "A lydian";
selectedTempo.value = href.searchParams.get("tempo") || "120";
