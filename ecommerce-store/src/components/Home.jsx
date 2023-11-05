import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import games from "../games";
import LoginForm from './components/LoginForm';

const Home = () => {
  const games = useSelector((state) => state.games);
  return (
    <div className="grid grid-cols-2 gap-4">
      {games.map((game) => (
        <div key={game.id} className="border p-4">
          <h2 className="text-xl font-semibold">{game.name}</h2>
          <img src={game.imageUrl} alt={game.name} className="my-2 w-32 h-32 object-cover" />
          <p className="text-gray-700">{game.description}</p>
          <p className="text-gray-700">Price: ${game.price}</p>
          <Link to={`/game/${game.id}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
              Add to Cart
            </button>
            <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 flex">
              Buy Now
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;