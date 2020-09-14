function patterns(noteObjects, tempo, updateUIFromState) {
  this.currentItem = 0;
  this.timer = 0;
  this.tempo = tempo;
  this.mainMelody = [];
  this.playing = false;
  this.updateUIFromState = updateUIFromState;

  noteObjects.forEach((element, index) => {
    this.mainMelody.push({
      note: element.innerHTML + "2",
      duration: "8n",
      noteObject: element,
    });
  });
}

patterns.prototype.synth = new Tone.Synth({
  oscillator: {
    count: 4,
    // type: "fatsawtooth",
  },
}).toDestination();


patterns.prototype.loopThroughNotes = function () {
  const currentNote = this.mainMelody[this.currentItem];

  //play the sound for this item
  this.synth.triggerAttackRelease(
    currentNote.note,
    currentNote.duration,
    currentNote.time
  );

  //update UI
  this.updateUIFromState({
    currentItem: this.currentItem,
    tempo: this.tempo
  });

  //Next item
  this.currentItem++;

  if (this.currentItem === this.mainMelody.length) this.currentItem = 0;
};

patterns.prototype.play = async function () {
  await Tone.start();
  if (this.playing) {
    clearInterval(this.timer);
    this.playing = false;
    return this.playing;
  }
  this.loopThroughNotes();
  const tempo = 60000 / this.tempo;
  this.timer = setInterval(this.loopThroughNotes.bind(this), tempo); //applyToAllNotes gets executed from Window context, bind this so that we have to instance properties.
  this.playing = true;
  return this.playing;
};

patterns.prototype.updateTempo = function (tempo) {
  this.tempo = tempo;
  if (this.playing) {
    this.loopWithNewTempo();
  }

  //update UI
  this.updateUIFromState({
    currentItem: this.currentItem,
    tempo: this.tempo
  });
}

patterns.prototype.loopWithNewTempo = function () {
  clearInterval(this.timer);
  const tempo = 60000 / this.tempo;
  this.timer = setInterval(this.loopThroughNotes.bind(this), tempo); //loopThroughNotes gets executed from Window context, bind this so that we have to instance properties.
};

export {
  patterns
};