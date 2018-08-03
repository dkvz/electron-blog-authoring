const { h, Component } = require("preact");

class Editor extends Component {
  
  constructor(props) {
    super(props);
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
        ref={(el) => this.textElement = el}
        >
      </textarea>
    );
  }

}

module.exports = Editor;
