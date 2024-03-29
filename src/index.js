import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import './index.scss';

import App from 'App/App';
import * as serviceWorker from './serviceWorker';
import * as stores from 'global/stores';

const app = <Provider {...stores}>
  <App />
</Provider>;

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
