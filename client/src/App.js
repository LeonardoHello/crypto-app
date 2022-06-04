import { Home } from './components/Home';
import logo from "./images/pip-boy.png"

function App() {
  return (
    <>
      <header>
        <figure>
          <img src={logo} alt="pip-boy" />
          <figcaption>CRYPTO-STATION</figcaption>
        </figure>
      </header>
      <Home />
    </>
  );
}

export default App;
