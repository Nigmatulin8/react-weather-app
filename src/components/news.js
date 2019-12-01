import React from 'react';
import { observer } from 'mobx-react';

import store from '../store/store';
import style from '../styles/module-styles/news.module.css';


@observer class News extends React.Component {
    news = store.data.news;
    
    render() {
        let newsList = this.news.map((data, i) => {
            return (
                <div className={style.news_item} key={i}>
                    <div className={style.news_title}>
                        <span className={style.dateTime}>{data.date} </span> 
                        <span className={style.dateTime}>{data.time} </span>
                        <span className={style.headerDescription}> <a href={data.url}>{data.title}</a>.</span>
                    </div>
                    <div className={style.news_body}>
                        {data.descr}
                    </div>
                </div>
            )
        });

        return (
            <>
                <div className={style.news} id="news">
                    <span className={style.ya}>
                        <span className={style.yandex}>Я</span>ндекс.Новости:
                    </span>

                    {newsList}
                </div>
            </>
        )
    }
}

export default News;
