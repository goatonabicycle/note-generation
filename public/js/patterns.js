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

console.log(mainMelody);

const applyToAllNotes = () => {
  if (currentItem === mainMelody.length) currentItem = 0;

  //Clear out the last item
  mainMelody[mainMelody.length - 1].noteObject.style.background = "";

  //Which item are we dealing with?
  const currentNote = mainMelody[currentItem];
  currentNote.noteObject.style.background = "blue";

  //play the sound for this item
  synth.triggerAttackRelease(
    currentNote.note,
    currentNote.duration,
    currentNote.time
  );

  //Reset the note prior
  if (currentItem > 0) {
    mainMelody[currentItem - 1].noteObject.style.background = "";
  }

  //Next item
  currentItem++;
};

Tone.Transport.bpm.value = 120;

const playButton = document.getElementById("play-button");

const playbuttonClickHandler = async () => {
  await Tone.start();
  console.log("audio is ready");
  if (playButton.innerHTML === "Stop") {
    clearInterval(timer);
    playButton.innerHTML = "Play";
    return;
  }
  playButton.innerHTML = "Stop";
  applyToAllNotes();
  timer = setInterval(applyToAllNotes, 500);
};

playButton.addEventListener("click", playbuttonClickHandler);
