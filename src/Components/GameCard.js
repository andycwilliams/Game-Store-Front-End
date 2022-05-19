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
      <td>{games.price}</td>
      <td>{games.studio}</td>
      <td>{games.quantity}</td>
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
          onClick={() => notify({ action: "edit-form", games: games })}
        >
          Edit
        </button>
      </td>
    </tr>
  );
}

export default GameCard;
