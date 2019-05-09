import React from "react"
import {Icon, Input, List} from "antd";
import styled from "styled-components";
import {deleteTodoItem, editTodoItem, switchShowTodoItem} from "./actions/todoActions";
import {connect} from "react-redux";
import {StyledCheckbox} from "./AppStyle";

const ListItemMeta = List.Item.Meta;

const StyledListItemMeta = styled(ListItemMeta)`
      text-decoration: ${({completedStyle}) => completedStyle ? "line-through" : "none"};
      color: ${({completedStyle}) => completedStyle ? "#999" : "none"};
`;
const StyledDeleteIcon = styled(Icon)`
  cursor: pointer;
  font-size: 17px;
  transition: all .3s;
  
  :hover {
  color: #666;
}
`;

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditInput: false,
      editInputValue: "",
    }
  }

  deleteItem = () => {
    this.props.deleteTodoItem();
  };

  switchShowCheckbox = (e) => {
    const todoItemActive = e.target.checked;
    this.props.switchShowTodoItem(todoItemActive);
  };

  toggleInput = ({todoItem: editInputValue, todoItemId: editInputId}) => {
    this.setState({
      showEditInput: true,
      editInputValue,
      editInputId,
    });
  };

  saveEditInputChanges = () => {
    const todoItem = this.state.editInputValue;
    this.props.editTodoItem(
      todoItem,
    );
    this.setState({showEditInput: false});
  };

  changeEditInput = (e) => {
    const editInputValue = e.target.value;
    this.setState({editInputValue});
  };

  render() {
    const {
      item,
    } = this.props;

    return <React.Fragment>
      {(this.state.showEditInput &&
        <List.Item>
          <Input
            autoFocus
            value={this.state.editInputValue}
            onChange={this.changeEditInput}
            onBlur={this.saveEditInputChanges}
            onPressEnter={this.saveEditInputChanges}
          />
        </List.Item>) ||
      <List.Item
        actions={[<StyledDeleteIcon
          type="delete"
          onClick={this.deleteItem}
        />]}
      >
        <StyledCheckbox
          checked={item.todoItemActive}
          onChange={this.switchShowCheckbox}
        />
        <StyledListItemMeta
          title={item.todoItem}
          completedStyle={item.todoItemActive}
          onClick={() => this.toggleInput(item)}
        />
      </List.Item>}
    </React.Fragment>
  }
}


const mapDispatchToProps = (dispatch, {item: {todoItemId}}) => {
  return {
    deleteTodoItem: () => {
      dispatch(deleteTodoItem(todoItemId))
    },
    switchShowTodoItem: (todoItemActive) => {
      dispatch(switchShowTodoItem(todoItemId, todoItemActive))
    },
    editTodoItem: (todoItem) => {
      dispatch(editTodoItem(todoItem, todoItemId))
    },
  }
};

export default connect(null, mapDispatchToProps)(TodoItem)
