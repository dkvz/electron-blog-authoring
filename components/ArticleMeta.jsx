const { h, Component } = require("preact");

class ArticleMeta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      short: false
    };
    this.shortChanged = this.shortChanged.bind(this);
  }

  shortChanged(e) {
    this.setState({short: e.target.value});
  }

  render() {
    const formGrid = {
      display: 'grid',
      'grid-column-gap': '6px',
      'grid-row-gap': '6px',
      'grid-template-columns': 'auto 1fr auto auto'
    };
    const labelStyle = {
      'align-self': 'center'
    };
    // This is so ugly.
    // I love it.
    const vertAlign = Object.assign({display: 'table'}, labelStyle);
    const tableCell = {display: 'table-cell', 'vertical-align': 'middle'};
    const inputStyle = {};
    if (this.props.fontSize) inputStyle.fontSize = this.props.fontSize;
    const spanerz = (num) => ({'grid-column': 'span ' + num});
    // An empty line feed indicates a new line in the grid.
    return (
      <div style={formGrid}>
        <label style={labelStyle} htmlFor="titleInput">Title:</label>
        <input type="text" id="titleInput" className="form-control" style={inputStyle} />
        <button style={spanerz(2)}>Tags...</button>

        <label style={labelStyle} htmlFor="thumbImput">Thumb image:</label>
        <input id="thumbInput" type="text" className="form-control" style={inputStyle} />
        <label style={labelStyle} htmlFor="userInput">User ID:</label>
        <input id="userInput" type="text" className="form-control" style={inputStyle} />

        <label style={labelStyle} htmlFor="articleUrlInput">Article URL:</label>
        <input 
          id="articleUrlInput" type="text" 
          className="form-control" style={inputStyle} 
          disabled={this.state.short} />
        <div style={vertAlign}>
          <label htmlFor="shortCheckbox" style={tableCell}>
            <input id="shortCheckbox" type="checkbox" onChange={this.shortChanged} /> Short
          </label>
        </div>
        <div style={vertAlign}>
          <label htmlFor="publishedCheckbox" style={tableCell}>
            <input id="publishedCheckbox" type="checkbox" /> Published
          </label>
        </div>
      </div>
    );
  }

}

module.exports = ArticleMeta;
