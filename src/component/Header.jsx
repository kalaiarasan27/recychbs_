import { FaHome, FaUser, FaCheckCircle, FaClock, FaArrowLeft } from "react-icons/fa";
import logo from "../assets/image/logotrans.png";
import LocationDisplay from "./LocationDisplay";
import { IoMenuSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { BiArrowToLeft, BiHelpCircle, BiSolidUserAccount } from "react-icons/bi";
import { FcFaq } from "react-icons/fc";
import { LuLogOut } from "react-icons/lu";
import { RiCustomerService2Line, RiListOrdered2 } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
 
const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomeDealerPage = location.pathname === '/Homeuser';
 
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
 
 
  const handleLogout = () => {
    // Clear authentication status
    navigate("/");
 
    // Prevent back navigation by modifying history
    window.history.pushState(null, "", window.location.href);
 
    // Disable the back button
    window.onpopstate = function (event) {
      window.history.pushState(null, "", window.location.href);
    };
  };
 
  // Prevent default backspace behavior on the whole document
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Backspace") {
        event.preventDefault();
      }
    };
 
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
 
  return (
    <>
      <div>
        <div className="header-fixed">
          <div className="headersection-desktop">
            <div className="col-2 d-flex flex-column justify-content-center">
              <img
                src={logo}
                alt="Logo"
                style={{
                  width: "50px",
                  height: "45px",
                  marginLeft:"20%"
                }}
              />
            </div>
            <div className="col-8 d-flex flex-column px-1 justify-content-center align-items-center">
              <p
                className="text-white p-0 m-0"
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textAlign: "left",
                }}
              >
                RECYCHBS
              </p>
              <div className="" style={{ display: "flex", alignItems: "center" }}>
                <FaLocationDot
                  style={{
                    color: "#fff",
                    width: "15px",
                    height: "15px",
                    marginRight: "5px",
                    marginTop: "-10px",
                  }}
                />
                <div style={{ color: "#fff" }}>
                  <LocationDisplay />
                </div>
              </div>
            </div>
            <div className="col-2 flex-row d-flex">
              <div className="col-3 d-flex flex-column align-items-center justify-content-center">
                <div style={{ cursor: "pointer" }} onClick={() => navigate("/Homeuser")}>
                  <FaHome className="icons-bottom" />
                </div>
              </div>
              <div className="col-3 d-flex flex-column align-items-center justify-content-center">
                <div style={{ cursor: "pointer" }} onClick={() => navigate("/Userlogopage")}>
                  <FaUser className="icons-bottom" />
                </div>
              </div>
              <div className="col-3 d-flex flex-column align-items-center justify-content-center">
                <div style={{ position: "relative" }}>
                  <IoIosNotifications
                    style={{ height: "20px", width: "20px", cursor: "pointer", color: "#fff" }}
                    onClick={() => navigate("/Usernotification")}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50%",
                      width: "15px",
                      height: "15px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    17
                  </span>
                </div>
              </div>
              <div className="col-3 d-flex flex-column align-items-center justify-content-center">
                <div style={{ cursor: "pointer" }} onClick={toggleDrawer}>
                  <IoMenuSharp className="icons-bottom" />
                </div>
              </div>
            </div>
          </div>
          <div className="headersection-mobile">
            <div className="col-2 d-flex flex-column justify-content-center align-items-center">
              <img
                src={logo}
                alt="Logo"
                style={{
                  width: "50px",
                  height: "45px",
                }}
              />
            </div>
            <div className="col-8 d-flex flex-column px-1 justify-content-center align-items-center">
              <p
                className="text-white p-0 m-0"
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textAlign: "left",
                }}
              >
                RECYCHBS
              </p>
              <div className="" style={{ display: "flex", alignItems: "center" }}>
                <FaLocationDot
                  style={{
                    color: "#fff",
                    width: "15px",
                    height: "15px",
                    marginRight: "5px",
                    marginTop: "-10px",
                  }}
                />
                <div style={{ color: "#fff" }}>
                  <LocationDisplay />
                </div>
              </div>
            </div>
            <div className="col-2 flex-row d-flex align-items-center justify-content-center">
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IoIosNotifications
        style={{
          height: "20px",
          width: "20px",
          cursor: "pointer",
          color: "#fff",
        }}
        onClick={() => navigate("/Usernotification")}
      />
      <span
        style={{
          position: "absolute",
          top: "-5px",
          right: "-5px",
          backgroundColor: "red",
          color: "white",
          borderRadius: "50%",
          width: "15px",
          height: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "10px",
          fontWeight: "bold",
        }}
      >
        17
      </span>
    </div>
</div>
 
          </div>
        </div>
        <div
          className="bottom-fixed"
          style={{
            width: "100%",
            backgroundColor: "#000",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          <div className="col-4">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={toggleDrawer}
            >
              <IoMenuSharp className="icons-bottom" />
              <p className="icons-bottom-text p-0 m-0">Menu</p>
            </div>
          </div>
          <div className="col-4">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => navigate("/Homeuser")}
            >
              <FaHome className="icons-bottom" />
              <p className="icons-bottom-text p-0 m-0">Home</p>
            </div>
          </div>
          <div className="col-4">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => navigate("/Userlogopage")}
            >
              <FaUser className="icons-bottom text-center" />
              <p className="icons-bottom-text p-0 m-0">User</p>
            </div>
          </div>
        </div>
        <div
          className={`drawer ${drawerOpen ? "drawer-open" : ""}`}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "250px",
            height: "100%",
            backgroundColor: "#333",
            color: "#fff",
            transition: "transform 0.3s ease",
            transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
            zIndex: 1000,
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <div
              style={{
                padding: "40px 20px",
                borderBottom: "2px solid #777",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontWeight: "800" }}>RECYCHBS</span>
              <RxCross2
                style={{ height: "20px", width: "20px", cursor: "pointer" }}
                onClick={() => setDrawerOpen(false)}
              />
            </div>
            <div style={{}}>
              <div
                className="drawer-menu"
                onClick={() => navigate("/Yourbooking")}
              >
                <RiListOrdered2
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                />
                <span>Your Bookings</span>
              </div>
              <div
                className="drawer-menu"
                onClick={() => navigate("/Useraccount")}
              >
                <BiSolidUserAccount
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                />
                <span>Your Account</span>
              </div>
              <div
                className="drawer-menu"
                onClick={() => navigate("/CompletedOrder")}
              >
                <FaCheckCircle
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                />
                <span>Completed Orders</span>
              </div>
              <div
                className="drawer-menu"
                onClick={() => navigate("/OngoingOrder")}
              >
                <FaClock
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                />
                <span>On Going Orders</span>
              </div>
              <div
                className="drawer-menu"
                onClick={() => navigate("/Usercustomer")}
              >
                <RiCustomerService2Line
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                />
                <span>Customer Service</span>
              </div>
              <div
                className="drawer-menu"
                onClick={() => navigate("/FAQ")}
              >
                <FcFaq
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                />
                <span>FAQ</span>
              </div>
            </div>
          </div>
          <div
            className="drawer-menu"
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            <LuLogOut
              style={{ height: "20px", width: "20px", marginRight: "10px" }}
            />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};
 
export default Header;