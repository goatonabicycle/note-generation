const tempoSlider = document.getElementById("tempoRange");
tempoSlider.value = window.localStorage.getItem("tempo");
const selectedTempo = document.getElementById("tempo") || "240";
selectedTempo.innerHTML = tempoSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
tempoSlider.onchange = () => {
  selectedTempo.innerHTML = tempoSlider.value;
  window.localStorage.setItem("tempo", tempoSlider.value);

  if (document.getElementById("play-button").innerHTML == "Stop") {
    clearInterval(timer);
    const tempo = 60000 / tempoSlider.value;
    console.log("tempo", tempo);
    timer = setInterval(applyToAllNotes, tempo);
  }
};

const selectedNumberOfNotes = document.getElementById("notes");
const selectedKey = document.getElementById("key");
const selectedScale = document.getElementById("scale");

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

selectedKey.onchange = () => {
  setUrl("key", selectedKey.value);
};

selectedScale.onchange = () => {
  setUrl("scale", selectedScale.value);
};

var href = new URL(window.location.href);
selectedNumberOfNotes.value = href.searchParams.get("notes") || 8;
selectedScale.value = href.searchParams.get("scale") || "lydian";
selectedTempo.value = href.searchParams.get("tempo") || "240";
selectedKey.value = href.searchParams.get("key") || "C";
