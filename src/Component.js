import React from 'react';
import withStorageHoc from './StorageHoc';

class Component extends React.Component {
  state = {
    username: '',
    favoriteMovie: ''
  };

  componentDidMount() {
    const { loadItem } = this.props;
    const username = loadItem('username') || '';
    const favoriteMovie = loadItem('favoriteMovie') || '';
    this.setState({ username, favoriteMovie });
  }
  setDataToLocalStorage = () => {
    const { username, favoriteMovie } = this.state;
    this.props.setItem('username', username);
    this.props.setItem('favoriteMovie', favoriteMovie);
  };
  setValueToState = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { favoriteMovie, username } = this.state;
    return (
      <div>
        {username && favoriteMovie ? (
          <div>
            You favorite movie is {favoriteMovie} and your name is {username}
          </div>
        ) : (
          <div>
            <input type="text" name={'username'} value={username} onChange={this.setValueToState} />
            <input
              type="text"
              name={'favoriteMovie'}
              value={favoriteMovie}
              onChange={this.setValueToState}
            />
            <button onClick={this.setDataToLocalStorage}>submit</button>
          </div>
        )}
      </div>
    );
  }
}

const UserNameComponent = withStorageHoc(Component);
export default UserNameComponent;
