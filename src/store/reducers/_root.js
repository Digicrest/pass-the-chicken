import storage from 'redux-persist/lib/storage/index'

import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'

import configReducer from './config'
import profileReducer from './profile'

const persistedConfigReducer = persistReducer({ 
  key: 'config', 
  storage: storage 
}, configReducer)

const persistedProfileReducer = persistReducer({ 
  key: 'profile', 
  storage: storage 
}, profileReducer)

const rootReducer = combineReducers({
  profile: persistedProfileReducer,
  config: persistedConfigReducer
})

export default rootReducer