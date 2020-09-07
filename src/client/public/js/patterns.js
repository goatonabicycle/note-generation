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
    note: element.innerHTML + "2",
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