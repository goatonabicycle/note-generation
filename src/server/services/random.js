import Scale from "tonal";

const getRandomNotes = (numberOfNotes, withinRange = ["_", 1, 2, 3]) => {
  let result = [];

  for (let item = 0; item < numberOfNotes; item++) {
    const element = withinRange[Math.floor(Math.random() * withinRange.length)];
    result.push(element);
  }

  return result;
};

const buildRandomResult = (mode, notes, tempo) => {
  const modes = ["A lydian", "B lydian", "C lydian"];
  const baseNotes = Scale.notes(mode || "A lydian");
  const numberOfNotes = notes || 4;
  tempo = tempo || 120;

  const randomNotes = getRandomNotes(numberOfNotes, baseNotes);
  const result = {
    modes,
    pattern: randomNotes,
    allNotes: baseNotes,
    numberOfNotes,
    tempo,
  };

  return result;
};

export { buildRandomResult };
