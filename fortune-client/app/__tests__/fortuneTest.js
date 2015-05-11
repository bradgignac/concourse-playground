jest.dontMock('../fortune');

let React = require('react/addons');
let Fortune = require('../fortune');
let TestUtils = React.addons.TestUtils;

describe('Fortune', function () {
  it('renders Hello World', function () {
    let fortune = TestUtils.renderIntoDocument(<Fortune />);
    let node = React.findDOMNode(fortune);

    expect(node.textContent).toEqual('Hello World!');
  });
});
