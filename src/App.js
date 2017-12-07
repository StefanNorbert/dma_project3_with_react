import React from 'react';
import Table from './components/Table';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            cellValues: this.fakeContent0(),
            // cellValues: this.fakeContent(),
            emptyCells: 16
        };
        this.rows = {
            0: [0,1,2,3],
            1: [4,5,6,7],
            2: [8,9,10,11],
            3: [12,13,14,15]
        };
        this.columns = {
            0: [0,4,8,12],
            1: [1,5,9,13],
            2: [2,6,10,14],
            3: [3,7,11,15]
        };
    }

    fakeContent(){
        let cells = new Array(16).fill(0);
        cells[0] = 2;
        cells[1] = 4;
        cells[2] = 8;
        cells[3] = 16;
        cells[4] = 32;
        cells[5] = 64;
        cells[6] = 128;
        cells[7] = 256;
        cells[8] = 512;
        cells[9] = 1024;
        cells[10] = 2048;
        cells[11] = 4084;
        cells[12] = 999;
        cells[13] = 111;
        cells[14] = 222;
        cells[15] = 0;
        return cells;
    }

    fakeContent0(){
        let arr = new Array(16).fill(0);
        let rNum = Math.floor(Math.random()*arr.length);
        arr[rNum] = Math.random()>0.8 ? 4 : 2;
        let rNum2 = rNum;
        while(rNum2 === rNum){
            rNum2 = Math.floor(Math.random()*arr.length);
        }
        arr[rNum2] = Math.random()>0.8 ? 4 : 2;
        return arr;
    }

    handleKeyDown = (e) => {
        let changes = false;
        let whatToMove = '';
        let row = 0;
        let column = 0;
        switch(e.which) {
            case 37:
                whatToMove = 'columns';
                column = 0;
                changes = this.move(column, whatToMove);
                break;
            case 38:
                whatToMove = 'rows';
                row = 0;
                changes = this.move(row, whatToMove);
                break;
            case 39:
                whatToMove = 'columns';
                column = 3;
                changes = this.move(column, whatToMove);
                break;
            default:
                whatToMove = 'rows';
                row = 3;
                changes = this.move(row, whatToMove);
        }
        if(changes){
            this.newNumber();
            // setTimeout(this.newNumber, 500);
        }
    };

    move = (start, what) => {
        let changes = false;
        let values = [...this.state.cellValues];
        let sign = 0;
        let current = start;
        if(start === 0){
            sign = 1;
        } else if(start === 3){
            sign = -1;
        }

        const unite = () => {
            for(let i=0; i<4; i++){
                let moreToDo = false;
                do {
                    moreToDo = false;
                    if(values[this[what][current][i]]){
                        //try unite
                        let found = false;
                        let y = current + sign;
                        while(!found && !(y === 4 || y === -1)){
                            if(values[this[what][current][i]] === values[this[what][y][i]]){
                                found = true;
                                values[this[what][current][i]] *= 2;
                                values[this[what][y][i]] = 0;
                            } else if(values[this[what][y][i]]){
                                found = true;
                            }
                            y += sign;
                        }
                    } else {
                        //try move
                        let found = false;
                        let y = current + sign;
                        while(!found && !(y === 4 || y === -1)){
                            if(values[this[what][y][i]]){
                                found = true;
                                values[this[what][current][i]] = values[this[what][y][i]];
                                values[this[what][y][i]] = 0;
                                moreToDo = true;
                            }
                            y += sign;
                        }
                    }
                } while (moreToDo);
            }
        };

        while(current < 4 && current > -1){
            unite();
            current += sign;
        }
        if(this.state.cellValues.join(',') !== values.join(',')){
            changes = true;
        }
        this.setState({cellValues: values});
        return changes;
    };

    newNumber = () => {
        const movesLeft = () => {
            for(let row=0; row<=3; row++){
                for(let i=0; i<3; i++){
                    if(row<3){
                        console.log('comparing: ', cellValues[this.rows[row][i]], cellValues[this.rows[row][i+1]]);
                        if(cellValues[this.rows[row][i]] === cellValues[this.rows[row][i+1]]){
                            return true;
                        }
                        console.log('comparing: ', cellValues[this.rows[row][i]], cellValues[this.rows[row+1][i]]);
                        if(cellValues[this.rows[row][i]] === cellValues[this.rows[row+1][i]]){
                            return true;
                        }
                    } else {
                        console.log('comparing: ', cellValues[this.rows[row][i]], cellValues[this.rows[row][i+1]]);
                        if(cellValues[this.rows[row][i]] === cellValues[this.rows[row][i+1]]){
                            return true;
                        }
                    }
                }
            }
            for(let row=0; row<3; row++){
                console.log('comparing: ', cellValues[this.rows[row][3]], cellValues[this.rows[row+1][3]]);
                if((cellValues[this.rows[row][3]] === cellValues[this.rows[row+1][3]])){
                    return true;
                }
            }
            return false;
        };

        let cellValues = this.state.cellValues.slice();
        let emptyCells = [];
        cellValues.forEach((value, i) => {
            if(value === 0){
                emptyCells.push(i);
            }
        });
        const rNum = Math.floor(Math.random()*emptyCells.length);
        const cellValuesIndex = emptyCells[rNum];
        emptyCells[rNum] = Math.random()>0.8 ? 4 : 2;
        cellValues[cellValuesIndex] = emptyCells[rNum];
        if(emptyCells.length <= 1) {
            const moreMovesleft = movesLeft();
            if(!moreMovesleft){
                this.gameOver();
            }
        }
        this.setState({
            cellValues: cellValues,
            emptyCells: emptyCells.length - 1
        });
    };

    gameOver = () => {
        window.removeEventListener('keydown', this.handleKeyDown);
        console.log('You lost !');
    };

    componentDidMount(){
        window.addEventListener('keydown', this.handleKeyDown);
        // console.log('rows: ', this.rows);
    }

    render() {
        return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">2048</h1>
            </header>
            <p className="score">Score: <span>0</span></p>
            <Table values={this.state.cellValues}/>
        </div>
        );
    }
}

export default App;
