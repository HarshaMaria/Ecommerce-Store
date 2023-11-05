import React from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../reducers/cartSlice';

const Product = ({ game }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItemToCart(game));
  };

  return (
    <div className="product">
      <h3>{game.name}</h3>
      <p>Price: ${game.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
