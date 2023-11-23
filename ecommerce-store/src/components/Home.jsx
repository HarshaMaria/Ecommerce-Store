import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Games from "../games";
import axios from "axios";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';

const Home = () => {
  const [games, setGames] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

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

  const setLogout = () => {
    localStorage.removeItem("LoginId")
    window.location.reload(false);
    navigate('/login')
  }

  return (
    <div className="container mx-auto mt-[12px]">
      <div class="mt-[-48px] mb-[12px] mr-[48px]">
       <div className="flex justify-end gap-4">
         <Link to={`/cart/${userId}`}> 
          <ShoppingCartIcon className="mt-[-4px]" fontSize="large" onClick={() => console.log('Go to cart')} />
         </Link>
         <Link to="/add-product">
          <button className="mt-[4px] text-green-800"><AddIcon />
           Add Product
          </button>
         </Link> 
         <Link to="/Login">
         <button className="text-red-800  hover:bg-red-200 font-bold py-2 px-4 rounded m-1 cursor-pointer mt-[-4px] mr-[-24px]" onClick={() => setLogout()}>  {/* onClick={() =>handleLogout()} */}
          Logout
         </button>
         </Link>       
       </div> 
      </div>
      <div className="grid grid-cols-4 gap-4 w-100 mb-0">
        {games && games.map((game,index) => (
          <div key={game.id} className="border p-4 bg-orange-200 rounded-lg shadow-md">
           <div className="mx-auto w-[auto]">
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
    </div>
  
  );
};

export default Home;
