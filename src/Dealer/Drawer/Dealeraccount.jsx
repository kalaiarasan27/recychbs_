import React, { useEffect, useState } from 'react';
import Headerdealer from '../../component/Headerdealer';
import { FaEye } from 'react-icons/fa';

const Dealeraccount = () => {
  const [dealerDetails, setDealerDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const fetchDealerDetails = async () => {
      try {
        const response = await fetch('fetchDealerEditDetails/');
        const dealer_data = await response.json();
        
        if (!dealer_data || !dealer_data.files) {
          throw new Error("Invalid dealer data structure");
        }

        const data = {
          name: dealer_data.name || "",
          dob: dealer_data.dob || "",
          phone: dealer_data.phone || "",
          aadhar: {
            number: dealer_data.aadhar || "",
            front: dealer_data.files.aadharFrontImage || "",
            back: dealer_data.files.aadharBackImage || ""
          },
          pan: { number: dealer_data.pan || "", file: dealer_data.files.panImage || "" },
          license: {
            number: dealer_data.license || "",
            front: dealer_data.files.licenseFrontImage || "",
            back: dealer_data.files.licenseBackImage || ""
          },
          rcBook: { file: dealer_data.files.rcBookImage || "" },
          bankStatement: { file: dealer_data.files.bankStatement || "" },
          bankPassbook: { file: dealer_data.files.passbook || "" },
          vehicleNumber: dealer_data.vehicleNumber || "",
          vehicleType: dealer_data.vehicleType || "",
          bankBookNo: dealer_data.bankBookNo || "",
          ifscCode: dealer_data.ifscCode || "",
          bankusername: dealer_data.bankusername || "",
          address: dealer_data.address || "",
          city: dealer_data.city || "",
          state: dealer_data.state || "",
          pincode: dealer_data.pincode || "",
          nationality: dealer_data.nationality || "",
        };

        setDealerDetails(data);
        console.log("Received data: ", data);
      } catch (error) {
        console.error('Error fetching dealer details:', error);
      }
    };

    fetchDealerDetails();
  }, []);

  const handleViewImage = (imageUrl) => {
    if (!imageUrl) {
      console.error("Image not available");
      return;
    }
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
    setIsZoomed(false);
  };

  const openPdfInNewWindow = (pdfUrl) => {
    if (!pdfUrl) {
      console.error("File not available");
      return;
    }
    window.open(pdfUrl, '_blank');
  };

  if (!dealerDetails) {
    return <div style={styles.loading}>Loading...</div>;
  }

  const DetailCard = ({ title, children }) => (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>{title}:</h2>
      {children}
    </div>
  );

  console.log(dealerDetails.aadhar.front.content);
  

  return (
    <>
      <Headerdealer />
      <div style={styles.container}>
        <h1 style={styles.header}>Your Account Details</h1>

        {/* Account Details Section */}
        <div style={styles.section}>
          <div style={styles.cardContainer}>
            {Object.entries(dealerDetails).map(([key, value]) =>
              typeof value === 'string' ? (
                <DetailCard key={key} title={key.replace(/([A-Z])/g, ' $1')}>
                  <p>{value}</p>
                </DetailCard>
              ) : null
            )}
          </div>
        </div>

        {/* Documents Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionHeader}>Documents</h2>
          <div style={styles.cardContainer}>

            {/* Aadhar Card */}
            <DetailCard title="Aadhar Front Image">
              <div style={styles.imageContainer}>
              <img
  src={
    dealerDetails.aadhar.front.content.startsWith("data:image")
      ? dealerDetails.aadhar.front.content
      : `data:image/png;base64,${dealerDetails.aadhar.front.content}`
  }
  alt="Aadhar Front"
  style={styles.image}

  onClick={() => handleViewImage(
    dealerDetails.aadhar.front.content.startsWith("data:image")
      ? dealerDetails.aadhar.front.content
      : `data:image/png;base64,${dealerDetails.aadhar.front.content}`
      
  )}
/>

                {/* <div style={styles.viewIcon} onClick={() => handleViewImage(dealerDetails.aadhar.front)}>
                  <FaEye style={styles.eyeIcon} /> View
                </div> */}
              </div>
            </DetailCard>

            <DetailCard title="Aadhar Back Image">
              <div style={styles.imageContainer}>
              <img
  src={
    dealerDetails.aadhar.back.content.startsWith("data:image")
      ? dealerDetails.aadhar.back.content
      : `data:image/png;base64,${dealerDetails.aadhar.back.content}`
  }
  alt="Aadhar Front"
  style={styles.image}
  
  onClick={() => handleViewImage(
    dealerDetails.aadhar.back.content.startsWith("data:image")
      ? dealerDetails.aadhar.back.content
      : `data:image/png;base64,${dealerDetails.aadhar.back.content}`
      
  )}
/>
              </div>
            </DetailCard>
            {/* PAN Card */}
            <DetailCard title="Pan card">
              <div style={styles.imageContainer}>
              <img
  src={
    dealerDetails.pan.file.content.startsWith("data:image")
      ? dealerDetails.pan.file.content
      : `data:image/png;base64,${dealerDetails.pan.file.content}`
  }
  alt="Aadhar Front"
  style={styles.image}
  
  onClick={() => handleViewImage(
    dealerDetails.pan.file.content.startsWith("data:image")
      ?dealerDetails.pan.file.content
      : `data:image/png;base64,${dealerDetails.pan.file.content}`
      
  )}
/>
              </div>
            </DetailCard>

            {/* License */}
            <DetailCard title="Licence front  card">
              <div style={styles.imageContainer}>
              <img
  src={
    dealerDetails.license.front.content.startsWith("data:image")
      ?dealerDetails.license.front.content
      : `data:image/png;base64,${dealerDetails.license.front.content}`
  }
  alt="Aadhar Front"
  style={styles.image}
  
  onClick={() => handleViewImage(
    dealerDetails.license.front.content.startsWith("data:image")
      ? dealerDetails.license.front.content
      : `data:image/png;base64,${dealerDetails.license.front.content}`
      
  )}
/>
              </div>
            </DetailCard>

            <DetailCard title="Licence back  card">
              <div style={styles.imageContainer}>
              <img
  src={
    dealerDetails.license.back.content.startsWith("data:image")
      ?dealerDetails.license.back.content
      : `data:image/png;base64,${dealerDetails.license.back.content}`
  }
  alt="Aadhar back"
  style={styles.image}
  
  onClick={() => handleViewImage(
    dealerDetails.license.back.content.startsWith("data:image")
      ? dealerDetails.license.back.content
      : `data:image/png;base64,${dealerDetails.license.back.content}`
      
  )}
/>
              </div>
            </DetailCard>

            {/* RC Book */}
            <DetailCard title="Licence back  card">
              <div style={styles.imageContainer}>
              <img
  src={
    dealerDetails.rcBook.file.content.startsWith("data:image")
      ?dealerDetails.rcBook.file.content
      : `data:image/png;base64,${dealerDetails.rcBook.file.content}`
  }
  alt="Aadhar back"
  style={styles.image}
  
  onClick={() => handleViewImage(
    dealerDetails.rcBook.file.content.startsWith("data:image")
      ? dealerDetails.rcBook.file.content
      : `data:image/png;base64,${dealerDetails.rcBook.file.content}`
      
  )}
/>
              </div>
            </DetailCard>

            {/* Bank Documents */}
            <DetailCard title="bank statement">
              <div style={styles.imageContainer}>
              <img
  src={
    dealerDetails.bankStatement.file.content.startsWith("data:image")
      ?dealerDetails.bankStatement.file.content
      : `data:image/png;base64,${dealerDetails.bankStatement.file.content}`
  }
  alt="Aadhar back"
  style={styles.image}
  
  onClick={() => handleViewImage(
    dealerDetails.bankStatement.file.content.startsWith("data:image")
      ? dealerDetails.bankStatement.file.content
      : `data:image/png;base64,${dealerDetails.bankStatement.file.content}`
      
  )}
/>
              </div>
            </DetailCard>
            <DetailCard title="bank statement">
              <div style={styles.imageContainer}>
              <img
  src={
    dealerDetails.bankPassbook.file.content.startsWith("data:image")
      ?dealerDetails.bankPassbook.file.content
      : `data:image/png;base64,${dealerDetails.bankPassbook.file.content}`
  }
  alt="Aadhar back"
  style={styles.image}
  
  onClick={() => handleViewImage(
    dealerDetails.bankPassbook.file.content.startsWith("data:image")
      ? dealerDetails.bankPassbook.file.content
      : `data:image/png;base64,${dealerDetails.bankPassbook.file.content}`
      
  )}
/>
              </div>
            </DetailCard>

          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div style={styles.modal} onClick={closeModal}>
          <div style={styles.modalContent}>
            <button onClick={closeModal} style={styles.closeButton}>&times;</button>
            <img
              src={modalImage}
              alt="Modal"
              style={{ ...styles.modalImage, transform: isZoomed ? "scale(1.5)" : "scale(1)" }}
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(!isZoomed);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

// Styles
const styles = {
  container: { padding: '20px', maxWidth: '1400px', margin: '90px auto 0' },
  header: { textAlign: 'center', fontSize: '2em' },
  cardContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  card: { border: '1px solid #ccc', borderRadius: '8px', padding: '15px', backgroundColor: '#fff' },
  image: { width: '100%', maxHeight: '200px', borderRadius: '8px', cursor: 'pointer' },
  button: { backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' },
  modal: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.8)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
  closeButton: { position: "absolute", top: "10px", right: "40px", color: "#fff", fontSize: "28px", fontWeight: "800", backgroundColor: "transparent", border: "none", cursor: "pointer" },
  modalImage: { maxWidth: "90%", maxHeight: "90%", borderRadius: "8px", border: "2px solid #fff", cursor: "zoom-in" }
};

export default Dealeraccount;
