import React from 'react';

export default class SignOut extends React.Component {
  /* Life Cycle */
  componentDidMount() {
    this.handleLogout();
  }

  /* Data */
  handleLogout() {
    const homePath = '/';

    fetch('/logout', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => response.json())
      .then(body => {
        this.props.history.push(homePath);
      });
  }

  render() {
    return (
      <div />
    );
  }
};