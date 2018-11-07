const { h, render } = require('preact');
const App = require('../lib/App');

// This is the script that gets ran into
// index.html. It's NOT a component.

render(
  <App id="app" />,
  document.body
);
