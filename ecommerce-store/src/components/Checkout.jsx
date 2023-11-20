// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { clearCart } from '../reducers/cartSlice';

// const Checkout = () => {
//   const cartItems = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const [userInfo, setUserInfo] = useState({
//     name: '',
//     address: '',
//     phoneNumber: '',
//   });
//   const [paymentDetails, setPaymentDetails] = useState({
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//   });
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserInfo({ ...userInfo, [name]: value });
//   };

//   const handlePaymentInputChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentDetails({ ...paymentDetails, [name]: value });
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   const handlePaymentSubmit = (e) => {
//     e.preventDefault();
//     if (paymentDetails.cardNumber) {
//       setPaymentSuccess(true);
//       handleClearCart();
//     } else {
//       setPaymentSuccess(false);
//     }
//   };

//   return (
//     <div className="border p-4 bg-yellow-200">
//       <h2 className="text-4xl font-bold mb-4">Checkout</h2>
//       {!paymentSuccess ? (
//         <div>
//           <h3 className="text-xl font-semibold mb-2">User Information:</h3>
//           <form className="mb-4">
//             <div>
//             <label className="flex">
//               Name:
//               <input type="text" name="name" value={userInfo.name} onChange={handleInputChange} />
//             </label>
//             <label className="flex mt-4">
//               Address:
//               <input type="text" name="address" value={userInfo.address} onChange={handleInputChange} />
//             </label>
//             <label className="flex mt-4">
//               Phone Number:
//               <input type="tel" name="phoneNumber" value={userInfo.phoneNumber} onChange={handleInputChange} />
//             </label>
//             </div>
//           </form>
//           <h3 className="text-xl font-semibold mb-2">Cart Items:</h3>
//           <ul>
//             {cartItems.map((item) => (
//               <li key={item.id}>
//                 {item.name} - ${item.price}
//               </li>
//             ))}
//           </ul>
//           <p className="text-black-700 mt-4">Total: ${cartItems.reduce((total, item) => total + item.price, 0)}</p>
//           <form onSubmit={handlePaymentSubmit} className="mt-4">
//             <label className="flex mb-4">
//               Card Number:
//               <input type="text" name="cardNumber" value={paymentDetails.cardNumber} onChange={handlePaymentInputChange} />
//             </label>
//             <label className="flex mb-4">
//               Expiry Date:
//               <input type="text" name="expiryDate" value={paymentDetails.expiryDate} onChange={handlePaymentInputChange} />
//             </label>
//             <label>
//               CVV:
//               <input type="text" name="cvv" value={paymentDetails.cvv} onChange={handlePaymentInputChange} />
//             </label>
//             <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 flex">
//               Submit Payment
//             </button>
//           </form>
//         </div>
//       ) : (
//         <p className="text-2xl font-semibold mb-4">Payment successful! Thank you for your purchase.</p>
//       )}
//     </div>
//   );
// };

// export default Checkout;