import { observable, computed, action } from 'mobx';
import  { makeRequest }  from '../helpers/helpers.js'

const country = {
    'ae' : true, 'ar' : true, 'at' : true, 'au' : true, 'be' : true, 'bg' : true, 'br' : true,
    'ca' : true, 'ch' : true, 'cn' : true, 'co' : true, 'cu' : true, 'cz' : true, 'de' : true,
    'eg' : true, 'fr' : true, 'gb' : true, 'gr' : true, 'hk' : true, 'hu' : true, 'id' : true,
    'ie' : true, 'il' : true, 'in' : true, 'it' : true, 'jp' : true, 'kr' : true, 'lt' : true,
    'lv' : true, 'ma' : true, 'mx' : true, 'my' : true, 'ng' : true, 'nl' : true, 'no' : true,
    'nz' : true, 'ph' : true, 'pl' : true, 'pt' : true, 'ro' : true, 'rs' : true, 'ru' : true,
    'sa' : true, 'se' : true, 'sg' : true, 'si' : true, 'sk' : true, 'th' : true, 'tr' : true,
    'tw' : true, 'ua' : true, 'us' : true, 've' : true, 'za' : true,
}

const locationUrl = `https://ipinfo.io/json?token=9a91b19e891c9c`;
const weatherUrlBase = `https://api.openweathermap.org/data/2.5/forecast?q=`;
const weatherUrlToken = `&lang=ru&units=metric&APPID=896a082458ce10b6414e463c77ba4562`;
const NEWS_API_ROOT = 'https://newsapi.org';

class WeatherData {
    newsUrlBase = '';
    domain = '';

    @observable data = {};

    @computed get location() {
        return this.data.location;
    }

    @computed get weather() {
        return this.data.weather;
    }

    @action load() {
        return new Promise((resolve) => {
            makeRequest(locationUrl).then(location => {
                this.data.location = location;
                
                makeRequest(weatherUrlBase + this.data.location.city + weatherUrlToken).then(weather => {
                    this.data.weather = weather;
                    
                    this.domain = location.country.toLowerCase();

                    this.newsUrlBase = `${NEWS_API_ROOT}/v2/top-headlines?country=${country[this.domain] ? this.domain : 'en'}&category=business&apiKey=fbf761ee93144c3c93e39af9acfd3c98`;
                    makeRequest(this.newsUrlBase).then(news => {
                        this.data.news = news;

                        resolve(true);
                    });
                });
            });
        });
    }
}

export default new WeatherData();