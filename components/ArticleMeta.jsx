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
    return (
      <div style={formGrid}>
        <label for="titleInput">Title:</label>
        <input type="text" id="titleInput" className="form-control" />
        <button style={{'grid-column': 'span 2'}}>Tags...</button>
        <label for="thumbImput">Thumb image:</label>
        <input id="thumgInput" type="text" className="form-control" />
        <label for="userInput">User ID:</label>
        <input id="userInput" type="text" className="form-control" />
      </div>
    );
  }

}

module.exports = ArticleMeta;
