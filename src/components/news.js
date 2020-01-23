import React from 'react';
import { observer } from 'mobx-react';
import dayjs from 'dayjs';

import store from '../store/store';
import style from '../styles/module-styles/news.module.css';

@observer class News extends React.Component {
    news = store.data.news.articles;
   
    render() {
        let newsList = this.news.map((data, i) => {
            let postTime = dayjs(data.publishedAt).format('YYYY-MM-DD HH:mm');

            return (
                <div className={style.news_item} key={i}>
                   <div className={style.news_item__title}>
                       <a href={data.url} target='_blank'>{data.title}</a>
                   </div>

                   <div className={style.news_item__description}>
                       {data.description ? data.description
                            .toString()
                            .replace(/(&nbsp;|&raquo;|&laquo;)/g, ' ') : data.description}
                   </div>

                   <div className={style.news_item__published}>
                        {postTime} | Author: {data.author ? data.author : 'Unknown'}
                   </div>
                </div>
            )
        });

        return (
            <>
                <div className={style.news} id="news">
                    <span className={style.news__header}>Fresh News</span>
                    { newsList }
                </div>
            </>
        )
    }
}

export default News;
