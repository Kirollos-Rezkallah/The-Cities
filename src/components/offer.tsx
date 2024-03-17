// Import necessary components
// import React from 'react';

// Define the OfferScreen component
function OfferScreen(): JSX.Element {
  // Return JSX for OfferScreen component
  return (
    <div className="page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            {/* Navigation */}
            <nav className="header__nav">
              <ul className="header__nav-list">
                {/* User */}
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
                {/* Sign Out */}
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

      {/* Main Content */}
      <main className="page__main page__main--offer">
        <section className="offer">
          {/* Gallery */}
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {/* Images */}
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/room.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/apartment-01.jpg"
                  alt="Photo studio"
                />
              </div>
              {/* Additional images */}
              {/* ... */}
            </div>
          </div>
          {/* Details */}
          <div className="offer__container container">
            <div className="offer__wrapper">
              {/* Mark */}
              <div className="offer__mark">
                <span>Premium</span>
              </div>
              {/* Name */}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  Beautiful &amp; luxurious studio at great location
                </h1>
                {/* Bookmark Button */}
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              {/* Rating */}
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: '80%' }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">4.8</span>
              </div>
              {/* Features */}
              <ul className="offer__features">
                {/* Features items */}
                {/* ... */}
              </ul>
              {/* Price */}
              <div className="offer__price">
                <b className="offer__price-value">&euro;120</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              {/* Inside */}
              <div className="offer__inside">
                {/* Inside title */}
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                {/* Inside list */}
                {/* ... */}
              </div>
              {/* Host */}
              <div className="offer__host">
                {/* Host title */}
                <h2 className="offer__host-title">Meet the host</h2>
                {/* Host user */}
                {/* ... */}
              </div>
              {/* Reviews */}
              <section className="offer__reviews reviews">
                {/* Reviews title */}
                <h2 className="reviews__title">
                  Reviews &middot; <span className="reviews__amount">1</span>
                </h2>
                {/* Reviews list */}
                {/* ... */}
                {/* Review form */}
                {/* ... */}
              </section>
            </div>
          </div>
          {/* Map */}
          <section className="offer__map map"></section>
        </section>
        {/* Near Places */}
        <div className="container">
          <section className="near-places places">
            {/* Near Places title */}
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            {/* Near Places list */}
            {/* ... */}
          </section>
        </div>
      </main>
    </div>
  );
}

// Export the OfferScreen component
export default OfferScreen;
