import React, { useState, useEffect } from "react";

const FileDisplaybucket = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/fetch-file");
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await response.json();
        setImages(data.images); // Update state with image data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching files:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <div>Loading images...</div>;
  }

  return (
    <div>
      <h1>Image Gallery</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((image, index) => (
          <div key={index} style={{ margin: "10px" }}>
            <img
              src={`data:image/jpeg;base64,${image.content}`}
              alt={image.filename}
              style={{ width: "200px", height: "auto" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileDisplaybucket;
