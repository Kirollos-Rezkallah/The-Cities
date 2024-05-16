import OfferCard from './cardOffer';
import { OffersCardListProps } from '../types/cardList';
import { CardType } from '../const';

function OffersCardList({ offers }: OffersCardListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          cardInfo={offer}
          typeClassName={CardType.regular}
        />
      ))}
    </div>
  );
}

export default OffersCardList;
