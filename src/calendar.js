class Calendar {
    calendarSheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT9TQAbaj5wnSisL_weh3KfDJ_SGIivInBDt7imLvVQx6EQNrQ1O3aQd95MlaT5btDCLkZetCYQcHPP/pub?output=csv";

    async getData(url) {
        const response = await fetch(url);
        return response.text();
    }

    createCalendar(panel)
    {
        
    }

    render() {
        let panel = document.querySelector('.pane2');
        let panelList = document.querySelector('.panel2 ul')
        this.createCalendar(panel)

        this.getData(this.calendarSheet).then((data) => {
            const events = data
                .split(/\r?\n/).map((l) => l.split(","))
                .map((event) => {
                    return { date: event[0], title: event[1] };
                });
            //console.log(events);
            for(let event of events)
            {
                //console.log(`You have ${event.title} on ${event.date.split('T')[0]}`)
                let li = document.createElement('li');
                    li.innerHTML = `You have ${event.title} on ${event.date.split('T')[0]}`
                    panel.appendChild(li);
            }
        })
    }
}

export default Calendar

