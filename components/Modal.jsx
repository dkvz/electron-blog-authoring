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
          <div className="Modal-header">
            <span className="Modal-close" 
              onClick={(e) => this.props.closed(e)}>
              &times;
            </span>
            <h2>{this.state.title}</h2>
          </div>
          <div className="Modal-body">
            {this.props.children}
          </div>
          <div className="Modal-footer">
            <button className="btn btn-primary" 
              onClick={(e) => this.props.closed(e)}
              style={{float: 'right'}}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

}

module.exports = Modal;
