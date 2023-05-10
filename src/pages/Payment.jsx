import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

// Components
import CheckoutForm from "../components/CheckoutForm";

// Je me connecte à mon compte stripe en front en fournissant ma clef publique
const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({ token, handleTokenAndId }) => {
  const { product_price, product_name } = useLocation().state;
  // console.log(location);
  return (
    <>
      {/* Vérification si token existent charger le composant ChechoutForm
    sinon renvoyer vers login */}
      {token ? (
        <div>
          {/* Elements va devoir englober toute la logique de paiement. Je lui donne une prop stripe qui contient ma stripePromise, pour montrer à Elements que j'ai bien un compte sur Stripe */}
          <Elements stripe={stripePromise}>
            <CheckoutForm
              product_name={product_name}
              product_price={product_price}
              handleTokenAndId={handleTokenAndId}
            />
          </Elements>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Payment;
