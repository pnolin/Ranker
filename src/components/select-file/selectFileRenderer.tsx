import * as React from 'react';

import RankerRenderer from '../ranker/rankerRenderer';

interface ISelectFileState {
  selectedFile: File | null;
  items: string[];
}

class SelectFileRenderer extends React.Component<{}, ISelectFileState> {
  constructor(props: {}) {
    super(props);
    this.fileChanged = this.fileChanged.bind(this);
    this.rankClick = this.rankClick.bind(this);
    this.createItemArray = this.createItemArray.bind(this);
    this.state = { selectedFile: null, items: Array<string>() };
  }

  public render() {
    const rankButton =
      this.state.selectedFile !== null ? (
        <button onClick={this.rankClick}>Rank</button>
      ) : (
        ''
      );

    const rankerComponent = <RankerRenderer items={this.state.items} />;

    if (this.state.items.length === 0) {
      return (
        <div>
          <input
            type="file"
            accept=".txt"
            multiple={false}
            onChange={this.fileChanged}
          />
          {rankButton}
        </div>
      );
    } else {
      return rankerComponent;
    }
  }

  private fileChanged(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.currentTarget.files;
    if (files !== null && files.length === 1) {
      const filesArray = Array.from(files);
      this.setState({ selectedFile: filesArray[0] });
    } else {
      this.setState({ selectedFile: null });
    }
  }

  private rankClick() {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const text = fileReader.result;
      this.createItemArray(text as string);
    };

    fileReader.readAsText(this.state.selectedFile as File);
  }

  private createItemArray(content: string) {
    let lines = content.split('\r');
    lines = lines.map(line => line.replace(/\r?\n|\r/g, ''));
    let items = this.state.items.splice(0);
    items = items.concat(lines.splice(0));
    this.setState({ items });
  }
}

export default SelectFileRenderer;
