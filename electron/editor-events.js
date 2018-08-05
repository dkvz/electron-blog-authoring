const { remote } = require('electron');

const editorEvents = {

  msgBox: function(msg, type='info') {
    remote.dialog.showMessageBox(
      remote.getCurrentWindow(),
      {
        message: msg,
        type: type,
        buttons: ['OK']
      }
    );
  }

};

module.exports = editorEvents;