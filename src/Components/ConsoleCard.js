function ConsoleCard({ console, notify }) {
  function handleUpdate() {
    window.console.log(console);
    notify({ action: "edit-form", console: console });
  }
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
      <td>{console.console_id}</td>
      <td>{console.model}</td>
      <td>{console.manufacturer}</td>
      <td>{console.memory_amount}</td>
      <td>{console.processor}</td>
      <td>${console.price}</td>
      <td>{console.quantity}</td>
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

export default ConsoleCard;
