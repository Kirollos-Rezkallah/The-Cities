// Importing the CityCard component from the mainCard file
import CityCard from './mainCard';
// Importing the CityCardListProps type from the cardList file
import { CityCardListProps } from '../types/cardList';
// Importing the CardType constant from the const file
import { CardType } from '../const';

// Defining the NearestCitiesCardList component, which takes offers as a prop
function NearestCitiesCardList({ offers }: CityCardListProps) {
  // Rendering the list of nearest city cards
  return (
    <div className="near-places__list places__list">
      {/* Mapping through offers and rendering CityCard components */}
      {offers.map((offer) => (
        <CityCard
          key={offer.id} // Unique key for each CityCard
          cardInfo={offer} // Passing offer data as cardInfo prop
          typeClassName={CardType.nearest} // Setting typeClassName to nearest
        />
      ))}
    </div>
  );
}

// Exporting the NearestCitiesCardList component as default
export default NearestCitiesCardList;
