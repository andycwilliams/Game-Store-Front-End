import { useState, useEffect } from "react";
import "../GameStore.css";
import GameCard from "./GameCard.js";
import GameForm from "./GameForm.js";

function Games() {
  const [games, setGames] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [scopedGames, setScopedGames] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/games")
      .then((response) => response.json())
      .then((result) => setGames(result))
      .catch(console.log);
  }, []);

  function addClick() {
    setScopedGames({
      game_id: 0,
      title: "",
      esrbRating: "",
      description: "",
      price: "",
      studio: "",
      quantity: 0,
    });
    setShowForm(true);
  }

  function handleRead(evt) {
    evt.preventDefault();
    const id = prompt("Enter an ID: ");

    fetch(`http://localhost:8080/games/${id}`)
      .then((response) => response.json())
      .then((result) => setGames([result]))
      .catch(console.log);
  }

  function handleReadAll(evt) {
    evt.preventDefault();
    fetch("http://localhost:8080/games")
      .then((response) => response.json())
      .then((result) => setGames(result))
      .catch(console.log);
  }

  function handleStudio(evt) {
    evt.preventDefault();
    console.log("Studio");

    const studio = prompt("Enter a Studio: ");

    fetch(`http://localhost:8080/games?studio=${studio}`)
      .then((response) => response.json())
      .then((result) => setGames(result))
      .catch(console.log);
  }

  function handleTitle(evt) {
    evt.preventDefault();
    console.log("Title");

    const title = prompt("Enter a Title: ");

    fetch(`http://localhost:8080/games?title=${title}`)
      .then((response) => response.json())
      .then((result) => setGames(result))
      .catch(console.log);
  }

  function handleEsrb(evt) {
    evt.preventDefault();
    console.log("Esrb");

    const esrbRating = prompt("Enter a ESRB: ");

    fetch(`http://localhost:8080/games?esrb=${esrbRating}`)
      .then((response) => response.json())
      .then((result) => setGames(result))
      .catch(console.log);
  }

  function notify({ action, game, error }) {
    if (error) {
      setError(error);
      setShowForm(false);
      return;
    }
    switch (action) {
      case "add":
        setGames([...games, game]);
        break;
      case "delete":
        setGames(games.filter((r) => r.game_id !== game.game_id));
        break;
      case "edit":
        setGames(
          games.map((r) => {
            if (r.game_id !== game.game_id) {
              return r;
            } else {
              return game;
            }
          })
        );
        break;
      case "getAll":
        setGames(games.filter((r) => r.studio !== game.studio));
        break;
      case "get":
        setGames();
        break;
      case "getByStudio":
        setGames();
        break;
      case "edit-form":
        setShowForm(true);
        setScopedGames(game);
        return;
      default:
        console.log("Bad action for notify.");
    }
    setError("");
    setShowForm(false);
  }

  if (showForm) {
    return <GameForm games={scopedGames} notify={notify} />;
  }

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      <div>
        <h1 id="consoleTitle">Games</h1>
        <button className="btn btn-primary" type="button" onClick={addClick}>
          Create
        </button>
        <button className="btn btn-primary" type="button" onClick={handleRead}>
          Read
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleReadAll}
        >
          Read All
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleStudio}
          id="editButton"
        >
          Read By Studio
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleEsrb}
          id="editButton"
        >
          Read By ESRB Rating
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleTitle}
          id="editButton"
        >
          Read By Title
        </button>
        <table id="consoles">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>ESRB Rating</th>
            <th>Description</th>
            <th>Price</th>
            <th>Studio</th>
            <th>Quantity</th>
            <th>Edit</th>
          </tr>
          <tbody>
            {games.map((r) => (
              <GameCard key={r.game_id} games={r} notify={notify} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Games;
