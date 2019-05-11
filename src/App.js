import React, { Component } from "react";
import Todo from "./Todo";
import styled from "styled-components";

const StyledApp = styled.div`
  text-align: center;
  background: #f0f2f5;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: auto;
`;

class App extends Component {
  render() {
    return (
      <StyledApp>
        <Todo />
      </StyledApp>
    );
  }
}

export default App;
