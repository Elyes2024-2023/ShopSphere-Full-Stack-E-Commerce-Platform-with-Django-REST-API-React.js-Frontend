// Importing the main CSS file for styling the application
import "./App.css";

// Importing React Bootstrap components for layout and styling
import { Container } from "react-bootstrap";

// Importing React Router components for routing
import { BrowserRouter as Router, Route } from "react-router-dom";

// Importing components for different parts of the application
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import ErrorBoundary from './components/ErrorBoundary';
import { useEffect } from 'react';
import { reportWebVitals } from './reportWebVitals';

/**
 * Main application component.
 * Sets up routing and layout for the application.
 */
const App = () => {
  useEffect(() => {
    // Initialize performance monitoring
    reportWebVitals(console.log);
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        {/* Header component displayed on all pages */}
        <Header />
        
        <main className="py-3">
          {/* Container component from React Bootstrap for consistent layout */}
          <Container>
            {/* Route for the home screen */}
            <Route path="/" component={HomeScreen} exact />
            
            {/* Route for the login screen */}
            <Route path="/login" component={LoginScreen} />
            
            {/* Route for the registration screen */}
            <Route path="/register" component={RegisterScreen} />
            
            {/* Route for the profile screen */}
            <Route path="/profile" component={ProfileScreen} />
            
            {/* Route for the shipping screen */}
            <Route path="/shipping" component={ShippingScreen} />
            
            {/* Route for the payment screen */}
            <Route path="/payment" component={PaymentScreen} />
            
            {/* Route for the place order screen */}
            <Route path="/placeorder" component={PlaceOrderScreen} />
            
            {/* Route for the order screen with a dynamic segment for order ID */}
            <Route path="/order/:id" component={OrderScreen} />
            
            {/* Route for the product details screen with a dynamic segment for product ID */}
            <Route path="/product/:id" component={ProductScreen} />
            
            {/* Route for the cart screen with an optional dynamic segment for product ID */}
            <Route path="/cart/:id?" component={CartScreen} />
            
            {/* Route for the user list screen */}
            <Route path="/admin/userlist" component={UserListScreen} />
            
            {/* Route for the user edit screen with a dynamic segment for user ID */}
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            
            {/* Route for the product list screen */}
            <Route path="/admin/productlist" component={ProductListScreen} exact />
            
            {/* Route for the product list screen with a dynamic segment for page number */}
            <Route path="/admin/productlist/:pageNumber" component={ProductListScreen} exact />
            
            {/* Route for the product edit screen with a dynamic segment for product ID */}
            <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
            
            {/* Route for the order list screen */}
            <Route path="/admin/orderlist" component={OrderListScreen} />
            
            {/* Route for the search screen with a dynamic segment for keyword */}
            <Route path="/search/:keyword" component={HomeScreen} exact />
            
            {/* Route for the page screen with a dynamic segment for page number */}
            <Route path="/page/:pageNumber" component={HomeScreen} exact />
            
            {/* Route for the search screen with dynamic segments for keyword and page number */}
            <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} exact />
          </Container>
        </main>
        
        {/* Footer component displayed on all pages */}
        <Footer />
      </Router>
    </ErrorBoundary>
  );
};

// Exporting the App component as the default export
export default App;
