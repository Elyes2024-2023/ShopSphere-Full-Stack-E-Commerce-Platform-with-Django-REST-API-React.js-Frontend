import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Product from '../../components/Product';

const mockStore = configureStore([]);

describe('Product Component', () => {
  const mockProduct = {
    _id: '1',
    name: 'Test Product',
    image: '/images/test.jpg',
    price: 100,
    rating: 4.5,
    numReviews: 10,
  };

  let store;

  beforeEach(() => {
    store = mockStore({
      cart: { cartItems: [] },
    });
  });

  it('renders product details correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Product product={mockProduct} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('10 reviews')).toBeInTheDocument();
  });

  it('navigates to product details when clicked', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Product product={mockProduct} />
        </BrowserRouter>
      </Provider>
    );

    const productLink = screen.getByRole('link');
    expect(productLink).toHaveAttribute('href', '/product/1');
  });

  it('dispatches add to cart action when add to cart button is clicked', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Product product={mockProduct} />
        </BrowserRouter>
      </Provider>
    );

    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);

    const actions = store.getActions();
    expect(actions[0].type).toBe('CART_ADD_ITEM');
    expect(actions[0].payload).toEqual({
      product: mockProduct._id,
      name: mockProduct.name,
      image: mockProduct.image,
      price: mockProduct.price,
      countInStock: 0,
      qty: 1,
    });
  });
}); 