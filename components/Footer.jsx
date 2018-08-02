const { h, render } = require("preact");
const Footer = props => {
  return (
    <footer class="toolbar toolbar-footer">
      <h1 class="title">{props.statusText}</h1>
    </footer>
  );
};

module.exports = Footer;
