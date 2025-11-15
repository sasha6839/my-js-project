console.log('Start!')

class FieldCreator {
    constructor() {
        this.fieldDiv = document.querySelector('.field');
    }

    fieldCreate(width, height) {
        console.log('Creating field with width:', width, 'and height:', height);        
        let field = [];
        for (let i = 0; i < height; i++) {
            let row = [];
            for (let j = 0; j < width; j++) {
                row.push({x : j + 1, y : i + 1, status : 'closed', num : 0, hasMine : false});
            }
            field.push(row);
        }



        // let field = [
        //     [
        //     {x : 1, y : 1, status : 'closed', num : 0, hasMine : false},
        //     {x : 2, y : 1, status : 'closed', num : 0, hasMine : false},
        //     {x : 3, y : 1, status : 'closed', num : 0, hasMine : false},
        //     {x : 4, y : 1, status : 'closed', num : 0, hasMine : false},
        //     {x : 5, y : 1, status : 'closed', num : 0, hasMine : false}
        //     ],
        //     [
        //     {x : 1, y : 2, status : 'closed', num : 0, hasMine : false},
        //     {x : 2, y : 2, status : 'closed', num : 0, hasMine : false},
        //     {x : 3, y : 2, status : 'closed', num : 0, hasMine : false},
        //     {x : 4, y : 2, status : 'closed', num : 0, hasMine : false},
        //     {x : 5, y : 2, status : 'closed', num : 0, hasMine : false}
        //     ],
        //     [
        //     {x : 1, y : 3, status : 'closed', num : 0, hasMine : false},
        //     {x : 2, y : 3, status : 'closed', num : 0, hasMine : false},
        //     {x : 3, y : 3, status : 'closed', num : 0, hasMine : false},
        //     {x : 4, y : 3, status : 'closed', num : 0, hasMine : false},
        //     {x : 5, y : 3, status : 'closed', num : 0, hasMine : false}
        //     ],
        // ]
        console.log(field);
        this.drawField(this.fieldDiv, field);
        new Game(field);
    }

    drawField(fieldDiv, field) {
        fieldDiv.innerHTML = '';
        field.forEach((row, rowIndex) => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
            fieldDiv.appendChild(rowDiv);
            row.forEach((cell, cellIndex) => {
                const cellDiv = document.createElement('div');
                cellDiv.id = `cell-${cellIndex + 1}-${rowIndex + 1}`;
                cellDiv.classList.remove(cellDiv.classList.item(0));
                if (cell.status === 'closed') {
                    cellDiv.classList.add('closed-cell');
                } else if (cell.status === 'opened') {
                    if (cell.hasMine) {
                        cellDiv.classList.add('cell-mine');
                    } else if (cell.num == 0) {
                        cellDiv.classList.add('cell-0');
                    } else if (cell.num == 1) {
                        cellDiv.classList.add('cell-1');
                    } else if (cell.num == 2) {
                        cellDiv.classList.add('cell-2');
                    } else if (cell.num == 3) {
                        cellDiv.classList.add('cell-3');
                    } else if (cell.num == 4) {
                        cellDiv.classList.add('cell-4');
                    } else if (cell.num == 5) {
                        cellDiv.classList.add('cell-5');
                    } else if (cell.num == 6) {
                        cellDiv.classList.add('cell-6');
                    } else if (cell.num == 7) {
                        cellDiv.classList.add('cell-7');
                    } else if (cell.num == 8) {
                        cellDiv.classList.add('cell-8');
                    }
                } else if (cell.status === 'flaged') {
                    cellDiv.classList.add('cell-flag');
                }
                rowDiv.appendChild(cellDiv);
            });
        });
    }
}

class Game {
    constructor(field) {
        this.mode = 'openCellMode';
        console.log('game started');
        this.fieldDiv = document.querySelector('.field');
        this.cells = document.querySelectorAll('.closed-cell');
        this.changeModeButton = document.getElementById('modeChange');
        console.log(field);
        this.initGameListeners(field);
    }

    initGameListeners(field) {
        let turnCount = 0; 
        this.changeModeButton.addEventListener('click', (e) => {
            console.log('Change mode button clicked');
            if (this.changeModeButton.innerText == 'Open cell mode') {
                this.changeModeButton.innerText = 'Flag mode';
                this.mode = 'openCellMode';
                console.log('Mode changed to openCellMode');
            } else if (this.changeModeButton.innerText == 'Flag mode') {
                this.changeModeButton.innerText = 'Open cell mode';
                this.mode = 'flagMode';
                console.log('Mode changed to flagMode');
            }
        });
        this.fieldDiv.addEventListener('click', (e) => {
            console.log('Field was clicked', e.target.id);
            if (this.mode == 'openCellMode') {
                if (turnCount == 0) {
                    this.mineCreator(field, e.target.id);
                    turnCount += 1;
                }

                let x = e.target.id.split('-')[1];
                let y = e.target.id.split('-')[2];
                field.forEach((row) => {
                    row.forEach((cell) => {
                        if ((cell.x == x && cell.y == y && cell.status == 'closed' && cell.status != 'flaged')) {
                            this.cellOpener(field, x, y);
                        }
                    });
                });


            } else if (this.mode == 'flagMode') {
                let x = e.target.id.split('-')[1];
                let y = e.target.id.split('-')[2];
                field.forEach((row) => {
                    row.forEach((cell) => {
                        if ((cell.x == x && cell.y == y && cell.status == 'closed') || (cell.x == x && cell.y == y && cell.status == 'flaged')) {
                            this.flagMaker(field, x, y);
                        }
                    });
                });
            }
        });

    }

