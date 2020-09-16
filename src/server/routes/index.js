const express = require("express");
const router = express.Router();
const {
  Scale
} = require("tonal");
const {
  Mode
} = require("@tonaljs/tonal");

const getRandomNotes = (numberOfNotes, withinRange = []) => {
  let result = [];

  for (let item = 0; item < numberOfNotes; item++) {
    const element = withinRange[Math.floor(Math.random() * withinRange.length)];
    result.push(element);
  }

  return result;
};

const buildRandomResult = (query) => {
  const keys = [
    "A",
    "Bb",
    "B",
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "Gb",
    "G",
    "Ab",
  ];

  const {
    scale,
    notes,
    key,
    pattern
  } = query

  if (pattern) {
    console.log("Woah! You already have a pattern -> " + pattern)
  } else {}

  const selectedKey = key || "C";
  const selectedScale = scale || "lydian";
  const allScales = Mode.names();
  const baseNotes = Scale.notes(selectedKey + " " + selectedScale);
  const selectedNumberOfNotes = notes || 8;

  console.log({
    pattern
  })
  const randomNotes = pattern.replace(",", "") || getRandomNotes(selectedNumberOfNotes, baseNotes);
  console.log({
    randomNotes
  })

  const result = {
    pattern: randomNotes,
    selectedScale,
    selectedKey,
    selectedNumberOfNotes,
    keys,
    allNotes: baseNotes,
    allScales,
  };

  return result;
};

router.get("/", async function (req, res, next) {
  const result = buildRandomResult(req.query);
  res.render("index", result);
});

module.exports = router;