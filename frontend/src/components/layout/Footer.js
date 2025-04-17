import React from "react";
import { Container, Row, Col } from "react-bootstrap";

/**
 * Footer component that displays the footer section of the website.
 * It includes a container with a centered copyright message.
 *
 * @returns {JSX.Element} - The Footer component.
 */
function Footer() {
  return (
    <footer className="bg-dark text-light">
      <Container>
        <Row>
          {/* Center-aligned column containing the copyright text */}
          <Col className="text-center py-3">
            &copy; {new Date().getFullYear()} ARKPROCODER
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
