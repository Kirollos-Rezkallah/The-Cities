// Importing the CityCard component from the mainCard file
import CityCard from './mainCard';
// Importing the CityCardListProps type from the cardList file
import { CityCardListProps } from '../types/cardList';
// Importing the CardType constant from the const file
import { CardType } from '../const';
// Importing the getSortedOffers function from the utils file
import { getSortedOffers } from '../utils';
// Importing the useAppSelector hook from the hooks file
import { useAppSelector } from '../hooks';

// Defining the CitiesCardList component, which takes offers as a prop
function CitiesCardList({ offers }: CityCardListProps): JSX.Element {
  // Retrieving the selectedSortType from the application state
  const selectedSortType: string = useAppSelector(
    (state) => state.selectedSortType
  );

  // Rendering the list of city cards
  return (
    <div className="cities__places-list places__list tabs__content">
      {/* Mapping through sorted offers and rendering CityCard components */}
      {getSortedOffers(offers, selectedSortType).map((offer) => (
        <CityCard
          key={offer.id} // Unique key for each CityCard
          cardInfo={offer} // Passing offer data as cardInfo prop
          typeClassName={CardType.regular} // Setting typeClassName to regular
        />
      ))}
    </div>
  );
}

// Exporting the CitiesCardList component as default
export default CitiesCardList;
