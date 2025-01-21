import React, { useState } from 'react';

const LocationFinder = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);
        },
        (err) => {
          if (err.code === 1) {
            setError('Permission denied. Please allow location access.');
          } else if (err.code === 2) {
            setError('Position unavailable. Try again later.');
          } else if (err.code === 3) {
            setError('Request timed out. Please try again.');
          } else {
            setError('An unknown error occurred.');
          }
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Find Your Location</h1>
      <button
        onClick={getLocation}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Get Location
      </button>
      
      {location.latitude && location.longitude ? (
        <div style={{ marginTop: '20px' }}>
          <h3>Latitude: {location.latitude}</h3>
          <h3>Longitude: {location.longitude}</h3>
        </div>
      ) : error ? (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <h3>Error: {error}</h3>
        </div>
      ) : null}
    </div>
  );
};

export default LocationFinder;
