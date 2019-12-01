export function makeRequest(url, options = {} ) {
    return fetch(url, options).then(response => {
        if(response.status !== 200) {
            return response.text().then(text => {
                throw new Error(text);
            });
        }

        return response.json();
    });
}

export function getNews() {
    let data = window['m_auto'];
    let item;

    if(!data||!data.length) { return; }
            
    item = data.map((news, i) => {
        return data[i];
    });
    
    return item;
}