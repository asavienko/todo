import React from 'react';
import InputItem from './InputItem';
import { ConfigProvider, Icon, List } from 'antd';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import styled from 'styled-components';
import StorageHoc from './StorageHoc';
import UserNameComponent from './Component';

const StyledDivForCustomizeRenderEmpty = styled.div`
  text-align: center;
`;
const StyledSmileIcon = styled(Icon)`
  font-size: 40px;
`;
const StyledEmptyP = styled.p`
  font-size: 16px;
`;
const StyledList = styled(List)`
  width: 550px;
  background: #fff;
  display: inline-block;
  text-align: left;
  margin-top: 25px !important;
  margin-bottom: 35px !important;
`;

const customizeRenderEmpty = () => (
  <StyledDivForCustomizeRenderEmpty>
    <StyledSmileIcon type="smile" />
    <StyledEmptyP>Nothing to do</StyledEmptyP>
  </StyledDivForCustomizeRenderEmpty>
);

class Todo extends React.Component {
  render() {
    return (
      <ConfigProvider renderEmpty={customizeRenderEmpty}>
        <StyledList
          header={<InputItem />}
          bordered
          dataSource={this.props.todoList}
          renderItem={item => <TodoItem item={item} key={item.todoItemId} />}
        />
        <UserNameComponent />
      </ConfigProvider>
    );
  }
}

const mapStateToProps = state => {
  return { todoList: state.todoReducer.todoList };
};

export default connect(mapStateToProps)(Todo);
