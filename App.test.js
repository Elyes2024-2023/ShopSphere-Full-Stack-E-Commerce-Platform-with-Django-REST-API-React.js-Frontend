// Importing necessary functions from React Testing Library
import { render, screen } from '@testing-library/react';

// Importing the App component to be tested
import App from './App';

/**
 * Test case for the App component.
 *
 * This test checks if the text "learn react" is rendered by the App component.
 * It verifies that the component correctly displays the expected content.
 */
test('renders learn react link', () => {
  // Render the App component into the virtual DOM
  render(<App />);

  // Query the virtual DOM for the text "learn react"
  // The regex /learn react/i is used for case-insensitive matching
  const linkElement = screen.getByText(/learn react/i);

  // Assert that the element with the text "learn react" is present in the document
  expect(linkElement).toBeInTheDocument();
});
// Importing necessary functions from React Testing Library
import { render, screen } from '@testing-library/react';

// Importing the App component to be tested
import App from './App';

/**
 * Test case for the App component.
 *
 * This test checks if the text "learn react" is rendered by the App component.
 * It verifies that the component correctly displays the expected content.
 */
test('renders learn react link', () => {
  // Render the App component into the virtual DOM
  render(<App />);

  // Query the virtual DOM for the text "learn react"
  // The regex /learn react/i is used for case-insensitive matching
  const linkElement = screen.getByText(/learn react/i);

  // Assert that the element with the text "learn react" is present in the document
  expect(linkElement).toBeInTheDocument();
});
