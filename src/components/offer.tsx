import { Link } from 'react-router-dom';
import CommentForm from './commentSubmission';

function OfferScreen(): JSX.Element {
  return (
    <div className="page">
      <header className="header">
        {/* Header section */}
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              {/* Logo linking to home */}
              <Link to="/" className="header__logo-link">
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
                {/* User section */}
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    {/* Link to favorites */}
                    <Link to="/favourites">
                      <span className="header__favorite-count">3</span>
                    </Link>
                  </a>
                </li>
                {/* Sign out */}
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

      <main className="page__main page__main--offer">
        <section className="offer">
          {/* Gallery of images */}
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {/* Images */}
              {/* Note: Each image is wrapped in an offer__image-wrapper */}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {/* Mark indicating premium */}
              <div className="offer__mark">
                <span>Premium</span>
              </div>
              {/* Offer name and bookmark button */}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  Beautiful &amp; luxurious studio at great location
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  {/* Bookmark icon */}
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              {/* Rating */}
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  {/* Stars representing rating */}
                  <span style={{ width: '80%' }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                {/* Numeric rating */}
                <span className="offer__rating-value rating__value">4.8</span>
              </div>
              {/* Features */}
              <ul className="offer__features">{/* List of features */}</ul>
              {/* Price */}
              <div className="offer__price">
                <b className="offer__price-value">&euro;120</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              {/* Inside amenities */}
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {/* List of inside amenities */}
                </ul>
              </div>
              {/* Host information */}
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  {/* Host avatar */}
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src="img/avatar-angelina.jpg"
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  {/* Host name and status */}
                  <span className="offer__user-name">Angelina</span>
                  <span className="offer__user-status">Pro</span>
                </div>
                {/* Host description */}
                <div className="offer__description">
                  {/* Description text */}
                </div>
              </div>
              {/* Reviews section */}
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot; <span className="reviews__amount">1</span>
                </h2>
                <ul className="reviews__list">{/* List of reviews */}</ul>
                {/* Comment form */}
                <CommentForm />
              </section>
            </div>
          </div>
          {/* Map section */}
          <section className="offer__map map"></section>
        </section>
        {/* Nearby places section */}
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {/* List of nearby places */}
              <article className="near-places__card place-card">
                {/* Place card */}
              </article>
              {/* Additional place cards */}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
