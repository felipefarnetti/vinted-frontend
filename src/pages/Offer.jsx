import "./offer.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import axios from "axios";

const Offer = ({ token }) => {
  // const [data, setData] = useState({});
  const [isLoading, SetIsLoading] = useState(true);
  const [offer, setOffer] = useState();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setOffer(response.data);
        SetIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading ... </p>
  ) : (
    <section className="page-offre">
      <div className="offer-container">
        {/* left side */}
        <div>
          <img
            className="productPic"
            src={offer.product_image.secure_url}
            alt=""
          />
        </div>
        {/* right side */}
        <div className="productDetailsSide">
          <div>
            <p className="priceProduct">{offer.product_price} €</p>
          </div>
          <div className="allInformation">
            {offer.product_details.map((detail, index) => {
              const keyName = Object.keys(detail)[0];
              return (
                <div key={index}>
                  <span>{keyName} : </span>
                  <span>{detail[keyName]}</span>
                </div>
              );
            })}
          </div>
          <div className="justProductInfo">
            <h2>{offer.product_name}</h2>
            <p>{offer.product_description}</p>
            <div className="userInformation">
              <img
                className="userAvatar"
                src={offer.owner.account.secure_url}
                alt="avatar"
              />
              <p>{offer.owner.account.username}</p>
            </div>
          </div>
          <div>
            {token ? (
              <Link to="/payment" state={offer}>
                <button className="buyButton">Acheter</button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <button className="buyButton">Acheter</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
