const { remote } = require('electron');

const editorEvents = {

  msgBox: function(msg, type='info') {
    remote.dialog.showMessageBox(
      {
        message: msg,
        type: type,
        buttons: ['OK']
      }
    );
  }

};

module.exports = editorEvents;