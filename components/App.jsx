const { h, render, Component } = require("preact");
const Toolbar = require('../lib/Toolbar');

class App extends Component {

  constructor(props) {
    super(props);
    this.openClicked = this.openClicked.bind(this);
    this.saveClicked = this.saveClicked.bind(this);
    this.notImplemented = this.notImplemented.bind(this);
  }

  openClicked() {

  }

  saveClicked() {

  }

  notImplemented() {
    alert('Not implemented.');
  }

  render() {
    return (
      <div class="window">
        <Toolbar 
          openClicked={this.notImplemented} 
          saveClicked={this.notImplemented} 
          notImplemented={this.notImplemented}
        />
        <div class="window-content">
          <div class="pane-group">
            <div class="pane">Main center zone</div>
          </div>
        </div>
        <footer class="toolbar toolbar-footer">
          <h1 class="title">Footer</h1>
        </footer>
      </div>
    );
  }

}

module.exports = App;
