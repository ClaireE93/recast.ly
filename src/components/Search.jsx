var Search = (props) => {
  const handleChanges = (event) => {
    if (props.onKeyUp) {
      props.onKeyUp(event.target.value);
    }
  };
  const handleEnterHit = (event) => {
    if (props.onKeyUp && event.keyCode === 13) {
      props.onKeyUp(event.target.value);
    }
  };
  return (
    <div className="search-bar form-inline">
      <input className="form-control" id="search-text" type="text" onChange={(event) => handleChanges(event)} onKeyUp={(event) => handleEnterHit(event)}/>
      <button className="btn hidden-sm-down" onClick={() => props.onClick(document.getElementById('search-text').value)}>
        <span className="glyphicon glyphicon-search"></span>
      </button>
    </div>
  );
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.Search = Search;
