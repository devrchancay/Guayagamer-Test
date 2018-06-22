import express from "express";
import TalkRepository from "../../Repository/TalkRepository";
import request from "request";
const router = express.Router();

router.get("/talk", async (req, res) => {
  const talk = new TalkRepository();
  const response = await talk.findAll({}, { limit: 100 });
  res.json(response);
});

router.post("/talk", async (req, res, next) => {
  if (!req.body.title) {
    return res.status(422).json({
      errors: {
        title: "Debe ingresar el título de la charla"
      }
    });
  }

  if (!req.body.duration || !Number.isInteger(+req.body.duration)) {
    return res.status(422).json({
      errors: {
        duration:
          "Debe ingresar la duración de su charla en mi minutos o en cuartos"
      }
    });
  }

  if (!req.body.speaker) {
    return res.status(422).json({
      errors: {
        speaker: "Debe ingresar el nombre del ponente de la charla"
      }
    });
  }

  next();
});

router.post("/talk", async (req, res) => {
  try {
    const { title, duration, speaker, emailSpeaker } = req.body;
    const durationMinutes = duration === "1" ? 15 : duration;

    const talk = new TalkRepository();
    const response = await talk.storage({
      title: title.trim(),
      duration: durationMinutes,
      speaker,
      emailSpeaker
    });
    if (response.errors) {
      return res.status(422).json(response.errors);
    } else {
      return res.json(response);
    }
  } catch (errors) {
    console.log(errors);
  }
});

export default router;
