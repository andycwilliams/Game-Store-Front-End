import { useState } from "react";

function GameForm({ games: initialGame, notify }) {
  const [games, setConsole] = useState(initialGame);
  const isAdd = initialGame.id === 0;

  function handleChange(evt) {
    const clone = { ...games };
    clone[evt.target.name] = evt.target.value;
    setConsole(clone);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const url = isAdd
      ? "http://localhost:8080/games"
      : `http://localhost:8080/games/${games.id}`;
    const method = isAdd ? "POST" : "PUT";
    const expectedStatus = isAdd ? 201 : 204;

    const init = {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(console),
    };

    fetch(url, init)
      .then((response) => {
        if (response.status === expectedStatus) {
          if (isAdd) {
            // Before add, no useful ID
            return response.json();
          } else {
            return console;
          }
        }
        return Promise.reject(
          `Didn't receive expected status: ${expectedStatus}`
        );
      })
      .then((result) =>
        notify({
          action: isAdd ? "add" : "edit",
          console: result,
        })
      )
      .catch((error) => notify({ error: error }));
  }

  return (
    <>
      <h1>{games.id > 0 ? "Edit" : "Add"} Game</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="artist">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={games.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="album">ESRB Rating</label>
          <input
            type="text"
            id="esrbRating"
            name="esrbRating"
            className="form-control"
            value={games.esrbRating}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="year">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            className="form-control"
            value={games.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="year">Studio</label>
          <input
            type="text"
            id="studio"
            name="studio"
            className="form-control"
            value={games.studio}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="year">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            className="form-control"
            value={games.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="year">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className="form-control"
            value={games.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-primary mr-3" type="submit">
            Save
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => notify({ action: "cancel" })}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default GameForm;
