// SortDropdown.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SortDropdown from './SortDropdown'; // Update the path as needed

describe('SortDropdown', () => {
  it('renders the sort dropdown and options', () => {
    const setSortOrder = jest.fn();
    const setSortAsc = jest.fn();

    render(
      <SortDropdown
        sortOrder="asc"
        setSortOrder={setSortOrder}
        setSortAsc={setSortAsc}
      />
    );

    // InputLabel should be visible
    expect(screen.getByLabelText(/sort/i)).toBeInTheDocument();

    // Open the dropdown
    fireEvent.mouseDown(screen.getByLabelText(/sort/i));

    // Check if both options exist
    expect(screen.getByText(/Sort A - Z/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort Z - A/i)).toBeInTheDocument();
  });

  it('calls setSortOrder and setSortAsc with correct values when option is selected', () => {
    const setSortOrder = jest.fn();
    const setSortAsc = jest.fn();

    render(
      <SortDropdown
        sortOrder="asc"
        setSortOrder={setSortOrder}
        setSortAsc={setSortAsc}
      />
    );

    // Open dropdown
    fireEvent.mouseDown(screen.getByLabelText(/sort/i));

    // Click "Sort Z - A" option
    fireEvent.click(screen.getByText(/Sort Z - A/i));

    // Should set order to 'desc'
    expect(setSortOrder).toHaveBeenCalledWith('desc');
    expect(setSortAsc).toHaveBeenCalledWith(false);
  });
});
