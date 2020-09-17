const express = require("express");
const router = express.Router();
const {
  Scale
} = require("tonal");
const {
  Mode
} = require("@tonaljs/tonal");

const defaultValues = require("../../defaultValues");

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
  } = query;


  const selectedKey = key || defaultValues.key;
  const selectedScale = scale || defaultValues.scale;
  const allScales = Mode.names();
  const baseNotes = Scale.notes(selectedKey + " " + selectedScale);
  const selectedNumberOfNotes = notes || defaultValues.notes;

  let randomNotes = "";
  if (pattern) {
    randomNotes = pattern.replace(/,/g, "");
    console.log("Woah! You already have a pattern -> " + pattern);
  } else {
    randomNotes = getRandomNotes(selectedNumberOfNotes, baseNotes);
  }

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