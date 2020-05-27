import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { MainContainer } from "./style";

const Sidebar = ({ links, selectKey, activeKey }) => {
  const [expanded, onToggle] = useState(false);
  return (
    <MainContainer>
      <Navbar
        expand="md"
        onToggle={() => {
          onToggle(!expanded);
        }}
        expanded={expanded}
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav activeKey={activeKey} className="flex-column">
            {links.map((each, index) => {
              return (
                <Nav.Item
                  key={index}
                  onClick={() => {
                    selectKey(each);
                    onToggle(false);
                  }}
                >
                  <Nav.Link eventKey={each}>{each}</Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </MainContainer>
  );
};

export default React.memo(Sidebar);
