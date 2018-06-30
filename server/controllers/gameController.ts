import { Request, Response } from 'express';

import GameDto from '../dtos/gameDto';
import gameService from '../services/gameService';

const getGames = (req: Request, res: Response) => {
  gameService
    .getGames()
    .then(games => res.send(games))
    .catch((error: Error) => res.status(500).send(error.message));
};

const postGame = (req: Request, res: Response) => {
  const gameDto = new GameDto(req.body.name, req.body.note);
  gameService
    .addGame(gameDto)
    .then(() => res.sendStatus(204))
    .catch((error: Error) => res.status(500).send(error.message));
};

export default { getGames, postGame };
