import * as React from 'react';

interface IRankerProps {
  items: string[];
}

interface IRankerState {
  comparedItems: string[];
  comparison: number;
  first: string;
  items: string[];
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
      comparedItems: items.slice(0),
      comparison: 0,
      first: items[0],
      items,
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
          <span>Number of comparison: {this.state.comparison}</span>
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
    if (this.state.rankedItems.length === 0) {
      this.firstSelection(this.state.items[0], this.state.items[1]);
    } else {
      if (this.state.comparedItems.length === this.state.rankedItems.length) {
        const items = this.state.items.slice(0);
        const rankedItems = this.state.rankedItems.slice(0);
        const indexOfSecond = rankedItems.indexOf(this.state.second);

        if (indexOfSecond === this.state.rankedItems.length - 1) {
          items.splice(0, 1);
          rankedItems.push(this.state.first);

          this.resetComparisonState(items, rankedItems);
        } else {
          const comparedItems = rankedItems.slice(indexOfSecond + 1);
          this.setState({
            comparedItems,
            second: comparedItems[Math.floor(comparedItems.length / 2)]
          });
        }
      } else {
        const items = this.state.items.slice(0);
        let comparedItems = this.state.comparedItems.slice(0);
        const indexOfSecond = comparedItems.indexOf(this.state.second);
        const rankedItems = this.state.rankedItems.slice(0);

        if (indexOfSecond === this.state.comparedItems.length - 1) {
          const indexInRanked = this.state.rankedItems.indexOf(
            this.state.second
          );
          items.splice(0, 1);
          rankedItems.splice(indexInRanked + 1, 0, this.state.first);

          this.resetComparisonState(items, rankedItems);
        } else {
          comparedItems = comparedItems.slice(indexOfSecond + 1);
          this.setState({
            comparedItems,
            second: comparedItems[Math.floor(comparedItems.length / 2)]
          });
        }
      }
    }

    this.setState({ comparison: this.state.comparison + 1 });
  }

  private secondSelected() {
    if (this.state.rankedItems.length === 0) {
      this.firstSelection(this.state.items[1], this.state.items[0]);
    } else {
      if (this.state.comparedItems.length === this.state.rankedItems.length) {
        const items = this.state.items.slice(0);
        const rankedItems = this.state.rankedItems.slice(0);
        const indexOfSecond = rankedItems.indexOf(this.state.second);

        if (indexOfSecond === 0) {
          items.splice(0, 1);
          rankedItems.splice(0, 0, this.state.second);

          this.resetComparisonState(items, rankedItems);
        } else {
          const comparedItems = rankedItems.slice(0, indexOfSecond);
          this.setState({
            comparedItems,
            second: comparedItems[Math.floor(comparedItems.length / 2)]
          });
        }
      } else {
        const items = this.state.items.slice(0);
        let comparedItems = this.state.comparedItems.slice(0);
        const indexOfSecond = comparedItems.indexOf(this.state.second);
        const rankedItems = this.state.rankedItems.slice(0);

        if (indexOfSecond === 0) {
          const indexInRanked = this.state.rankedItems.indexOf(
            this.state.second
          );
          items.splice(0, 1);
          rankedItems.splice(indexInRanked, 0, this.state.first);

          this.resetComparisonState(items, rankedItems);
        } else {
          comparedItems = comparedItems.slice(0, indexOfSecond);
          this.setState({
            comparedItems,
            second: comparedItems[Math.floor(comparedItems.length / 2)]
          });
        }
      }
    }

    this.setState({ comparison: this.state.comparison + 1 });
  }

  private firstSelection(selected: string, other: string) {
    const items = this.state.items.slice(0);
    const rankedItems = this.state.rankedItems.slice(0);

    rankedItems.push(other, selected);
    items.splice(0, 2);

    this.setState({
      comparedItems: rankedItems.slice(0),
      first: items[0],
      items,
      rankedItems,
      second: rankedItems[1]
    });
  }

  private resetComparisonState(items: string[], rankedItems: string[]) {
    this.setState({
      comparedItems: rankedItems.slice(0),
      first: items[0],
      items,
      rankedItems,
      second: rankedItems[Math.floor(rankedItems.length / 2)]
    });
  }
}

export default RankerRenderer;
