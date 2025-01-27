// UserPage.jsx
import React, { useState } from 'react';

function UserPage() {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');

  const handleOrder = async () => {
    const response = await fetch('http://127.0.0.1:8000/create-order/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item_name: itemName, quantity, customer_name: customerName }),
    });

    if (response.ok) {
      alert('Order created successfully!');
    } else {
      alert('Order creation failed!');
    }
  };

  return (
    <div>
      <h2>Order Page</h2>
      <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Item Name" />
      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
      <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Your Name" />
      <button onClick={handleOrder}>Order</button>
    </div>
  );
}

export default UserPage;
