import React from 'react';
import { observer } from 'mobx-react';

import store from '../store/store';
import style from '../styles/module-styles/body.module.css';

@observer class OneDay extends React.Component {
    weather = store.data.weather;

    render() {
        let currentDate = new Date().toISOString().replace(/\//g, '-');
        let sunrise = new Date(this.weather.city.sunrise * 1000).toString(); 
        let sunset = new Date(this.weather.city.sunset * 1000).toString();
        let counter = 0;

        sunrise = sunrise.match(/\d{1,2}:\d{1,2}:\d{1,2}/)[0]; //Время восхода
        sunset = sunset.match(/\d{1,2}:\d{1,2}:\d{1,2}/)[0]; //Время заката
        currentDate = currentDate.match(/\d{1,4}-\d{1,2}-\d{1,2}/)[0];
        
        //Температура ночью
        let firstDayNightTemperature;

        for(let i = 0, len = this.weather.list.length; i < len; i++) {
            if(this.weather.list[i].dt_txt.match(/\d{1,2}:\d{1,2}:\d{1,2}/)[0] == '03:00:00') {
                firstDayNightTemperature = Math.floor(this.weather.list[i].main.temp);
                break;
            }
        }
        
        let dailyWeather = this.weather.list.map((elem, i) => {
            let dayTime = '';

            counter === 0 ? dayTime = 'Утро' : false;
            counter === 1 ? dayTime = 'День' : false;
            counter === 2 ? dayTime = 'Вечер' : false;

            if((this.weather.list[i].dt_txt.match(/\d{1,2}:\d{1,2}:\d{1,2}/)[0] === '09:00:00' && 
                this.weather.list[i].dt_txt.match(/\d{1,4}-\d{1,2}-\d{1,2}/)[0] !== currentDate ||
                this.weather.list[i].dt_txt.match(/\d{1,2}:\d{1,2}:\d{1,2}/)[0] === '15:00:00' && 
                this.weather.list[i].dt_txt.match(/\d{1,4}-\d{1,2}-\d{1,2}/)[0] !== currentDate ||
                this.weather.list[i].dt_txt.match(/\d{1,2}:\d{1,2}:\d{1,2}/)[0] === '21:00:00' && 
                this.weather.list[i].dt_txt.match(/\d{1,4}-\d{1,2}-\d{1,2}/)[0] !== currentDate) &&
                counter < 3) 
            {   
                counter++;

                return (
                    <div className={style.day_weather_item} key={i}>
                        <div className={style.day_weather_text}> {dayTime} </div>
                        <div>
                            <img src={"dist/img/" + this.weather.list[i].weather[0].main + '.png'} 
                                alt={this.weather.list[i].weather[0].main}/>
                        </div>
                        <div className={style.day_weather_text}>{Math.floor(this.weather.list[i].main.temp)}°C</div>
                    </div>
                )         
            }
        });

        return (
           <>
                <div className={style.content}>
                    <div className={style.header}>
                        <div className={style.header_city}>
                            {this.weather.city.name}
                        </div>
                        <div className={style.header_date}>
                            Today, {this.weather.list[0].dt_txt.match(/\d{1,4}-\d{1,2}-\d{1,2}/)[0]}
                        </div>

                        <div>
                            <div className={style.body_main}>
                                <img src={"dist/img/" + this.weather.list[0].weather[0].main + '.png'} 
                                        alt={this.weather.list[0].weather[0].main}/>

                                <span className={style.day}>{Math.floor(this.weather.list[0].main.temp)}°C </span>
                                <span className={style.night}> {firstDayNightTemperature}°C</span>
                            </div>
                            <div className={style.weather_description}>
                                {this.weather.list[0].weather[0].description}
                            </div>
                        </div>

                        <div className={style.day_description}>
                            <div className={style.left_desc}>
                               <div>
                                   Влажность: {this.weather.list[0].main.humidity}%
                               </div>
                               <div>
                                   Ветер: {this.weather.list[0].wind.speed} м/с
                                </div>
                               <div>
                                   Восход: {sunrise}
                               </div>
                            </div>
                            <div className={style.right_desc}>
                                <div>
                                   Давление: {this.weather.list[0].main.pressure} мм рт.ст
                               </div>
                                <div>
                                   Уровень моря: {this.weather.list[0].main.sea_level}
                               </div>
                               <div>
                                   Закат: {sunset}
                               </div>
                            </div>
                        </div>

                        <div className={style.day_weather}> 
                            {dailyWeather}
                        </div>
                    </div>
                </div>
           </>
        )
    }
}

export default OneDay;