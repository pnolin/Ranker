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
      this.doSelection(this.state.comparedItems.length - 1, true);
    }

    this.setState({ comparison: this.state.comparison + 1 });
  }

  private secondSelected() {
    if (this.state.rankedItems.length === 0) {
      this.firstSelection(this.state.items[1], this.state.items[0]);
    } else {
      this.doSelection(0, false);
    }

    this.setState({ comparison: this.state.comparison + 1 });
  }

  private doSelection(shouldInsertIndex: number, insertAfter: boolean) {
    const items = this.state.items;
    const rankedItems = this.state.rankedItems;
    const indexInRanked = this.state.rankedItems.indexOf(this.state.second);

    if (this.shouldInsert(this.state.comparedItems, shouldInsertIndex)) {
      items.splice(0, 1);
      rankedItems.splice(
        indexInRanked + (insertAfter ? 1 : 0),
        0,
        this.state.first
      );
      this.resetComparisonState(items, rankedItems);
    } else {
      const comparedItems = this.sliceRankedItems(insertAfter);
      this.setState({
        comparedItems,
        second: comparedItems[Math.floor(comparedItems.length / 2)]
      });
    }
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

  private shouldInsert(listToCheck: string[], bound: number) {
    return listToCheck.indexOf(this.state.second) === bound;
  }

  private sliceRankedItems(sliceFromSecond: boolean) {
    const indexOfSecond = this.state.comparedItems.indexOf(this.state.second);
    return this.state.comparedItems.slice(
      sliceFromSecond ? indexOfSecond + 1 : 0,
      sliceFromSecond ? this.state.comparedItems.length : indexOfSecond
    );
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
