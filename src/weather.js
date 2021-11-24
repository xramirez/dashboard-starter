class Weather {
    api_key = "596ae1f484fbca7c38d195ab3fff03d5"
    lat = 29.9956188;
    long = -95.6519160;

    kelToFar(temp)
    {
        return Math.floor(((temp) - 273.15) * (9 / 5) + 32)
    }

    render() {
        let tomo = new Date();
        tomo.setDate(tomo.getDate() + 1);
        let twoDay = new Date();
        twoDay.setDate(twoDay.getDate() + 2);
        let threeDay = new Date();
        threeDay.setDate(threeDay.getDate() + 3);

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.long}&exclude=alerts&appid=${this.api_key}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                //console.log(`Current Temp: ${Math.floor(((data.current.temp) - 273.15) * (9 / 5) + 32)} and ${data.current.weather[0].description}`);
                let pane4 = document.querySelector('.pane3');
                pane4.innerHTML = `<h1>${this.kelToFar(data.current.temp)} <i class="fas fa-cloud" style="color:lightgray"></i></i></h1>
                <p class="weather-list"><i class="fas fa-cloud-rain"></i> ${data.hourly[0].pop * 100}% <br>High: ${this.kelToFar(data.daily[0].temp.max)}, Low: ${this.kelToFar(data.daily[0].temp.min)}
                <br><span class="date">${tomo.getUTCMonth() + 1}/${tomo.getUTCDate()}</span>&emsp; <i class="fas fa-cloud-rain"></i> ${data.daily[1].pop * 100}%&emsp; High: ${this.kelToFar(data.daily[1].temp.max)}, Low: ${this.kelToFar(data.daily[1].temp.min)}
                <br><span class="date">${twoDay.getUTCMonth() + 1}/${twoDay.getUTCDate()}</span>&emsp; <i class="fas fa-cloud-rain"></i> ${data.daily[2].pop * 100}%&emsp; High: ${this.kelToFar(data.daily[2].temp.max)}, Low: ${this.kelToFar(data.daily[2].temp.min)}
                <br><span class="date">${threeDay.getUTCMonth() + 1}/${threeDay.getUTCDate()}</span>&emsp; <i class="fas fa-cloud-rain"></i> ${data.daily[3].pop * 100}%&emsp; High: ${this.kelToFar(data.daily[3].temp.max)}, Low: ${this.kelToFar(data.daily[3].temp.min)}</p>`

                
            });
    }
}

export default Weather