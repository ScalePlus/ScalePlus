import React from "react";
import { Nav } from "react-bootstrap";
import { MainContainer } from "./style";

export default function Sidebar({ links, selectKey, activeKey }) {
  return (
    <MainContainer>
      <Nav activeKey={activeKey} className="flex-column">
        {links.map((each, index) => {
          return (
            <Nav.Item
              key={index}
              onClick={() => {
                selectKey(each);
              }}
            >
              <Nav.Link eventKey={each}>{each}</Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
    </MainContainer>
  );
}
