import React from 'react';
import superagent from 'superagent';

const FORTUNE_API = 'http://localhost:9000';

class Fortune extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fortune: null };
  }
  generate() {
    superagent.get(`${FORTUNE_API}/fortune`, function (err, res) {
      if (err) {
        return;
      }

      this.setState({ fortune: res.body });
    }.bind(this));
  }
  attribution() {
    let data = this.state.fortune;
    let attribution = data.author;

    if (data.source) {
      attribution = `${attribution}, ${data.source}`;
    }

    return attribution;
  }
  render() {
    let fortune = null;

    if (this.state.fortune) {
      fortune = (
        <div className="fortune">
          <div className="fortune-quote">{ this.state.fortune.quote }</div>
          <div className="fortune-attribution">{ this.attribution() }</div>
        </div>
      );
    }

    return (
      <div>
        <h1 className="fortune-header">xx Fortune xx</h1>
        <button className="fortune-generate" onClick={ this.generate.bind(this) }>Generate</button>
        { fortune }
      </div>
    );
  }
}

export default Fortune;
