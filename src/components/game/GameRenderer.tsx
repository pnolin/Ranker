import * as React from 'react';
import Game from '../../models/game/Game';

function GameRenderer(game: Game) {
  return (
    <div>
      Le jeu {game.name} mérite la note de {game.note}.
    </div>
  );
}

export default GameRenderer;
