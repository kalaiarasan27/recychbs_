import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Headerdealer from "../component/Headerdealer";
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
 
function Scrapotpdetail() {
  const [scrapType, setScrapType] = useState("");
  const [OtherScrapType, setOtherScrapType] = useState("");
  const [scrapQuality, setScrapQuality] = useState("");
  const [weight, setWeight] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [scrapEntries, setScrapEntries] = useState([]);
  const [numScrapEntries, setNumScrapEntries] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isOtpComplete, setIsOtpComplete] = useState(false);
  const navigate = useNavigate();
  const orderId = `Order-${Date.now()}`;
 
  // Function to update OTP values
  const handleOtpChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1); // Ensure only one digit per field
    setOtp(updatedOtp);
 
    // Move focus to the next input
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
 
    // Check if the OTP is complete
    setIsOtpComplete(updatedOtp.every(digit => digit !== ""));
  };
 
  // Function to verify OTP
  const handleVerifyOtp = () => {
    const otpDigits = otp.join(''); // Combine OTP digits into a string
 
    if (otpDigits.length !== 6) {
      setOtpError("Please enter all 6 digits.");
      return;
    }
 
    axios.post("http://localhost:8000/verify_otp/", { otp: otpDigits }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setOtpError("");  // Clear any OTP error on success
        setIsOtpVerified(true); // Set OTP as verified
        alert("OTP verified successfully!");
      })
      .catch(error => {
        setOtpError("Invalid OTP, please try again.");
      });
};
 
 
  // Add scrap entry to the list
  const handleAddScrapEntry = () => {
    if (!scrapType || !scrapQuality || !weight || !amount) {
      setError("Please fill in all the fields.");
      return;
    }
 
    const newScrapEntry = {
      scrapType,
      OtherScrapType: scrapType === 'others' ? OtherScrapType : "",
      scrapQuality,
      weight,
      amount,
    };
 
    setScrapEntries([...scrapEntries, newScrapEntry]);
 
    // Calculate the subtotal
    setSubtotal(subtotal + parseFloat(amount));
    setError("");  // Clear any previous error
    resetForm();
  };
 
  // Reset scrap form fields after adding a scrap entry
  const resetForm = () => {
    setScrapType("");
    setOtherScrapType("");
    setScrapQuality("");
    setWeight("");
    setAmount("");
  };
 
  // Remove scrap entry from the list
  const handleRemoveScrapEntry = (index) => {
    const updatedEntries = [...scrapEntries];
    updatedEntries.splice(index, 1);
    setScrapEntries(updatedEntries);
 
    // Recalculate the subtotal
    setSubtotal(updatedEntries.reduce((total, entry) => total + parseFloat(entry.amount), 0));
  };
 
  // Submit the order
  const handleSubmit = (event) => {
    event.preventDefault();
    if (scrapEntries.length === 0) {
      setError("Please add at least one scrap entry.");
      return;
    }
 
    if (!isOtpVerified) {
      setError("Please verify the OTP before submitting the order.");
      return;
    }
 
    setError("");
 
    const orderData = {
      orderId,
      entries: scrapEntries.map(entry => ({
        ...entry,
        address: "123 Main St",
        phoneno: "9876543210",
        username: "Jane Smith",
      })),
      totalAmount: subtotal,
    };
 
    localStorage.setItem('orderData', JSON.stringify(orderData));
    navigate("/Completeorder", { state: { orderData } });
  };
 
  return (
    <>
      <Headerdealer />
      <div className="topbottom mt-5">
        <div>
          <h2>Ongoing Order Details</h2>
          <div className="dealer-container row">
            <div className="dealer-info col-12 col-lg-8 col-md-12 col-sm-12">
              <h5>Dealer Information</h5>
              <p><strong>Name:</strong> Jane Smith</p>
              <p><strong>Phone Number:</strong> 9876543210</p>
              <p><strong>Location:</strong> Chennai</p>
            </div>
            <div className="otp-display col-12 col-lg-4 col-md-12 col-sm-12">
              <div className="otp-box">
                <p>Enter OTP</p>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    id={`otp-input-${index}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    maxLength="1"
                    className="otp-input"
                    style={{
                      width: "40px",
                      height: "40px",
                      textAlign: "center",
                      margin: "0 4px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      fontSize: "18px",
                    }}
                  />
                ))}
                <button
                  onClick={handleVerifyOtp}
                  disabled={!isOtpComplete}
                  style={{
                    display: "inline-flex",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                >
                  ✓
                </button>
                {otpError && <div style={{ color: "red", marginTop: "10px" }}>{otpError}</div>}
              </div>
            </div>
          </div>
 
          <div className="scrap-form mt-4">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Scrap Type</label>
                <select
                  value={scrapType}
                  onChange={(e) => setScrapType(e.target.value)}
                  className="form-control"
                >
                  <option value="">Select Scrap Type</option>
                  <option value="type 1">Plastic</option>
                  <option value="type 2">Copper</option>
                  <option value="type 3">Iron</option>
                  <option value="others">Other</option>
                </select>
                {scrapType === "others" && (
                  <input
                    type="text"
                    value={OtherScrapType}
                    onChange={(e) => setOtherScrapType(e.target.value)}
                    className="form-control mt-2"
                    placeholder="Enter Other Scrap Type"
                  />
                )}
              </div>
 
              <div className="form-group mt-3">
                <label>Scrap Quality</label>
                <select
                  value={scrapQuality}
                  onChange={(e) => setScrapQuality(e.target.value)}
                  className="form-control"
                >
                  <option value="">Select Scrap Quality</option>
                  <option value="Quality 1">Good</option>
                  <option value="Quality 2">Average</option>
                  <option value="Quality 3">Bad</option>
                </select>
              </div>
 
              <div className="form-group mt-3">
                <label>Weight (kg)</label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="form-control"
                />
              </div>
 
              <div className="form-group mt-3">
                <label>Amount</label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="form-control"
                />
              </div>
 
              {error && <div className="alert alert-danger mt-3">{error}</div>}
 
              <button type="button" onClick={handleAddScrapEntry} className="btn btn-primary mt-3">
                Add Scrap Entry
              </button>
            </form>
          </div>
 
          {/* Scrap Entries Display */}
          <div className="scrap-entries mt-4">
            <h4>Scrap Entries</h4>
            <ul className="list-group">
              {scrapEntries.map((entry, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between">
                  <div>
                    {entry.scrapType} - {entry.scrapQuality} - {entry.weight}kg - ${entry.amount}
                  </div>
                  <button onClick={() => handleRemoveScrapEntry(index)} className="btn btn-danger">
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-3"><strong>Subtotal:</strong> ${subtotal}</div>
          </div>
 
          {/* Submit Order Button */}
          <button type="button" onClick={handleSubmit} className="btn btn-success mt-3">
            Submit Order
          </button>
        </div>
      </div>
    </>
  );
}
 
export default Scrapotpdetail;
