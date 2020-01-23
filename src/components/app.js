import React, { Component } from "react";
import Slider from "react-slick";
import { observer } from 'mobx-react';

import Heder from '../components/header.js';
import TemperatureToday from '../components/body.js';
import Footer from '../components/footer.js';

import OneDay from '../components/oneDay.js';
import SevenDay from '../components/sevenDayMobile.js';
import News from '../components/news.js';


@observer class Weather extends React.Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
        };

        return (
            <div>
                <div className="desktop">
                    <Heder />
                    <TemperatureToday />
                    <Footer />
                </div>
                <div className="mobile">
                    <Slider {...settings}>
                        <div>
                            <OneDay/>
                        </div>
                        <div>
                            <SevenDay/>
                        </div>
                        <div>
                            <News/>
                        </div>
                    </Slider>
                </div>
            </div>           
        )
    }
}

export default Weather;