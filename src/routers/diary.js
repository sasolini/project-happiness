const express = require("express");
const Diary = require("../models/diary");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/diaries", auth, async (req, res) => {
  const diary = new Diary({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await diary.save();
    res.status(201).send(diary);
  } catch (e) {
    res.status(400).send();
  }
});

router.get("/diaries", auth, async (req, res) => {
  try {
    const diaries = await Diary.find({ owner: req.user._id });
    res.send(diaries);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/diaries/:id", auth, async (req, res) => {
  try {
    const diary = await Diary.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!diary) {
      res.status(404).send();
    }

    res.send(diary);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/diaries/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "workout",
    "meditation",
    "gratitude1",
    "gratitude3",
    "gratitude2",
    "memory",
    "kindness",
  ];
  const isValid = updates.every((update) => allowedUpdates.includes(update));

  if (!isValid) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const diary = await Diary.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!diary) {
      return res.status(404).send();
    }

    updates.forEach((update) => (diary[update] = req.body[update]));
    await diary.save();
    res.send(diary);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/diaries/:id", auth, async (req, res) => {
  try {
    const diary = await Diary.findByIdAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!diary) {
      return res.status(404).send();
    }

    res.send(diary);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
