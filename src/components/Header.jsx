import "./header.css";
import logo from "../assets/logo.png";
import searchMagnifier from "../assets/magnifying-glass-solid.svg";
import { Link } from "react-router-dom";

const Header = ({ handleToken, token, search, setSearch }) => {
  return (
    <header className="header-container">
      <div>
        <Link to={"/"}>
          <img src={logo} alt="logo vinted" />
        </Link>
      </div>

      <div className="searchContainer">
        <input
          className="magnifier"
          type="text"
          placeholder="Rechercher des articles"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <img src={searchMagnifier} alt="loupe" />
        <div>
          <h1>TRIER PAR PRIX</h1>
        </div>
      </div>

      <div>
        {token ? (
          <div>
            <Link to={"/publish"}>
              <button className="vendsButton">Vends tes articles</button>
            </Link>
            <Link to={"/"}>
              <button
                className="buttonLogout"
                onClick={() => {
                  handleToken(null);
                }}
              >
                Se déconnecter
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <Link to={"/signup"}>
              <button>S'inscrire</button>
            </Link>
            <Link to={"/login"}>
              <button>Se connecter</button>
            </Link>

            {token ? (
              <Link to={"/publish"}>
                <button className="vendsButton">Vends tes articles</button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <button className="vendsButton">Vends tes articles</button>
              </Link>
            )}
            <Link to={"/publish"}></Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
