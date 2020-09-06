var patterns = function (noteObjects) {
  ("use strict");

  var currentItem = 0;
  var timer = 0;
  var looping = false;
  const mainMelody = [];

  const synth = new Tone.Synth({
    oscillator: {
      count: 4,
      // type: "fatsawtooth",
    },
  }).toDestination();

  Tone.Transport.bpm.value = 120;

  noteObjects.forEach((element, index) => {
    mainMelody.push({
      note: element.innerHTML + "2",
      duration: "8n",
      noteObject: element,
    });
  });

  const applyToAllNotes = function () {
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

  const playbuttonClickHandler = async function (sender) {
    await Tone.start();
    if (this.looping === true) {
      clearInterval(timer);
      sender.target.innerHTML = "Play";
      this.looping = false;
      return;
    }
    sender.target.innerHTML = "Stop";
    this.looping = true;
    applyToAllNotes();
    timer = setInterval(applyToAllNotes, 500);
  };

  const refreshClickHandler = async function (sender) {
    alert("Still being implemented. Hol up");
    // clearInterval(timer);
    // sender.innerHTML = "Stop";
    // applyToAllNotes();
    // timer = setInterval(applyToAllNotes, 500);
  };

  return {
    applyToAllNotes,
    playbuttonClickHandler,
    refreshClickHandler,
  };
};

export { patterns };
