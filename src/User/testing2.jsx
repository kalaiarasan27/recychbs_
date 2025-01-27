import React, { useEffect, useState } from 'react';

function Testing2() {
  const [orders, setOrders] = useState([]);
  console.log("order Data is ",orders);
  const [socket, setSocket] = useState(null);

  const dealerId = 1;
  useEffect(() => {
    if (socket) return; // Prevent creating a new WebSocket if one already exists
  
    const newSocket = new WebSocket(`ws://127.0.0.1:8000/ws/dealer/${dealerId}/`);
    
    newSocket.onopen = () => {
      console.log("WebSocket connection established");
      setSocket(newSocket); // Save the WebSocket connection in state
    };
    newSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("recieved Data is ",orders);

        if (data.order) {
          setOrders((prevOrders) => [...prevOrders, data.order]);
        }
      } catch (error) {
        console.error("Failed to parse message:", error);
      }
    };
    newSocket.onclose = () => {
      console.log("WebSocket closed, attempting to reconnect in 1 second...");
      setTimeout(() => setSocket(null), 1000); // Reset socket state to allow reconnection
    };
    newSocket.onerror = (error) => console.error("WebSocket error:", error);
  
    return () => newSocket.close();
  }, [dealerId, socket]);

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

export default Testing2;
