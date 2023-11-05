// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { clearCart } from '../reducers/cartSlice';

// const Checkout = () => {
//   const cartItems = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   return (
//     <div className="border p-4">
//       <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty. Add items to your cart before proceeding to checkout.</p>
//       ) : (
//         <div>
//           <h3 className="text-xl font-semibold mb-2">Cart Items:</h3>
//           <ul>
//             {cartItems.map((item) => (
//               <li key={item.id}>
//                 {item.name} - ${item.price}
//               </li>
//             ))}
//           </ul>
//           <p className="text-gray-700 mt-4">Total: ${cartItems.reduce((total, item) => total + item.price, 0)}</p>
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
//             onClick={handleClearCart}
//           >
//             Clear Cart
//           </button>
//           {/* Add payment form and checkout logic here */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Checkout;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../reducers/cartSlice';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Perform payment processing logic here (e.g., make API call, validate payment details)
    // For simplicity, let's consider payment is successful if card number is not empty
    if (paymentDetails.cardNumber) {
      setPaymentSuccess(true);
      handleClearCart();
    } else {
      setPaymentSuccess(false);
    }
  };

  return (
    <div className="border p-4">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      {paymentSuccess ? (
        <p>Payment successful! Thank you for your purchase.</p>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-2">Cart Items:</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <p className="text-gray-700 mt-4">Total: ${cartItems.reduce((total, item) => total + item.price, 0)}</p>
          <form onSubmit={handlePaymentSubmit} className="mt-4">
            <label>
              Card Number:
              <input type="text" name="cardNumber" value={paymentDetails.cardNumber} onChange={handleInputChange} />
            </label>
            <label>
              Expiry Date:
              <input type="text" name="expiryDate" value={paymentDetails.expiryDate} onChange={handleInputChange} />
            </label>
            <label>
              CVV:
              <input type="text" name="cvv" value={paymentDetails.cvv} onChange={handleInputChange} />
            </label>
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">
              Submit Payment
            </button>
          </form>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;