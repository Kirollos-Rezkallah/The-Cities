import cn from 'classnames';
import CitiesList from './listOfCities';
import PlacesToVisit from './placesToVisit';
import { getOffers, getSelectedCity } from '../TheStore';
import { useAppSelector } from '../hooks';

function MainScreen(): JSX.Element {
  const selectedCity = useAppSelector(getSelectedCity);
  const offers = useAppSelector(getOffers);
  const offersByCity = offers.filter(
    (offer) => offer.city.name === selectedCity
  );

  return (
    <main
      className={cn('page__main page__main--index', {
        'page__main--index-empty': offersByCity.length === 0,
      })}
    >
      <h1 className="visually-hidden">Cities</h1>
      <CitiesList selectedCity={selectedCity} />
      <PlacesToVisit offers={offersByCity} />
    </main>
  );
}

export default MainScreen;
