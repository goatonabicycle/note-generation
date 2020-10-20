import { Scale } from "tonal";
import { Mode } from "@tonaljs/tonal";
import defaultValues from "../defaultValues";

class MelodyService {

    getRandomNotes(numberOfNotes, withinRange = []) {
        let result = [];
        for (let item = 0; item < numberOfNotes; item++) {
            const element = withinRange[Math.floor(Math.random() * withinRange.length)];
            result.push(element);
        }

        return result;
    };

    buildRandomResult(settings) {
        const { scale, notes, key, pattern, empty } = settings;

        const selectedKey = key || defaultValues.key;
        const selectedScale = scale || defaultValues.scale;
        const allScales = Mode.names();
        const baseNotes = Scale.notes(selectedKey + " " + selectedScale);
        const selectedNumberOfNotes = notes || defaultValues.notes;
        const allEmptyModes = ["None", "Low", "High"];
        const selectedEmptyMode = empty || defaultValues.empty;

        if (selectedEmptyMode === "Low") {
            baseNotes.push(" ");
        }

        if (selectedEmptyMode === "High") {
            baseNotes.push(" ");
            baseNotes.push(" ");
        }

        let randomNotes = "";
        if (pattern) {
            randomNotes = pattern.split(",");
            console.log("Woah! You already have a pattern -> " + pattern);
        } else {
            randomNotes = this.getRandomNotes(selectedNumberOfNotes, baseNotes);
        }

        const result = {
            pattern: randomNotes,
            selectedScale,
            selectedKey,
            selectedNumberOfNotes,
            keys: defaultValues.keys,
            allNotes: baseNotes,
            allScales,
            allEmptyModes,
            selectedEmptyMode,
        };

        return result;
    };
}

export default MelodyService;