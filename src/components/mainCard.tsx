// Importing the Link component from react-router-dom and the Offer type from '../types/offer'
import { Link } from 'react-router-dom';
import { Offer } from '../types/offer';

// Defining the CityCardProps type which describes the props expected by the CityCard component
type CityCardProps = {
  cardInfo: Offer; // An Offer object representing information about a place
};

// Defining the CityCard functional component which takes cardInfo as props
function CityCard({ cardInfo }: CityCardProps): JSX.Element {
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
    <article className="cities__card place-card">
      {/* Displaying 'Premium' label if the place is premium */}
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      {/* Displaying the place image */}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      {/* Displaying place information */}
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          {/* Displaying the price per night */}
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {/* Bookmark button */}
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
          >
            {/* Displaying bookmark icon if the place is in favorites */}
            <svg className="place-card__bookmark-icon" width="18" height="19">
              {isFavorite && <use xlinkHref="#icon-bookmark"></use>}
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        {/* Displaying the rating of the place */}
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            {/* Filling stars based on rating */}
            <span style={{ width: `${(rating / 5) * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        {/* Displaying the title of the place as a link */}
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`} state={cardInfo}>
            {title}
          </Link>
        </h2>
        {/* Displaying the type of the place */}
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

// Exporting the CityCard component
export default CityCard;
