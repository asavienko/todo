import React from "react"
import InputItem from "./InputItem";
import {ConfigProvider, Icon, List} from "antd";
import {connect} from "react-redux";
import TodoItem from "./TodoItem";


const customizeRenderEmpty = () => (
  <div style={{textAlign: 'center'}}>
    <Icon type="smile" style={{fontSize: 40}}/>
    <p style={{fontSize: 16}}>Nothing to do</p>
  </div>
);

class Todo extends React.Component {

  render() {
    return (
      <ConfigProvider renderEmpty={customizeRenderEmpty}>
        {/*<ListControl/>*/}
        <List
          header={<InputItem/>}
          style={{
            width: "550px",
            background: "#fff",
            display: "inline-block",
            textAlign: "left",
            marginTop: "25px"
          }}
          bordered
          dataSource={this.props.todoList} // can I make filter without id in reducer?
          renderItem={item => (<TodoItem
            item={item}
            key={item.todoItemId}
          />)}
        />
      </ConfigProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {todoList: state.todoReducer.todoList}
};


export default connect(mapStateToProps)(Todo);