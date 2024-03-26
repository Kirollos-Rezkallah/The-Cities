// Importing the CityCard component from its file location
import CityCard from './mainCard';

// Importing CityCardListProps type from its file location
import { CityCardListProps } from '../types/cardList';

// Importing CardType constant from its file location
import { CardType } from '../const';

// Defining a functional component called CitiesCardList which takes cities as props
function CitiesCardList({ cities }: CityCardListProps): JSX.Element {
  return (
    // Rendering a div with classnames 'cities__places-list places__list tabs__content'
    <div className="cities__places-list places__list tabs__content">
      {/* Mapping through each city in the cities array */}
      {cities.map((city) => (
        // Rendering CityCard component for each city, passing key, cardInfo, and typeClassName as props
        <CityCard
          key={city.id} // Unique key for React to keep track of each CityCard component
          cardInfo={city} // Passing city information to CityCard component
          typeClassName={CardType.regular} // Setting type of card (regular) using constant from const.ts
        />
      ))}
    </div>
  );
}

// Exporting CitiesCardList component as the default export
export default CitiesCardList;
