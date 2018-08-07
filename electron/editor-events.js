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

  registerSaveJSON: function(getter) {
    ipcRenderer.on('saveJSON', _ => {
      const art = getter();
      console.log(art);
    });
  },

  unregisterSaveJSON: function(func) {
    ipcRenderer.removeAllListeners('saveJSON');
  }

};

module.exports = editorEvents;