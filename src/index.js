import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './store/store.js';
import App from './components/app.js';


store.load().then(() => {
    ReactDom.render(<App />, document.querySelector('#app'));
})
