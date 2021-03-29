import { Component } from 'react';
import InfoBar from './InfoBar';
import RescuePost from './RescuePost';

import Services from '../firebase/services';

class RescueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    Services.getAll('rescue').on('value', this.onDataChange);
  }
  componentWillUnmount() {
    Services.getAll('rescue').off('value', this.onDataChange);
  }
  onDataChange = data => {
    let posts = [];
    data.forEach(item => {
      let key = item.key;
      let value = item.val();
      posts.push({ key, ...value });
    });
    this.setState({
      posts: posts,
    });
  };
  render() {
    return (
      <div className="list-page">
        <InfoBar data={this.state.posts} />
        <ol className="list-ol">
          {this.state.posts.length > 0 ? (
            this.state.posts.map(post => (
              <RescuePost key={post.key} data={post} />
            ))
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

export default RescueList;
