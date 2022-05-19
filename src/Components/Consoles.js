import { useState, useEffect } from "react";
import "../Consoles.css";
import ConsoleCard from "./ConsoleCard.js";
import ConsoleForm from "./ConsoleForm.js";
// import GameCard from "./GameCard.js";
// import GameForm from "./GameForm.js";
// import TshirtCard from "./TshirtCard.js";
// import TshirtForm from "./TshirtForm.js";

function Consoles() {
  const [consoles, setConsoles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [scopedConsole, setScopedConsole] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/console")
      .then((response) => response.json())
      .then((result) => setConsoles(result))
      .catch(console.log);
  }, []);

  function addClick() {
    const now = new Date();
    setScopedConsole({ id: 0, title: "", artist: "", year: now.getFullYear() });
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
    return <ConsoleForm console={scopedConsole} notify={notify} />;
  }

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      <div>
        <h1 id="consoleTitle">Consoles</h1>
        <button className="btn btn-primary" type="button" onClick={addClick}>
          Add a Console
        </button>
        <table id="consoles">
          <tr>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Memory Amount</th>
            <th>Processor</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
          <tbody>
            {consoles.map((r) => (
              <ConsoleCard key={r.id} console={r} notify={notify} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Consoles;
