function ConsoleCard({ console, notify }) {
  function handleDelete() {
    fetch(`http://localhost:8080/console/${console.console_id}`, {
      method: "DELETE",
    }).then(() =>
      notify({ action: "delete", console: console }).catch((error) =>
        notify({ action: "delete", error: error })
      )
    );
  }

  return (
    <tr key={console.console_id}>
      <td>{console.model}</td>
      <td>{console.manufacturer}</td>
      <td>{console.memory_amount}</td>
      <td>{console.processor}</td>
      <td>${console.price}</td>
      <td>{console.quantity}</td>
      <td>
        {/* <button
          id="createButton"
          className="btn btn-create"
          type="button"
          onClick={() => notify({ action: "edit-form", consoles: console })}
        >
          Create
        </button> */}
        {/* <button
          id="readButton"
          className="btn btn-read"
          type="button"
          onClick={() => notify({ action: "edit-form", consoles: console })}
        >
          Read
        </button> */}
        {/* <button
          id="readAllButton"
          className="btn btn-readAll"
          type="button"
          onClick={() => notify({ action: "edit-form", consoles: console })}
        >
          Read All
        </button> */}
        <button
          id="updateButton"
          className="btn btn-update"
          type="button"
          onClick={() => notify({ action: "edit-form", console: console })}
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
        {/* <button
          id="editButton"
          className="btn btn-manufacturer"
          type="button"
          onClick={() => notify({ action: "edit-form", consoles: console })}
        >
          By Manufacturer
        </button> */}
      </td>
    </tr>
  );
}

export default ConsoleCard;
