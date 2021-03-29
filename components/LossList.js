import { Component } from 'react';
import InfoBar from './InfoBar';
import List from './List';

import Services from '../firebase/services';

class LossList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      showOnlyConfirmed: false,
    };
  }
  componentDidMount() {
    Services.getAll('loss').on('value', this.onDataChange);
  }
  componentWillUnmount() {
    Services.getAll('loss').off('value', this.onDataChange);
  }
  onDataChange = data => {
    let people = [];
    data.forEach(item => {
      let key = item.key;
      let value = item.val();
      people.push({ key, ...value });
    });
    this.setState({
      people: people,
    });
  };
  handleShowOnlyConfirmed = checked => {
    this.setState({
      showOnlyConfirmed: checked,
    });
  };
  render() {
    let peopleDisplay = this.state.showOnlyConfirmed
      ? this.state.people.filter(({ confirmed }) => confirmed === true)
      : this.state.people;
    return (
      <div className="list-page">
        <InfoBar
          data={this.state.people}
          showOnlyConfirmed={this.handleShowOnlyConfirmed}
        />
        <ol className="list-ol">
          {this.state.people.length > 0 ? (
            peopleDisplay.map(person => <List key={person.key} data={person} />)
          ) : (
            <div className="notAvailable">No data is available for now...</div>
          )}
        </ol>
        <style jsx>
          {`
            .list-ol {
              list-style: none;
              font-family: Myanmar3, Yunghkio;
            }
          `}
        </style>
      </div>
    );
  }
}

export default LossList;
