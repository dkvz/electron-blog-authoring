const { h, Component } = require('preact');
const { shallowEqual } = require('../utils/react-utils');

class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      caseSensitive: props.caseSensitive || false
    };
    this.search = this.search.bind(this);
    this.textFieldKeyUp = this.textFieldKeyUp.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // We don't need to do anything if the state changed.
    if (shallowEqual(this.state, prevState)) {
      this.textField.focus();
      this.textField.select();
    }
  }

  search(forward) {
    // We need to call a function provided in props.
    if (this.textField.value !== '') {
      this.props.onSearch(
        {
          detail: {
            query: this.textField.value,
            caseSensitive: this.state.caseSensitive,
            forward
          }
        }
      );
    }
  }

  textFieldKeyUp(e) {
    switch (e.key) {
      case 'Enter':
        this.search(true);
        break;
      case 'Escape':
        this.props.onClose();
    }
  }

  render() {
    return (
      <div className="SearchBox"
        style={{ 
          display: this.props.show ? 'flex' : 'none',
          top: this.props.top ? this.props.top + 'px' : '0px',
          right: this.props.right ? this.props.right + 'px' : '0px'
          }}>
        <input type="text" 
          ref={(ref) => {this.textField = ref}} 
          onKeyUp={this.textFieldKeyUp}
          />
        <span className="chkbox-wrapper">
          <label title="Enable/disable case sensitive search"
            className={this.state.caseSensitive && 'checked'}
            onClick={() => this.setState({caseSensitive: !this.state.caseSensitive})}>
            Aa
          </label>
          <input type="checkbox" checked={this.state.caseSensitive} />
        </span>
        <a href="#" onClick={() => this.search(false)}>&larr;</a>
        <a href="#" onClick={() => this.search(true)}>&rarr;</a>
        <a href="#" onClick={this.props.onClose}>&times;</a>
      </div>
    );
  }

}

module.exports = SearchBox;
