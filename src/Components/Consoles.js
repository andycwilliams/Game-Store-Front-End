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
      console_id: 0,
      model: "",
      manufacturer: "",
      memory_amount: "",
      processor: "",
      price: "",
      quantity: 0,
    });
    setShowForm(true);
  }

  function handleRead(evt) {
    evt.preventDefault();
    console.log("Manufacturer");

    const id = prompt("Enter an ID: ");

    fetch(`http://localhost:8080/console/${id}`)
      .then((response) => response.json())
      .then((result) => setConsoles([result]))
      .catch(console.log);
  }

  function handleReadAll(evt) {
    evt.preventDefault();
    console.log("Read all");
    fetch("http://localhost:8080/console")
      .then((response) => response.json())
      .then((result) => setConsoles(result))
      .catch(console.log);
  }

  function handleManufacturer(evt) {
    evt.preventDefault();
    console.log("Manufacturer");

    const manufacturer = prompt("Enter a manufacturer: ");

    fetch(`http://localhost:8080/console?manufacturer=${manufacturer}`)
      .then((response) => response.json())
      .then((result) => setConsoles(result))
      .catch(console.log);
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
        setConsoles(
          consoles.filter((r) => r.console_id !== console.console_id)
        );
        break;
      case "edit":
        setConsoles(
          consoles.map((r) => {
            if (r.console_id !== console.console_id) {
              return r;
            } else {
              return console;
            }
          })
        );
        break;
      case "getAll":
        setConsoles(
          consoles.filter((r) => r.manufacturer !== console.manufacturer)
        );
        break;
      case "get":
        setConsoles();
        break;
      case "getByManufacturer":
        setConsoles();
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
          onClick={handleManufacturer}
          id="editButton"
        >
          Read By Manufacturer
        </button>
        <table id="consoles">
          <tr>
            <th>ID</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Memory Amount</th>
            <th>Processor</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Queries</th>
          </tr>
          <tbody>
            {consoles.map((r) => (
              <ConsoleCard key={r.console_id} console={r} notify={notify} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Consoles;
