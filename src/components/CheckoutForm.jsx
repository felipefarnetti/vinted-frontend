import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import axios from "axios";
// import Cookies from "js-cookie";

import "./checkoutForm.css";

const CheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  // const user_id = Cookies.get("user_id");
  const protectionFee = 0.5;
  const deliveryFee = 4.5;
  // const priceTotal = PRIX PRODUIT + protectionFee + deliveryFee;
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const cardElement = elements.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElement, {
        name: "user_id",
      });
      console.log(stripeResponse);

      const stripeToken = stripeResponse.token.id;

      const responseFromBackend = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        { token: stripeToken, title: "titre", amount: 10 }
      );
      console.log(responseFromBackend);

      if (responseFromBackend.data.status === "succeeded") {
        console.log(responseFromBackend.data);
        setIsLoading(false);
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-card summary">
          <div className="title">Résumé de la commande</div>
          <div className="content">
            <ul>
              <li>
                Commande<span>Prix du produit</span>
              </li>
              <li>
                Frais protection acheteurs<span>{protectionFee}</span>
              </li>
              <li>
                Frais de port<span>{deliveryFee}</span>
              </li>
            </ul>
          </div>

          <div className="divider"></div>

          <div className="content">
            <ul>
              <li className="bold">
                Total<span>PRix total €</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="payment-card">
          <div className="content">
            Il ne vous reste plus qu'une étape pour vous offrir
            <span className="bold">NOM PRODUIT</span>. Vous allez payer{" "}
            <span className="bold">Prix TOTAL €</span>
            (frais de protection et frais de port inclus).
            <div className="divider"></div>
            <form onSubmit={handleSubmit}>
              <div className="stripeBlock">
                <div className="stripe-intern">
                  {completed ? (
                    <div>
                      <p>Merci pour votre achat.</p>
                      <Link to={"/"}>
                        <button>Retourner à la page principale</button>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <CardElement disabled={completed} />
                      <button type="submit" disabled={completed}>
                        Pay
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
