import React from 'react';

import style from '../styles/module-styles/preloader.module.css';

class Preloader extends React.Component {
    render() {
       return (
           <div className={style.preloader__container}>
               <img className={style.preloader} src='dist/img/head.gif' alt='preloader'/>

               Loading...
           </div>
       )
    }
}

export default Preloader;