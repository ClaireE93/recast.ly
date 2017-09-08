var searchYouTube = (options={}, callback=(e) => e) => {
  const obj = {};
  obj.q = options.query || '';
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
      const results = callback(data.items);
    },
    error: function(data) {
      console.log('error:', data);
    }
  });
};

window.searchYouTube = searchYouTube;
