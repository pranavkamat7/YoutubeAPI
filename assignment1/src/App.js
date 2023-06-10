
import React, { useState } from 'react';
import axios from 'axios';
import './style.css'
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './Navbar';


function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 10,
          q: query,
          key: 'AIzaSyCS-8AtOUU9XM4GA4CebGJzJtyTyUlbfxo',
        },
      });

      const videos = response.data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url,
      }));

      setResults(videos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='mid'>
        <h3>Search Anything You Want!!</h3>
        <div className='search'>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button id='button' onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className='content'>
        <div className="results">
          {results.map((video) => (
            <div key={video.id}>
              <img src={video.thumbnail} alt={video.title} />
              <h3>{video.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

