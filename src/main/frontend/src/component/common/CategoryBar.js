import React, { useState } from "react";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate,  } from "react-router-dom";

function CategoryBar() {

  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`)
  }

  return (
    <>
    <Container>
      <Row>
        <Col>
          <Navbar bg="success" variant="dark">
            <Container>
              <Navbar.Brand href="#home">Navbar</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/booklist">
                  All
                </Nav.Link>
                <Nav.Link as={Link} to="/novels">
                  소설/시/희곡
                </Nav.Link>
                <Nav.Link as={Link} to="/economics">
                  경제/경영
                </Nav.Link>
                <Nav.Link as={Link} to="/developments">
                  자기계발
                </Nav.Link>
                <Nav.Link as={Link} to="/children">
                  어린이
                </Nav.Link>
                <Nav.Link as={Link} to="/foreign">
                  외국어
                </Nav.Link>
                <Nav.Link as={Link} to="/">
                  문의게시판
                </Nav.Link>
                <Form inline="true">
                  <Row>
                    <Col xs="auto">
                      <Form.Control
                        type="text"
                        placeholder="Search"
                        name="searchInput"
                        className=" mr-sm-2"
                        onChange={handleChange}
                      />
                    </Col>
                    <Col xs="auto">
                      {/* <Button type="submit">Submit</Button> */}
                    </Col>
                  </Row>
                </Form>
              </Nav>
            </Container>
          </Navbar>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default CategoryBar;
