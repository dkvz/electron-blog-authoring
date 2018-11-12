const { h, Component } = require('preact');

class Tags extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.fetchTags = this.fetchTags.bind(this);
    // Use props.allowedTags to create the 
    // list of available tags, by removing
    // the ones we have in props.tags.
    // allowedTags should then be added to
    // the state.
    this.generateAvailableTags(props.allowedTags);
  }

  // componentWillReceiveProps can also get
  // nextState as the second argument.
  componentWillReceiveProps(nextProps) {
    // If the tags prop changed we need to 
    // re-generate the list of available tags.
    this.generateAvailableTags(nextProps.tags);
  }

  generateAvailableTags(newTags) {
    let availableTags;
    if (newTags && newTags.length > 0) {
      availableTags = newTags.filter(e => {
        // I could use array.includes but I'm checking objects
        // here so I think I'm better off directly doing it
        // using a loop.
        return !this.props.tags.some(t => t.id === e.id);
      });
    } else {
      availableTags = [];
    }
    this.setState({availableTags});
  }

  fetchTags() {
    // We may want to disallow calling this method
    // if we're using the tags from a SQLite database?
    if (this.state.loading) return;
    this.setState({loading: true});
    // Don't forget to add a catch clause.
    fetch('https://api.dkvz.eu/tags')
      .then(d => d.json())
      .then(d => {
        this.setState({loading: false});
        this.generateAvailableTags(d);
      })
      .catch(err => {
        this.props.onFetchError && this.props.onFetchError(err);
        this.setState({loading: false});
      });
  }

  modifyLists(add) {
    const source = add ? this.availableSelect : this.currentSelect;
    // Check the current selection on the source:
    if (source.selectedOptions.length > 0) {
      // This is some kind of a nodeList, I don't think
      // selectedOptions has all the array prototype stuff.
      // We could use Array.from() on it though.
      // TODO I'm not sure we need the parseInt here.
      const selectedIds = parseInt(Array.from(source.selectedOptions).map(op => op.key));
      let newTags;
      if (add) {
        newTags = [...this.props.tags];
        newTags.push(this.state.availableTags.filter(av => 
          selectedIds.includes(av.id)        
        ));
      } else {
        newTags = this.props.tags.filter(tag => 
          !selectedIds.includes(tag.id)
        );
      }
      // Don't forget to fire the change event for
      // the actual tags list! If something was changed.
      this.props.onTagsChange && this.props.onTagsChange(newTags);
      // This should send back the current tags as props, and
      // cause a re-render of everything in consequence.

    }
  }

  // I had to put cursor: inherit on every child element of the main div for
  // the wait cursor to show up everywhere.
  render() {
    const fatArrow = {'font-weight': 'bolder', 'font-size': '2.4em'};
    return (
      <div className="Tags" style={{cursor: this.state.loading ? 'wait': 'auto'}}>
        <select multiple ref={(r) => this.availableSelect = r}>
          {this.state.availableTags.map(t => <option key={t.id}>{t.name}</option>)}
        </select>
        <div class="Tags-buttons">
          <button class="btn btn-default" onClick={this.fetchTags}>
            Get tags from web
          </button>
          <button class="btn btn-large btn-default" 
            style={fatArrow}
            onClick={() => this.modifyLists(true)}>
            &rarr;
          </button>
          <button class="btn btn-large btn-default" 
            style={fatArrow}
            onClick={() => this.modifyLists(false)}>
            &larr;
          </button>
        </div>
        <select multiple ref={(r) => this.currentSelect = r}>
          {
            this.props.tags && 
            this.props.tags.map(t => <option key={t.id}>{t.name}</option>)
          }
        </select>
      </div>
    );
  }

}

module.exports = Tags;
