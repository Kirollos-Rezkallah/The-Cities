// Importing the City type from the offer module.
import { City } from '../types/offer';

// Defining the props type for the CityListItem component.
type CityProps = {
  city: City; // The city object representing the city data.
  changeSelectedCity: (city: City) => void; // Function to change the selected city.
};

// Functional component to render a single city item in the list.
function CityListItem({ city, changeSelectedCity }: CityProps): JSX.Element {
  return (
    // Rendering a list item with a clickable link representing the city.
    <li className="locations__item" onClick={() => changeSelectedCity(city)}>
      {/* Anchor tag representing the city item */}
      <a className="locations__item-link tabs__item" href="#">
        {/* Displaying the name of the city */}
        <span>{city.name}</span>
      </a>
    </li>
  );
}

// Exporting the CityListItem component as the default export.
export default CityListItem;
