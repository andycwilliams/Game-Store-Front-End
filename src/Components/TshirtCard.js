function TshirtCard({ tshirt, notify }) {
  function handleDelete() {
    fetch(`http://localhost:8080/tshirts/${tshirt.id}`, {
      method: "DELETE",
    }).then(() =>
      notify({ action: "delete", tshirt: tshirt }).catch((error) =>
        notify({ action: "delete", error: error })
      )
    );
  }

  return (
    <tr key={tshirt.id}>
      <td>{tshirt.size}</td>
      <td>{tshirt.color}</td>
      <td>{tshirt.description}</td>
      <td>{tshirt.price}</td>
      <td>{tshirt.quantity}</td>
      <td>
        <button
          id="deleteButton"
          className="btn btn-danger mr-3"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          id="editButton"
          className="btn btn-secondary"
          type="button"
          onClick={() => notify({ action: "edit-form", tshirt: tshirt })}
        >
          Edit
        </button>
      </td>
    </tr>
  );
}

export default TshirtCard;
