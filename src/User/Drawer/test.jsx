import React, { useState } from "react";
import axios from "axios";

const FileUploads = () => {
  const [files, setFiles] = useState([]); // Array for multiple files
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  // Helper function to get CSRF token from cookies
  const getCSRFToken = () => {
    const name = "csrftoken";
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === name) return decodeURIComponent(cookie[1]);
    }
    return null;
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFiles([...e.target.files]); // Allow multiple file selection
    setMessage("");
    setError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      setMessage("");
      setError("Please select at least one file.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("photos", file)); // Adjust key for backend API

    // Debugging: Log formData entries
    console.log("Selected files:", files);
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1].name}`); // Log each key-value pair
    }

    try {
      setUploading(true);
      const csrfToken = getCSRFToken(); // Get CSRF token
      const response = await axios.post("http://localhost:8000/upload-file/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": csrfToken, // Pass CSRF token
        },
      });

      setMessage(response.data.message || "Files uploaded successfully!");
      setError("");
    } catch (err) {
      console.error("Upload Error:", err);
      setError(
        err.response?.data?.error ||
        err.response?.statusText ||
        "An unknown error occurred."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>File Upload</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <input
            type="file"
            multiple // Allow multiple file selection
            onChange={handleFileChange}
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          style={{
            backgroundColor: uploading ? "#cccccc" : "#007bff",
            color: "#fff",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: uploading ? "not-allowed" : "pointer",
          }}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {message && <p style={{ color: "green", marginTop: "20px" }}>{message}</p>}
      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
      {files.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Selected Files:</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploads;
