import * as React from 'react';

import RankerRenderer from './components/ranker/rankerRenderer';
import SelectFileRenderer from './components/select-file/selectFileRenderer';

interface IAppState {
  file: File | null;
  items: string[];
}

class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.onFileChanged = this.onFileChanged.bind(this);
    this.rankClick = this.rankClick.bind(this);
    this.createItemArray = this.createItemArray.bind(this);
    this.state = { file: null, items: Array<string>() };
  }

  public render() {
    const selectFileRenderer = (
      <SelectFileRenderer onFileChanged={this.onFileChanged} />
    );
    const rankButton = <button onClick={this.rankClick}>Rank</button>;
    const rankerComponent = <RankerRenderer items={this.state.items} />;

    if (this.state.items.length === 0 && this.state.file === null) {
      return <div>{selectFileRenderer}</div>;
    } else if (this.state.items.length === 0) {
      return (
        <div>
          {selectFileRenderer}
          {rankButton}
        </div>
      );
    } else {
      return <div>{rankerComponent}</div>;
    }
  }

  private onFileChanged(file: File | null) {
    this.setState({ file });
  }

  private rankClick() {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const text = fileReader.result;
      this.createItemArray(text as string);
    };

    fileReader.readAsText(this.state.file as File);
  }

  private createItemArray(fileContent: string) {
    let lines = fileContent.split('\r');
    lines = lines.map(line => line.replace(/\r?\n|\r/g, ''));
    let items = this.state.items.splice(0);
    items = items.concat(lines.splice(0));
    this.setState({ items });
  }
}

export default App;
