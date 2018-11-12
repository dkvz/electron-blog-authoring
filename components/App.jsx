const { h, Component } = require("preact");

const Toolbar = require("../lib/Toolbar");
const Footer = require("../lib/Footer");
const Accordion = require("../lib/Accordion");
const Editor = require("../lib/Editor");
const Modal = require("../lib/Modal");
const ArticleMeta = require("../lib/ArticleMeta");
const SearchBox = require("../lib/SearchBox");

const editorEvents = require("../electron/editor-events");

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
    this.newClicked = this.newClicked.bind(this);
    this.setArticle = this.setArticle.bind(this);
    this.resetEditors = this.resetEditors.bind(this);
    this.setModifiedAndFilename = this.setModifiedAndFilename.bind(this);
    this.getOpenedFilename = this.getOpenedFilename.bind(this);
    this.onEditorInput = this.onEditorInput.bind(this);
    this.processSearch = this.processSearch.bind(this);
    this.showSearchBox = this.showSearchBox.bind(this);
    this.state = {
      statusText: "No database",
      showSaveModal: false,
      showSearchBox: false,
      editorFontSize: "1.2em",
      modified: false,
      openedFilename: null,
      onlineArticleId: -1,
      articleMeta: Object.assign({}, editorEvents.emptyArticle)
    };
    // I'm going to store the editor (textarea, most likely)
    // elements in this object:
    this.editors = {};
    this.focusedEditor = 'content';
    // I'm creating these functions now otherwise they get 
    // re-created at every render of the current component.
    // I think I could've just called setEditorRef from an
    // arrow function in the JSX but uhm...
    this.setEditorRefSummary = this.setEditorRef('summary');
    this.setEditorRefContent = this.setEditorRef('content');
  }

  componentDidMount() {
    editorEvents.registerArticleEditor(this);
  }

  componentWillUnmount() {
    editorEvents.unregisterArticleEditor();
  }

  isArticleValid() {
    return this.state.articleMeta.title &&
      (!this.state.articleMeta.short && this.state.articleMeta.articleUrl) &&
      this.state.articleMeta.userId
      ? true
      : false;
  }

  setEditorRef(name) {
    // I can't put the editor in the state
    // or it loops-rerender everything forever.
    return el => {
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
      e.target.type.indexOf("checkbox") >= 0
        ? e.target.checked
        : e.target.value;
    this.setState({ articleMeta: articleMeta, modified: true });
  }

  /**
   * getArticle: allows forming the entire article object
   * to serve for other purposes.
   * editor-events.js uses this method to get the current
   * data.
   */
  getArticle() {
    return Object.assign(
      {
        content: this.editors["content"].value,
        summary: this.editors["summary"].value
      },
      this.state.articleMeta
    );
  }

  getOpenedFilename() {
    return this.state.openedFilename;
  }

  newArticle() {
    if (!this._confirmWipe()) return;
    this.focusedEditor = 'content';
    this.setState({
      articleMeta: Object.assign({}, editorEvents.emptyArticle),
      modified: false,
      openedFilename: "",
      onlineArticleId: -1
    });
    this.resetEditors();
  }

  _confirmWipe() {
    if (this.state.modified) {
      // Ask for confirmation:
      if (editorEvents.confirmDialog("Erase current data?") === 0) {
        return false;
      }
    }
    return true;
  }

  openClicked() {
    if (this._confirmWipe()) editorEvents.sendMessage("openJSON");
  }

  setModifiedAndFilename(modified, filename) {
    if (this.state.modified !== modified || this.state.filename !== filename)
      this.setState({
        modified: modified, 
        openedFilename: filename,
        onlineArticleId: -1
      });
  }

  setArticle(article, filename = '', onlineArticleId = -1) {
    const artMeta = Object.assign({}, editorEvents.emptyArticle);
    artMeta.title = article.title;
    artMeta.thumbImage = article.thumbImage;
    artMeta.articleUrl = article.articleUrl;
    artMeta.short = article.short ? true : false;
    artMeta.published = article.published ? true : false;
    if (article.tags) artMeta.tags = article.tags;
    if (article.date) artMeta.date = article.date;
    if (article.id && article.id > 0) artMeta.id = article.id;
    if (article.userId && article.userId > 0) artMeta.userId = article.userId;
    // I could set the editor values inside a function given to setState as
    // an argument.
    this.setState({
      articleMeta: artMeta,
      modified: false,
      openedFilename: filename,
      onlineArticleId: onlineArticleId
    });
    this.editors["summary"].value = article.summary;
    this.editors["content"].value = article.content;
  }

  resetEditors() {
    this.editors["summary"].value = "";
    this.editors["content"].value = "";
  }

  saveClicked() {
    editorEvents.sendMessage("saveJSON");
  }

  notImplemented() {
    editorEvents.msgBox("Not implemented");
  }

  newClicked() {
    this.newArticle();
  }

  closeSaveModal() {
    this.setState({showSaveModal: false});
  }

  onEditorInput() {
    if (this.state.modified === false) {
      this.setState({modified: true});
    }
  }

  showSearchBox() {
    // Show the search box.
    // Position it in regards to last focused editor.
    // TODO: if it's summary, it's possible that the accordion
    // was closed in the meantime. Which will produce a weird 
    // result. We should keep the open status of the accordion
    // somewhere.
    const rect = this.editors[this.focusedEditor].getBoundingClientRect();
    console.log(rect.right);
    this.setState({
      showSearchBox: true,
      searchBoxRight: rect.left,
      searchBoxTop: rect.top
    });
  }

  processSearch(e) {
    const currentEditor = this.editors[this.focusedEditor];
    let reg;
    try {
      reg = new RegExp(e.detail.query, e.detail.caseSensitive ? 'g': 'ig');
    } catch(err) {
      // Regex is invalid.
      editorEvents.msgBox('Search regex is invalid.');
      return;
    }
    if (e.detail.forward) {
      // We search starting from selectionStart.
      // If nothing is found and selectionStart was not 0, 
      // we should ask if the user wants to search from the start.
      const pos = currentEditor.value.substring(
        currentEditor.selectionEnd, 
        currentEditor.value.length
      ).search(reg);
      if (pos >= 0) {
        // Found something:
        currentEditor.focus();
        const relativePos = currentEditor.selectionEnd + pos;
        currentEditor.setSelectionRange(
          relativePos, 
          relativePos + e.detail.query.length
        );
      } else {
        // No matches.
        // I need a dialog to ask if we start from 0.
        if (editorEvents.confirmDialog(
          'No matches found after current position. Start from 0?'
          ) !== 0) {
            currentEditor.setSelectionRange(0, 0);
            this.processSearch(e);
        }
      }
    } else {
      // Backwards is harder. I need to use exec and go to 
      // the latest match.
      // There is the elusive lookbehind crazy regexp but uh...
      // Yeah I'd rather not.
      // We need to start from cursor position, selectionStart.
      const regExec = _ => reg.exec(currentEditor.value.substring(
        0,
        currentEditor.selectionStart
      ));
      let match = regExec();
      if (match) {
        // Go to the latest match:
        let pos, len;
        do {
          pos = match.index;
          len = match[0].length;
          match = regExec();
        } while (match);
        // We should have the latest match inside of pos.
        currentEditor.focus();
        currentEditor.setSelectionRange(
          pos,
          pos + len
        );
      } else {
        // Nothing found, ask if user wants to search from the end.
        if (editorEvents.confirmDialog(
          'No matches found before current position. Search from the end?'
          ) !== 0) {
            currentEditor.setSelectionRange(
              currentEditor.value.length,
              currentEditor.value.length
            );
            this.processSearch(e);
        }
      }
    }
  }

  insertElement(code) {
    // I'm going to use setRangeText to insert stuff.
    // It will replace what is currently selected, so I need
    // to save the current selection for tag insertions.

    // PROBLEM: If the accelerator actually does something to the
    // editor, like Shift+Enter, it will clear the selection before
    // this method is called. We need to prevent the default behavior 
    // of shift + enter...
    // Ctrl + enter works though. I'll keep it at that to avoid having
    // to add more events to editors.
    const selected = this.editors[this.focusedEditor].value.substring(
      this.editors[this.focusedEditor].selectionStart,
      this.editors[this.focusedEditor].selectionEnd
    );
    switch(code) {
      case 'p':
        // Let's add a paragraph.
        this.editors[this.focusedEditor].setRangeText(
          `<p>${selected}</p>`
        );
        // Now change the cursor position:
        const cPos = this.editors[this.focusedEditor].selectionStart + 3;
        this.editors[this.focusedEditor].selectionStart = cPos;
        this.editors[this.focusedEditor].selectionEnd = cPos;
        break; 
    }
  }

  render() {
    return (
      <div class="window">
        <Modal
          id="saveModal"
          maxWidth="600px"
          show={this.state.showSaveModal}
          closed={this.closeSaveModal}
        >
          <p>Is this working?</p>
        </Modal>
        <Toolbar
          openClicked={this.openClicked}
          saveClicked={this.saveClicked}
          newClicked={this.newClicked}
          notImplemented={this.notImplemented}
        />
        <div class="window-content">
          <div class="pane-group">
            <div class="pane app-layout">
              <SearchBox show={this.state.showSearchBox} 
                top={this.state.searchBoxTop} 
                right={this.state.searchBoxRight} 
                onClose={() => this.setState({showSearchBox: false})} 
                onSearch={this.processSearch} 
              />
              <Accordion label="Article Meta" show="true">
                <ArticleMeta
                  articleMeta={this.state.articleMeta}
                  metaChanged={this.metaChanged}
                />
              </Accordion>
              <Accordion label="Summary">
                <Editor
                  className="form-control"
                  fontSize={this.state.editorFontSize}
                  height="230px"
                  setEditorRef={this.setEditorRefSummary}
                  onInput={this.onEditorInput}
                  onFocus={() => {this.focusedEditor = 'summary';}}
                />
              </Accordion>
              <div class="form-group full-section">
                <div class="form-headline">Article content</div>
                <Editor
                  className="form-control"
                  flex="1"
                  fontSize={this.state.editorFontSize}
                  setEditorRef={this.setEditorRefContent}
                  onInput={this.onEditorInput}
                  onFocus={() => {this.focusedEditor = 'content';}}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer statusText={this.state.statusText} 
          modified={this.state.modified} 
          openedFilename={this.state.openedFilename}
          onlineArticleId={this.state.onlineArticleId}
        />
      </div>
    );
  }
}

module.exports = App;
