import React from "react";
import {Input} from "antd";
import {addTodoItem, switchCompletedAll} from "./actions/todoActions";
import {connect} from "react-redux";
import styled from "styled-components";
import {StyledCheckbox} from "./AppStyle";

const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
`;


class InputItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoInput: "",
    }
  }

  onInputChange = (e) => {
    this.setState({todoInput: e.target.value})
  };
  addInputToState = () => {
    this.props.addTodoItem(this.state.todoInput);
    this.setState({todoInput: ""});
  };
  switchCompletedAll = () => {
    this.props.switchCompletedAll()
  };

  render() {
    return <StyledWrapper>
      <StyledCheckbox
        onChange={this.switchCompletedAll}
        disabled={this.props.todoList.length === 0}
      />
      <Input
        size="large"
        placeholder="What needs to be done"
        onChange={this.onInputChange}
        value={this.state.todoInput}
        onPressEnter={this.addInputToState}
      />
    </StyledWrapper>
  }
}

const mapStateToProps = (state) => {
  return {todoList: state.todoReducer.todoList}
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodoItem(item) {
      dispatch(addTodoItem(item))
    },
    switchCompletedAll() {
      dispatch(switchCompletedAll())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(InputItem);