import React from 'react';
import { observer } from 'mobx-react';

import store from '../store/store';
import style from '../styles/module-styles/footer.module.css';

@observer class WeatherFooter extends React.Component {
    location = store.data.location;
    weather = store.data.weather;

    render() {
        return (
           <>
                <div className={style.footer}>
                    <div>
                        <div>Данные предоставлены сайтом <a href="https://openweathermap.org/">openweathermap.org</a></div>
                        <div>TimeZone: {this.location.timezone}</div> 
                    </div>

                    <div className={style.social}>
                        <a className={style.linkA} href="https://vk.com/nigmatulin8" target="_blank"> 
                            <img className={style.socialImg} src="dist/img/vk.png" alt="vKontakte" /> 
                        </a>
                        <a className={style.linkA} href="https://github.com/Nigmatulin8" target="_blank"> 
                            <img className={style.socialImg} src="dist/img/gh.png" alt="GitHub" /> 
                        </a>
                        <a className={style.linkA} href="https://t.me/ProgLin8" target="_blank"> 
                            <img className={style.socialImg} src="dist/img/tg.png" alt="Telegram" /> 
                        </a>
                    </div>
                </div>
           </>
        )
    }
}

export default WeatherFooter;