// Importing the main CSS file for styling the application
import "./App.css";

// Importing React Bootstrap components for layout and styling
import { Container } from "react-bootstrap";

// Importing React Router components for routing
import { BrowserRouter as Router, Route } from "react-router-dom";

// Importing components for different parts of the application
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./components/screens/HomeScreen";
import ProductScreen from "./components/screens/ProductScreen";
import CartScreen from "./components/screens/CartScreen";
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';

/**
 * Main application component.
 * Sets up routing and layout for the application.
 */
function App() {
  return (
    // Wraps the application in a Router component to enable routing
    <Router>
      {/* Header component displayed on all pages */}
      <Header />
      
      <main className="py-3">
        {/* Container component from React Bootstrap for consistent layout */}
        <Container>
          {/* Route for the home screen */}
          <Route path="/" component={HomeScreen} exact />
          
          {/* Route for the login screen */}
          <Route path="/login" component={LoginScreen} exact />
          
          {/* Route for the registration screen */}
          <Route path="/register" component={RegisterScreen} exact />
          
          {/* Route for the product details screen with a dynamic segment for product ID */}
          <Route path="/product/:id" component={ProductScreen} exact />
          
          {/* Route for the cart screen with an optional dynamic segment for product ID */}
          <Route path="/cart/:id?" component={CartScreen} exact />
        </Container>
      </main>
      
      {/* Footer component displayed on all pages */}
      <Footer />
    </Router>
  );
}

// Exporting the App component as the default export
export default App;
