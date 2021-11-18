

class Countdown{
    var1;
    var2;
    constructor(var1, var2){
        this.var1 = var1;
        this.var2 = var2;
    }

    setState(){

    }

    render(){
        const pane1 = document.querySelector('.pane1');
        setInterval(()=>pane1.innerHTML=this.var1++,1000);
    }



}

export default Countdown;