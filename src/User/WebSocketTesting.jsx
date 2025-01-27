// // DealerPage.js
// import React, { useEffect, useState } from 'react';

// const DealerPage = ({ dealerId }) => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const socket = new WebSocket(`ws://localhost:8000/ws/orders/${dealerId}/`);

//     socket.onmessage = (event) => {
//       const order = JSON.parse(event.data);
//       setOrders((prevOrders) => [...prevOrders, order]);
//     };

//     return () => socket.close();
//   }, [dealerId]);

//   return (
//     <div>
//       <h1>Dealer Orders</h1>
//       {orders.map((order, index) => (
//         <div key={index}>
//           <h2>Order ID: {order.order_date}</h2>
//           <p>Items: {order.scrap_names.join(", ")}</p>
//           <p>Total: ${order.order_address}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DealerPage;




// import React, { useEffect, useState } from 'react';

// function DealerPage() {
//   const [orders, setOrders] = useState([]);
//       console.log("Order Data id-",orders)

//   useEffect(() => {
//     // const socket = new WebSocket('ws://127.0.0.1:8000/ws/orders/');
//       const dealerId = 3;

//     // const socket = new WebSocket('ws://127.0.0.1:8000/ws/orders/');
//     const socket = new WebSocket(`ws://127.0.0.1:8000/ws/dealer/${dealerId}/`);
//     socket.onopen = () => console.log("WebSocket connection established");

    
//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log("Recieved Data id-",data)
      
//       if (data.order) {
//         setOrders((prevOrders) => [...prevOrders, data.order]);
//       }
//     };

//     socket.onclose = () => console.log("WebSocket closed");

//     return () => socket.close();
//   }, []);

//   return (
//     <div>
//       <h2>Incoming Orders</h2>
//       <ul>
//         {orders.map((order) => (
//           <li key={order.id}>
//             {order.item_name} ordered {order.scrap_prices} of {order.order_address} on {order.order_date} at {order.order_time}
//           </li>                           
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default DealerPage;







// DealerPage.jsx
// import React, { useEffect, useState } from 'react';

// function DealerPage() {
//   const [orders, setOrders] = useState([]);

//   console.log("Final Order is -",orders)

//   useEffect(() => {
//   const dealerId = 3;

//     // const socket = new WebSocket('ws://127.0.0.1:8000/ws/orders/');
//     const socket = new WebSocket(`ws://127.0.0.1:8000/ws/dealer/${dealerId}/`);

//     socket.onopen = () => console.log("WebSocket connection established");

    
//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log("Recieved Data id-",data)
//       if (data.order) {
//         setOrders((prevOrders) => [...prevOrders, data.order]);
//       }
//     };

//     socket.onclose = () => console.log("WebSocket closed");

//     return () => socket.close();
//   }, []);

//   return (
//     <div>
//       <h2>Incoming Orders</h2>
//       <ul>
//         {orders.map((order) => (
//           <li key={order.id}>
//             {order.scrap_names} ordered {order.scrap_prices} of {order.order_address} on {order.order_date} at {order.order_time}
//           </li>                           
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default DealerPage;














import React, { useEffect, useState } from 'react';

function DealerPage() {
  const [orders, setOrders] = useState([]);
  const dealerId = 4;
  useEffect(() => {
    const connectWebSocket = () => {
      const newSocket = new WebSocket(`ws://127.0.0.1:8000/ws/dealer/${dealerId}/`);
      
      newSocket.onopen = () => console.log("WebSocket connection established");
      newSocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.order) {
            setOrders((prevOrders) => [...prevOrders, data.order]);
          }
        } catch (error) {
          console.error("Failed to parse message:", error);
        }
      };
      newSocket.onclose = () => {
        console.log("WebSocket closed, attempting to reconnect in 1 second...");
        setTimeout(connectWebSocket, 1000);
      };
      newSocket.onerror = (error) => console.error("WebSocket error:", error);
  
      return newSocket;
    };
  
    const socket = connectWebSocket();
    return () => socket.close();
  }, [dealerId]);
  

  return (
    <div>
      <h2>Incoming Orders for Dealer ID: {dealerId}</h2>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <strong>User ID:</strong> {order.User_ID}<br />

              <strong>Order ID:</strong> {order.id}<br />
              {/* <strong>Items:</strong> {order.scrap_names.join(", ")}<br /> */}
              <strong>Total:</strong> ${order.scrap_prices}<br />
              <strong>Address:</strong> {order.order_address}<br />
              <strong>Date:</strong> {order.order_date}<br />
              <strong>Time:</strong> {order.order_time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DealerPage;
