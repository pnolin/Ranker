import * as React from 'react';

import GameList from './components/game-list/GameListRenderer';

class App extends React.Component {
  public render() {
    return (
      <div>
        <GameList />
      </div>
    );
  }
}

export default App;
