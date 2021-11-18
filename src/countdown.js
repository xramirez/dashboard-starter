

class Test{
    var1;
    var2;
    constructor(var1, var2){
        this.var1 = var1;
        this.var2 = var2;
    }

    setState(){

    }

    render(){
        const test = document.querySelector('.pane1');
        setInterval(()=>test.innerHTML=this.var1++,1000);
    }



}

export default Test;