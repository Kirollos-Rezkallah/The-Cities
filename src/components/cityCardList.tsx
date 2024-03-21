// Importing the CityCard component from './mainCard' and the Offer type from '../types/offer'
import CityCard from './mainCard';
import { Offer } from '../types/offer';
// Importing the useState hook from React (commented out, might be used later)

// Defining the CityCardListProps type which describes the props expected by the CityCardList component
type CityCardListProps = {
  cities: Offer[]; // An array of Offer objects representing different cities
};

// Defining the CityCardList functional component which takes cities as props
function CityCardList({ cities }: CityCardListProps) {
  // Initializing state for managing active card (commented out, might be used later)
  // const [activeCard, setActiveCard] = useState({id: 1});

  // Rendering the CityCardList component
  return (
    <div className="cities__places-list places__list tabs__content">
      {/* Mapping over each city and rendering a CityCard component for each */}
      {cities.map((city) => (
        <CityCard key={city.id} cardInfo={city} /> // Each CityCard is given a unique key and passed the city info as props
      ))}
    </div>
  );
}

// Exporting the CityCardList component
export default CityCardList;
