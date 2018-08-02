const { h, render } = require("preact");
const Toolbar = ( { openClicked, saveClicked, notImplemented } ) => {
  return (
    <header class="toolbar toolbar-header">
      <div class="toolbar-actions">
        <div class="btn-group">
          <button class="btn btn-default" onClick={openClicked}>
            <span class="icon icon-folder" />
          </button>
          <button class="btn btn-default" onClick={saveClicked}>
            <span class="icon icon-floppy" />
          </button>
          <button class="btn btn-default" onClick={notImplemented}>
            <span class="icon icon-cloud" />
          </button>
        </div>

        <button class="btn btn-default pull-right" onClick={notImplemented}>
          <span class="icon icon-help" />
        </button>
      </div>
    </header>
  );
};

module.exports = Toolbar;
