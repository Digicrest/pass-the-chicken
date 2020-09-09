import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { persistStore } from 'redux-persist'

import './index.css'
import App from './App'
import MyLoader from './components/MyLoader'

import store from './store/store'
let persistor = persistStore(store)

render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<MyLoader />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)