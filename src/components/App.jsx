class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentVideo: null,
      videoCollection: null,
      searchText: 'puppies',
    };

    this.throttledFetch = _.throttle(() => this.fetchVideos(), 500);
  }

  componentDidMount() {
    this.fetchVideos();
  }

  handleClick(e) {
    this.setState({
      currentVideo: e,
    });
  }

  handleSearchClick(text) {
    this.setState({ searchText: text });
    this.throttledFetch();
  }

  handleKeyPress(text) {
    this.setState({ searchText: text });
    this.throttledFetch();
  }

  fetchVideos() {
    const cb = (array) => {
      this.setState({
        currentVideo: array[0],
        videoCollection: array,
      });
    };

    this.props.searchYouTube({query: this.state.searchText}, cb.bind(this));
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search onClick={(e) => this.handleSearchClick(e)} onKeyUp={(text) => this.handleKeyPress(text)}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.currentVideo}/>
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videoCollection}
            onClick={(el) => this.handleClick(el)}/>
          </div>
        </div>
      </div>
    );
  }

}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
