


class startGame {
    constructor() {
        this.width = document.getElementById('width');
        this.height = document.getElementById('height');
        this.startGameButton = document.getElementById('startGameButton');
    }

    initEventListeners() {
        this.startGameButton.addEventListener('click', (e) => {
            console.log('StartGameButton was clicked');
        });
        
        //this.width.addEventListener('change', (e) => {
        //    console.log('Width changed to:', e.target.value);
        //});
    }
}
