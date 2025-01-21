import React, { useState } from 'react';

const FileUpload = () => {
  const [fileName, setFileName] = useState('');  // Initialize as a string

  // Handles file change event
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      
      setFileName(file.name);  // Store the file name
      console.log(file);

      const reader = new FileReader();

      // Handle error for FileReader
      reader.onerror = () => {
        console.error('There was an error reading the file!');
      };
      reader.onloadend = () => {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");  // Convert to base64
        sendFileToDjango(base64String, file.name);  // Send base64 and file name to backend
      };

      reader.readAsDataURL(file);  // Convert file to base64
    }
  };

  // Function to send the base64 string to Django backend
  const sendFileToDjango = async (base64String, fileName) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/upload-file/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file: base64String, file_name: fileName }),
      });

      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error while uploading file:', error);
    }
  };

  return (
    <div>
      <h3>Upload File</h3>
      <input type="file" onChange={handleFileChange} />
      {fileName && <p>Selected File: {fileName}</p>}
    </div>
  );
};

export default FileUpload;
