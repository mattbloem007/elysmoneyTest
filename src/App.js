import React, { Component } from 'react';
import Main from './pages/main'

class App extends Component {
  render = () => {
    return (
      <div style={{display: 'block', height: '100%'}}>
        <Main />
      </div>
    )
  }
}

export default App;
