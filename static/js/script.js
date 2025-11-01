console.log('Start!')

class startGame {
    constructor() {
        this.width = document.getElementById('width');
        this.height = document.getElementById('height');
        this.startGameButton = document.getElementById('startGameButton');
        this.field = document.querySelector('.field');
        this.initEventListeners();
    };

    initEventListeners() {

    };
}

document.addEventListener('DOMContentLoaded', () => {
    new startGame();    
});