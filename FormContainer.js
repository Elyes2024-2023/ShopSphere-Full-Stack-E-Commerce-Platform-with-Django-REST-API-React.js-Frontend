import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

/**
 * A container component to center and format form content.
 * 
 * This component uses Bootstrap's grid system to center its children 
 * in a column with a medium breakpoint of 6 columns width.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be displayed inside the container.
 * @returns {JSX.Element} - The FormContainer component.
 */
function FormContainer({ children }) {
  return (
    <div className="form-container">
      <Container>
        <Row className="justify-content-md-center">
          {/* Centered column that holds the form content */}
          <Col xs={12} md={6}>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FormContainer;
