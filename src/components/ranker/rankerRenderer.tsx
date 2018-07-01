import * as React from 'react';

interface IRankerProps {
  items: string[];
}

interface IRankerState {
  items: string[];
  first: string;
  second: string;
}

class RankerRenderer extends React.Component<IRankerProps, IRankerState> {
  constructor(props: IRankerProps) {
    super(props);
    const items = props.items.splice(0);
    this.state = { items, first: items[0], second: items[1] };
  }

  public render() {
    return (
      <div>
        <div>Which One Do You Prefer</div>
        <button>{this.state.first}</button>
        <button>{this.state.second}</button>
      </div>
    );
  }
}

export default RankerRenderer;
