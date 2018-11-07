const { h } = require('preact');

const Toolbar = ( { openClicked, saveClicked, notImplemented, newClicked } ) => {
  return (
    <header class="toolbar toolbar-header">
      <div class="toolbar-actions">
        <div class="btn-group">
          <button class="btn btn-large btn-default" onClick={newClicked}>
            <span class="icon icon-newspaper" />
          </button>
          <button class="btn btn-large btn-default" onClick={openClicked}>
            <span class="icon icon-folder" />
          </button>
          <button class="btn btn-large btn-default" onClick={saveClicked}>
            <span class="icon icon-floppy" />
          </button>
          <button class="btn btn-large btn-default" onClick={notImplemented}>
            <span class="icon icon-cloud" />
          </button>
        </div>

        <button class="btn btn-large btn-default pull-right" onClick={notImplemented}>
          <span class="icon icon-help" />
        </button>
      </div>
    </header>
  );
};

module.exports = Toolbar;
