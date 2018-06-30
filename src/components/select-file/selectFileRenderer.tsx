import * as React from 'react';

interface ISelectFileState {
  fileSelected: boolean;
}

class SelectFileRenderer extends React.Component<{}, ISelectFileState> {
  constructor(props: {}) {
    super(props);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.state = { fileSelected: false };
  }

  public render() {
    const rankButton = this.state.fileSelected ? <button>Rank</button> : '';

    return (
      <div>
        <input
          type="file"
          accept=".txt"
          multiple={false}
          onChange={this.handleFileChange}
        />
        {rankButton}
      </div>
    );
  }

  private handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.currentTarget.files;

    this.setState({ fileSelected: files !== null && files.length === 1 });
  }
}

export default SelectFileRenderer;
