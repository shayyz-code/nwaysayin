import { Component } from 'react';

import Services from '../firebase/services';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesCircle,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      credit: null,
      imgUrl: null,
    };
  }
  componentDidMount() {
    Services.getAll('welcome').on('value', this.onDataChange);
  }
  componentWillUnmount() {
    Services.getAll('welcome').off('value', this.onDataChange);
  }
  onDataChange = data => {
    data.forEach(item => {
      let key = item.key;
      let value = item.val();
      key === 'content'
        ? this.setState({
            content: value,
          })
        : key === 'credit'
        ? this.setState({
            credit: value,
          })
        : key === 'imgUrl'
        ? this.setState({
            imgUrl: value,
          })
        : null;
    });
  };
  render() {
    return (
      <div className="container">
        <div className="welcomeForm">
          <div className="headerContainer">
            <a
              className="goBackToHomePage"
              onClick={() => this.props.setWelcomeCol(false)}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </a>
            <h1 className="title">Welcome</h1>
          </div>
          <div className="input-addedBy username">
            Nway Sayin
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
          <div className="input-content">{`hi`}</div>
          {this.state.imgUrl && (
            <div className="imgContainer">
              <img
                className="img"
                src={this.state.imgUrl}
                alt="image error..."
                width="300px"
              />
              <div className="creditContainer">
                <a className="credit">Credit: {this.state.credit} </a>
              </div>
            </div>
          )}
        </div>
        <style jsx>
          {`
            .container {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 100%;
              height: 100%;
              backdrop-filter: blur(5px);
              background: rgba(5, 5, 5, 0.8);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 3;
            }

            .welcomeForm {
              width: 300px;
              border-radius: 10px;
              background: rgba(20, 20, 20, 0.8);
              padding: 15px;
            }

            .title {
              height: 30px;
              font-family: 'Raleway', sans-serif;
              font-size: 16px;
              font-weight: 500;
              letter-spacing: 5px;
              color: #666;
              padding: 5px;
              margin: 0;
              margin-left: 30px;
            }
            .input-content {
              display: block;
              width: 290px;
              font-size: 13px;
              font-family: Myanmar3, Yunghkio;
              color: #666;
              border-radius: 0;
              background: transparent;
              margin-top: 5px;
              margin-bottom: 5px;
              overflow-y: auto;
            }
            .username {
              font-size: 14px;
              line-height: 14px;
              color: #f00;
              text-transform: uppercase;
              letter-spacing: 5px;
            }
            .input-content:focus {
              border-left: 2px solid #666;
            }

            .imgContainer {
              display: flex;
              flex-direction: column;
              width: 300px;
              border-radius: 10px;
              background: rgba(30, 30, 30, 0.8);
              margin-top: 10px;
              overflow: hidden;
            }

            .creditContainer {
              width: 300px;
              display: flex;
              justify-content: flex-end;
            }

            .credit {
              font-size: 11px;
              text-align: center;
              text-decoration: none;
              border-radius: 3px;
              border: none;
              background: rgba(15, 15, 15, 0.8);
              color: #666;
              padding: 5px;
              transition: 0.1s;
              cursor: pointer;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Welcome;
