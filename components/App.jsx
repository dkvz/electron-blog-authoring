const { h, Component } = require("preact");
const Toolbar = require('../lib/Toolbar');
const Footer = require('../lib/Footer');
const Accordion = require('../lib/Accordion');
const Editor = require('../lib/Editor');
const editorEvents = require('../electron/editor-events');

class App extends Component {

  constructor(props) {
    super(props);
    this.openClicked = this.openClicked.bind(this);
    this.saveClicked = this.saveClicked.bind(this);
    this.notImplemented = this.notImplemented.bind(this);
    this.state = {
      statusText: 'App. Started'
    };
  }

  openClicked() {

  }

  saveClicked() {

  }

  notImplemented() {
    editorEvents.msgBox('Not implemented');
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
            <div class="pane">
              <Accordion label="Article Meta">
                <Editor />
              </Accordion>
              <Accordion label="Summary">
                <Editor />
              </Accordion>
              <div class="form-group">
                <div class="form-headline">Article content</div>
                <Editor className="form-control" />
              </div>
            </div>
          </div>
        </div>
        <Footer statusText={this.state.statusText} />
      </div>
    );
  }

}

module.exports = App;
