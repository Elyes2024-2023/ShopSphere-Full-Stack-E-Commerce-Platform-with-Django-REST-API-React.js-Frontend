import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

describe('App Component', () => {
  const renderWithRouter = (ui) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>
    );
  };

  test('renders header with shop name', () => {
    renderWithRouter(<App />);
    const headerElement = screen.getByText(/ProShop/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders home screen by default', () => {
    renderWithRouter(<App />);
    const homeElement = screen.getByText(/Latest Products/i);
    expect(homeElement).toBeInTheDocument();
  });

  test('renders footer', () => {
    renderWithRouter(<App />);
    const footerElement = screen.getByText(/Copyright/i);
    expect(footerElement).toBeInTheDocument();
  });
});
