import React, { useState, useEffect, useRef } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineUpload, AiOutlineHourglass } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import logo from '../assets/image/logotrans.png';
import Alert from "../component/Alert";
import { BiErrorCircle } from 'react-icons/bi'; // Example of another icon
import { FiUploadCloud, FiCheckCircle } from "react-icons/fi"; 

const Applicationstatus = () => {
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [status, setStatus] = useState('extradata');
  const [require, requirestatus] = useState('');
  const [showRequirementMessage, setShowRequirementMessage] = useState(true);
  const [showExtraDataInput, setShowExtraDataInput] = useState(false);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
   
  const [selectedOptions, setSelectedOptions] = useState([false,false,false,false,false,false,false,false]);
  const [errors, setErrors] = useState({
    aadharfront: '',
    aadharback: '',
    panCard: '',
    statement: '',
    passbook: '',
    licensefront: '',
    licenseback: '',
    vehicle: '',
  });
    const [fileNames, setFileNames] = useState({
      aadharfront: "",
      aadharback: "",
      panCard: "",
      licensefront: "",
      licenseback: "",
      vehicle: "",
      statement: "",
      passbook: ""
    });
     const fileInputRefs = {
        aadharfront: useRef(null),
        aadharback: useRef(null),
        panCard: useRef(null),
        licensefront: useRef(null),
        licenseback: useRef(null),
        vehicle: useRef(null),
        statement: useRef(null),
        passbook: useRef(null)
      };

      const handleFileChange = (fileType) => (e) => {
        const file = e.target.files[0];
        const validFormats = [
          'image/jpeg', 
          'image/png', 
          'application/pdf', 
          'application/msword', 
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
      
        // Reset any existing errors for the specific file type
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fileType]: '', // Clear previous error
        }));
      
        // Handle case when no file is selected
        if (!file) {
          setFileNames((prevFileNames) => ({
            ...prevFileNames,
            [fileType]: null, // Clear the file name
          }));
          setErrors((prevErrors) => ({
            ...prevErrors,
            [fileType]: 'No file selected.',
          }));
          return;
        }
      
        // Validate the file format
        if (!validFormats.includes(file.type)) {
          setFileNames((prevFileNames) => ({
            ...prevFileNames,
            [fileType]: null, // Clear the invalid file
          }));
          setErrors((prevErrors) => ({
            ...prevErrors,
            [fileType]: 'Invalid file format. Please upload JPG, PNG, PDF, DOC, or DOCX.',
          }));
          return;
        }
      
        // If the file is valid, update the file name and base64 data
        setFileNames((prevFileNames) => ({
          ...prevFileNames,
          [fileType]: file,
        }));
      
        // Read the file as base64 and update the file data
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
          setFilesData((prevData) => ({
            ...prevData,
            [fileType]: { base64: base64String, file_name: file.name }, // Update the base64 and name for this field
          }));
        };
        
        reader.readAsDataURL(file);  // Convert the file to base64
      };
      
      
        const handleIconClick = (fileType) => {
          fileInputRefs[fileType].current.click();
        };
      

  // const toggleStatus = () => {
  //   setStatus((prevStatus) => {
  //     switch (prevStatus) {
  //       case 'waiting':
  //         return 'approved';
  //       case 'approved':
  //         return 'extradata';
  //       case 'extradata':
  //         return 'waiting';
  //       default:
  //         return 'waiting';
  //     }
  //   });
  // };

  useEffect(() => {
    setShowExtraDataInput(status === 'extradata');
  }, [status]);

  const displayAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
  };
  

  const handleClose = () => {
    setShowAlert(false);
    setAlertType('');
    setAlertMessage('');
  };

  // const handleFileChange = (event) => {
  //   const selectedFiles = Array.from(event.target.files);
  //   const validFormats = [
  //     'image/jpeg', 
  //     'image/png', 
  //     'application/pdf', 
  //     'application/msword', 
  //     'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  //   ];

  //   // Filter valid files based on their types
  //   const validFiles = selectedFiles.filter(file => validFormats.includes(file.type));

  //   // If there are invalid files, set the error message
  //   if (selectedFiles.length > 0 && validFiles.length === 0) {
  //     setError('Unsupported file type. Please upload JPG, PNG, PDF, DOC, or DOCX files.');
  //   } else {
  //     // If there are valid files, reset error and add them to the files array
  //     setError('');
  //     setFiles((prevFiles) => [...prevFiles, ...validFiles]);
  //   }
  // };
  

 
  const handleRemoveFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter(file => file.name !== fileName));
  };
  const csrfToken = getCookie('csrftoken'); // Function to get the CSRF token
 
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === `${name}=`) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
  const navigate = useNavigate();

   
    useEffect(() => {
          // Fetch status from Django when the component loads
          const fetchStatus = async () => {
            try {
              // const response = await fetch('http://127.0.0.1:8000/FetchStatusActive/',{
            const response = await fetch('FetchStatusActive/ ', {
              credentials: 'include', // Ensures cookies are sent
              'X-CSRFToken':csrfToken
              }); // Django API endpoint
              const data = await response.json();
              setStatus(data[0].application_status); // Set the status based on the fetched value
              requirestatus(data[0].requirements);
                  if (data[0].application_status === "approved"){
                    // navigate('/Homedealer');
                    sessionStorage.setItem('applicationStatus $$$$', JSON.stringify(data.application_status)); 
                    displayAlert('success', 'Your Profile is approved');
                    setTimeout(() => {
                      navigate("/Homedealer");
                    }, 2000);    
                  }
                  else if (data[0].application_status === "rejected"){
                    displayAlert('error', 'Your Profile is rejected');
                  }
                  if( data[0].extra_fields_list){
                  setSelectedOptions( data[0].extra_fields_list);
                  }
              console.log(data[0].application_status);
              console.log(data[0].requirements);
              console.log(data[0].Dealer_ID);
              console.log(data);
              console.log("extra fields are",data[0].extra_fields_list);
              (data.status);
            } catch (error) {
              console.error('Error fetching status:', error);
              
            }
          };
          fetchStatus();
        }, []);

