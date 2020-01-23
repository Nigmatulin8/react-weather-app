import React from 'react';
import { observer } from 'mobx-react';

import store from '../store/store';
import style from '../styles/module-styles/header.module.css';

@observer class WeatherHeader extends React.Component {
    location = store.data.location;
    weather = store.data.weather;

    render() { 
        return (
           <>
                <div className={style.header}>
                    <div>
                        <img src="dist/img/logo.png"/> 
                        {this.location.country == 'RU' ? 'Погода: ' : 'Weather: '} {this.weather.city.name} 
                    </div>
                    <div className={style.header__population}>
                        <span>
                            {this.location.country == 'RU' ? 'Население: ' : 'Population: '}  
                            {this.weather.city.population}
                        </span>
                        
                        <br/>

                        <span>IP: {this.location.ip}</span><br/>
                    </div>
                </div>
                
           </>
        )
    }
}

export default WeatherHeader;
