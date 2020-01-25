import React from 'react';
import ReactDom from 'react-dom';


import store from './store/store.js';

import App from './components/app.js';
import Preloader from './components/preloader.js';
import Error from './components/error.js';

import './styles/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

store.load(() => {
    ReactDom.render(<Preloader />, document.querySelector('#app'));
}).then(() => {
    ReactDom.render(<App />, document.querySelector('#app'));
}).catch(() => {
    ReactDom.render(<Error />, document.querySelector('#app'));
})
