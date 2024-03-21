import { Offer } from '../types/offer';
import FavouritesCityBlock from './favCityBlock';
import { Link } from 'react-router-dom';

// Define the type for props of the FavoutitesScreen component
type FavoutitesScreenProps = {
  favourites: Offer[]; // Array of Offer objects representing favourite places
};

// Define the FavoutitesScreen component
function FavoutitesScreen({ favourites }: FavoutitesScreenProps): JSX.Element {
  // Map favourite places by city
  const favouritesMap = favourites.reduce(
    (acc: Record<string, Offer[]>, place: Offer) => {
      const city = place.city.name;
      acc[city] = [...(acc[city] ?? []), place];
      return acc;
    },
    {}
  );

  return (
    <div className="page">
      {/* Header section */}
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to="/" className="header__logo-link">
                {/* Logo */}
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            {/* Navigation */}
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main section */}
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            {/* Title */}
            <h1 className="favorites__title">Saved listing</h1>
            {/* List of favourite places grouped by city */}
            <ul className="favorites__list">
              {/* Render each city block */}
              {Object.keys(favouritesMap).map((city) => (
                <FavouritesCityBlock
                  city={city}
                  places={favouritesMap[city]}
                  key={favouritesMap[city][0].id} // Set a unique key for each city block
                />
              ))}
            </ul>
          </section>
        </div>
      </main>

      {/* Footer section */}
      <footer className="footer container">
        {/* Logo */}
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}

export default FavoutitesScreen;
