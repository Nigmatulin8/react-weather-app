import React from 'react';
import { observer } from 'mobx-react';

import Heder from '../components/header.js';
import TemperatureToday from '../components/body.js';
import Footer from '../components/footer.js';


@observer class Weather extends React.Component {
    render() {
        return (
            <div>
                <Heder />
                <TemperatureToday />
                <Footer />
            </div>           
        )
    }
}

export default Weather;