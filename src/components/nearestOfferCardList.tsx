import CityCard from './cardOffer';
import { OffersCardListProps } from '../types/cardList';
import { CardType } from '../const';

function NearestOffersCardList({ offers }: OffersCardListProps) {
  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <CityCard
          key={offer.id}
          cardInfo={offer}
          typeClassName={CardType.nearest}
        />
      ))}
    </div>
  );
}

export default NearestOffersCardList;