    flagMaker(field, x, y) {
        console.log('Flagging cell at ', x, y);
        field.forEach((row) => {
            row.forEach((cell) => {
                if (cell.x == x && cell.y == y) {
                    if (cell.status == 'closed') {
                        cell.status = 'flaged';
                    } else if (cell.status == 'flaged') {
                        cell.status = 'closed';
                    }
                    const fieldCreator = new FieldCreator();
                    fieldCreator.drawField(this.fieldDiv, field);
                }
            });
        });
    }

    cellOpener(field, x, y) {
        console.log('Opening cell at ', x, y);
        field.forEach((row, rowIndex) => {
            row.forEach((cell) => {
                if (cell.x == x && cell.y == y) {
                    cell.status = 'opened';
                    const fieldCreator = new FieldCreator();
                    fieldCreator.drawField(this.fieldDiv, field);
                    if (cell.hasMine) {
                        console.log('Game Over! You clicked on a mine at ', x, y);
                        alert('Game Over! You clicked on a mine.');
                    } else if (cell.num == 0 && cell.hasMine == false) {
                        field.forEach((r, rI) => {
                            if (rowIndex + 1 == rI) {
                                r.forEach((c, cI) => {
                                    if (cell.x + 1 == c.x) {
                                        if ((c.num == 0 && c.status == 'closed') || (c.num == 0 && c.status == 'flaged')) {
                                            this.cellOpener(field, c.x, c.y);
                                        } else if ((c.num > 0 && c.status == 'closed') || (c.num > 0 && c.status == 'flaged')) {
                                            console.log('Opened cell at ', c.x, c.y);
                                            c.status = 'opened';
                                            fieldCreator.drawField(this.fieldDiv, field);
                                        }
                                    } else if (cell.x - 1 == c.x) {
                                        if ((c.num == 0 && c.status == 'closed') || (c.num == 0 && c.status == 'flaged')) {
                                            this.cellOpener(field, c.x, c.y);
                                        } else if ((c.num > 0 && c.status == 'closed') || (c.num > 0 && c.status == 'flaged')) {
                                            console.log('Opened cell at ', c.x, c.y);
                                            c.status = 'opened';
                                            fieldCreator.drawField(this.fieldDiv, field);
                                        }
                                    } else if (cell.x == c.x) {
                                        if ((c.num == 0 && c.status == 'closed') || (c.num == 0 && c.status == 'flaged')) {
                                            this.cellOpener(field, c.x, c.y);
                                        } else if ((c.num > 0 && c.status == 'closed') || (c.num > 0 && c.status == 'flaged')) {
                                            console.log('Opened cell at ', c.x, c.y);
                                            c.status = 'opened';
                                            fieldCreator.drawField(this.fieldDiv, field);
                                        }
                                    }
                                });
                            } else if (rowIndex == rI) {
                                r.forEach((c, cI) => {
                                    if (cell.x + 1 == c.x) {
                                        if ((c.num == 0 && c.status == 'closed') || (c.num == 0 && c.status == 'flaged')) {
                                            this.cellOpener(field, c.x, c.y);
                                        } else if ((c.num > 0 && c.status == 'closed') || (c.num > 0 && c.status == 'flaged')) {
                                            console.log('Opened cell at ', c.x, c.y);
                                            c.status = 'opened';
                                            fieldCreator.drawField(this.fieldDiv, field);
                                        }
                                    } else if (cell.x - 1 == c.x) {
                                        if ((c.num == 0 && c.status == 'closed') || (c.num == 0 && c.status == 'flaged')) {
                                            this.cellOpener(field, c.x, c.y);
                                        } else if ((c.num > 0 && c.status == 'closed') || (c.num > 0 && c.status == 'flaged')) {
                                            console.log('Opened cell at ', c.x, c.y);
                                            c.status = 'opened';
                                            fieldCreator.drawField(this.fieldDiv, field);
                                        }
                                    }
                                });
                            } else if (rowIndex - 1 == rI) {
                                r.forEach((c, cI) => {
                                    if (cell.x + 1 == c.x) {
                                        if ((c.num == 0 && c.status == 'closed') || (c.num == 0 && c.status == 'flaged')) {
                                            this.cellOpener(field, c.x, c.y);
                                        } else if ((c.num > 0 && c.status == 'closed') || (c.num > 0 && c.status == 'flaged')) {
                                            console.log('Opened cell at ', c.x, c.y);
                                            c.status = 'opened';
                                            fieldCreator.drawField(this.fieldDiv, field);
                                        }
                                    } else if (cell.x - 1 == c.x) {
                                        if ((c.num == 0 && c.status == 'closed') || (c.num == 0 && c.status == 'flaged')) {
                                            this.cellOpener(field, c.x, c.y);
                                        } else if ((c.num > 0 && c.status == 'closed') || (c.num > 0 && c.status == 'flaged')) {
                                            console.log('Opened cell at ', c.x, c.y);
                                            c.status = 'opened';
                                            fieldCreator.drawField(this.fieldDiv, field);
                                        }
                                    } else if (cell.x == c.x) {
                                        if ((c.num == 0 && c.status == 'closed') || (c.num == 0 && c.status == 'flaged')) {
                                            this.cellOpener(field, c.x, c.y);
                                        } else if ((c.num > 0 && c.status == 'closed') || (c.num > 0 && c.status == 'flaged')) {
                                            console.log('Opened cell at ', c.x, c.y);
                                            c.status = 'opened';
                                            fieldCreator.drawField(this.fieldDiv, field);
                                        }
                                    }
                                });
                            }
                        });
                    }
                }
            });
        });
    }

