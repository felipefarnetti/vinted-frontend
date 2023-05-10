import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

//import fichier CSS de la page Signup
import "./signup.css";

const Signup = ({ handleTokenAndId }) => {
  //Garder les états utilisés dans le form
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //pour la redirection vers home si creation du compte OK
  const navigate = useNavigate();

  return (
    <div className="signup">
      <h2>S'inscrire</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setErrorMessage("");
          try {
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/user/signup",
              {
                email: email,
                username: username,
                password: password,
                newsletter: newsletter,
              }
            );
            if (response.data.token) {
              handleTokenAndId(response.data.token, response.data._id);
              navigate("/");
            }
          } catch (error) {
            if (error.response.status === 409) {
              setErrorMessage(
                "Cet email est dejà utilisé, veuillez en choisir un autre"
              );
            } else if (error.response.data.message === "Missing parameters") {
              setErrorMessage("Veuillez remplir tous les champs");
            }
          }
        }}
      >
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          value={username}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          // value={password}
        />
        <div className="checkbox-container">
          <div className="checkbox">
            <input
              type="checkbox"
              id="newsletter"
              onChange={(event) => {
                setNewsletter(!newsletter);
              }}
              checked={newsletter}
            />
            <h3>S'inscrire à notre newsletter</h3>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      {errorMessage && (
        <p style={{ color: "red", fontSize: 14, marginTop: 15 }}>
          {errorMessage}
        </p>
      )}
      <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
    </div>
  );
};

export default Signup;
