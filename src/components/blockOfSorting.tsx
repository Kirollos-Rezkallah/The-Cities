// Importing useState hook from React
import { useState } from 'react';
// Importing custom app dispatch and selector hooks
import { useAppDispatch, useAppSelector } from '../hooks';
// Importing action creator for setting sort type
import { setSortType } from '../TheStore/action';

// Object defining different sort types with corresponding labels
const SORT_TYPES = {
  0: 'Popular', // Sort type 0: Popular
  1: 'Price: low to high', // Sort type 1: Price low to high
  2: 'Price: high to low', // Sort type 2: Price high to low
  3: 'Top rated first', // Sort type 3: Top rated first
};

// Defining the SortingBlock component
function SortingBlock() {
  // State to manage the visibility of the sorting block
  const [isOpen, setIsOpen] = useState(false);
  // Retrieving the selectedSortType from the application state
  const selectedSortType = useAppSelector((state) => state.selectedSortType);

  // Accessing dispatch function from custom hook
  const dispatch = useAppDispatch();
  // Function to handle changes in sort type
  const handleSortTypeChange = (sortType: string) => {
    // Dispatching action to set sort type
    dispatch(setSortType(sortType));
  };

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {selectedSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isOpen ? 'places__options--opened' : ''
        }`}
      >
        {Object.entries(SORT_TYPES).map(([key, sortType]) => (
          <li
            key={key}
            className={`places__option ${
              selectedSortType === sortType ? 'places__option--active' : ''
            }`}
            onClick={() => handleSortTypeChange(sortType)}
            tabIndex={0}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingBlock;
