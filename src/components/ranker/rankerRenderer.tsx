import * as React from 'react';

interface IRankerProps {
  items: string[];
}

interface IRankerState {
  first: string;
  items: string[];
  max: number;
  min: number;
  rankedItems: string[];
  second: string;
}

class RankerRenderer extends React.Component<IRankerProps, IRankerState> {
  constructor(props: IRankerProps) {
    super(props);
    const items = props.items.splice(0);
    this.firstSelected = this.firstSelected.bind(this);
    this.secondSelected = this.secondSelected.bind(this);
    this.state = {
      first: items[0],
      items,
      max: items.length - 1,
      min: 0,
      rankedItems: Array<string>(),
      second: items[1]
    };
  }

  public render() {
    if (this.state.items.length === 0) {
      return (
        <div>
          {this.state.rankedItems.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
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
    const items = this.state.items.slice(0);
    const rankedItems = this.state.rankedItems.slice(0);

    if (rankedItems.length === 0) {
      rankedItems.push(items[1], items[0]);
      items.splice(0, 2);

      this.setState({
        first: items[0],
        items,
        max: 1,
        min: 0,
        rankedItems,
        second: rankedItems[1]
      });
    } else {
      const min = rankedItems.indexOf(this.state.second);
      const max = this.state.max;

      if (min === max) {
        rankedItems.push(this.state.first);
        items.splice(0, 1);
        this.setState({
          first: items[0],
          items,
          max: rankedItems.length - 1,
          min: 0,
          rankedItems,
          second: rankedItems[Math.floor((rankedItems.length - 1) / 2) + 1]
        });
      } else {
        const newSecond = min + (Math.floor((max - min) / 2) + 1);

        if (newSecond === max && this.state.min === max - 1) {
          rankedItems.splice(max, 0, this.state.first);
          items.splice(0, 1);
          this.setState({
            first: items[0],
            items,
            max: rankedItems.length - 1,
            min: 0,
            rankedItems,
            second: rankedItems[Math.floor((rankedItems.length - 1) / 2) + 1]
          });
        } else {
          this.setState({
            min: rankedItems.indexOf(this.state.second),
            second: rankedItems[newSecond]
          });
        }
      }
    }
  }

  private secondSelected() {
    const items = this.state.items.slice(0);
    const rankedItems = this.state.rankedItems.slice(0);

    if (rankedItems.length === 0) {
      rankedItems.push(items[0], items[1]);
      items.splice(0, 2);

      this.setState({
        first: items[0],
        items,
        max: 1,
        min: 0,
        rankedItems,
        second: rankedItems[1]
      });
    } else {
      const min = this.state.min;
      const max = rankedItems.indexOf(this.state.second);

      if (min === max) {
        rankedItems.splice(0, 0, this.state.first);
        items.splice(0, 1);
        this.setState({
          first: items[0],
          items,
          max: rankedItems.length - 1,
          min: 0,
          rankedItems,
          second: rankedItems[Math.floor((rankedItems.length - 1) / 2) + 1]
        });
      } else {
        const newSecond = min + Math.floor((max - min) / 2);
        this.setState({
          max: rankedItems.indexOf(this.state.second),
          second: rankedItems[newSecond]
        });
      }
    }
  }
}

export default RankerRenderer;
