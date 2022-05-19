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
      <td>${tshirt.price}</td>
      <td>{tshirt.quantity}</td>
      <td>
        <button
          id="readButton"
          className="btn btn-read"
          type="button"
          onClick={() => notify({ action: "edit-form", tshirts: tshirt })}
        >
          Read
        </button>
        <button
          id="readAllButton"
          className="btn btn-readAll"
          type="button"
          onClick={() => notify({ action: "edit-form", tshirts: tshirt })}
        >
          Read All
        </button>
        <button
          id="updateButton"
          className="btn btn-update"
          type="button"
          onClick={() => notify({ action: "edit-form", tshirts: tshirt })}
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
        <button
          id="editButton"
          className="btn btn-manufacturer"
          type="button"
          onClick={() => notify({ action: "edit-form", tshirts: tshirt })}
        >
          By Color
        </button>
        <button
          id="editButton"
          className="btn btn-manufacturer"
          type="button"
          onClick={() => notify({ action: "edit-form", tshirts: tshirt })}
        >
          By Size
        </button>
      </td>
    </tr>
  );
}

export default TshirtCard;
