const { h, Component } = require("preact");

const Toolbar = require('../lib/Toolbar');
const Footer = require('../lib/Footer');
const Accordion = require('../lib/Accordion');
const Editor = require('../lib/Editor');
const Modal = require('../lib/Modal');
const ArticleMeta = require('../lib/ArticleMeta');

const editorEvents = require('../electron/editor-events');

class App extends Component {

  constructor(props) {
    super(props);
    this.openClicked = this.openClicked.bind(this);
    this.saveClicked = this.saveClicked.bind(this);
    this.notImplemented = this.notImplemented.bind(this);
    this.closeSaveModal = this.closeSaveModal.bind(this);
    this.setEditorRef = this.setEditorRef.bind(this);
    this.state = {
      statusText: 'App. Started',
      showSaveModal: false,
      editorFontSize: '1.2em'
    };
    // I'm going to store the editor (textarea, most likely)
    // elements in this object:
    this.editors = {};
  }

  setEditorRef(name) {
    // I can't put the editor in the state
    // or it loops-rerender everything forever.
    return (el) => {
      this.editors[name] = el;
    };
  }

  openClicked() {
    console.log(this.editors.content.value);
  }

  saveClicked() {
    this.setState({showSaveModal: true});
  }

  notImplemented() {
    editorEvents.msgBox('Not implemented');
  }

  closeSaveModal() {
    this.setState({showSaveModal: false});
  }

  render() {
    return (
      <div class="window">
        <Modal 
          id="saveModal" 
          maxWidth="600px"
          show={this.state.showSaveModal}
          closed={this.closeSaveModal}>
          <p>Is this working?</p>
        </Modal>
        <Toolbar 
          openClicked={this.openClicked} 
          saveClicked={this.saveClicked} 
          notImplemented={this.notImplemented}
        />
        <div class="window-content">
          <div class="pane-group">
            <div class="pane app-layout">
              <Accordion label="Article Meta" show="true">
                <ArticleMeta />
              </Accordion>
              <Accordion label="Summary">
                <Editor 
                  className="form-control" 
                  fontSize={this.state.editorFontSize} 
                  height="230px"
                  setEditorRef={this.setEditorRef('summary')} />
              </Accordion>
              <div class="form-group full-section">
                <div class="form-headline">Article content</div>
                <Editor 
                  className="form-control" 
                  flex="1" 
                  fontSize={this.state.editorFontSize} 
                  setEditorRef={this.setEditorRef('content')} />
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
