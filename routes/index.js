const express = require("express");
const router = express.Router();
const { Scale } = require("tonal");

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
  // const currentTempo = tempo || 120;

  const randomNotes = getRandomNotes(numberOfNotes, baseNotes);
  const result = {
    modes,
    pattern: randomNotes,
    allNotes: baseNotes,
    numberOfNotes,
    // currentTempo,
  };

  return result;
};

router.get("/", async function (req, res, next) {
  const result = buildRandomResult(
    req.query.mode,
    req.query.notes,
    req.query.tempo
  );
  res.render("index", result);
  console.log("req.query.tempo", req.query.tempo);
});

module.exports = router;
