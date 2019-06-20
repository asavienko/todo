import React from 'react';

const withStorageHoc = Component => {
  return class HocComponent extends React.Component {
    state = {
      isLocalStorageExist: false
    };

    componentDidMount() {
      this.checkLocalStorageExist();
      console.log(this.props);
    }
    checkLocalStorageExist = () => {
      const test = 'test';
      try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        this.setState({ isLocalStorageExist: true });
      } catch (error) {
        console.log(error);
      }
    };
    loadItem = key => {
      this.state.isLocalStorageExist && localStorage.getItem(key);
    };
    removeItem = key => {
      this.state.isLocalStorageExist && localStorage.removeItem(key);
    };
    saveItem = (key, value) => {
      this.state.isLocalStorageExist && localStorage.setItem(key, value);
    };
    render() {
      return (
        <Component
          loadItem={this.loadItem}
          removeItem={this.removeItem}
          saveItem={this.saveItem}
          {...this.props}
        />
      );
    }
  };
};
export default withStorageHoc;
