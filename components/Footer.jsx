const { h } = require('preact');
const path = require('path');

const Footer = props => {
  
  let openedFilename;
  if (props.onlineArticleId > 0) {
    openedFilename = 'Online article ID ' + props.onlineArticleId;
  } else {
    try {
      if (props.openedFilename) {
        const p = path.parse(props.openedFilename);
        openedFilename = p.base;
      }
    } catch (e) {
      openedFilename = undefined;
    }
  }
  
  return (
    <footer class="toolbar toolbar-footer">
      <h1 class="title">
        {props.modified && '*'}
        {openedFilename && openedFilename}
        {props.statusText && ' > ' + props.statusText}
      </h1>
    </footer>
  );
};

module.exports = Footer;
