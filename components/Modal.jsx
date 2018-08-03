const { h, Component } = require("preact");

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Modal title',
      text: 'Dialog text'
    };
  }

  render() {
    return (
      <div className="Modal" 
        style={{display: this.props.show ? 'block' : 'none'}}>
        <div className="Modal-content">
          <header className="toolbar toolbar-header">
            <span className="Modal-close" 
              onClick={(e) => this.props.closed(e)}>
              &times;
            </span>
            <h1 className="title">{this.state.title}</h1>
          </header>
          <div className="Modal-body">
            {this.props.children}
          </div>
          <footer className="toolbar toolbar-footer Modal-footer">
            <button className="btn btn-primary" 
              onClick={(e) => this.props.closed(e)}
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
