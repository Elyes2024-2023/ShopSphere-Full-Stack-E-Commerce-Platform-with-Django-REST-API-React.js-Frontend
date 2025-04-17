import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

export const renderWithProviders = (
  component,
  {
    initialState = {},
    store = mockStore(initialState),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );

  return {
    store,
    ...render(component, { wrapper: Wrapper, ...renderOptions }),
  };
};

export const mockUser = {
  _id: '1',
  name: 'Test User',
  email: 'test@example.com',
  isAdmin: false,
  token: 'test-token',
};

export const mockProduct = {
  _id: '1',
  name: 'Test Product',
  price: 99.99,
  image: '/images/test.jpg',
  description: 'Test Description',
  countInStock: 10,
  rating: 4.5,
  numReviews: 10,
};

export const mockOrder = {
  _id: '1',
  user: mockUser,
  orderItems: [
    {
      name: mockProduct.name,
      qty: 1,
      image: mockProduct.image,
      price: mockProduct.price,
      product: mockProduct._id,
    },
  ],
  shippingAddress: {
    address: '123 Test St',
    city: 'Test City',
    postalCode: '12345',
    country: 'Test Country',
  },
  paymentMethod: 'PayPal',
  itemsPrice: 99.99,
  taxPrice: 9.99,
  shippingPrice: 10,
  totalPrice: 119.98,
  isPaid: false,
  isDelivered: false,
};

export const mockCart = {
  cartItems: [
    {
      product: mockProduct._id,
      name: mockProduct.name,
      image: mockProduct.image,
      price: mockProduct.price,
      countInStock: mockProduct.countInStock,
      qty: 1,
    },
  ],
  shippingAddress: mockOrder.shippingAddress,
  paymentMethod: 'PayPal',
};

export const mockStoreState = {
  userLogin: {
    userInfo: mockUser,
  },
  productList: {
    products: [mockProduct],
    loading: false,
    error: null,
    page: 1,
    pages: 1,
  },
  productDetails: {
    product: mockProduct,
    loading: false,
    error: null,
  },
  cart: mockCart,
  orderCreate: {
    order: mockOrder,
    loading: false,
    error: null,
    success: true,
  },
  orderDetails: {
    order: mockOrder,
    loading: false,
    error: null,
  },
  orderListMy: {
    orders: [mockOrder],
    loading: false,
    error: null,
  },
};

export const waitForLoadingToFinish = async () => {
  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
};

export const fillForm = (fields) => {
  Object.entries(fields).forEach(([name, value]) => {
    const input = screen.getByRole('textbox', { name });
    fireEvent.change(input, { target: { value } });
  });
};

export const submitForm = () => {
  const submitButton = screen.getByRole('button', { name: /submit/i });
  fireEvent.click(submitButton);
}; 