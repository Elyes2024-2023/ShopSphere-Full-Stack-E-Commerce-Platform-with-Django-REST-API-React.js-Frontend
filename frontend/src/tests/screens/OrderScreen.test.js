import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import OrderScreen from '../../screens/OrderScreen';
import { getOrderDetails } from '../../redux/actions/orderActions';

// Mock the orderActions
jest.mock('../../redux/actions/orderActions', () => ({
  getOrderDetails: jest.fn(),
}));

const mockStore = configureStore([]);

describe('OrderScreen Component', () => {
  const mockOrder = {
    _id: '1',
    user: { name: 'Test User' },
    isPaid: true,
    paidAt: '2024-01-01T00:00:00.000Z',
    isDelivered: false,
    shippingAddress: {
      address: '123 Test St',
      city: 'Test City',
      postalCode: '12345',
      country: 'Test Country',
    },
    paymentMethod: 'PayPal',
    orderItems: [
      {
        name: 'Test Product',
        qty: 1,
        image: '/images/test.jpg',
        price: 100,
      },
    ],
    itemsPrice: 100,
    shippingPrice: 10,
    taxPrice: 5,
    totalPrice: 115,
  };

  let store;

  beforeEach(() => {
    store = mockStore({
      orderDetails: {
        order: mockOrder,
        loading: false,
        error: null,
      },
      userLogin: {
        userInfo: { _id: '1' },
      },
    });

    getOrderDetails.mockImplementation(() => ({ type: 'ORDER_DETAILS_SUCCESS', payload: mockOrder }));
  });

  it('renders order details correctly', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <OrderScreen />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Order 1')).toBeInTheDocument();
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('123 Test St')).toBeInTheDocument();
      expect(screen.getByText('Test City')).toBeInTheDocument();
      expect(screen.getByText('12345')).toBeInTheDocument();
      expect(screen.getByText('Test Country')).toBeInTheDocument();
      expect(screen.getByText('PayPal')).toBeInTheDocument();
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('$100')).toBeInTheDocument();
      expect(screen.getByText('$10')).toBeInTheDocument();
      expect(screen.getByText('$5')).toBeInTheDocument();
      expect(screen.getByText('$115')).toBeInTheDocument();
    });
  });

  it('shows loading state', () => {
    store = mockStore({
      orderDetails: {
        order: null,
        loading: true,
        error: null,
      },
      userLogin: {
        userInfo: { _id: '1' },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <OrderScreen />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    store = mockStore({
      orderDetails: {
        order: null,
        loading: false,
        error: 'Order not found',
      },
      userLogin: {
        userInfo: { _id: '1' },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <OrderScreen />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Order not found')).toBeInTheDocument();
  });

  it('handles multiple order items correctly', async () => {
    const multiItemOrder = {
      ...mockOrder,
      orderItems: [
        {
          name: 'Product 1',
          qty: 2,
          image: '/images/product1.jpg',
          price: 50,
        },
        {
          name: 'Product 2',
          qty: 1,
          image: '/images/product2.jpg',
          price: 100,
        },
      ],
      itemsPrice: 200,
      totalPrice: 215,
    };

    store = mockStore({
      orderDetails: {
        order: multiItemOrder,
        loading: false,
        error: null,
      },
      userLogin: {
        userInfo: { _id: '1' },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <OrderScreen />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('$200')).toBeInTheDocument();
      expect(screen.getByText('$215')).toBeInTheDocument();
    });
  });

  it('handles unauthenticated user', () => {
    store = mockStore({
      orderDetails: {
        order: null,
        loading: false,
        error: null,
      },
      userLogin: {
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <OrderScreen />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Please sign in to view order details')).toBeInTheDocument();
  });

  it('dispatches getOrderDetails action on mount', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <OrderScreen />
        </BrowserRouter>
      </Provider>
    );

    expect(getOrderDetails).toHaveBeenCalled();
  });

  it('displays correct payment status', async () => {
    const paidOrder = {
      ...mockOrder,
      isPaid: true,
      paidAt: '2024-01-01T00:00:00.000Z',
    };

    store = mockStore({
      orderDetails: {
        order: paidOrder,
        loading: false,
        error: null,
      },
      userLogin: {
        userInfo: { _id: '1' },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <OrderScreen />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Paid on January 1, 2024')).toBeInTheDocument();
    });
  });

  it('displays correct delivery status', async () => {
    const deliveredOrder = {
      ...mockOrder,
      isDelivered: true,
      deliveredAt: '2024-01-02T00:00:00.000Z',
    };

    store = mockStore({
      orderDetails: {
        order: deliveredOrder,
        loading: false,
        error: null,
      },
      userLogin: {
        userInfo: { _id: '1' },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <OrderScreen />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Delivered on January 2, 2024')).toBeInTheDocument();
    });
  });

  it('calculates order summary correctly', async () => {
    const orderWithCalculations = {
      ...mockOrder,
      orderItems: [
        {
          name: 'Product 1',
          qty: 3,
          price: 50,
        },
        {
          name: 'Product 2',
          qty: 2,
          price: 75,
        },
      ],
      itemsPrice: 300,
      shippingPrice: 20,
      taxPrice: 16,
      totalPrice: 336,
    };

    store = mockStore({
      orderDetails: {
        order: orderWithCalculations,
        loading: false,
        error: null,
      },
      userLogin: {
        userInfo: { _id: '1' },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <OrderScreen />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('$300')).toBeInTheDocument();
      expect(screen.getByText('$20')).toBeInTheDocument();
      expect(screen.getByText('$16')).toBeInTheDocument();
      expect(screen.getByText('$336')).toBeInTheDocument();
    });
  });

  it('handles different payment methods', async () => {
    const creditCardOrder = {
      ...mockOrder,
      paymentMethod: 'Credit Card',
    };

    store = mockStore({
      orderDetails: {
        order: creditCardOrder,
        loading: false,
        error: null,
      },
      userLogin: {
        userInfo: { _id: '1' },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <OrderScreen />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Credit Card')).toBeInTheDocument();
    });
  });
}); 