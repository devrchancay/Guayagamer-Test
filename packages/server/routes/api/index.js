import express from "express";

import talk from "./talk";
import room from "./rooms";

const router = express.Router();

router.use("/", talk);
router.use("/", room);

export default router;
