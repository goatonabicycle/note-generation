function patterns() {

  let currentItem = 0;
  const noteObjects = document.querySelectorAll(".note-item");
  const setTempo = document.querySelectorAll(".tempo") || 120;
  var timer = 0;
  var tempo = 0;

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

  function applyToAllNotes() {
    if (this.currentItem === this.mainMelody.length) this.currentItem = 0;

    //Clear out the last item
    setStyleToDefault(thismainMelody[this.mainMelody.length - 1].noteObject);

    //Which item are we dealing with?
    const currentNote = this.mainMelody[this.currentItem];
    setStyleToPlaying(currentNote.noteObject);

    //play the sound for this item
    this.synth.triggerAttackRelease(
      currentNote.note,
      currentNote.duration,
      currentNote.time
    );

    //Reset the note prior
    if (this.currentItem > 0) {
      setStyleToDefault(this.mainMelody[this.currentItem - 1].noteObject);
    }

    //Next item
    this.currentItem++;
  };

  const updateTempo = (tempo, callback) => {
    this.replayLoop();
    callback(tempo);
  }

  function replayLoop() {
    if (this.currentlyPlaying) {
      clearInterval(timer);
      const tempo = 60000 / this.tempo;
      console.log("tempo", tempo);
      timer = setInterval(this.applyToAllNotes, tempo);
    }
  };

  return {
    setStyleToPlaying,
    setStyleToDefault,
    applyToAllNotes,
    updateTempo
  };
};

export {
  patterns
};