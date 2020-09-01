const tempoSlider = document.getElementById("tempoRange");
tempoSlider.value = window.localStorage.getItem("tempo");
const selectedTempo = document.getElementById("tempo");
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
const selectedMode = document.getElementById("mode");

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

var href = new URL(window.location.href);
selectedNumberOfNotes.value = href.searchParams.get("notes") || 4;
selectedMode.value = href.searchParams.get("mode") || "A lydian";
selectedTempo.value = href.searchParams.get("tempo") || "120";
