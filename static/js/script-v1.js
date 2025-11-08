class myClass {
    constructor() {

        this.firstMethod(1, 2);  
    }
    firstMethod(x, y) {
        console.log('First Method:');
        this.firstMethod(3, 4);
        console.log(x + y);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new myClass();
});