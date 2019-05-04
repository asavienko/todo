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

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditInput: false,
      editInputValue: "",
      editInputId: null,
    }
  }

  deleteItem = (id) => {
    this.props.deleteTodoItem(id)
  };

  switchShowCheckbox = (e, todoItemId) => {
    this.props.switchShowTodoItem(todoItemId, e.target.checked)
  };

  toggleInput = (item) => {
    this.setState({
      showEditInput: true,
      editInputValue: item.todoItem,
      editInputId: item.todoItemId,
    });
  };

  saveEditInputChanges = () => {
    this.props.editTodoItem(
      this.state.editInputValue,
      this.state.editInputId,
    );
    this.setState({showEditInput: false});
  };

  changeEditInput = (e) => {
    this.setState({editInputValue: e.target.value})
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
        actions={[<Icon
          className="dynamic-delete-button"
          type="delete"
          onClick={() => this.deleteItem(item.todoItemId)}
        />]}
      >
        <StyledCheckbox
          checked={item.todoItemActive}
          onChange={(e) => this.switchShowCheckbox(e, item.todoItemId)}
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


const mapDispatchToProps = (dispatch) => {
  return {
    deleteTodoItem: (id) => {
      dispatch(deleteTodoItem(id))
    },
    switchShowTodoItem: (todoItemId, todoItemActive) => {
      dispatch(switchShowTodoItem(todoItemId, todoItemActive))
    },
    editTodoItem: (todoItem, todoItemId) => {
      dispatch(editTodoItem(todoItem, todoItemId))
    },
  }
};

export default connect(null, mapDispatchToProps)(TodoItem)
