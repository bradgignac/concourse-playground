let assert = require('assert');
let jsdom = require('jsdom');
let sinon = require('sinon');

global.assert = assert;
global.sinon = sinon;

const MARKUP = `<html><head></head><body></body></html>`;
const USER_AGENT = 'jsdom';

global.document = jsdom.jsdom(MARKUP);
global.window = global.document.defaultView;
global.navigator = { userAgent: USER_AGENT };

let sizzle = require('sizzle');
let React = require('react/addons');
let TestUtils = React.addons.TestUtils;

global.render = TestUtils.renderIntoDocument;
global.simulate = TestUtils.Simulate;

global.findAll = function (root, selector) {
  return TestUtils.findAllInRenderedTree(root, function (component) {
    let node = React.findDOMNode(component);
    return sizzle.matchesSelector(node, selector);
  });
};

global.find = function (root, selector) {
  let matches = findAll(root, selector);

  if (matches.length !== 1) {
    throw Error(`Did not find exactly one match (found: ${matches.length}) for selector:${selector}`);
  }

  return matches[0];
}
