const express = require("express");
const Diary = require("../models/diary");
const router = new express.Router();

router.post("/diaries", async (req, res) => {
  const diary = new Diary(req.body);

  try {
    await diary.save();
    res.send(diary);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/diaries", async (req, res) => {
  try {
    const diaries = await Diary.find({});
    res.send(diaries);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/diaries/:id", async (req, res) => {
  try {
    const diary = await Diary.findById(req.params.id);
    if (!diary) {
      res.status(404).send();
    }

    res.send(diary);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/diaries/:id", async (req, res) => {
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
    const diary = await Diary.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!diary) {
      return res.status(404).send();
    }

    res.send(diary);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/diaries/:id", async (req, res) => {
  try {
    const diary = await Diary.findByIdAndDelete(req.params.id);

    if (!diary) {
      return res.status(404).send();
    }

    res.send(diary);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
