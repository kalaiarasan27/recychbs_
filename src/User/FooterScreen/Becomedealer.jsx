import logo from "../../assets/image/logotrans.png";

const Becomedealer = () => {
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
            Join the RECYCHBS network as a dealer and unlock new opportunities
            in the scrap recycling industry. As a dealer, you’ll gain access to
            a steady stream of scrap materials, competitive pricing, and the
            backing of a trusted brand committed to environmental
            sustainability. Our platform connects you with customers in your
            area, streamlines the process from collection to payment, and
            ensures transparency at every step. Whether you’re looking to expand
            your business or start a new venture, RECYCHBS provides the tools
            and support you need to succeed. Partner with us and be a part of
            the green revolution!{" "}
          </span>
        </div>
      </div>
    </>
  );
};
export default Becomedealer;
