class Giphy{
    api_key = '9b4V7GqPvj8MtNh9x165FjzGJQvImDzu';
    gifArr = ['cat','dog','horse','hamster']
    gifPane = document.querySelector('.pane2');
    constructor(){
       
    }

    getGif(search){
        //console.log("I made it this far");
        return fetch(`https://api.giphy.com/v1/gifs/search?api_key=${this.api_key}&q=${search}&limit=1`)
    }

    
    render(){
        //console.log("I made it this far");
        let counter =0;
        setInterval(async()=>{
            if(counter===this.gifArr.length) counter=0;
            let resp = await this.getGif(this.gifArr[counter])
            let {data} = await resp.json();
            let imgUrl = data[0].images.original.url;
            this.gifPane.innerHTML=`<img class="gif" src="${imgUrl}" alt="${this.gifArr[counter]}"/>`
            counter++;
        },5000);
    }



}

export default Giphy;