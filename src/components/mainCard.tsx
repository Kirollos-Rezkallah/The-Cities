// Importing the Link component from react-router-dom and the Offer type from '../types/offer'
import { Link } from 'react-router-dom';
import { Offer } from '../types/offer';
import { getRating } from '../utils';

// Defining the type for props expected by the CityCard component
type CityCardProps = {
  cardInfo: Offer; // The information about the offer, of type Offer
  typeClassName: string; // The class name for the type of card, as a string
};

// Defining the CityCard component
function CityCard({ cardInfo, typeClassName }: CityCardProps): JSX.Element {
  // Destructuring properties from the cardInfo object
  const {
    id,
    title,
    type,
    price,
    isFavorite,
    isPremium,
    rating,
    previewImage,
  } = cardInfo;

  // Rendering the CityCard component
  return (
    <article className={`${typeClassName} place-card`}>
      {/* Rendering Premium tag if the property isPremium is true */}
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      {/* Rendering the image wrapper with a link */}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          {/* Rendering the preview image */}
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>

      {/* Rendering the information section of the card */}
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          {/* Rendering the price */}
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {/* Rendering the bookmark button */}
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              {/* Rendering bookmark icon if the property isFavorite is true */}
              {isFavorite && <use xlinkHref="#icon-bookmark"></use>}
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>

        {/* Rendering the rating */}
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            {/* Rendering stars based on rating */}
            <span style={{ width: getRating(rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        {/* Rendering the title of the offer with a link */}
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`} state={cardInfo}>
            {title}
          </Link>
        </h2>

        {/* Rendering the type of the offer */}
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

// Exporting the CityCard component as the default export
export default CityCard;
