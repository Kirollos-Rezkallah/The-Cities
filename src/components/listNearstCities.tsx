import CityCard from './mainCard';
import { CityCardListProps } from '../types/cardList';
import { CardType } from '../const';

function NearestCitiesCardList({ cities }: CityCardListProps) {
  return (
    <div className="near-places__list places__list">
      {cities.map((city) => (
        <CityCard
          key={city.id}
          cardInfo={city}
          typeClassName={CardType.nearest}
        />
      ))}
    </div>
  );
}

export default NearestCitiesCardList;
