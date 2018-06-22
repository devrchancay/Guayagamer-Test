import express from "express";
import RoomRepository from "../../Repository/RoomRepository";
import TalkRepository from "../../Repository/TalkRepository";
const router = express.Router();

const getAllMinutes = docs =>
  docs.reduce((prev, next) => {
    prev = prev + next.duration;
    return prev;
  }, 0);

router.get("/room", async (req, res) => {
  const room = new RoomRepository();
  const response = await room.findAll({});
  res.json(response);
});

router.post("/room", async (req, res) => {
  const talk = new TalkRepository();
  const room = new RoomRepository();
  const allTalks = await talk.findAll({}, { limit: 9999 });

  const total = getAllMinutes(allTalks.docs);

  const minutesForRoom = 420;

  const numSalas = Math.round(total / minutesForRoom);
  let talks = [...allTalks.docs];

  await room.delete({});

  for (let i = 0; i < numSalas; i++) {
    const morning = talks.reduce((prev, next) => {
      const num = prev.reduce((p, n) => {
        p = n.duration + p;
        return p;
      }, 0);

      if (num !== 180) {
        const diff = 180 - num;
        if (diff >= next.duration) {
          prev.push(next);
        }
      }
      return prev;
    }, []);

    talks = talks.reduce((prev, next) => {
      const find = morning.find(item => item._id === next._id);
      if (!find) {
        prev.push(next);
      }
      return prev;
    }, []);

    const afternoon = talks.reduce((prev, next) => {
      const num = prev.reduce((p, n) => {
        p = n.duration + p;
        return p;
      }, 0);

      if (num !== 240) {
        const diff = 240 - num;
        if (diff >= next.duration) {
          prev.push(next);
        }
      }
      return prev;
    }, []);

    talks = talks.reduce((prev, next) => {
      const find = afternoon.find(item => item._id === next._id);
      if (!find) {
        prev.push(next);
      }
      return prev;
    }, []);

    await room.storage({
      name: `Sala ${i + 1}`,
      sessions: { morning, afternoon }
    });
  }

  res.json({ message: `Ya tenemos ${numSalas} salas` });
});

export default router;
