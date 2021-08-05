import React, { Component } from 'react';

import '../styles/global.scss';

class DarkModeToggle extends Component {
  constructor(props: any) {
    super(props);
    //@ts-ignore
    if(JSON.parse(localStorage.getItem('DARK_MODE')) === true) {
      document.body.classList.add('dark-mode');
    }

    this.state = {
      //@ts-ignore
      darkMode: JSON.parse(localStorage.getItem('DARK_MODE'))
    }

    this.handleModeChange = this.handleModeChange.bind(this);
  }

  handleModeChange() {
    //@ts-ignore
    if(!this.state.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    this.setState({
      //@ts-ignore
      darkMode: (!this.state.darkMode)
    });
    //@ts-ignore
    localStorage.setItem('DARK_MODE', !this.state.darkMode);
  }

  render() {
    return (
      <button onClick={this.handleModeChange}>Change Mode</button>
    );
  }
}

export default DarkModeToggle;