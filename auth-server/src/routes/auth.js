import express from "express";
import login from "../controllers/login";
import signup from "../controllers/signup";
import refresh from "../controllers/refresh";
import ash from "../lib/async-handler";

const router = express.Router();

router.post("/signup", ash(signup));
router.post("/login", ash(login));
router.post("/refresh", ash(refresh));

export default router;
