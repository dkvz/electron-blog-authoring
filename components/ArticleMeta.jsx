const { h, Component } = require("preact");

class ArticleMeta extends Component {
  constructor(props) {
    super(props);
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
    const spanerz = (num) => ({'grid-column': 'span ' + num});
    // An empty line feed indicates a new line in the grid.
    return (
      <div style={formGrid}>
        <label style={labelStyle} htmlFor="titleInput">Title:</label>
        <input type="text" id="titleInput" className="form-control" />
        <button style={spanerz(2)}>Tags...</button>

        <label style={labelStyle} htmlFor="thumbImput">Thumb image:</label>
        <input id="thumbInput" type="text" className="form-control" />
        <label style={labelStyle} htmlFor="userInput">User ID:</label>
        <input id="userInput" type="text" className="form-control" />

        <label style={labelStyle} htmlFor="articleUrlInput">Article URL:</label>
        <input id="articleUrlInput" type="text" className="form-control" />
        <div class="checkbox" style={labelStyle}>
          <label htmlFor="shortCheckbox">
            <input id="shortCheckbox" type="checkbox" /> Short
          </label>
        </div>
        <div class="checkbox" style={labelStyle}>
          <label htmlFor="publishedCheckbox">
            <input id="publishedCheckbox" type="checkbox" /> Published
          </label>
        </div>
      </div>
    );
  }

}

module.exports = ArticleMeta;
