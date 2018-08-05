const { h } = require("preact");
const Footer = props => {
  console.log('Footer has re-rendered');
  return (
    <footer class="toolbar toolbar-footer">
      <h1 class="title">{props.statusText}</h1>
    </footer>
  );
};

module.exports = Footer;
