class Weather {
    api_key = "596ae1f484fbca7c38d195ab3fff03d5"
    lat = 29.9956188;
    long = -95.6519160;

    cypress = {
        city: "Cypress, TX",
        lat: 29.9956188,
        long: -95.6519160
    }

    austin = {
        city: "Austin, TX",
        lat: 30.2666,
        long: -97.7333
    }

    chicago = {
        city: "Chicago, IL",
        lat: 41.881832,
        long: -87.623177
    }

    london = {
        city: "London, UK",
        lat: 51.509865,
        long: -0.118092
    }

    giveWeather(city) {
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.long}&exclude=alerts&appid=${this.api_key}`)
    }

    kelToFar(temp) {
        return Math.floor(((temp) - 273.15) * (9 / 5) + 32)
    }



    async render() {
        let cities = [this.cypress, this.austin, this.chicago, this.london]
        let cityCount = 0;
        let tomo = new Date();
        tomo.setDate(tomo.getDate() + 1);
        let twoDay = new Date();
        twoDay.setDate(twoDay.getDate() + 2);
        let threeDay = new Date();
        threeDay.setDate(threeDay.getDate() + 3);

        let resp = await this.giveWeather(cities[cityCount]);
        let data = await resp.json();
        console.log(data);
        let pane4 = document.querySelector('.pane3');
        pane4.innerHTML = `<h1>${cities[cityCount % 4].city}</h1><h1>${this.kelToFar(data.current.temp)}&#176;</h1>
                <p class="weather-list"><i class="fas fa-cloud-rain"></i> ${data.hourly[0].pop * 100}% <br>High: ${this.kelToFar(data.daily[0].temp.max)}, Low: ${this.kelToFar(data.daily[0].temp.min)}
                <br><span class="date">${tomo.getUTCMonth() + 1}/${tomo.getUTCDate()}</span>&emsp; <i class="fas fa-cloud-rain"></i> ${data.daily[1].pop * 100}%&emsp; High: ${this.kelToFar(data.daily[1].temp.max)}, Low: ${this.kelToFar(data.daily[1].temp.min)}
                <br><span class="date">${twoDay.getUTCMonth() + 1}/${twoDay.getUTCDate()}</span>&emsp; <i class="fas fa-cloud-rain"></i> ${data.daily[2].pop * 100}%&emsp; High: ${this.kelToFar(data.daily[2].temp.max)}, Low: ${this.kelToFar(data.daily[2].temp.min)}
                <br><span class="date">${threeDay.getUTCMonth() + 1}/${threeDay.getUTCDate()}</span>&emsp; <i class="fas fa-cloud-rain"></i> ${data.daily[3].pop * 100}%&emsp; High: ${this.kelToFar(data.daily[3].temp.max)}, Low: ${this.kelToFar(data.daily[3].temp.min)}</p>`
        
        setInterval(async () => {
            cityCount++;
            resp = await this.giveWeather(cities[cityCount % 4])
            data = await resp.json();

            let pane4 = document.querySelector('.pane3');
                pane4.innerHTML = `<h1>${cities[cityCount % 4].city}</h1><h1>${this.kelToFar(data.current.temp)}&#176;</h1>
                <p class="weather-list"><i class="fas fa-cloud-rain"></i> ${data.hourly[0].pop * 100}% <br>High: ${this.kelToFar(data.daily[0].temp.max)}, Low: ${this.kelToFar(data.daily[0].temp.min)}
                <br><span class="date">${tomo.getUTCMonth() + 1}/${tomo.getUTCDate()}</span>&emsp; <i class="fas fa-cloud-rain"></i> ${data.daily[1].pop * 100}%&emsp; High: ${this.kelToFar(data.daily[1].temp.max)}, Low: ${this.kelToFar(data.daily[1].temp.min)}
                <br><span class="date">${twoDay.getUTCMonth() + 1}/${twoDay.getUTCDate()}</span>&emsp; <i class="fas fa-cloud-rain"></i> ${data.daily[2].pop * 100}%&emsp; High: ${this.kelToFar(data.daily[2].temp.max)}, Low: ${this.kelToFar(data.daily[2].temp.min)}
                <br><span class="date">${threeDay.getUTCMonth() + 1}/${threeDay.getUTCDate()}</span>&emsp; <i class="fas fa-cloud-rain"></i> ${data.daily[3].pop * 100}%&emsp; High: ${this.kelToFar(data.daily[3].temp.max)}, Low: ${this.kelToFar(data.daily[3].temp.min)}</p>`
        }, 8000)
    }
}

export default Weather