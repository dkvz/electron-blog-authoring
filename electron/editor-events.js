const { remote, ipcRenderer } = require('electron');
const fs = require('fs');

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

  _registerOpenJSON: function() {
    ipcRenderer.on('openJSON', _ => {
      // Show the open dialog:
      const fnames = remote.dialog.showOpenDialog(
        remote.getCurrentWindow(),
        {
          title: this.appTitle,
          properties: ['openFile'],
          filters: [
            {name: 'JSON files', extensions: ['json']}
          ]
        }      
      );
      if (fnames && fnames.length > 0) {
        // Attempt to read the file.
        fs.readFile(fnames[0], 'utf-8', (err, data) => {
          if (err) {
            this.msgBox('Error reading the file - ' + err, 'error');
          } else {
            // Process this as JSON:
            try {
              this.articleEditor.setArticle(JSON.parse(data));
            } catch(err) {
              this.msgBox('Error parsing the JSON - Invalid fomat');
            }
          }
        });
      }
    });
  },

  unregisterArticleEditor: function() {
    this.articleEditor = null;
    ipcRenderer.removeAllListeners('saveJSON');
    ipcRenderer.removeAllListeners('openJSON');
  },

  registerArticleEditor: function(articleEditor) {
    this.articleEditor = articleEditor;
    this._registerSaveJSON();
    this._registerOpenJSON();
  }

};

module.exports = editorEvents;