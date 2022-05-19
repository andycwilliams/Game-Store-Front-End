import { useState, useEffect } from "react";
import "../GameStore.css";
import GameCard from "./GameCard.js";
import GameForm from "./GameForm.js";

function Games() {
  const [consoles, setConsoles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [scopedConsole, setScopedConsole] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/games")
      .then((response) => response.json())
      .then((result) => setConsoles(result))
      .catch(console.log);
  }, []);

  function addClick() {
    setScopedConsole({
      id: 0,
      title: "",
      esrbRating: "",
      description: "",
      price: "",
      studio: "",
      quantity: 0,
    });
    setShowForm(true);
  }

  function notify({ action, console, error }) {
    if (error) {
      setError(error);
      setShowForm(false);
      return;
    }
    switch (action) {
      case "add":
        setConsoles([...consoles, console]);
        break;
      case "delete":
        setConsoles(consoles.filter((r) => r.id !== console.id));
        break;
      case "edit":
        setConsoles(
          consoles.map((r) => {
            if (r.id !== console.id) {
              return r;
            } else {
              return console;
            }
          })
        );
        break;
      case "edit-form":
        setShowForm(true);
        setScopedConsole(console);
        return;
      default:
        console.log("Bad action for notify.");
    }
    setError("");
    setShowForm(false);
  }

  if (showForm) {
    return <GameForm console={scopedConsole} notify={notify} />;
  }

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      <div>
        <h1 id="consoleTitle">Games</h1>
        <button className="btn btn-primary" type="button" onClick={addClick}>
          Add a Game
        </button>
        <table id="consoles">
          <tr>
            <th>Title</th>
            <th>ESRB Rating</th>
            <th>Description</th>
            <th>Price</th>
            <th>Studio</th>
            <th>Quantity</th>
            <th>Queries</th>
          </tr>
          <tbody>
            {consoles.map((r) => (
              <GameCard key={r.id} games={r} notify={notify} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Games;
