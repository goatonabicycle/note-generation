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

router.get("/", async function (req, res, next) {
  const modes = ["A lydian", "B lydian", "C lydian"];
  const notes = Scale.notes(req.query.mode || "A lydian");
  const numberOfNotes = req.query.notes || 4;
  const tempo = req.query.tempo || 120;

  const randomNotes = getRandomNotes(numberOfNotes, notes);
  const result = {
    modes,
    pattern: randomNotes,
    allNotes: notes,
    numberOfNotes,
    tempo,
  };

  res.render("index", result);
});

module.exports = router;
