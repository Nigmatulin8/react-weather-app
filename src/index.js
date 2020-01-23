import React from 'react';
import ReactDom from 'react-dom';


import store from './store/store.js';
import App from './components/app.js';

import './styles/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

store.load().then(() => {
    ReactDom.render(<App />, document.querySelector('#app'));
})
