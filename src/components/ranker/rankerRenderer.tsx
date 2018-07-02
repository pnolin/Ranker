import * as React from 'react';

interface IRankerProps {
  items: string[];
}

interface IRankerState {
  items: string[];
  first: string;
  second: string;
  currentIndex: number;
  loopDone: number;
}

class RankerRenderer extends React.Component<IRankerProps, IRankerState> {
  constructor(props: IRankerProps) {
    super(props);
    const items = props.items.splice(0);
    this.firstSelected = this.firstSelected.bind(this);
    this.secondSelected = this.secondSelected.bind(this);
    this.state = {
      currentIndex: 0,
      first: items[0],
      items,
      loopDone: 0,
      second: items[1]
    };
  }

  public render() {
    if (this.state.loopDone === this.state.items.length) {
      return (
        <div>
          {this.state.items.map((item, index) => <div key={index}>{item}</div>)}
        </div>
      );
    }

    return (
      <div>
        <div>Which One Do You Prefer</div>
        <button onClick={this.firstSelected}>{this.state.first}</button>
        <button onClick={this.secondSelected}>{this.state.second}</button>
      </div>
    );
  }

  private firstSelected() {
    this.updateChoices(this.state.items.slice(0));
  }

  private secondSelected() {
    const items = this.state.items.slice(0);
    const temp = items[this.state.currentIndex];
    items[this.state.currentIndex] = items[this.state.currentIndex + 1];
    items[this.state.currentIndex + 1] = temp;
    this.updateChoices(items);
  }

  private updateChoices(items: string[]) {
    const currentIndex = this.state.currentIndex;
    const loopDone = this.state.loopDone;
    if (this.state.currentIndex >= items.length - loopDone - 2) {
      this.setState({
        currentIndex: 0,
        first: items[0],
        items,
        loopDone: loopDone + 1,
        second: items[1]
      });
    } else {
      this.setState({
        currentIndex: currentIndex + 1,
        first: items[currentIndex + 1],
        items,
        loopDone,
        second: items[currentIndex + 2]
      });
    }
  }
}

export default RankerRenderer;
