import { useParams } from 'react-router-dom';
import LoadingScreen from '../loadingScreen';
import NearbyOffers from '../nearbyOffers';
import {
  getIsNearbyOffersLoading,
  getIsOfferLoading,
  getIsReviewsLoading,
  getNearbyOffers,
  getOffer,
} from '../../TheStore';

import { useAppSelector } from '../../hooks';
import ErrorScreen from '../error';
import { useOfferData, usePageInfo } from './hooks';
import OfferInfo from '../infoOffer';
import { getShuffledNearby } from './utils';

const MAX_OFFERS_PREVIEW = 3;

function OfferPage(): JSX.Element | null {
  const offer = useAppSelector(getOffer);
  const nearbyList = useAppSelector(getNearbyOffers);
  const isOfferLoading = useAppSelector(getIsOfferLoading);
  const isReviewsLoading = useAppSelector(getIsReviewsLoading);
  const isNearbyOffersLoading = useAppSelector(getIsNearbyOffersLoading);

  const isAllLoading =
    isOfferLoading || isNearbyOffersLoading || isReviewsLoading;
  const limitedNearby = getShuffledNearby(nearbyList).slice(
    0,
    MAX_OFFERS_PREVIEW
  );
  const id = String(useParams().id);

  useOfferData(id);
  usePageInfo(offer);

  if (isAllLoading) {
    return <LoadingScreen />;
  }

  if (!offer) {
    return <ErrorScreen />;
  }

  return (
    <main className="page__main page__main--offer">
      <OfferInfo offer={offer} id={id} limitedNearby={limitedNearby} />
      <div className="container">
        <NearbyOffers nearPlaces={limitedNearby} />
      </div>
    </main>
  );
}

export default OfferPage;
