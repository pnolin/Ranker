import { getRepository } from 'typeorm';

import GameDto from '../dtos/gameDto';
import Game from '../entities/game';

const getGames = () => {
  return getRepository(Game).find();
};

const addGame = async (gameDto: GameDto) => {
  const gameRepository = getRepository(Game);
  const game = new Game();
  game.name = gameDto.name;
  game.note = gameDto.note;
  return await gameRepository.save(game);
};

export default { getGames, addGame };
