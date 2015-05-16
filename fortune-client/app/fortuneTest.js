import nock from 'nock';
import React from 'react';
import Fortune from './fortune';

describe('Fortune', function () {
  beforeEach(function () {
    nock('http://localhost:9000').get('/fortune').reply(200, {
      quote: 'quote',
      author: 'author',
      source: 'source'
    });

    this.component = render(<Fortune />);
  });

  it('does not show initial fortune', function () {
    let fortune = findAll(this.component, '.fortune');

    assert.equal(fortune.length, 0);
  });

  it('loads and displays fortune', function (done) {
    let button = find(this.component, '.fortune-generate');

    simulate.click(button);

    setTimeout(function () {
      let quote = find(this.component, '.fortune-quote');
      let attribution = find(this.component, '.fortune-attribution');

      assert.equal(React.findDOMNode(quote).textContent, 'quote');
      assert.equal(React.findDOMNode(attribution).textContent, 'author, source');

      done();
    }.bind(this), 10);
  });
});
