import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SortableTable from "../component/SortableTable";
import Header from "../component/Header";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import axios from 'axios';
 
function OngoingOrder() {
  const location = useLocation();
 
  const dealerInfo = {
    name: "Jane Smith",
    phoneNumber: "9872635412",
    location: "Chennai",
    arrivalTime: new Date().toLocaleTimeString(),
    goOutTime: "",
  };
 
  const [scrapItems, setScrapItems] = useState([
    { scrapType: "Glass", scrapCondition: "Good", collectedDate: "2023-10-04", amountPerUnit: 80, weight: "30kg", status: "In Transit" },
    { scrapType: "Metal", scrapCondition: "Fair", collectedDate: "2023-10-05", amountPerUnit: 70, weight: "25kg", status: "Scheduled" },
    { scrapType: "Plastic", scrapCondition: "Poor", collectedDate: "2023-10-06", amountPerUnit: 50, weight: "20kg", status: "Pending Pickup" },
  ]);
 
  const [otp, setOtp] = useState(null);
 
 
  useEffect(() => {
  axios.get('http://localhost:8000/generate_otp/')
    .then(response => {
      console.log("OTP fetched:", response.data.otp_code); // Debugging response
      setOtp(response.data.otp_code); // Set OTP from backend response
    })
    .catch(error => {
      console.error("There was an error fetching the OTP:", error);
    });
}, []);

  const columns = React.useMemo(
    () => [
      { Header: "S.No", accessor: "serialNumber" },
      { Header: "Scrap", accessor: "scrapType" },
      { Header: "Scrap Condition", accessor: "scrapCondition" },
      { Header: "Collected Date", accessor: "collectedDate" },
      { Header: "Amount per 1 Kg", accessor: "amountPerUnit" },
      { Header: "Quantity(Kg)", accessor: "quantity" },
    ],
    []
  );
 
  const data = React.useMemo(
    () =>
      scrapItems.map((item, index) => ({
        serialNumber: index + 1,
        scrapType: item.scrapType || "N/A",
        scrapCondition: item.scrapCondition || "N/A",
        collectedDate: item.collectedDate || "N/A",
        amountPerUnit: item.amountPerUnit || "N/A",
        weight: item.weight || "N/A",
        quantity: (
          <input
            type="number"
            min="0"
            value={0} // Quantity value (you can adjust it based on your needs)
            onChange={() => {}}
            className="form-control"
          />
        ),
      })),
    [scrapItems]
  );
 
  return (
    <>
      <Header />
      <div className="container-fluid topbottom-user">
        <div className="dealer-container row">
          <div className="dealer-info col-12 col-lg-8 col-md-12 col-sm-12">
            <h5>Dealer Information</h5>
            <p><strong>Name:</strong> {dealerInfo.name}</p>
            <p><strong>Phone Number:</strong> {dealerInfo.phoneNumber}</p>
            <p><strong>Location:</strong> {dealerInfo.location}</p>
          </div>
 
          <div className="otp-display col-12 col-lg-4 col-md-12 col-sm-12">
            <div className="otp-box">
              <p>Your OTP is:</p>
              {/* Display OTP once it is fetched, otherwise show loading */}
              <div className="otp-digits">{otp !== null ? otp : "Loading OTP..."}</div>
            </div>
          </div>
        </div>
 
        <div className="dealer-container row">
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={{ height: '300px', width: '100%' }}
              center={{ lat: 13.0827, lng: 80.2707 }}
              zoom={10}
            >
            </GoogleMap>
          </LoadScript>
        </div>
 
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: "20px" }}>
          <button className="ongoing-addscrap-btn">
            <i className="fa fa-plus"></i> Add Scrap Item
          </button>
        </div>
 
        <div className="table-container">
          <SortableTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}
 
export default OngoingOrder;
 
 
