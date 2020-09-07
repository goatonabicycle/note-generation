function patterns(noteObjects, tempo) {
  this.currentItem = 0;
  this.timer = 0;
  this.tempo = tempo;
  this.mainMelody = [];
  this.playing = false;

  noteObjects.forEach((element, index) => {
    this.mainMelody.push({
      note: element.innerHTML + "2",
      duration: "8n",
      noteObject: element,
    });
  });
}

patterns.prototype.synth =  new Tone.Synth({
    oscillator: {
      count: 4,
      // type: "fatsawtooth",
    },
  }).toDestination();

patterns.prototype.setStyleToPlaying = function(nodeItem){
  nodeItem.classList.add("playing");
};

patterns.prototype.setStyleToDefault = function(nodeItem){
  nodeItem.classList.remove("playing");
};

patterns.prototype.applyToAllNotes = function() {
  if (this.currentItem === this.mainMelody.length) this.currentItem = 0;

  //Clear out the last item
  this.setStyleToDefault(this.mainMelody[this.mainMelody.length - 1].noteObject);

  //Which item are we dealing with?
  const currentNote = this.mainMelody[this.currentItem];
  this.setStyleToPlaying(currentNote.noteObject);

  //play the sound for this item
  this.synth.triggerAttackRelease(
    currentNote.note,
    currentNote.duration,
    currentNote.time
  );

  //Reset the note prior
  if (this.currentItem > 0) {
    this.setStyleToDefault(this.mainMelody[this.currentItem - 1].noteObject);
  }

  //Next item
  this.currentItem++;
};

patterns.prototype.play = async function () {
    await Tone.start();
    if (this.playing) {
        clearInterval(this.timer);
        this.playing = false;
        return this.playing;
    }
    this.applyToAllNotes();
    const tempo = 60000 / this.tempo;
    this.timer = setInterval(this.applyToAllNotes.bind(this), tempo); //applyToAllNotes gets executed from Window context, bind this so that we have to instance properties.
    this.playing = true;
    return this.playing;
};

patterns.prototype.updateTempo = function(tempo) {
  this.tempo = tempo;
  if (this.playing) {
    this.replayLoop();
  }
}

patterns.prototype.replayLoop =  function(){
    clearInterval(this.timer);
    const tempo = 60000 / this.tempo;
    this.timer = setInterval(this.applyToAllNotes.bind(this), tempo);//applyToAllNotes gets executed from Window context, bind this so that we have to instance properties.
};

export {
  patterns
};