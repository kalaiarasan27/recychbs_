import logo from "../../assets/image/logotrans.png";

const Sellon = () => {
  return (
    <>
      <div
        className="container-fluid"
        style={{
          height: "100vh",
          backgroundColor: "#000",
          color: "#fff",
          paddingTop: "20px",
          fontSize: "20px",
          fontWeight: "200",
               paddingLeft:"30px",
          paddingRight:"30px"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logo} style={{ height: "180px", width: "180px" }} />
        </div>
        <div style={{ marginTop: "70px" }}>
          <span>
            Join hands with us at RECYCHBS and turn your scrap into profit while
            contributing to a cleaner environment. By selling your scrap through
            our platform, you gain access to a seamless, transparent, and
            hassle-free process. We provide fair prices, secure transactions,
            and timely payments. Whether you're an individual or a business,
            RECYCHBS offers a convenient solution to monetize your scrap, reduce
            waste, and support sustainable practices. Start selling with us
            today and be part of a greener future!
          </span>
        </div>
      </div>
    </>
  );
};
export default Sellon;
