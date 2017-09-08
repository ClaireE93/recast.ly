class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentVideo: window.exampleVideoData[0],
      videoCollection: window.exampleVideoData,
    };

    this.fetchVideos();
  }

  handleClick(e) {
    this.setState({
      currentVideo: e,
    });
  }

  fetchVideos(options={}) {
    const cb = (array) => {
      return array;
    };

    //FIXME: This works here, but needs to be in helper function. Trouble
    // with binding 'this' to setState.
    // See "hipsterJesus" function
    // https://davidwalsh.name/write-javascript-promises
    const obj = {};
    obj.q = options.query || 'puppies';
    obj.key = options.key || window.YOUTUBE_API_KEY;
    obj.maxResults = options.max || '5';
    obj.videoEmbeddable = true;
    obj.part = 'snippet';
    obj.type = 'video';
    $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/search',
      type: 'GET',
      data: obj,
      success: (data) => {
        const results = (data.items);
        this.setState({
          currentVideo: results[0],
          videoCollection: results,
        });
      },
      error: function(data) {
        console.log('error:', data);
      }
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search />
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
