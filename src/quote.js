class Quote {
    url = "https://type.fit/api/quotes?_limit=10"
    panel = document.querySelector('.pane5')

    getQuote(){
        return fetch(this.url);
    }

    async render() {
        let resp = await this.getQuote();
        let data = await resp.json();
        //console.log(data);
        let counter = Math.floor(Math.random() * 10);
        //console.log(counter);
        this.panel.innerHTML = `<h1>"${data[counter].text}"</h1><h2>-${data[counter].author}</h2>`
        
        setInterval(() => {
            counter += Math.floor(Math.random() * 10);
            //console.log(counter);
            this.panel.innerHTML = `<h1>"${data[counter % 1643].text}"</h1><h2>-${data[counter % 1643].author == null ? "Unknown" : data[counter % 1643].author}</h2>`
        }, 8500)
    }
}

export default Quote