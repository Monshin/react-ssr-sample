import express from 'express';

const router = express.Router();

router.use((req, res, next) => {
  if (!req.dispatchScheduler) req.dispatchScheduler = [];
  next();
});

export default router;
