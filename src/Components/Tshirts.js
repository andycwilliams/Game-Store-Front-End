import { useState, useEffect } from "react";
import "../GameStore.css";
import TshirtCard from "./TshirtCard.js";
import TshirtForm from "./TshirtForm.js";

function Tshirts() {
  const [tshirts, setTshirts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [scopedTshirts, setScopedTshirts] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/tshirts")
      .then((response) => response.json())
      .then((result) => setTshirts(result))
      .catch(console.log);
  }, []);

  function addClick() {
    setScopedTshirts({
      tShirtId: 0,
      size: "",
      color: "",
      description: "",
      price: "",
      quantity: 0,
    });
    setShowForm(true);
  }

  function handleRead(evt) {
    evt.preventDefault();

    const id = prompt("Enter an ID: ");

    fetch(`http://localhost:8080/tshirts/${id}`)
      .then((response) => response.json())
      .then((result) => setTshirts([result]))
      .catch(console.log);
  }

  function handleReadAll(evt) {
    evt.preventDefault();
    fetch("http://localhost:8080/tshirts")
      .then((response) => response.json())
      .then((result) => setTshirts(result))
      .catch(console.log);
  }

  function handleColor(evt) {
    evt.preventDefault();
    const color = prompt("Enter a color: ");
    fetch(`http://localhost:8080/tshirts/color/${color}`)
      .then((response) => response.json())
      .then((result) => setTshirts(result))
      .catch(console.log);
  }

  function handleSize(evt) {
    evt.preventDefault();
    const size = prompt("Enter a Size: ");
    fetch(`http://localhost:8080/tshirts/size/${size}`)
      .then((response) => response.json())
      .then((result) => setTshirts(result))
      .catch(console.log);
  }

  function notify({ action, tshirt, error }) {
    if (error) {
      setError(error);
      setShowForm(false);
      return;
    }
    switch (action) {
      case "add":
        setTshirts([...tshirts, tshirt]);
        break;
      case "delete":
        setTshirts(tshirts.filter((r) => r.tShirtId !== tshirt.tShirtId));
        break;
      case "edit":
        setTshirts(
          tshirts.map((r) => {
            if (r.tShirtId !== tshirt.itShirtId) {
              return r;
            } else {
              return tshirt;
            }
          })
        );
        break;
      case "getAll":
        setTshirts(tshirts.filter((r) => r.color !== tshirt.color));
        break;
      case "get":
        setTshirts();
        break;
      case "getByColor":
        setTshirts();
        break;
      case "getBySize":
        setTshirts();
        break;
      case "edit-form":
        setShowForm(true);
        setScopedTshirts(tshirt);
        return;
      default:
        console.log("Bad action for notify.");
    }
    setError("");
    setShowForm(false);
  }

  if (showForm) {
    return <TshirtForm tshirt={scopedTshirts} notify={notify} />;
  }

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      <div>
        <h1 id="consoleTitle">T-Shirts</h1>
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
          onClick={handleColor}
          id="editButton"
        >
          Read By Color
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSize}
          id="editButton"
        >
          Read By Size
        </button>

        <table id="consoles">
          <tr>
            <th>ID</th>
            <th>Size</th>
            <th>Color</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Edit</th>
          </tr>
          <tbody>
            {tshirts.map((r) => (
              <TshirtCard key={r.tShirtId} tshirt={r} notify={notify} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Tshirts;
