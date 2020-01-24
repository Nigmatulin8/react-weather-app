import React from 'react';
import { observer } from 'mobx-react';

import store from '../store/store';
import style from '../styles/module-styles/sevenDayMobile.module.css';

@observer class SevenDayMobile extends React.Component {
    weather = store.data.weather;

    days = {
        "Mon":"Понедельник",
        "Tue":"Вторник",
        "Wed":"Среда",
        "Thu":"Четверг",
        "Fri":"Пятница",
        "Sat":"Суббота",
        "Sun":"Воскресенье",
    };

    render() {    
        let dayT = this.weather.list[0].dt_txt.match(/\d{1,4}-\d{1,2}-\d{1,2}/)[0]
        let timeT = "12:00:00";
        let timeTt = "09:00:00";
        let timeTtt = "06:00:00";

        let weaklyWeather = this.weather.list.map((data, i) => {
            let cDay = this.weather.list[i].dt_txt.match(/\d{1,4}-\d{1,2}-\d{1,2}/)[0]; //2019-12-01
            let cTime = this.weather.list[i].dt_txt.match(/\d{1,2}:\d{1,2}:\d{1,2}/)[0] //12:00:00
            
            if((cDay !== dayT && cTime === timeT) || 
                ((cDay !== dayT && (cTime === timeT || cTime === timeTt || cTime === timeTtt)) && i > 38)) {

                let dayOfWeek = new Date(this.weather.list[i].dt * 1000).toGMTString();
                let dayName = dayOfWeek.match(/[aA-zZ]{3}/)[0];
                dayOfWeek = dayOfWeek.match(/[aA-zZ]{3}/)[0]
                
                let img = this.weather.list[i].weather[0].description === "пасмурно" ? 
                            ("dist/img/" + this.weather.list[i].weather[0].description + '.png') :
                            ("dist/img/" + this.weather.list[i].weather[0].main + '.png');

                return (
                    <div className={style.weatherRows} key={i}>
                       <div className={style.day}>
                           <span>{this.days[dayName]}, </span> 
                           <span className={style.day_date}>{cDay}</span>
                       </div>

                       <div className={style.description}>
                            <span>Температура</span>
                            <span>Описание</span>
                            <span>Ветер</span>
                            <span>Осадки</span>
                        </div>
                        <div className={style.datDesc}>
                            <div className={style.day}>
                                <img src={img} 
                                    alt={this.weather.list[i].weather[0].main}/>

                                <div className={style.dayTemp}>
                                    <div className={style.dayDay}>
                                        {Math.floor(this.weather.list[i].main.temp)}
                                    </div>
                                    <div className={style.dayNight}>
                                        {Math.floor(this.weather.list[i-4].main.temp)}
                                    </div>
                                </div>
                            </div>

                            <div className={style.dayDescription}>
                                {this.weather.list[i].weather[0].description}
                            </div>
                            
                            <div className={style.dayDescription}>
                                {this.weather.list[i].wind.speed} м/с
                            </div>

                            <div className={style.dayDescriptionOs}>
                                {this.weather.list[i].main.humidity} %
                            </div>
                        </div>
                    </div>
                )
            }
            
        });

        return (
            <>
                <div className={style.sevenDay}>
                    <div className={style.header}>
                        Прогноз на 5 дней
                    </div>

                    {weaklyWeather}
                </div>
            </>
        )
    }
}

export default SevenDayMobile;