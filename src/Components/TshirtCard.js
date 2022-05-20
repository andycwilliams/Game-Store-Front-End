function TshirtCard({ tshirt, notify }) {

  function handleUpdate() {
    window.console.log(tshirt);
    notify({ action: "edit-form", tshirt: tshirt });
  }

  function handleDelete() {
    fetch(`http://localhost:8080/tshirts/${tshirt.tShirtId}`, {
      method: "DELETE",
    }).then(() => 
      notify({ action: "delete", tshirt: tshirt }))
      .catch((error) => 
      notify({ action: "delete", error: error }));
  }

  return (
    <tr key={tshirt.tShirtId}>
      <td>{tshirt.tShirtId}</td>
      <td>{tshirt.size}</td>
      <td>{tshirt.color}</td>
      <td>{tshirt.description}</td>
      <td>${tshirt.price}</td>
      <td>{tshirt.quantity}</td>
      <td>
        <button
          id="updateButton"
          className="btn btn-update"
          type="button"
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          id="deleteButton"
          className="btn btn-danger mr-3"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TshirtCard;
