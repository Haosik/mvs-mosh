import React, { Component } from 'react';
import Input from './input';

class LoginForm extends Component {
  // refUserName = React.createRef();
  state = {
    account: {
      username: '',
      password: ''
    }
  };
  handleInputChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };
  handleSubmit = e => {
    e.preventDefault();
  };
  // componentDidMount() {
  //   this.refUserName.current.focus();
  // }

  render() {
    const { account } = this.state;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
            <Input
              value={account.username}
              onChange={this.handleInputChange}
              name="username"
              label="Username"
              type="text"
            />
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={account.password}
              onChange={this.handleInputChange}
              id="password"
              name="password"
              className="form-control"
              type="password"
            />
          </div>
          <button className="btn btn-primary">Login</button>
          {/* <div class="form-group">
            <label htmlFor="exampleFormControlSelect1">Example select</label>
            <select class="form-control" id="exampleFormControlSelect1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div> */}
        </form>
      </div>
    );
  }
}

export default LoginForm;
