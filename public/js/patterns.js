let currentItem = 0;
const noteObjects = document.querySelectorAll(".note-item");
const setTempo = document.querySelectorAll(".tempo") || 120;
var timer = 0;

const synth = new Tone.Synth({
  oscillator: {
    count: 4,
    // type: "fatsawtooth",
  },
}).toDestination();

const mainMelody = [];

noteObjects.forEach((element, index) => {
  mainMelody.push({
    note: element.outerText + "2",
    duration: "8n",
    noteObject: element,
  });
});

const setStyleToPlaying = (nodeItem) => {
  nodeItem.classList.add("playing");
};

const setStyleToDefault = (nodeItem) => {
  nodeItem.classList.remove("playing");
};

const applyToAllNotes = () => {
  if (currentItem === mainMelody.length) currentItem = 0;

  //Clear out the last item
  setStyleToDefault(mainMelody[mainMelody.length - 1].noteObject);

  //Which item are we dealing with?
  const currentNote = mainMelody[currentItem];
  setStyleToPlaying(currentNote.noteObject);

  //play the sound for this item
  synth.triggerAttackRelease(
    currentNote.note,
    currentNote.duration,
    currentNote.time
  );

  //Reset the note prior
  if (currentItem > 0) {
    setStyleToDefault(mainMelody[currentItem - 1].noteObject);
  }

  //Next item
  currentItem++;
};

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
