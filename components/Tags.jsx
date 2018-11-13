const { h, Component } = require('preact');

/**
 * Events:
 * - onFetchError
 * - onTagsChange
 */
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
    if (props.allowedTags && props.allowedTags.length > 0) {
      this.originalAllowedTags = props.allowedTags;
      this.generateAvailableTags(props.tags);
    }
    else {
      this.state.availableTags = [];
      this.originalAllowedTags = [];
    }
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
      availableTags = this.originalAllowedTags.filter(e => {
        // I could use array.includes but I'm checking objects
        // here so I think I'm better off directly doing it
        // using a loop.
        return !newTags.some(t => t.id === e.id);
      });
    } else {
      availableTags = this.originalAllowedTags;
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
        // Make sure all the ids are of type Number or things
        // won't go smoothly later on.
        if (d && d.length > 0) {
          d.forEach(t => t.id = parseInt(t.id));
        }
        this.originalAllowedTags = d;
        this.generateAvailableTags(this.props.tags);
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
      const selectedIds = Array.from(source.selectedOptions)
        .map(op => parseInt(op.value));
      let newTags;
      if (add) {
        const toAdd = this.state.availableTags.filter(av => 
          selectedIds.includes(av.id) 
        );
        newTags = [...this.props.tags, ...toAdd];
      } else {
        newTags = this.props.tags.filter(tag => 
          !selectedIds.includes(tag.id)
        );
        // We have to put the removed tags back into 
        // availableTags.
        // This component is CHAOS but it sort of ignores
        // when we set new availableTags as props, see
        // componentWillReceiveProps.
        this.generateAvailableTags(newTags);
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
          {this.state.availableTags.map(t => <option value={t.id}>{t.name}</option>)}
        </select>
        <div class="Tags-buttons">
          <button class="btn btn-primary" onClick={this.fetchTags}>
            Get tags from web
          </button>
          <button class="btn btn-large btn-positive" 
            style={fatArrow}
            onClick={() => this.modifyLists(true)}>
            &rarr;
          </button>
          <button class="btn btn-large btn-negative" 
            style={fatArrow}
            onClick={() => this.modifyLists(false)}>
            &larr;
          </button>
        </div>
        <select multiple ref={(r) => this.currentSelect = r}>
          {
            this.props.tags && 
            this.props.tags.map(t => <option value={t.id}>{t.name}</option>)
          }
        </select>
      </div>
    );
  }

}

module.exports = Tags;
