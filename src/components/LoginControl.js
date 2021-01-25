import React from "react";

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      username: undefined,
    };
  }

  async componentDidMount() {
    // Get token validity
    // TODO: correct backend url
    let res = await fetch("http://151.80.152.11/auth/check");
    // If token is still valid
    if (res.success) {
      // Get session infos
      // TODO: correct backend url
      let info = await fetch("http://151.80.152.11/auth/user");
      if (info.success)
        this.setState({
          username: info.username,
          isConnected: true,
        });
      // Error occured while getting sessions info
      // But it should not happen
      // If so: TODO: kill the backend dev
      else console.error("[ERROR]: Can't get remote sessions info");
    } else {
      console.error("[ERROR]: error while getting token validity");
    }
  }

  loginAndRegister() {
    return (
      <div className="login-control not-connected">
        <button href="#login">Login</button>
        <button href="#register">Register</button>
      </div>
    );
  }

  dashboard() {
    return (
      <div className="login-control connected">
        <button href="#Dashboard">Dashboard</button>
      </div>
    );
  }

  render() {
    // If user is connected (has a valid session)
    // Render the dashboard button
    if (this.state.isConnected) return this.dashboard();
    // Render the login and register form
    return this.loginAndRegister();
  }
}

export default LoginControl;
