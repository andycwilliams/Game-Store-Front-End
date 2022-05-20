function GameCard({ games, notify }) {
  function handleUpdate() {
    notify({ action: "edit-form", game: games });
  }
  function handleDelete() {
    fetch(`http://localhost:8080/games/${games.game_id}`, {
      method: "DELETE",
    }).then(() =>
      notify({ action: "delete", game: games }).catch((error) =>
        notify({ action: "delete", error: error })
      )
    );
  }

  return (
    <tr key={games.game_id}>
      <td>{games.game_id}</td>
      <td>{games.title}</td>
      <td>{games.esrbRating}</td>
      <td>{games.description}</td>
      <td>${games.price}</td>
      <td>{games.studio}</td>
      <td>{games.quantity}</td>
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

export default GameCard;
