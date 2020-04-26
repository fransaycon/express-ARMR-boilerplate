import express from "express";
import ash from "../lib/async-handler";
import receiveStuff from "../controllers/protected/receive-stuff";
import isAuthorized from "../middlewares/is-authorized";

const router = express.Router();

router.get("/stuff", ash(isAuthorized), ash(receiveStuff));

export default router;
