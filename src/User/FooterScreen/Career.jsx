import logo from "../../assets/image/logotrans.png";

const Career = () => {
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
          <span>Join Our Mission to Create a Sustainable Future!*</span>
        </div>
        <div style={{ marginTop: "20px" }}>
          <span>
            At RECYCHBS, we are dedicated to revolutionizing waste management by
            connecting communities with innovative recycling solutions. We
            believe that with the right team, we can make a significant impact
            on our environment by reducing waste and promoting sustainability.
          </span>
        </div>
        <div style={{ marginTop: "20px" }}>
          <span>
            We are looking for passionate and driven individuals who are excited
            about making a difference. If you have a knack for technology, a
            passion for the environment, and want to be part of a dynamic and
            growing team, we invite you to join us!
          </span>
        </div>
        <div style={{ marginTop: "20px" }}>
          <span>
            Explore exciting career opportunities with us, where you can
            contribute to meaningful work and grow your career in a supportive
            and forward-thinking environment. Send your resume to hr@recychbs.in
            and become part of the change we are driving at RECYCHBS.{" "}
          </span>
        </div>
        <div style={{ marginTop: "20px" }}>
          <span>Together, let's build a greener, cleaner future! </span>
        </div>
      </div>
    </>
  );
};
export default Career;
