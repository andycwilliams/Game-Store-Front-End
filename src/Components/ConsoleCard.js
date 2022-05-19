function ConsoleCard({ console, notify }) {
  function handleDelete() {
    fetch(`http://localhost:8080/console/${console.id}`, {
      method: "DELETE",
    }).then(() =>
      notify({ action: "delete", console: console }).catch((error) =>
        notify({ action: "delete", error: error })
      )
    );
  }

  return (
    <tr key={console.id}>
      <td>{console.model}</td>
      <td>{console.manufacturer}</td>
      <td>{console.memory_amount}</td>
      <td>{console.processor}</td>
      <td>${console.price}</td>
      <td>{console.quantity}</td>
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
          onClick={() => notify({ action: "edit-form", console: console })}
        >
          Edit
        </button>
      </td>
    </tr>
  );
}

export default ConsoleCard;
