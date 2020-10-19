class SoundPlayer {
  constructor(Tone, mainMelody, tempo, setState) {
    this.currentItem = 0;
    this.timer = 0;
    this.tempo = tempo;
    this.mainMelody = mainMelody;
    this.playing = false;
    this.setState = setState;
    this.synth = new Tone.Synth({
      oscillator: {
        count: 4,
        // type: "fatsawtooth",
      },
    }).toDestination();

  }

  loopThroughNotes() {
    const currentNote = this.mainMelody[this.currentItem];

    //play the sound for this item
    this.synth.triggerAttackRelease(
      currentNote.note,
      currentNote.duration,
      currentNote.time,
    );

    this.setState("currentItem", this.currentItem);

    this.currentItem++;

    if (this.currentItem === this.mainMelody.length) this.currentItem = 0;
  }

  async play() {
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
  }

  stateChanged(state) {
    if (state.tempo) {
      this.updateTempo(state.tempo);
    }
  }

  updateTempo(tempo) {
    this.tempo = tempo;
    if (this.playing) {
      this.loopWithNewTempo();
    }
  }

  loopWithNewTempo() {
    clearInterval(this.timer);
    const tempo = 60000 / this.tempo;
    this.timer = setInterval(this.loopThroughNotes.bind(this), tempo); //loopThroughNotes gets executed from Window context, bind this so that we have to instance properties.
  }
}

export { SoundPlayer };
