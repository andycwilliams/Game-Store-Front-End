import { useState } from "react";

function TshirtForm({ tshirt: initialTshirt, notify }) {
  const [tshirt, setTshirt] = useState(initialTshirt);
  const isAdd = initialTshirt.tShirtId === 0;

  function handleChange(evt) {
    const clone = { ...tshirt };
    clone[evt.target.name] = evt.target.value;
    setTshirt(clone);
  }

  function handleSubmit(evt) {
    // evt.preventDefault();

    const url = isAdd
      ? "http://localhost:8080/tshirts"
      : `http://localhost:8080/tshirts/${tshirt.tShirtId}`;
    const method = isAdd ? "POST" : "PUT";
    const expectedStatus = isAdd ? 201 : 204;

    const init = {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(tshirt),
    };

    fetch(url, init)
      .then((response) => {
        if (response.status === expectedStatus) {
          if (isAdd) {
            // Before add, no useful ID
            return response.json();
          } else {
            return tshirt;
          }
        }
        return Promise.reject(
          `Didn't receive expected status: ${expectedStatus}`
        );
      })
      .then((result) =>
        notify({
          action: isAdd ? "add" : "edit",
          tshirt: result,
        })
      )
      .catch((error) => notify({ error: error }));
  }

  return (
    <>
      <div class="form">
        <h1>{tshirt.tShirtId > 0 ? "Edit" : "Add"} T-Shirt</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="artist">Size: </label>
            <input
              type="text"
              id="size"
              name="size"
              className="form-control"
              value={tshirt.size}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="album">Color: </label>
            <input
              type="text"
              id="color"
              name="color"
              className="form-control"
              value={tshirt.color}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="year">Description: </label>
            <input
              type="text"
              id="description"
              name="description"
              className="form-control"
              value={tshirt.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Price">Price: </label>
            <input
              type="text"
              id="price"
              name="price"
              className="form-control"
              value={tshirt.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Quantity">Quantity: </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="form-control"
              value={tshirt.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <button className="btn btn-primary mr-3" type="submit">
              Save
            </button>
            <button
              className="btn btn-primary mr-3"
              type="button"
              onClick={() => notify({ action: "cancel" })}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default TshirtForm;
