// Importing the Offer type from '../types/offer' and the CityCard component from './mainCard'
import { Offer } from '../types/offer';
import CityCard from './mainCard';
import { CardType } from '../const';

// Defining a TypeScript type FavouritesCityBlockProps which describes the props expected by the FavouritesCityBlock component
type FavouritesCityBlockProps = {
  city: string; // The name of the city
  places: Offer[]; // An array of Offer objects representing places in the city
};

// Defining the FavouritesCityBlock functional component which takes city and places as props
function FavouritesCityBlock({ city, places }: FavouritesCityBlockProps) {
  return (
    // The component renders a list item with the class 'favorites__locations-items'
    <li className="favorites__locations-items">
      {/* Div for displaying the current location */}
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          {/* Anchor tag for the city name */}
          <a className="locations__item-link" href="#">
            {/* Displaying the city name */}
            <span>{city}</span>
          </a>
        </div>
      </div>
      {/* Div for displaying favorite places */}
      <div className="favorites__places">
        {/* Mapping over each place in the 'places' array and rendering a CityCard component for each */}
        {places.map((place) => (
          <CityCard
            key={place.id}
            cardInfo={place}
            typeClassName={CardType.favourites}
          /> // Each CityCard is given a unique key and passed the place info as props
        ))}
      </div>
    </li>
  );
}

// Exporting the FavouritesCityBlock component as the default export
export default FavouritesCityBlock;
