import { useState, useEffect } from "react";
import axios from "axios";
import hero from "../assets/hero.jpg";
import tear from "../assets/tear.svg";

//Components
import OfferCard from "../components/OfferCard";

const Home = ({ search }) => {
  const [data, setData] = useState({});
  const [isLoading, SetIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}`
        );
        setData(response.data);
        SetIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <section className="hero">
        <div>
          <img src={hero} alt="hero" />
          <img src={tear} alt="tear" />
        </div>
      </section>
      <main className="mainArea">
        {/* <p>Nombre d'offres : {data.count}</p> */}
        {data.offers.map((offer) => {
          return <OfferCard key={offer._id} offerData={offer} />;
        })}
      </main>
      <p>Nombre d'offres : {data.count}</p>
    </div>
  );
};

export default Home;
