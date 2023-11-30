// UnsplashImages.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Unsplash.scss';

function UnsplashImages({ searchTerm }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query: searchTerm, per_page: 3 },
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
        }
      }).then(response => {
        setImages(response.data.results);
      }).catch(error => {
        console.error("Error fetching images from Unsplash", error);
      });
    }
  }, [searchTerm]);

  return (
    <div className="unsplash image-gallery">
      {images.map(image => (
        <img key={image.id} src={image.urls.small} alt={image.alt_description} />
      ))}
    </div>
  );
}

export default UnsplashImages;
