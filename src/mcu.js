/*fetch("https://www.whenisthenextmcufilm.com/api")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let pane3 = document.querySelector('.pane3');
        pane3.innerHTML = `${data.days_until} days left until the ${data.type} ${data.title} is released!`;
        pane3.style.backgroundImage = `url(${data.poster_url})`
    });*/

class Movie {
    url = "https://www.whenisthenextmcufilm.com/api"
    panel = document.querySelector('.pane3');

    giveMovie() {
        return fetch(`https://www.whenisthenextmcufilm.com/api`)
    }

    async render() {
        //this.getMovie();
        let resp = await this.giveMovie()
        //console.log(resp);
        let data = await resp.json();
        //console.log(data);

        let movieCounter = 1;
        let panel = document.querySelector('.pane4');

        panel.textContent = `${data.days_until} ${data.days_until == 1 ? "day" : "days"} left until the ${(data.type).toLowerCase()} ${data.title} is released!`
        panel.style.backgroundImage = `url(${data.poster_url})`
        setInterval(async () => {
            //console.log(data);
            if (movieCounter % 2 == 0) {
                panel.textContent = `${data.days_until} ${data.days_until == 1 ? "day" : "days"} left until the ${(data.type).toLowerCase()} ${data.title} is released!`
                panel.style.backgroundImage = `url(${data.poster_url})`
            }
            else if (movieCounter % 2 == 1) {
                panel.textContent = `${data.following_production.days_until} days left until the ${(data.following_production.type).toLowerCase()} ${data.following_production.title} is released!`
                panel.style.backgroundImage = `url(${data.following_production.poster_url})`
            }
            movieCounter++
        }, 7500)
    }
}

export default Movie