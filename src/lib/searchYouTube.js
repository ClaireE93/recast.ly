var searchYouTube = (options = {}, callback = (e) => e) => {
  const obj = {};
  obj.q = options.query || '';
  obj.key = options.key || window.YOUTUBE_API_KEY;
  obj.maxResults = options.max || '5';
  obj.videoEmbeddable = true;
  obj.part = 'snippet';
  obj.type = 'video';

  let url = 'https://www.googleapis.com/youtube/v3/search';
  url += `?key=${obj.key}&q=${obj.q}&part=${obj.part}&maxResults=${obj.maxResults}&videoEmbeddable=${obj.videoEmbeddable}&type=${obj.type}`;
  fetch(url).then((response) => {
    return response.json();
  }).then((resp) => {
    callback(resp.items);
  });
};

window.searchYouTube = searchYouTube;
