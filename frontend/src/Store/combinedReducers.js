import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from "redux-thunk";

import storage from 'redux-persist/lib/storage';
import UserCredentials from './Reducers/userCredentials';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
}

// We gather all used reducers
const rootReducer = combineReducers({
  users:   persistReducer(rootPersistConfig, UserCredentials),
});

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;
  
const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

export const store = createStore(rootReducer, enhancer);
export const persistor = persistStore(store);

