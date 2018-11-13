const { h, Component } = require('preact');

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  // I'm using float in here for some reason.
  // Old habits die hard.
  render() {
    return (
      <div className="Modal" 
        style={{display: this.props.show ? 'block' : 'none'}}>
        <div className="Modal-content"
          style={{'max-width': this.props.maxWidth ? this.props.maxWidth : null}}>
          <header className="toolbar toolbar-header">
            <span className="Modal-close" 
              onClick={this.props.onClose}>
              &times;
            </span>
            <h1 className="title">{this.props.title}</h1>
          </header>
          <div className="Modal-body">
            {this.props.children}
          </div>
          <footer className="toolbar toolbar-footer Modal-footer">
            <button className="btn btn-primary" 
              onClick={this.props.onClose}
              style={{float: 'right'}}>
              Close
            </button>
          </footer>
        </div>
      </div>
    );
  }

}

module.exports = Modal;
