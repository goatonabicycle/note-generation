/* eslint-disable no-undef */
import {
    setUrl,
    createSharableUrl,
    removeUrlParameter,
    copyStringToClipboard,
} from "./utils.js";
import { SoundPlayer } from "./soundPlayer.js";

const App = function (settings) {
    try {
        this.constructor();
        this.init(settings);
    } catch (e) {
        console.error(e);
    }
}

App.prototype = {
    state: {
        currentItem: 0,
        tempo: "240",
        mainMelody: [],
    },
    soundPlayer: undefined,
    ui: {
        playButton: document.getElementById("play-button"),
        shareButton: document.getElementById("note-share-button"),
        refreshButton: document.getElementById("refresh-button"),
        tempoSlider: document.getElementById("tempo-range"),
        tempoTextbox: document.getElementById("tempo-text"),
        selectedNumberOfNotes: document.getElementById("notes"),
        selectedEmptyNotes: document.getElementById("empty-notes"),
        selectedKey: document.getElementById("key"),
        selectedScale: document.getElementById("scale"),
        noteObjects: document.querySelectorAll(".note-item"),
        currentPattern: document.getElementById("current-pattern").innerText,
        sharePanel: document.getElementById("share-url"),
    },
    constructor() { },
    init: function (settings) {
        /* Initialise settings and state */
        this.state.tempo = window.localStorage.getItem("tempo");
        if (settings) {
            this.state.currentItem = settings.currentItem;
            this.state.tempo = settings.tempo;
        }

        /*Init soundPlayer component with notes from server hydrated view */
        this.ui.noteObjects.forEach((element) => {
            this.state.mainMelody.push({
                note: element.innerHTML + "2",
                duration: "8n",
                noteObject: element,
            });
        });
        this.soundPlayer = new SoundPlayer(Tone, this.state.mainMelody, this.state.tempo, this.setState.bind(this))

        /* Set initial UI values */
        this.ui.tempoSlider.value = this.state.tempo;
        this.ui.tempoTextbox.value = this.state.tempo;

        /*Bind UI event handlers */
        this.ui.playButton.addEventListener("click", async () => {
            const playing = await this.soundPlayer.play();
            this.ui.playButton.innerHTML = playing ? "Stop" : "Play";
        });

        this.ui.refreshButton.addEventListener("click", async () => {
            document.location = removeUrlParameter(document.location + "", "pattern");
        });

        this.ui.shareButton.addEventListener("click", async () => {
            function shareParameter(name, value) {
                this.name = name;
                this.value = value;
            }

            const shareParameterArray = new Set();
            shareParameterArray.add(new shareParameter("key", this.ui.selectedKey.value));
            shareParameterArray.add(new shareParameter("scale", this.ui.selectedScale.value));

            shareParameterArray.add(
                new shareParameter("notes", this.ui.selectedNumberOfNotes.value),
            );
            shareParameterArray.add(
                new shareParameter("empty", this.ui.selectedEmptyNotes.value),
            );
            shareParameterArray.add(new shareParameter("tempo", this.ui.tempoSlider.value));
            shareParameterArray.add(new shareParameter("pattern", this.ui.currentPattern));

            const shareableUrl = createSharableUrl(shareParameterArray);
            this.ui.sharePanel.innerText = shareableUrl;

            const copiedNotification = document.createElement("div");
            const copiedTextElement = document.createTextNode(
                "Copied to your clipboard!",
            );
            copiedNotification.appendChild(copiedTextElement);
            this.ui.sharePanel.append(copiedNotification);

            copyStringToClipboard(shareableUrl);
            console.log("shareableUrl", shareableUrl);
        });


        this.ui.tempoSlider.onchange = this.tempoOnchange.bind(this);
        this.ui.tempoTextbox.onchange = this.tempoOnchange.bind(this);
        this.ui.tempoTextbox.onkeypress = this.tempoOnchange.bind(this);
        this.ui.tempoTextbox.onpaste = this.tempoOnchange.bind(this);
        this.ui.tempoTextbox.oninput = this.tempoOnchange.bind(this);

        this.ui.selectedNumberOfNotes.onchange = this.setUrlQueryParam("notes").bind(this);
        this.ui.selectedEmptyNotes.onchange = this.setUrlQueryParam("empty").bind(this);
        this.ui.selectedKey.onchange = this.setUrlQueryParam("key").bind(this);
        this.ui.selectedScale.onchange = this.setUrlQueryParam("scale").bind(this);
    },
    tempoOnchange: function (event) {
        let tempo;
        if (event.target.id === "tempo-range") {
            tempo = this.ui.tempoSlider.value;
        }

        if (event.target.id === "tempo-text") {
            tempo = this.ui.tempoTextbox.value;
        }

        window.localStorage.setItem("tempo", tempo);
        this.setState("tempo", tempo);
    },
    setUrlQueryParam: function (key) {
        return function (sender) {
            setUrl(key, sender.target);
        }
    },
    setState: function (name, value) {
        const oldState = Object.assign({}, this.state); //Used to determine UI update
        this.state[name] = value;
        this.stateChanged(this.state, oldState);
    },
    stateChanged(newState, oldState) {
        /* Update component states */
        this.soundPlayer.stateChanged(newState);

        /* Update UI */
        this.render(newState, oldState);
    },
    render: function (newState, oldState) {
        if (newState.currentItem !== oldState.currentItem) {
            this.ui.noteObjects[this.ui.noteObjects.length - 1].classList.remove("playing");
            this.ui.noteObjects[newState.currentItem].classList.add("playing");
            if (newState.currentItem > 0) {
                this.ui.noteObjects[newState.currentItem - 1].classList.remove("playing");
            }
        }
        if (newState.tempo !== oldState.tempo) {
            this.ui.tempoSlider.value = newState.tempo;
            this.ui.tempoTextbox.value = newState.tempo;
        }
    }
}

//Start the App
new App();