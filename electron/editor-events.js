const { remote, ipcRenderer } = require('electron');

const editorEvents = {

  emptyArticle: {
    id: -1,
    title: '',
    articleUrl: '',
    thumbImage: '',
    userId: 1,
    short: false,
    published: false,
    date: null,
    tags: []
  },

  appTitle: remote.getGlobal('appTitle') || 'Application',

  msgBox: function(msg, type='info') {
    remote.dialog.showMessageBox(
      remote.getCurrentWindow(),
      {
        message: msg,
        type: type,
        title: this.appTitle,
        buttons: ['OK']
      }
    );
  },

  confirmDialog: function(msg) {
    return remote.dialog.showMessageBox(
      remote.getCurrentWindow(),
      {
        message: msg,
        type: 'question',
        title: this.appTitle,
        buttons: ['Cancel', 'OK']
      }
    );
  },

  sendMessage(msg) {
    remote.getCurrentWebContents().send(msg);
  },

  _registerSaveJSON: function() {
    ipcRenderer.on('saveJSON', _ => {
      const art = this.articleEditor.getArticle();
      console.log(art);
    });
  },

  unregisterArticleEditor: function() {
    this.articleEditor = null;
    ipcRenderer.removeAllListeners('saveJSON');
  },

  registerArticleEditor(articleEditor) {
    this.articleEditor = articleEditor;
    this._registerSaveJSON();
  }

};

module.exports = editorEvents;