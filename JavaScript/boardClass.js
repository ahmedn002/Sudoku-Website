class Board {
    constructor(board) {
        this.board = board;
    }

    steps = []

    printBoard() {
        for (let row of this.board) {
            console.log(row);
        }
    }


    resetBoard() {
        for (let rowIndex = 0; rowIndex < this.board[0].length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.board.length; columnIndex++) {
                this.board[rowIndex][columnIndex] = 0;
            }
        }
    }

    getBoardCoordinates() {
        var coordinates = [];
        for (let rowIndex = 0; rowIndex < this.board[0].length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.board.length; columnIndex++) {
                coordinates.push([rowIndex, columnIndex]);
            }
        }

        return coordinates;
    }

    getEmptyCellCoordinates() {
        for (let rowIndex = 0; rowIndex < this.board.length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.board[0].length; columnIndex++) {

                if (this.board[rowIndex][columnIndex] === 0) {
                    return [rowIndex, columnIndex];
                }
            }
        }

        return 0;
    }

    generateBoard() {
        this.resetBoard()

        this.randomizeBlock(0, 0);
        this.randomizeBlock(1, 1);
        this.randomizeBlock(2, 2);

        this.solveBoard();

        // var difficulty = prompt('Choose a difficulty: [Easy, Medium, Hard, Expert]')
        // switch (difficulty) {
        //     case difficulty = 'Easy':
        //         difficulty = 38
        //         break;

        //     case difficulty = 'Medium':
        //         difficulty = 30
        //         break;

        //     case difficulty = 'Hard':
        //         difficulty = 25
        //         break;

        //     case difficulty = 'Expert':
        //         difficulty = 23
        //         break;
        
        //     default:
        //         difficulty = 38
        //         break;
        // }
        // console.log(difficulty)
        var difficulty = 35;
        const boardCoordinates = this.getBoardCoordinates();

        for (let loop = 0; loop < 81 - difficulty; loop++) {
            const randomIndex = Math.floor(Math.random() * boardCoordinates.length);

            const y = boardCoordinates[randomIndex][0]
            const x = boardCoordinates[randomIndex][1]

            boardCoordinates.splice(randomIndex, 1);

            this.board[y][x] = 0;
        }

        var hints = [];
        for (let rowIndex = 0; rowIndex < this.board.length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.board[0].length; columnIndex++) {
                if (this.board[rowIndex][columnIndex] !== 0) {
                    hints.push([rowIndex, columnIndex]);
                }
            }
        }

        this.hints = hints;
    }

    /***************************
     * *********ROW********** *
    ************************* */

    getRowIndices(rowIndex) {
        var indices = [];

        for (let columnIndex = 0; columnIndex < this.board.length; columnIndex++) {
            indices.push([rowIndex, columnIndex]);
        }

        return indices;
    }

    getRowNumbers(rowIndex, columnIndex) {
        const rowIndices = this.getRowIndices(rowIndex);

        var rowNumbers = [];
        for (let rowNumberIndex of rowIndices) {
            const y = rowNumberIndex[0];
            const x = rowNumberIndex[1];

            if (this.board[y][x] !== 0 && x !== columnIndex) {
                rowNumbers.push(this.board[y][x]);
            }
        }

        return rowNumbers;
    }

    /***************************
     * *******COLUMN********* *
    ************************* */

    getColumnIndices(columnIndex) {
        var indices = [];

        for (let rowIndex = 0; rowIndex < this.board[0].length; rowIndex++) {
            indices.push([rowIndex, columnIndex]);
        }

        return indices;
    }

    getColumnNumbers(rowIndex, columnIndex) {
        const columnIndices = this.getColumnIndices(columnIndex);

        var columnNumbers = [];
        for (let columnNumberIndex of columnIndices) {
            const y = columnNumberIndex[0];
            const x = columnNumberIndex[1];

            if (this.board[y][x] !== 0 && y !== rowIndex) {
                columnNumbers.push(this.board[y][x]);
            }
        }

        return columnNumbers;
    }

    /***************************
     * ********BLOCK********* *
    ************************* */

    getBlockIndex(rowIndex, columnIndex) {
        const blockIndexY = Math.floor(rowIndex / 3);
        const blockIndexX = Math.floor(columnIndex / 3);

        return [blockIndexY, blockIndexX];
    }

    getBlockIndices1(blockIndexY, blockIndexX) {
        var indices = [];

        for (let rowIndex = blockIndexY * 3; rowIndex < (blockIndexY + 1) * 3; rowIndex++) {
            for (let columnIndex = blockIndexX * 3; columnIndex < (blockIndexX + 1) * 3; columnIndex++) {
                indices.push([rowIndex, columnIndex]);
            }
        }

        return indices;
    }

    getBlockIndices2(rowIndex, columnIndex) {
        const blockIndexY = this.getBlockIndex(rowIndex, columnIndex)[0];
        const blockIndexX = this.getBlockIndex(rowIndex, columnIndex)[1];

        return this.getBlockIndices1(blockIndexY, blockIndexX)
    }

    getBlockNumbers(rowIndex, columnIndex) {
        const blockIndices = this.getBlockIndices2(rowIndex, columnIndex);

        var blockNumbers = [];
        for (let blockNumberIndex of blockIndices) {
            const y = blockNumberIndex[0];
            const x = blockNumberIndex[1];

            if (this.board[y][x] == 0 || (y == rowIndex && x == columnIndex)) {
                continue;
            } else {
                blockNumbers.push(this.board[y][x]);
            }
        }

        return blockNumbers;
    }

    randomizeBlock(blockIndexY, blockIndexX) {
        var solutions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        for (let index of this.getBlockIndices1(blockIndexY, blockIndexX)) {
            const randomIndex = Math.floor(Math.random() * solutions.length);
            const y = index[0];
            const x = index[1];

            this.board[y][x] = solutions[randomIndex];
            solutions.splice(randomIndex, 1);
        }
    }

    numberValid(rowIndex, columnIndex) {
        const number = this.board[rowIndex][columnIndex];

        const rowNumbers = this.getRowNumbers(rowIndex, columnIndex);
        const columnNumbers = this.getColumnNumbers(rowIndex, columnIndex);
        const blockNumbers = this.getBlockNumbers(rowIndex, columnIndex)
        
        const compareTo = rowNumbers.concat(columnNumbers, blockNumbers);

        if (compareTo.includes(number)) {
            return false;
        } else {
            return true;
        }
    }

    boardValid() {
        for (let rowIndex = 0; rowIndex < this.board[0].length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.board.length; columnIndex++) {
                if (!this.numberValid(rowIndex, columnIndex) || this.board[rowIndex][columnIndex] == 0) {
                    return false;
                }
            }
        }

        return true;
    }

    solveBoard() {
        if (this.getEmptyCellCoordinates() == 0) {
            return this.boardValid();
        }

        const emptyCell = this.getEmptyCellCoordinates();
        const y = emptyCell[0];
        const x = emptyCell[1];

        for (let solution = 1; solution < 10; solution++) {
            this.board[y][x] = solution;
            this.steps.push([y, x])
            this.steps.push(solution)
            if (this.numberValid(y, x)) {
                const solvedNext = this.solveBoard();

                if (solvedNext) {
                    return true;
                }
            }

            if (solution == 9) {
                this.board[y][x] = 0;
            }
        }
        
        return false
    }

    updateBoardHTML(board) {
        for (let rowIndex = 0; rowIndex < this.board[0].length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.board.length; columnIndex++) {

                document.getElementById(rowIndex + '-' + columnIndex).innerHTML = ''

                if (this.board[rowIndex][columnIndex] == 0) {
                    continue;
                } else {
                    document.getElementById(rowIndex + '-' + columnIndex).innerHTML = this.board[rowIndex][columnIndex]
                }
            }
        }
    }
}

function makeBoard(boardLength) {
    var board = [];
    for (let rowIndex = 0; rowIndex < boardLength; rowIndex++) {
        var row = [];
        for (let columnIndex = 0; columnIndex < boardLength; columnIndex++) {
            row.push(0);
        }
        board.push(row);
    }
    return board;
}

export var mainBoard = new Board(makeBoard(9));
export var generatedBoard = new Board(makeBoard(9));