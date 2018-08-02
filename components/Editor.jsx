const { h, render, Component } = require("preact");

class Editor extends Component {
  
  constructor(props) {
    super(props);
    console.log('In the constructor for an Editor component');
  }

  render() {
    const style = {
      width: '99%',
      resize: 'none', 
      'margin-left': 'auto', 
      'margin-right': 'auto', 
      'display': 'block'
    };
    return (
      <textarea className={this.props.className} style={style}>
      </textarea>
    );
  }

}

module.exports = Editor;
