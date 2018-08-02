/**
 * Stole most of this from here:
 * https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_accordion_symbol
 */

const { h, render, Component } = require("preact");

class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show || false
    };
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
            maxHeight: this.state.show ? this.panel.scrollHeight : null
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