    mineCreator(field, firstClickId) {
        const cells = field.flat();

        let x = firstClickId.split('-')[1];
        let y = firstClickId.split('-')[2];

        cells.forEach(cell => cell.hasMine = false);
        
        const firstX = Number(x);
        const firstY = Number(y);

        let eligible = cells.filter(cell => !(cell.x === cell.y) && !(cell.x === firstX && cell.y === firstY));

        if (eligible.length === 0) {
            eligible = cells.filter(cell => !(cell.x === firstX && cell.y === firstY));
        }

        cells.length = 0;
        eligible.forEach(c => cells.push(c));

    const total = cells.length;
    if (total === 0) return;

    // Determine mines count: prefer server-provided value, otherwise use ~15% of cells
    const cfgMines = (typeof window !== 'undefined' && window.GAME_CONFIG && window.GAME_CONFIG.mines) ? Number(window.GAME_CONFIG.mines) : NaN;
    let minesCount = Number.isFinite(cfgMines) && cfgMines > 0 ? cfgMines : Math.max(1, Math.floor(total * 0.15));

        for (let i = cells.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cells[i], cells[j]] = [cells[j], cells[i]];
        }

        for (let k = 0; k < minesCount; k++) {
            cells[k].hasMine = true;
        }

        this.numberPlace(field);

        console.log(`Placed ${minesCount} mine(s) randomly.`);
    }

    numberPlace(field) {
        field.forEach((row, rowIndex) => {
            row.forEach((cell) => {
                if (cell.hasMine) {
                    field.forEach((r, rI) => {
                        if (rowIndex + 1 == rI) {
                            r.forEach((c, cI) => {
                                if (cell.x + 1 == c.x && c.hasMine == false) {
                                    c.num += 1;
                                } else if (cell.x - 1 == c.x && c.hasMine == false) {
                                    c.num += 1;
                                } else if (cell.x == c.x && c.hasMine == false) {
                                    c.num += 1;
                                }
                            });
                        } else if (rowIndex == rI) {
                            r.forEach((c, cI) => {
                                if (cell.x + 1 == c.x && c.hasMine == false) {
                                    c.num += 1;
                                } else if (cell.x - 1 == c.x && c.hasMine == false) {
                                    c.num += 1;
                                }
                            });
                        } else if (rowIndex - 1 == rI) {
                            r.forEach((c, cI) => {
                                if (cell.x + 1 == c.x && c.hasMine == false) {
                                    c.num += 1;
                                } else if (cell.x - 1 == c.x && c.hasMine == false) {
                                    c.num += 1;
                                } else if (cell.x == c.x && c.hasMine == false) {
                                    c.num += 1;
                                }
                            });
                        }
                    });
                }
            });
        });
    }


}


document.addEventListener('DOMContentLoaded', () => {
    // When opened via /game, server injects GAME_CONFIG into the page.
    const cfg = (typeof window !== 'undefined' && window.GAME_CONFIG) ? window.GAME_CONFIG : {};
    const cols = Number(cfg.cols) || 9;   // width
    const rows = Number(cfg.rows) || 9;   // height

    // Initialize field using server-provided config (or defaults)
    const fieldCreator = new FieldCreator();
    fieldCreator.fieldCreate(cols, rows);
});