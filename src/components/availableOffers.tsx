import SortingBlock from './blockOfSorting.tsx';
import OffersList from './listOffer.tsx';
import { Offer } from '../types/offer.ts';
import { getSelectedCity } from '../TheStore';
import { useAppSelector } from '../hooks/index.ts';
import { memo } from 'react';

type AvailableOffersProps = {
  offers: Offer[];
  handleCardMouseEnter: (id: Offer['id']) => void;
  handleCardMouseLeave: () => void;
};

function AvailableOffers({
  offers,
  handleCardMouseEnter,
  handleCardMouseLeave,
}: AvailableOffersProps) {
  const quantityOffers = offers.length;
  const cityName = useAppSelector(getSelectedCity);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {quantityOffers} places to stay in {cityName}
      </b>
      <SortingBlock />
      <div className="cities__places-list places__list tabs__content">
        <OffersList
          cardType="cities"
          offers={offers}
          handleCardMouseEnter={handleCardMouseEnter}
          handleCardMouseLeave={handleCardMouseLeave}
        />
      </div>
    </section>
  );
}

const AvailableOffersMemo = memo(AvailableOffers);

export default AvailableOffersMemo;
