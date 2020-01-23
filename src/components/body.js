import React from 'react';
import { observer } from 'mobx-react';

import store from '../store/store';
import style from '../styles/module-styles/body.module.css';

import SevenDay from '../components/sevenDay';
import News from '../components/news.js';
import OneDay from '../components/oneDay.js';

@observer class WeatherBody extends React.Component {
    weather = store.data.weather;

    render() {
        return (
           <>
                <div className={style.body}> 
                    <OneDay />
                    <SevenDay />
                    <News />
                </div>
           </>
        )
    }
}

export default WeatherBody;