import express from "express";

const router = express.Router();

router.use(`/`, (_req, res) => {
  res.send(`HELLO FRAN!`);
});

export default router;
