// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, clearCart } from '../reducers/cartSlice';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const Cart = () => {
//   const [totalPrice, setTotalPrice] = useState(0)
//   const cartItems = useSelector(state => state.cart);
//   const dispatch = useDispatch();
//   const [games, setGames] = useState([]);


//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:8081/cart/all')
//       .then(response => {
//         const array = response.data.map(item => item.gameId);
//         const uniqueTargetIds = [...new Set(array)];

//         setData(uniqueTargetIds);
  
//     axios.get('http://localhost:8081/games')
//       .then(response => {
//         const filteredGames = response.data.filter(game => uniqueTargetIds.includes(game.id));
//         console.log(filteredGames)
//         setGames(filteredGames);
//         setTotalPrice(filteredGames.reduce((total, item) => total + item.price, 0));
//         setIsLoading(false);
//         })
//         .catch(error => {

//           setError(error);
//           setIsLoading(false);
//         });
  
//       })
//       .catch(error => {
//         setError(error);
//       });
//   }, []);
  

//   const handleRemoveFromCart = item => {
//     axios.delete(`http://localhost:8081/cart/${item.id}`)
//       .then(response => {
//         dispatch(removeFromCart(item));
//         console.log('Item removed from cart:', item);
//       })
//       .catch(error => {
//         console.error('Error removing item from cart:', error);
//       });
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   const total = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   if (!data) {
//     return <div>No data available.</div>;
//   }


//   return (
//     <div>
//       <h2 className="text-4xl font-bold mb-4">Your Shopping Cart</h2>
//       {games.length === 0 ? (
//         <div>
//           <p>Your Shopping cart is empty.</p>
//           <Link to="/home">
//             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
//               Back to Home
//             </button>
//           </Link>
//         </div>
//       ) : (
//         <div>
//       <div>
//         {games.map(game => (
//           <div key={game.id} className="game-item">
//             <h3>{game.name}</h3>
//             <p>{game.description}</p>
//             <p>Price: ${game.price}</p>
//             <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 mb-4" onClick={() => handleRemoveFromCart(games.id)}>
//             Remove
//           </button>
//           </div>
//         ))}
//       </div>
//           <p className="text-xl font-semibold mt-4">Total Price: ${totalPrice}</p>

//           <Link to="/checkout">
//             <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 flex">
//               Proceed to Checkout
//             </button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;







// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, clearCart } from '../reducers/cartSlice';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const Cart = () => {
//   const cartItems = useSelector(state => state.cart);
//   const dispatch = useDispatch();

//   const handleRemoveFromCart = async item => {
//     try {
//       const response = await axios.delete(`http://localhost:8080/games/carts/${item.id}`);
//       if (response.status === 200) {
//         dispatch(removeFromCart(item));
//       } else {
//         console.error('Failed to remove item from cart');
//       }
//     } catch (error) {
//       console.error('Error removing item from cart:', error);
//     }
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   const total = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);

//   return (
//     <div>
//       <h2 className="text-4xl font-bold mb-4">Your Shopping Cart</h2>
//       {cartItems.length === 0 ? (
//         <div>
//         <p>Your Shopping cart is empty.</p>
//         <Link to="/home">
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
//             Back to Home
//           </button>
//         </Link>
//       </div>
//       ) : (
//         <div>
//           <ul>
//             {cartItems.map(item => (
//               <li key={item.id}>
//                 {item.name} - ${item.price}
//                 <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4 ml-4" onClick={() => handleRemoveFromCart(item)}>
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <p className="text-xl font-semibold mt-4">Total Price: ${total}</p>
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={handleClearCart}>
//             Clear Cart
//           </button>
//           <Link to="/checkout">
//           <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 flex">
//             Proceed to Checkout
//           </button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;



import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../reducers/cartSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch cart items from the API endpoint
    axios.get(`http://localhost:8081/games/carts`)
      .then((response) => {
        setCartItems(response.data);
        console.log('Cart items:', response.data);  
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, []);

  const handleRemoveFromCart = async item => {
    try {
      console.log(item.id)
      const response = await axios.delete(`http://localhost:8081/games/carts/${item.id}`);
      if (response.status === 200) {
        dispatch(removeFromCart(item));
        // Fetch updated cart items
        axios.get(`http://localhost:8081/games/carts`)
          .then((response) => {
            setCartItems(response.data);
            console.log('Updated cart items:', response.data);  
          })
          .catch((error) => {
            console.error("Error fetching updated cart items:", error);
          });
      } else {
        console.error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const total = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4">Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div>
        <p>Your Shopping cart is empty.</p>
        <Link to="/home">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
            Back to Home
          </button>
        </Link>
      </div>
      ) : (
        <div>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.game.name} - ${item.game.price}
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4 ml-4" onClick={() => handleRemoveFromCart(item.game)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="text-xl font-semibold mt-4">Total Price: ${total}</p>
          {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={handleClearCart}>
            Clear Cart
          </button> */}
          <Link to="/checkout">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 flex">
            Proceed to Checkout
          </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
