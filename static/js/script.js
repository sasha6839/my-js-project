console.log('Start!')


class startGame {
    constructor() {
        this.width = document.getElementById('width');
        this.height = document.getElementById('height');
        this.startGameButton = document.getElementById('startGameButton');
        this.field = document.querySelector('.field');
        this.initEventListeners();
    }

    initEventListeners() {
        this.startGameButton.addEventListener('click', (e) => {
            console.log('StartGameButton was clicked');
            new fieldCreator(this.width_field, this.height_field);
        });
        this.width.addEventListener('change', (e) => {
            this.width_field = this.width.value;
            console.log('Width changed to:', this.width_field);
        });
        this.height.addEventListener('change', (e) => {
            this.height_field = this.height.value;
            console.log('Height changed to:', this.height_field);
        });
        
        //this.width.addEventListener('change', (e) => {
        //    console.log('Width changed to:', e.target.value);
        //});
    }
}

class fieldCreator {
    constructor(width_field, height_field) {
        this.field = document.querySelector('.field');
        for (let i = 1; i <= width_field * height_field; i++) {
            this.cells(i, this.width_field);
        };

    };

    cells (i, width_field) {
        console.log(i);
        if (i == width_field + 1) {
            console.log('br added');
            const br = document.createElement('br');
            this.field.appendChild(br);
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${i}`;
            this.field.appendChild(cell);
        } else {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${i}`;
            this.field.appendChild(cell);
        };
    };
}

document.addEventListener('DOMContentLoaded', () => {
    new startGame();    
});

