/**
 * Stole most of this from here:
 * https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_accordion_symbol
 */

const { h, Component } = require("preact");

class Accordion extends Component {
  constructor(props) {
    super(props);
    this.paddingTB = 10;
    this.state = {
      show: props.show || false
    };
  }

  componentDidMount() {
    // Gratuitous reset of 'show' to make sure
    // the max-height is right:
    this.setState({show: this.state.show});
  }

  render() {
    const classN = 'Accordion' + (this.state.show ? ' Accordion-active' : '');
    return (
      <div>
        <div
          onClick={() => this.setState({ show: !this.state.show })}
          className={classN}
        >
          {this.props.label}
        </div>
        <div
          class="Accordion-panel"
          style={{
            maxHeight: (this.state.show && this.panel) ? 
              (this.panel.scrollHeight + 2 * this.paddingTB) + 'px' : null,
            padding: this.state.show ? this.paddingTB + 'px 4px' : '0'
          }}
          ref={el => (this.panel = el)}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

module.exports = Accordion;
