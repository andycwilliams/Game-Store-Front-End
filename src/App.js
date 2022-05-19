import Header from "./Components/Header.js";
import Consoles from "./Components/Consoles.js";
import Games from "./Components/Games.js";
import Tshirts from "./Components/Tshirts.js";
import "./GameStore.css";

function App() {
  return (
    <main className="container">
      <Header />
      <Consoles />
      <Games />
      <Tshirts />
    </main>
  );
}

export default App;
