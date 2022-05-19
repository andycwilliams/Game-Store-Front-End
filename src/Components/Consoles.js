import { useState, useEffect } from "react";
import "../GameStore.css";
import ConsoleCard from "./ConsoleCard.js";
import ConsoleForm from "./ConsoleForm.js";

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
    setScopedConsole({
      id: 0,
      model: "",
      manufacturer: "",
      memoryAmount: "",
      processor: "",
      price: "",
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
            <th>Delete / Edit</th>
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
