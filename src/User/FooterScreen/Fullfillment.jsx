import logo from "../../assets/image/logotrans.png";

const Fulfillment = () => {
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
            Experience a new level of convenience and reliability with
            Fulfillment by RECYCHBS. We handle the entire scrap collection
            process from start to finish, ensuring that your scrap is collected,
            weighed, and valued accurately. Our dedicated team manages
            logistics, quality checks, and secure payments, allowing you to
            focus on what matters most—growing your business. With RECYCHBS, you
            benefit from efficient service, timely pickups, and a trusted
            partnership that prioritizes your satisfaction. Let us take care of
            the heavy lifting while you enjoy the rewards.
          </span>
        </div>
      </div>
    </>
  );
};
export default Fulfillment;