const handleSubmit = async () => {
  // Clear previous error message
  setError('');
  let newErrors = { ...errors }; // Create a copy of the current errors

  // Check each selected option and validate
  if (selectedOptions[0] && !fileNames.aadharfront) {
    newErrors.aadharfront = 'Aadhar Front Image is required.';
  } else {
    newErrors.aadharfront = '';
  }

  if (selectedOptions[1] && !fileNames.aadharback) {
    newErrors.aadharback = 'Aadhar Back Image is required.';
  } else {
    newErrors.aadharback = '';
  }

  if (selectedOptions[2] && !fileNames.panCard) {
    newErrors.panCard = 'PAN Card Image is required.';
  } else {
    newErrors.panCard = '';
  }

  if (selectedOptions[3] && !fileNames.statement) {
    newErrors.statement = 'Bank Statement is required.';
  } else {
    newErrors.statement = '';
  }

  if (selectedOptions[4] && !fileNames.passbook) {
    newErrors.passbook = 'PassBook Image is required.';
  } else {
    newErrors.passbook = '';
  }

  if (selectedOptions[5] && !fileNames.licensefront) {
    newErrors.licensefront = 'License Front Image is required.';
  } else {
    newErrors.licensefront = '';
  }

  if (selectedOptions[6] && !fileNames.licenseback) {
    newErrors.licenseback = 'License Back Image is required.';
  } else {
    newErrors.licenseback = '';
  }

  if (selectedOptions[7] && !fileNames.vehicle) {
    newErrors.vehicle = 'RC Book Image is required.';
  } else {
    newErrors.vehicle = '';
  }

  // Update the errors state
  setErrors(newErrors);

  // Check if there are any errors
  const hasErrors = Object.values(newErrors).some(error => error !== '');
  if (hasErrors) {
    return; // Stop submission if there are errors
  }

  // Validate input
  // if (files.length === 0 && message.trim() === '') {
  //   setError('Please upload a file or enter a message.'); // Set error message
  //   return; // Prevent submission
  // }
  setShowRequirementMessage(false);
  

  const uploadFile = new FormData();
  // files.forEach((file, index) => {
  //   uploadFile.append(`file${index}`, file);
  // });


  // Append each file if it exists
  Object.entries(fileNames).forEach(([key, file]) => {
    if (file) {
      uploadFile.append(key, file);
    }
  });


  uploadFile.append('message', message);

  console.log("uploadFile",uploadFile);
  
  displayAlert('loading', 'Uploading, please wait...');
  try {
    const response = await fetch('/send_extraData/', {
      method: 'POST',
      body: uploadFile,
      credentials: 'include',
      headers: {
        'X-CSRFToken': csrfToken,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Response is OK");
      setStatus('waiting');
      displayAlert('success', 'Data Uploaded');
    } else {
      const data = await response.json();
      console.log("Response is not OK");
      displayAlert('error', 'Failed to upload the data');
      setError(data.error);
    }
  } catch (error) {
    console.error('Error submitting data:', error);
    displayAlert('error', 'Error submitting data');
  }

  setFiles([]);
  setMessage('');
};

  return (
    <>
      <div className="container-fluid application-container">
      <div className="application-header">
          <img src={logo} alt="Logo" />
          <span style={{ fontSize: "25px", fontWeight: "700", color: "#fff" }}>
            RECYCHBS
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <span style={{ fontSize: "25px", fontWeight: "700", color: "#fff" }}>
            Application Status
          </span>
        </div>
        <div className="application-layer">
          <div className="d-flex align-items-center">
            <AiOutlineCheckCircle style={{ height: "30px", width: "30px", color: "lightgreen" }} />
            <p style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "700" }} className="pt-3">
              Your Details Submitted Successfully
            </p>
          </div>
          <div className="line-vertical"></div>
          <div
            className="d-flex align-items-center"
            style={{ cursor: "pointer" }}
            // onClick={toggleStatus}
          >
            {status === 'approved' ? (
              <>
                <AiOutlineCheckCircle style={{ height: "30px", width: "30px", color: "lightgreen" }} />
                <p style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "700" }} className="pt-3">
                  Approved
                </p>
              </>
            ) : status === 'extradata' ? (
              <>
                <BiErrorCircle style={{ height: "30px", width: "30px", color: "darkblue" }} />
                <p style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "700" }} className="pt-3">
                  Need Extra Data
                </p>
              </>
            ) : status === 'rejected' ? (
              <>
                <AiOutlineCloseCircle style={{ height: "30px", width: "30px", color: "red" }} />
                <p style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "700" }} className="pt-3">
                  Rejected
                </p>
              </>
            ) : (
              <>
                <AiOutlineHourglass style={{ height: "30px", width: "30px", color: "yellow" }} />
                <p style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "700" }} className="pt-3">
                  Waiting for Response...
                </p>
              </>
            )}
          </div>
          

          {showExtraDataInput && (
           <div
           style={{
             display: "flex",
             justifyContent: "center",
             flexDirection: "column",
             marginLeft: "30px",
           }}
         >
           <div style={{ padding: "10px", borderRadius: "10px" }}>
           {showRequirementMessage && (
  <p style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "700" }}>{require}</p>
)}
             <p style={{ color: "white", fontSize: "18px" }}>
             Please Upload the Information and Data mentioned above
             </p>
             <div>
             <input
                type="text"
                placeholder="Dealer can message here"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setError(""); 
                }}
                style={{
                  width: "100%",
                  border: "1px solid #e277f3",
                  outline: "none",
                  backgroundColor: "transparent",
                  height: "40px",
                  color: "white", 
                  "::placeholder": {
                    color: "white"
                  }
                }}
                onFocus={(e) => (e.target.style.border = "2px solid #e277f3")}
                onBlur={(e) => (e.target.style.border = "1px solid #e277f3")}
              />
             </div>
             <div className="phonemail" style={{ maxWidth: '800px', margin: '0 auto' }}>
  <div className="phonemail-gap" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
  {selectedOptions[0] && (
    <div style={{ marginLeft: "7px",marginRight: "7px"}}>
      <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>
        Aadhar Front Image <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p>
      </label>
      <div className={`uploaddiv ps-2 ${errors.aadharfront ? "error" : ""}`}>
        <input
          type="file"
          ref={fileInputRefs.aadharfront}
          style={{ display: "none" }}
          onChange={handleFileChange("aadharfront")}
          accept=".jpg, .jpeg, .png, .pdf, .doc, .docx"
        />
        <div
          onClick={() => handleIconClick("aadharfront")}
          style={{
            cursor: "pointer",
            fontSize: "24px",
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {fileNames.aadharfront ? (
            <>
              <FiCheckCircle className="uploadicon" style={{ color: 'green' }} />
              <a style={{ fontSize: "14px", color: 'black' }}>Click here for Re-upload</a>
            </>
          ) : (
            <>
              <FiUploadCloud className="uploadicon" style={{ color: 'black' }} />
              <a style={{ fontSize: "14px", color: 'black' }}>Upload</a>
            </>
          )}
        </div>
      </div>
      <p style={{ fontSize: "14px", marginTop: "10px" }}>
        Supported formats: JPG, JPEG, PNG, PDF, DOC, DOCX
      </p>
      <p style={{ fontSize: "15px", marginTop: "10px", color: fileNames.aadharfront ? "lightgreen" : "white" }}>
        Selected file: {fileNames.aadharfront && fileNames.aadharfront.name ? fileNames.aadharfront.name : "No file selected"}
      </p>
      <p className="error-warning">{errors.aadharfront}</p>
    </div>
  )}
   {selectedOptions[1] && (
    <div style={{ marginLeft: "7px",marginRight: "7px"}}>
      <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>
        Aadhar Back Image <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p>
      </label>
      <div className={`uploaddiv ps-2 ${errors.aadharback ? "error" : ""}`}>
        <input
          type="file"
          ref={fileInputRefs.aadharback}
          style={{ display: "none" }}
          onChange={handleFileChange("aadharback")}
          accept=".jpg, .jpeg, .png, .pdf, .doc, .docx"
        />
        <div
          onClick={() => handleIconClick("aadharback")}
          style={{
            cursor: "pointer",
            fontSize: "24px",
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {fileNames.aadharback ? (
            <>
              <FiCheckCircle className="uploadicon" style={{ color: 'green' }} />
              <a style={{ fontSize: "14px", color: 'black' }}>Click here for Re-upload</a>
            </>
          ) : (
            <>
              <FiUploadCloud className="uploadicon" style={{ color: 'black' }}/>
              <a style={{ fontSize: "14px", color: 'black' }}>Upload</a>
            </>
          )}
        </div>
      </div>
      <p style={{ fontSize: "14px", marginTop: "10px" }}>
        Supported formats: JPG, JPEG, PNG, PDF, DOC, DOCX
      </p>
      <p style={{ fontSize: "15px", marginTop: "10px", color: fileNames.aadharback ? "lightgreen" : "white" }}>
        Selected file: {fileNames.aadharback ? fileNames.aadharback.name : "No file selected"}
      </p>
      <p className="error-warning">{errors.aadharback}</p>
    </div>
   )}
   {selectedOptions[2] && (
    <div style={{ marginLeft: "7px",marginRight: "7px"}}>
      <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>PAN Card Image <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
                    <div  className={`uploaddiv ps-2 ${
                      errors.panCard ? "error" : ""
                    }`}>
                      <input
                        type="file"
                        ref={fileInputRefs.panCard}
                        style={{ display: "none" }}
                        onChange={handleFileChange("panCard")}
                        accept=".jpg, .jpeg, .png, .pdf, .doc, .docx" 
                      />
                      <div
                        onClick={() => handleIconClick("panCard")}
                        style={{
                          cursor: "pointer",
                          fontSize: "24px",
                          flexDirection: "column",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                         {fileNames.panCard ? (
                      <>
                      <FiCheckCircle className="uploadicon" style={{ color: 'green' }} /> 
                      <a style={{ fontSize: "14px", color: 'black'}}>Click here for Re-upload</a>
                      </>
                    ) : (
                      <>
                      <FiUploadCloud className="uploadicon" style={{ color: 'black' }}/>
                      <a style={{ fontSize: "14px", color: 'black'}}>Upload</a>
                      </>
                    )}
                      </div>
                    </div>
                    <p style={{ fontSize: "14px", marginTop: "10px" }}>
                      Supported formats: JPG, JPEG, PNG, PDF, DOC, DOCX
                    </p>
                    <p style={{ fontSize: "15px", marginTop: "10px",  color: fileNames.panCard ? "lightgreen" : "white" }}>
                      Selected file:{" "}
                      {fileNames.panCard
                        ? fileNames.panCard.name
                        : "No file selected"}
                    </p>
                    <p className="error-warning">{errors.panCard}</p>
    </div>
   )}
   {selectedOptions[3] && (
    <div style={{ marginLeft: "7px",marginRight: "7px"}}>
      <label
  className="HeadText"
  style={{ display: 'flex', alignItems: 'center' }}
>
  Bank Statement
  <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p>
</label>              
<div
  className={`uploaddiv ps-2 ${
    errors.statement ? 'error' : ''
  }`}
>
  <input
    type="file"
    ref={fileInputRefs.statement}
    style={{ display: 'none' }}
    onChange={(event) => {
      const { files } = event.target;
      if (files.length > 0) {
        const selectedFile = files[0];
        const fileType = selectedFile.type;

        if (fileType !== 'application/pdf') {
          // Display an error if the file is not a PDF
          alert('Only PDF files are allowed. Please select a valid file.');
          event.target.value = ''; // Reset the file input
          return;
        }

        // If valid, handle the file change
        handleFileChange("statement")(event);
      }
    }}
    accept=".pdf"
  />


                      <div
                        onClick={() => handleIconClick("statement")}
                        style={{
                          cursor: "pointer",
                          fontSize: "24px",
                          flexDirection: "column",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                         {fileNames.statement ? (
                      <>
                      <FiCheckCircle className="uploadicon" style={{ color: 'green' }} /> 
                      <a style={{ fontSize: "14px", color: 'black'}}>Click here for Re-upload</a>
                      </>
                    ) : (
                      <>
                      <FiUploadCloud className="uploadicon" style={{ color: 'black' }} />
                      <a style={{ fontSize: "14px", color: 'black'}}>Upload</a>
                      </>
                    )}
                      </div>
                    </div>
                    <p style={{ fontSize: "14px", marginTop: "10px" }}>
                      Supported formats: JPG, JPEG, PNG, PDF, DOC, DOCX
                    </p>
                    <p style={{ fontSize: "15px", marginTop: "10px",  color: fileNames.statement ? "lightgreen" : "white" }}>
                      Selected file:{" "}
                      {fileNames.statement
                        ? fileNames.statement.name
                        : "No file selected"}
                    </p>
                    <p className="error-warning">{errors.statement}</p>
    </div>
   )}
   {selectedOptions[4] && (
    <div style={{ marginLeft: "7px",marginRight: "7px"}}>
      <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>PassBook Image <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
                    <div  className={`uploaddiv ps-2 ${
                      errors.passbook ? "error" : ""
                    }`}>
                      <input
                        type="file"
                        ref={fileInputRefs.passbook}
                        style={{ display: "none" }}
                        onChange={handleFileChange("passbook")}
                        accept=".jpg, .jpeg, .png, .pdf, .doc, .docx" 
                      />
                      <div
                        onClick={() => handleIconClick("passbook")}
                        style={{
                          cursor: "pointer",
                          fontSize: "24px",
                          flexDirection: "column",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                         {fileNames.passbook ? (
                      <>
                      <FiCheckCircle className="uploadicon" style={{ color: 'green' }} /> 
                      <a style={{ fontSize: "14px", color: 'black'}}>Click here for Re-upload</a>
                      </>
                    ) : (
                      <>
                      <FiUploadCloud className="uploadicon" style={{ color: 'black' }} />
                      <a style={{ fontSize: "14px", color: 'black'}}>Upload</a>
                      </>
                    )}
                      </div>
                    </div>
                    <p style={{ fontSize: "14px", marginTop: "10px" }}>
                      Supported formats: JPG, JPEG, PNG, PDF, DOC, DOCX
                    </p>
                    <p style={{ fontSize: "15px", marginTop: "10px",  color: fileNames.passbook ? "lightgreen" : "white" }}>
                      Selected file:{" "}
                      {fileNames.passbook
                        ? fileNames.passbook.name
                        : "No file selected"}
                    </p>
                    <p className="error-warning">{errors.passbook}</p>
    </div>
   )}
   {selectedOptions[5] && (
    <div style={{ marginLeft: "7px",marginRight: "7px"}}>
                <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>License Front Image <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
                  <div  className={`uploaddiv ps-2 ${
                      errors.licensefront ? "error" : ""
                    }`}>
                      <input
                        type="file"
                        ref={fileInputRefs.licensefront}
                        style={{ display: "none" }}
                        onChange={handleFileChange("licensefront")}
                        accept=".jpg, .jpeg, .png, .pdf, .doc, .docx" 
                      />
                      <div
                        onClick={() => handleIconClick("licensefront")}
                        style={{
                          cursor: "pointer",
                          fontSize: "24px",
                          flexDirection: "column",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                         {fileNames.licensefront ? (
                      <>
                      <FiCheckCircle className="uploadicon" style={{ color: 'green' }} /> 
                      <a style={{ fontSize: "14px", color: 'black'}}>Click here for Re-upload</a>
                      </>
                    ) : (
                      <>
                      <FiUploadCloud className="uploadicon" style={{ color: 'black' }} />
                      <a style={{ fontSize: "14px", color: 'black'}}>Upload</a>
                      </>
                    )}
                      </div>
                    </div>
                    <p style={{ fontSize: "14px", marginTop: "10px" }}>
                      Supported formats: JPG, JPEG, PNG, PDF, DOC, DOCX
                    </p>
                    <p style={{ fontSize: "15px", marginTop: "10px",  color: fileNames.licensefront ? "lightgreen" : "white" }}>
                      Selected file:{" "}
                      {fileNames.licensefront
                        ? fileNames.licensefront.name
                        : "No file selected"}
                    </p>
                    <p className="error-warning">{errors.licensefront}</p>
    </div>
   )}
   {selectedOptions[6] && (
    <div style={{ marginLeft: "7px",marginRight: "7px"}}>
      <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>License Back Image <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
                    <div  className={`uploaddiv ps-2 ${
                      errors.licenseback ? "error" : ""
                    }`}>
                      <input
                        type="file"
                        ref={fileInputRefs.licenseback}
                        style={{ display: "none" }}
                        onChange={handleFileChange("licenseback")}
                        accept=".jpg, .jpeg, .png, .pdf, .doc, .docx" 
                      />
                      <div
                        onClick={() => handleIconClick("licenseback")}
                        style={{
                          cursor: "pointer",
                          fontSize: "24px",
                          flexDirection: "column",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                         {fileNames.licenseback ? (
                      <>
                      <FiCheckCircle className="uploadicon" style={{ color: 'green' }} /> 
                      <a style={{ fontSize: "14px", color: 'black'}}>Click here for Re-upload</a>
                      </>
                    ) : (
                      <>
                      <FiUploadCloud className="uploadicon" style={{ color: 'black' }}/>
                      <a style={{ fontSize: "14px", color: 'black'}}>Upload</a>
                      </>
                    )}
                      </div>
                    </div>
                    <p style={{ fontSize: "14px", marginTop: "10px" }}>
                      Supported formats: JPG, JPEG, PNG, PDF, DOC, DOCX
                    </p>
                    <p style={{ fontSize: "15px", marginTop: "10px",  color: fileNames.licenseback ? "lightgreen" : "white" }}>
                      Selected file:{" "}
                      {fileNames.licenseback
                        ? fileNames.licenseback.name
                        : "No file selected"}
                    </p>
                    <p className="error-warning">{errors.licenseback}</p>
    </div>
   )}
   {selectedOptions[7] && (
    <div style={{ marginLeft: "7px",marginRight: "7px"}}>
      <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>RC Book Image <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
                    <div className={`uploaddiv ps-2 ${
                      errors.vehicle ? "error" : ""
                    }`}>
                      <input
                        type="file"
                        ref={fileInputRefs.vehicle}
                        style={{ display: "none" }}
                        onChange={handleFileChange("vehicle")}
                        accept=".jpg, .jpeg, .png, .pdf, .doc, .docx" 
                      />
                      <div
                        onClick={() => handleIconClick("vehicle")}
                        style={{
                          cursor: "pointer",
                          fontSize: "24px",
                          flexDirection: "column",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                         {fileNames.vehicle ? (
                      <>
                      <FiCheckCircle className="uploadicon" style={{ color: 'green' }} /> 
                      <a style={{ fontSize: "14px", color: 'black'}}>Click here for Re-upload</a>
                      </>
                    ) : (
                      <>
                      <FiUploadCloud className="uploadicon" style={{ color: 'black' }} />
                      <a style={{ fontSize: "14px", color: 'black'}}>Upload</a>
                      </>
                    )}
                      </div>
                    </div>
                    <p style={{ fontSize: "14px", marginTop: "10px" }}>
                      Supported formats: JPG, JPEG, PNG, PDF, DOC, DOCX
                    </p>
                    <p style={{ fontSize: "15px", marginTop: "10px",  color: fileNames.vehicle ? "lightgreen" : "white" }}>
                      Selected file:{" "}
                      {fileNames.vehicle
                        ? fileNames.vehicle.name
                        : "No file selected"}
                    </p>
                    <p className="error-warning">{errors.vehicle}</p>
      </div>
   )}
  </div>
</div>

             {/* <div
               style={{
                 display: "flex",
                 borderRadius: "5px",
                 border: "1px dotted #fff",
                 padding: "10px",
                 marginTop: "20px",
                 alignItems: "center",
                 position: "relative",
               }}
             >
               <input
                 type="file"
                 id="file-upload"
                 multiple
                 onChange={handleFileChange}
                 accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" 
                 style={{
                   position: "absolute",
                   width: "100%",
                   height: "100%",
                   opacity: 0,
                   cursor: "pointer",
                 }}
               />
               <label
                 htmlFor="file-upload"
                 style={{
                   width: "100%",
                   height: "100%",
                   display: "flex",
                   alignItems: "center",
                   justifyContent: "center",
                   color: "#fff",
                   cursor: "pointer",
                   paddingTop: "30px",
                   paddingBottom: "30px",
                   flexDirection:"column"
                 }}
               >
                 <AiOutlineUpload style={{ marginRight: "10px", color: "#e277f3",width:"30px",height:"30px" }} />
                 Choose Your Data
               </label>
             </div>
             <div style={{ marginTop: "20px" }}>
                {files.length > 0 && (
                  <ul>
                    {files.map((file, index) => (
                      <li key={index}>
                        {file.name}
                        <button
                          onClick={() => handleRemoveFile(file.name)}
                          className="application-button"
                          style={{ marginTop: "10px" }}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
             {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>} */}
             <div className="d-flex justify-content-center mt-5">
               <button className="application-button" onClick={handleSubmit}>
                 SUBMIT
               </button>
             </div>
           </div>
         </div>
         
          )}
        </div>
        {showAlert && (
        <Alert type={alertType} message={alertMessage} onClose={handleClose} />
      )}
      </div>
    </>
  );
};

export default Applicationstatus;
