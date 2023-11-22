import React, { useState, useEffect } from "react";
import { Link,useParams } from "react-router-dom";
import Games from "../games";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [games, setGames] = useState([]);
  const { userId } = useParams();

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

  const navigate = useNavigate

  const setLogout = () => {
    localStorage.removeItem("LoginId")
    window.location.reload(false);
    navigate('/login')
  }

  return (
    <div className="container mx-auto">
      <div class="flex justify-end mt-[-48px] mb-[12px] mr-[48px]">
      <Link to="/">
      <button className="text-red-800  hover:bg-red-200 font-bold py-2 px-4 rounded m-1 cursor-pointer mt-[2px]" onClick={() => setLogout()}>
        Logout
      </button>
      </Link>
      </div>
      <div className="grid grid-cols-4 gap-4 w-100 mb-20">
        {games && games.map((game,index) => (
          <div key={game.id} className="border p-4 bg-orange-200 rounded-lg shadow-md">
           <div className="ml-[100px]">
            <h2 className="text-xl font-semibold">{game.name}</h2>
            <img src={Games[index].imageUrl} alt={game.name} className="my-2 w-32 h-32 object-cover" />
            <p className="text-gray-700">{game.description}</p>
            <p className="text-gray-700">Price: ${game.price}</p>
            <Link to={`/game/${userId}/${game.gameId}`}>
              <button className="bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-2 flex">
                View Game
              </button>
            </Link>
           </div> 
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 text-center shadow-md">
        {/* <Link to="/cart">
          <button className="bg-blue-500 hover:bg-blue-00 text-white font-bold py-2 px-4 rounded">
            View Cart
          </button>
        </Link> */}
        <Link to="/add-product">
          <button className="bg-violet-500 hover:bg-green-500 text-white font-bold py-2 px-4 ml-4 rounded">
            Add Product
          </button>
        </Link>
      </div>
    </div>
  
  );
};

export default Home;
