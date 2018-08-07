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
    this.metaChanged = this.metaChanged.bind(this);
    this.isArticleValid = this.isArticleValid.bind(this);
    this.getArticle = this.getArticle.bind(this);
    this.newArticle = this.newArticle.bind(this);
    this.state = {
      statusText: 'App. Started',
      showSaveModal: false,
      editorFontSize: '1.2em',
      modified: false,
      articleMeta: Object.assign({}, editorEvents.emptyArticle)
    };
    // I'm going to store the editor (textarea, most likely)
    // elements in this object:
    this.editors = {};
  }

  componentDidMount() {
    editorEvents.registerSaveJSON(this.getArticle);
  }

  componentWillUnmount() {
    editorEvents.unregisterSaveJSON();
  }

  isArticleValid() {
    return (this.state.articleMeta.title && 
      (!this.state.articleMeta.short && this.state.articleMeta.articleUrl)
      && this.state.articleMeta.userId) ? true : false;
  }

  setEditorRef(name) {
    // I can't put the editor in the state
    // or it loops-rerender everything forever.
    return (el) => {
      this.editors[name] = el;
    };
  }

  metaChanged(e) {
    const articleMeta = this.state.articleMeta;
    // Handle the checkboxes values.
    // Value has a weird string "on" or "off" for them.
    // Also the checked prop is not undefined for the
    // non checkbox inputs. We have to check a string.
    articleMeta[e.target.name] = 
      (e.target.type.indexOf('checkbox') >= 0) ? 
        e.target.checked : e.target.value;
    this.setState(
      {articleMeta: articleMeta, modified: true}
    );
  }

  /**
   * getArticle: allows forming the entire article object
   * to serve for other purposes.
   * editor-events.js binds this function to its internal
   * saving mechanism.
   */
  getArticle() {
    return Object.assign({
      content: this.editors['content'].value,
      summary: this.editors['summary'].value
    }, this.state.articleMeta);
  }

  newArticle() {
    if (this.state.modified) {
      // Ask for confirmation:

    }
    this.setState(
      {
        articleMeta: Object.assign({}, editorEvents.emptyArticle),
        modified: false
      }
    );
    this.editors['summary'].value = '';
    this.editors['content'].value = '';
  }

  openClicked() {
    console.log(this.editors.content.value);
  }

  saveClicked() {
    this.setState({showSaveModal: true});
    // TODO: We might want to register something
    // to get in return, as a successful save means
    // we get to set state.modified to false.
    editorEvents.sendMessage('saveJSON');
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
                <ArticleMeta
                  articleMeta={this.state.articleMeta} 
                  metaChanged={this.metaChanged} />
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
