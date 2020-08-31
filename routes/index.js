const express = require("express");
const router = express.Router();
const { Scale } = require("tonal");

const getRandomNotes = (numberOfNotes, withinRange = ["_", 1, 2, 3]) => {
  let result = [];

  for (let item = 0; item < numberOfNotes; item++) {
    const element = withinRange[Math.floor(Math.random() * withinRange.length)];
    result.push(element);
  }

  console.log(result);
  return result;
};

router.get("/", async function (req, res, next) {
  const mode = "A lydian";
  const notes = Scale.notes(mode);
  const numberOfNotes = 4;
  const tempo = 120;

  const randomNotes = getRandomNotes(numberOfNotes, notes);
  const result = {
    pattern: randomNotes,
    allNotes: notes,
    numberOfNotes,
    tempo,
  };

  res.render("index", result);
});

module.exports = router;
