import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Games from "../games";
import axios from "axios";

const Home = () => {
  const [games, setGames] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8081/games")
      .then((response) => {
        setGames(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      });
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 w-100 mb-[60px]">
        {games && games.map((game) => (
          <div key={game.id} className="border p-4">
            <h2 className="text-xl font-semibold">{game.name}</h2>
            <img src={Games[game.id].imageUrl} alt={game.name} className="my-2 w-32 h-32 object-cover" />
            <p className="text-gray-700">{game.description}</p>
            <p className="text-gray-700">Price: ${game.price}</p>
            <Link to={`/game/${game.id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 flex">
                View Game
              </button>
            </Link>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 text-center">
        {/* <Link to="/cart">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View Cart
          </button>
        </Link> */}
        <Link to="/add-product">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-4 rounded">
            Add Product
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

