const { h, Component } = require("preact");

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Modal">
        <div className="Modal-content">
          <div className="Modal-header">
            <span className="Modal-close">&times;</span>
            <h2>Modal Header</h2>
          </div>
          <div className="Modal-body">
            <p>Some text in the Modal Body</p>
            <p>Some other text...</p>
          </div>
          <div className="Modal-footer">
            <h3>Modal Footer</h3>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Modal;
