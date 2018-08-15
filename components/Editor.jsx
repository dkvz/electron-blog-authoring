const { h, Component } = require('preact');
const { shallowEqual } = require('../utils/react-utils');

class Editor extends Component {
  
  constructor(props) {
    super(props);
  }

  // We have to check if this component needs to update
  // or it will keep resetting the editor ref at every
  // single render.
  // This is actually useless. The editorRef was resetting
  // because it was being called at every App.js render, and
  // that was totally normal.
  // I changed how setting the ref works at App.js.
  // Also it's possible that App.js is called something else
  // in the future.
  // Burps.
  shouldComponentUpdate(nextProps, nextState) {
    // Previous props are in this.props.
    if (this.props.fontSize === nextProps.fontSize &&
      this.props.height === nextProps.height &&
      this.props.flex === nextProps.flex &&
      this.props.className === nextProps.className)
        return false;
    return true;
  }

  render() {
    const style = {
      width: '99%',
      resize: 'none', 
      'margin-left': 'auto', 
      'margin-right': 'auto', 
      'display': 'block'
    };
    if (this.props.fontSize) style.fontSize = this.props.fontSize;
    if (this.props.height) style.height = this.props.height;
    if (this.props.flex) style.flex = this.props.flex;
    return (
      <textarea 
        className={this.props.className} 
        style={style}
        ref={this.props.setEditorRef}
        >
      </textarea>
    );
  }

}

module.exports = Editor;
