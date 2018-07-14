import * as React from 'react';

import MatButton from '@material-ui/core/Button/';
import MatDivider from '@material-ui/core/Divider';
import MatGrid from '@material-ui/core/Grid/';
import MatList from '@material-ui/core/List/';
import {
  ListItem,
  ListItemText,
  ListSubheader
} from '../../../node_modules/@material-ui/core';

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

const gridStyle: React.CSSProperties = {
  maxHeight: '100%'
};

const listStyle: React.CSSProperties = {
  maxHeight: '100%',
  overflowY: 'scroll',
  paddingTop: 0
};

const comparisonStyle: React.CSSProperties = {
  backgroundColor: 'white'
};

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
        <MatGrid container={true} justify="center" style={gridStyle}>
          <MatList dense={true} style={listStyle}>
            <ListSubheader disableSticky={false} style={comparisonStyle}>
              Number of comparison: {this.state.comparison}
            </ListSubheader>
            {this.state.rankedItems.reverse().map((item, index) => (
              <div>
                <MatDivider />
                <ListItem>
                  <ListItemText key={index}>{item}</ListItemText>
                </ListItem>
              </div>
            ))}
          </MatList>
        </MatGrid>
      );
    }

    return (
      <MatGrid container={true} spacing={16} justify="center">
        <MatGrid item={true}>
          <div style={{ fontFamily: 'roboto', fontWeight: 500 }}>
            Which One Do You Prefer
          </div>
        </MatGrid>
        <MatGrid container={true} spacing={16} justify="center">
          <MatGrid item={true}>
            <MatButton variant="contained" onClick={this.firstSelected}>
              {this.state.first}
            </MatButton>
          </MatGrid>
          <MatGrid item={true}>
            <MatButton variant="contained" onClick={this.secondSelected}>
              {this.state.second}
            </MatButton>
          </MatGrid>
        </MatGrid>
      </MatGrid>
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
