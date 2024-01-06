import React, { useState, useEffect } from 'react';

interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platform: { platform: { name: string } }[];
  rating: number;
  released: string;
}

const APIkey = '6d6df39d70844b7894cbafabdda42da5';

// const Navbar = () => (
//   <nav id="navbar">
//     <ul>
//       <li><a href="/">Home</a></li>
//       <li><a href="/signup">Sign Up</a></li>
//       <li><a href="/login">Login</a></li>
//     </ul>
//   </nav>
// );

const APIurl = `https://api.rawg.io/api/games?key=${APIkey}&dates=2010-01-01,2023-12-31&ordering=-added`;

const getPlatformString = (platforms: { platform: { name: string } }[]) => {
  const platformString = (platforms ?? []).map(each => each.platform.name).join(", ");
  if (platformString.length > 30) {
    return platformString.substring(0, 30) + "...";
  }
  return platformString;
}

const GameList: React.FC<{ games: Game[], updateGame: (id: number) => void, deleteGame: (id: number) => void }> = ({ games, updateGame, deleteGame }) => {
  return (
    <div className="gameList">
      {games.map((game) => (
        <div key={game.id} className="col-lg-3 col-md-6 col-sm-12">
          <div className="item">
            <img src={game.background_image} alt={`${game.name} image`} />
            <h3 className="game-name">
              {game.name}
              <br />
              <span className="platforms">{getPlatformString(game.parent_platform)}</span>
            </h3>
            <ul>
              <li><i className="fa fa-star"></i> <span className="rating">{game.rating}</span></li>
              <li><i className="fa-regular fa-calendar"></i> <span className="date">{game.released}</span></li>
            </ul>
            <button className="update-button" onClick={() => updateGame(game.id)}>Update</button>
            <button className="delete-button" onClick={() => deleteGame(game.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(APIurl);
        const data = await response.json();
        const fetchedGames: Game[] = data.results;
        setGames(fetchedGames);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchGames();
  }, []);

  const updateGame = (id: number) => {
    
    const confirmUpdate = window.confirm("Do you want to update this game?")
    if (confirmUpdate) {
      const newGame = window.prompt("Enter a new game name:")

      if (newGame !== null) {
        setGames((prevGames) =>
          prevGames.map((game) =>
            game.id === id ? { ...game, name: newGame } : game ));
      }
    }
    console.log(`Updating game with ID ${id}`);
  };

  const deleteGame = (id: number) => {
    
    const confirmDelete = window.confirm("Are you sure you want to delete this game?");
    if (confirmDelete) {
      
      setGames(prevGames => prevGames.filter(game => game.id !== id));
      console.log(`${id} will be deleted.`);
    }
  };

  return (
    <div>
      {loading && <div id="js-preloader">Loading...</div>}
      {!loading && <GameList games={games} updateGame={updateGame} deleteGame={deleteGame} />}
    </div>
  );
};

export default App;
