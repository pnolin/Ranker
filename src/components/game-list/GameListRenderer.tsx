import * as React from 'react';

import GameComponent from '../../components/game/GameRenderer';
import Game from '../../models/game/Game';
import ServerRequestService from '../../services/ServerRequestService';

interface IGameListState {
  games: Game[];
  newGameName: string;
  newGameNote: number;
}

class GameListRenderer extends React.Component<{}, IGameListState> {
  private readonly fetchUrl = '/games';

  constructor(props: {}) {
    super(props);
    this.addGame = this.addGame.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.state = { games: Array<Game>(), newGameName: '', newGameNote: 0 };
  }

  public componentDidMount() {
    ServerRequestService.getData(this.fetchUrl)
      .then((data: any[]) => {
        return data.map(game => new Game(game.name, game.note));
      })
      .then(serverGames => {
        let games = this.state.games.splice(0);
        games = games.concat(serverGames);
        this.setState({ games, newGameName: '', newGameNote: 0 });
      })
      .catch(err => alert(err));
  }

  public render() {
    return (
      <div id="game-list-wrapper">
        <div id="game-list-games">
          {this.state.games.map((game, index) => {
            return (
              <GameComponent key={index} name={game.name} note={game.note} />
            );
          })}
        </div>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-row">
            <label htmlFor="gameName">Name:</label>
            <input
              id="gameName"
              type="text"
              value={this.state.newGameName}
              onChange={this.handleNameChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="gameNote">Note: </label>
            <input
              id="gameNote"
              type="number"
              value={this.state.newGameNote}
              onChange={this.handleNoteChange}
            />
          </div>
          <div className="form-row">
            <button onClick={this.addGame}>Add Game</button>
          </div>
        </form>
      </div>
    );
  }

  private addGame() {
    const games = this.state.games.splice(0);
    const newGame = new Game(this.state.newGameName, this.state.newGameNote);
    games.push(newGame);
    this.setState({ games, newGameName: '', newGameNote: 0 });

    ServerRequestService.postData(this.fetchUrl, newGame);
  }

  private handleNameChange(event: any) {
    this.setState({ newGameName: event.target.value });
  }

  private handleNoteChange(event: any) {
    this.setState({ newGameNote: event.target.value });
  }

  private handleFormSubmit(event: any) {
    event.preventDefault();
  }
}

export default GameListRenderer;
