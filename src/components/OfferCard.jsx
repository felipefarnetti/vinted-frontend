import { Link } from "react-router-dom";

const OfferCard = ({ offerData }) => {
  const { owner, product_details, product_price, product_image } = offerData;
  return (
    <Link className="removeDecoration" to={`/offer/${offerData._id}`}>
      <article>
        <div className="productInfo">
          {owner.account.avatar && (
            <img src={owner.account.avatar.secure_url} alt="avatar" />
          )}
          <span>{owner.account.username}</span>
        </div>
        <img
          className="productPhoto"
          src={product_image.secure_url}
          alt="productphoto"
        />
        <p>{product_price} €</p>

        {product_details.reverse().map((detail, index) => {
          if (detail.TAILLE) {
            return <p key={index}>{detail.TAILLE}</p>;
          } else if (detail.MARQUE) {
            return <p key={index}>{detail.MARQUE}</p>;
          } else {
            return null;
          }
        })}
      </article>
    </Link>
  );
};

export default OfferCard;
