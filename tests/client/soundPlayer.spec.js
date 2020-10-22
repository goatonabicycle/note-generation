import "jest";
import { SoundPlayer } from "../../src/client/public/js/soundPlayer";

const triggerAttackRelease = jest.fn();

const toneMock = {
    Synth: function () {
        return {
            toDestination: function () {
                return { triggerAttackRelease }
            },
        };
    }
};

let mainMelody = [
    {
        note: "A2",
        duration: "8n",
        noteObject: undefined,
    }
];
let tempo = 0;
let currentItem = 0;
let setState = jest.fn();
const soundPlayer = new SoundPlayer(toneMock, mainMelody, tempo, setState);

test('should loop through notes and play them', () => {
    soundPlayer.loopThroughNotes();

    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith("currentItem", currentItem);
    expect(triggerAttackRelease).toHaveBeenCalledWith("A2", "8n", undefined);
});