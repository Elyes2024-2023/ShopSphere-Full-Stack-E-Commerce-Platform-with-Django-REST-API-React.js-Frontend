import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // Log error to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-5">
          <Alert variant="danger">
            <Alert.Heading>Something went wrong!</Alert.Heading>
            <p>
              We're sorry, but something went wrong. Please try refreshing the page or contact support if the problem persists.
            </p>
            <hr />
            <div className="d-flex justify-content-between">
              <Button
                variant="outline-danger"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => this.props.navigate('/')}
              >
                Go to Home
              </Button>
            </div>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper component to use hooks
const ErrorBoundaryWrapper = (props) => {
  const navigate = useNavigate();
  return <ErrorBoundary navigate={navigate} {...props} />;
};

export default ErrorBoundaryWrapper; 