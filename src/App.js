import React, { Component } from 'react'
import { Provider } from 'react-redux'

import { store } from './store/store'

import Home from './screens/home/home'

class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}

export default App
