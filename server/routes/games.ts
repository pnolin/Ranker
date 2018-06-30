import express from 'express';

import gameController from '../controllers/gameController';

const router = express.Router();

router.get('/', gameController.getGames);
router.post('/', gameController.postGame);

export default router;
