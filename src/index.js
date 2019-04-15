import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import reducers from './reducers';
import * as Actions from './actions'
import './index.css';
import * as serviceWorker from './serviceWorker';

const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk)
);

store.subscribe(() => {
  store.getState()
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
