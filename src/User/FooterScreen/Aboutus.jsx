import logo from "../../assets/image/logotrans.png";

const Aboutus = () => {
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
            Welcome to RECYCHBS, where sustainability meets innovation. We are a
            forward-thinking startup dedicated to revolutionizing the way scrap
            materials are collected and recycled. Founded with a vision to
            reduce environmental impact and promote responsible waste
            management, RECYCHBS offers a seamless platform connecting
            individuals and businesses with local scrap dealers for efficient
            recycling.
          </span>
        </div>
        <div style={{ marginTop: "20px" }}>
          <span>
            Our mission is to prevent valuable resources from ending up in
            landfills by making recycling accessible, convenient, and rewarding.
            We empower college students as dealers, providing them with
            opportunities to earn while contributing to a greener planet. By
            leveraging advanced technology, including real-time data integration
            and automated pricing based on market trends, we ensure transparency
            and fairness in every transaction.
          </span>
        </div>
        <div style={{ marginTop: "20px" }}>
          <span>
            At RECYCHBS, we believe that small actions lead to big changes. Join
            us in creating a cleaner, more sustainable future—one scrap at a
            time.
          </span>
        </div>
      </div>
    </>
  );
};
export default Aboutus;
