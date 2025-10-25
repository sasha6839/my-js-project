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
        let x = 1;
        let row_break_position = [];
        for (let y = 1; y < height_field; y++) {   
            x = x + Number(width_field);
            console.log('Row break at position:', x);
            row_break_position.push(x); 
        };
        for (let i = 1; i <= width_field * height_field; i++) {
            this.cells(i, width_field, row_break_position);
        };
        new Game();
        

    };

    cells (i, width_field, row_break_position) {
        console.log(i + ' and ' + width_field);
        console.log(row_break_position);
        if (row_break_position.includes(i)) {
            console.log('row-break added');
            const div = document.createElement('div');
            div.className = 'row-break';
            this.field.appendChild(div);
            const cell = document.createElement('div');
            cell.className = 'closed-cell';
            cell.id = `cell-${i}`;
            this.field.appendChild(cell);
        } else {
            const cell = document.createElement('div');
            cell.className = 'closed-cell';
            cell.id = `cell-${i}`;
            this.field.appendChild(cell);
        };
    };
    // mineCreator(width_field, height_field) {
    //     let x
    //     let mines_positions = [];
    //     this.mines = height_field * width_field / 100 * 15;
    //     console.log('Mines to create:', this.mines);
    //     for (let i = 1; i <= this.mines; i++) {
    //         let mine_position = Math.floor(Math.random() * (width_field * height_field)) + 1;
    //         if (mines_positions.includes(`cell-${mine_position}`)) {
    //             mine_position = Math.floor(Math.random() * (width_field * height_field)) + 1;
    //         }  
    //         x = `cell-${mine_position}`;
    //         mines_positions.push(x);
    //         console.log(mines_positions);
    //     }
    // }; 
}

class Game {
    constructor() {
        console.log('Game started');
        this.cells = document.querySelectorAll('.closed-cell');
        this.initEventListener();
    };

    initEventListener() {
        let h
        this.addEventListener = this.cells.forEach(cell => {
            cell.addEventListener('click', (e) => {
                console.log('Cell clicked:', e.target.id);
                h = h + 1;
                if (h === 1) {
                    this.mineCreator(width_field, height_field, first_cell_clicked);
                    let first_cell_clicked = e.target.id;
                };
                cell.classList.remove('closed-cell');
                cell.classList.add('opened-cell');
                this.cellsChecker(e.target.id, this.mines_positions);
            });
        });
    };

    mineCreator(width_field, height_field, first_cell_clicked) {
        let x
        let mines_positions = [];
        this.mines = height_field * width_field / 100 * 15;
        console.log('Mines to create:', this.mines);
        for (let i = 1; i <= this.mines; i++) {
            let mine_position = Math.floor(Math.random() * (width_field * height_field)) + 1;
            if (mines_positions.includes(`cell-${mine_position}`)) {
                mine_position = Math.floor(Math.random() * (width_field * height_field)) + 1;
            } 
            if (mine_position == first_cell_clicked) {
                mine_position = Math.floor(Math.random() * (width_field * height_field)) + 1;
            }   
            x = `cell-${mine_position}`;
            mines_positions.push(x);
            console.log(mines_positions);
        }
    }; 

    cellsChecker(id, mines_positions) {
        console.log('Checking cell:', id);
        if (mines_positions.includes(id)) {
            console.log('Boom! Mine hit at', id);
            alert('Game Over! You hit a mine at ' + id);
        }

    };




}

document.addEventListener('DOMContentLoaded', () => {
    new startGame();    
});

