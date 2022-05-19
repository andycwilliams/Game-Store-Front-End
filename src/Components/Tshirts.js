import { useState, useEffect } from "react";
import "../GameStore.css";
import TshirtCard from "./TshirtCard.js";
import TshirtForm from "./TshirtForm.js";

function Tshirts() {
  const [tshirts, setTshirts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [scopedConsole, setScopedConsole] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/tshirts")
      .then((response) => response.json())
      .then((result) => setTshirts(result))
      .catch(console.log);
  }, []);

  function addClick() {
    setScopedConsole({
      id: 0,
      size: "",
      color: "",
      description: "",
      price: "",
      quantity: 0,
    });
    setShowForm(true);
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
        setTshirts(tshirts.filter((r) => r.id !== tshirt.id));
        break;
      case "edit":
        setTshirts(
          tshirts.map((r) => {
            if (r.id !== tshirt.id) {
              return r;
            } else {
              return tshirt;
            }
          })
        );
        break;
      case "edit-form":
        setShowForm(true);
        setScopedConsole(tshirt);
        return;
      default:
        console.log("Bad action for notify.");
    }
    setError("");
    setShowForm(false);
  }

  if (showForm) {
    return <TshirtForm tshirt={scopedConsole} notify={notify} />;
  }

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      <div>
        <h1 id="consoleTitle">T-Shirts</h1>
        <button className="btn btn-primary" type="button" onClick={addClick}>
          Add a T-shirt
        </button>
        <table id="consoles">
          <tr>
            <th>Size</th>
            <th>Color</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Queries</th>
          </tr>
          <tbody>
            {tshirts.map((r) => (
              <TshirtCard key={r.id} tshirt={r} notify={notify} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Tshirts;
