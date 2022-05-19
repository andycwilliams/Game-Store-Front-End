function GameCard({ games, notify }) {
  function handleDelete() {
    fetch(`http://localhost:8080/games/${games.id}`, {
      method: "DELETE",
    }).then(() =>
      notify({ action: "delete", games: games }).catch((error) =>
        notify({ action: "delete", error: error })
      )
    );
  }

  return (
    <tr key={games.id}>
      <td>{games.title}</td>
      <td>{games.esrbRating}</td>
      <td>{games.description}</td>
      <td>${games.price}</td>
      <td>{games.studio}</td>
      <td>{games.quantity}</td>
      <td>
        <button
          id="readButton"
          className="btn btn-read"
          type="button"
          onClick={() => notify({ action: "edit-form", consoles: console })}
        >
          Read
        </button>
        <button
          id="readAllButton"
          className="btn btn-readAll"
          type="button"
          onClick={() => notify({ action: "edit-form", consoles: console })}
        >
          Read All
        </button>
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
        <button
          id="editButton"
          className="btn btn-studio"
          type="button"
          onClick={() => notify({ action: "edit-form", consoles: console })}
        >
          By Studio
        </button>
        <button
          id="editButton"
          className="btn btn-esrb"
          type="button"
          onClick={() => notify({ action: "edit-form", consoles: console })}
        >
          By ESRB
        </button>
        <button
          id="editButton"
          className="btn btn-title"
          type="button"
          onClick={() => notify({ action: "edit-form", consoles: console })}
        >
          By Title
        </button>
      </td>
    </tr>
  );
}

export default GameCard;
