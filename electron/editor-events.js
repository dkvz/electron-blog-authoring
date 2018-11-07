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
    ipcRenderer.on('saveJSON', (sender, saveAs) => {
      // If a filename is set in the articleEditor, 
      // use that one as the default path in the 
      // dialog.
      let dest;
      if (!saveAs && this.articleEditor.getOpenedFilename()) {
        dest = this.articleEditor.getOpenedFilename();
      } else {
        const opts = {
          title: this.appTitle,
          filters: [
            {name: 'JSON files', extensions: ['json']}
          ]
        };
        if (this.articleEditor.getOpenedFilename()) {
          opts.defaultPath = this.articleEditor.getOpenedFilename();
        }
        dest = remote.dialog.showSaveDialog(
          remote.getCurrentWindow(),
          opts
        );
      }
      // showSaveDialog returns undefined if cancel was clicked.
      if (dest) {
        const art = this.articleEditor.getArticle();
        if (art.id <= 0) delete art.id;
        if (art.date === null) delete art.date;
        // TODO: We should have some sort of spinner or busy cursor 
        // being enabled somewhere around here.
        fs.writeFile(
          dest, JSON.stringify(art), 
          'utf8', 
          (err) => {
          if (err) {
            this.msgBox('Error trying to save file - \n' + err, 'error');
          } else {
            // File saved.
            this.articleEditor.setModifiedAndFilename(false, dest);
          }
        }); 
      }
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
              this.articleEditor.setArticle(JSON.parse(data), fnames[0]);
            } catch(err) {
              this.msgBox('Error parsing the JSON - Invalid fomat');
            }
          }
        });
      }
    });
  },

  _registerNewArticle: function() {
    ipcRenderer.on('newArticle', _ => {
      // The articleEditor will ask for confirmation if the article
      // is not empty.
      this.articleEditor.newArticle();
    });
  },

  unregisterArticleEditor: function() {
    this.articleEditor = null;
    ipcRenderer.removeAllListeners('saveJSON');
    ipcRenderer.removeAllListeners('openJSON');
    ipcRenderer.removeAllListeners('newArticle');
  },

  registerArticleEditor: function(articleEditor) {
    this.articleEditor = articleEditor;
    this._registerSaveJSON();
    this._registerOpenJSON();
    this._registerNewArticle();
  }

};

module.exports = editorEvents;