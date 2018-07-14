import * as React from 'react';

import MatButton from '@material-ui/core/Button/';

const inputStyle: React.CSSProperties = {
  display: 'none'
};

interface ISelectFileProps {
  onFileChanged: ((file: File | null) => void);
}

class SelectFileRenderer extends React.Component<ISelectFileProps, {}> {
  constructor(props: ISelectFileProps) {
    super(props);
    this.fileChanged = this.fileChanged.bind(this);
  }

  public render() {
    return (
      <div>
        <input
          id="fileSelect"
          type="file"
          accept=".txt"
          multiple={false}
          onChange={this.fileChanged}
          style={inputStyle}
        />
        <label htmlFor="fileSelect">
          <MatButton component="span" variant="contained">
            Select File
          </MatButton>
        </label>
      </div>
    );
  }

  private fileChanged(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.currentTarget.files;
    if (files !== null && files.length === 1) {
      this.props.onFileChanged(files[0]);
    } else {
      this.props.onFileChanged(null);
    }
  }
}

export default SelectFileRenderer;
