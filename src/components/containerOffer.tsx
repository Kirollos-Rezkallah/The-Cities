import { Offer } from '../types/offer';
import EmptyOffers from './emptyOffers';
import AvailableOffers from './availableOffers';

interface OffersContainerProps {
  offers: Offer[];
  handleCardMouseEnter: (id: Offer['id']) => void;
  handleCardMouseLeave: () => void;
}

function OffersContainer({
  offers,
  handleCardMouseEnter,
  handleCardMouseLeave,
}: OffersContainerProps): JSX.Element {
  const noPlacesAvailable = offers.length === 0;

  return noPlacesAvailable ? (
    <EmptyOffers />
  ) : (
    <AvailableOffers
      offers={offers}
      handleCardMouseEnter={handleCardMouseEnter}
      handleCardMouseLeave={handleCardMouseLeave}
    />
  );
}

export default OffersContainer;
