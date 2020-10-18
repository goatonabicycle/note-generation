import "jest";
import { pattern } from "../../src/client/public/js/patterns";

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

let noteObjects = [{ innerHTML: "A" }];
let tempo = 0;
let updateUIFromState = jest.fn();
const patternsInstance = new pattern(toneMock, noteObjects, tempo, updateUIFromState);

test('should loop through notes and play them', () => {
    patternsInstance.loopThroughNotes();

    expect(updateUIFromState).toHaveBeenCalledWith({ currentItem: 0, tempo: 0 });
    expect(triggerAttackRelease).toHaveBeenCalledWith("A2", "8n", undefined);
});