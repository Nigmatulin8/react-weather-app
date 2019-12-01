import { observable, computed, action } from 'mobx';
import { toJS } from 'mobx';
import  { makeRequest, getNews}  from '../helpers/helpers.js'

class WeatherData {
    locationUrl = `https://ipinfo.io/json?token=9a91b19e891c9c`;

    weatherUrlBase = `https://api.openweathermap.org/data/2.5/forecast?q=`;
    weatherUrlToken = `&lang=ru&units=metric&APPID=896a082458ce10b6414e463c77ba4562`;

    @observable data = {};

    @computed get location() {
        return toJS(this.data.location);
    }

    @computed get weather() {
        return toJS(this.data.weather);
    }

    @action load() {
        return new Promise((resolve) => {
            makeRequest(this.locationUrl).then(location => {
                this.data.location = location;

                let news = getNews();
                this.data.news = news;
                
                makeRequest(this.weatherUrlBase + this.data.location.city + this.weatherUrlToken).then(weather => {
                    this.data.weather = weather;
                    console.log(toJS(this.data));
                    resolve(true);
                });
            });
        });
    }
}

export default new WeatherData();