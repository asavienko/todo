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
      checkedAll: false,
    }
  }

  onInputChange = (e) => {
    const todoInput = e.target.value;
    this.setState({todoInput})
  };
  addInputToState = () => {
    const {todoInput} = this.state;
    if (todoInput.trim()) {
      this.props.addTodoItem(todoInput);
      this.setState({todoInput: ""});
    }
  };
  switchCompletedAll = () => {
    this.props.switchCompletedAll();
    const allValueChecked = this.props.todoList.every(
      ({todoItemActive}) => todoItemActive === true
    );
    this.setState({checkedAll: allValueChecked});
    console.log(allValueChecked)
  };

  render() {
    return <StyledWrapper>
      <StyledCheckbox
        checked={this.state.checkedAll}  /*The checkbox was worked not right, i made the controlled component,
        but I need to do switchCompletedAll function when I click to child checkboxes in the list.
        Because, when I click the checkbox in the list, checkbox in this component dose not refresh.
        How to do it the right way? I thought to hold the value of this component in Redux Store*/
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