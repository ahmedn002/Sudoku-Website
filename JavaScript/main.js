import { mainBoard, generatedBoard } from './boardClass.js';
import { resetCellColors, duplicateBoard, findSelectedCell, highlightCell, highlightMistakes } from './visualFunctions.js';

document.getElementById('generate').addEventListener('click', function() {
    generatedBoard.generateBoard();
    generatedBoard.updateBoardHTML();

    duplicateBoard(generatedBoard, mainBoard);
})

document.getElementById('solve').addEventListener('click', function() {
    mainBoard.solveBoard();
    mainBoard.updateBoardHTML();
})

document.getElementById('check').addEventListener('click', function() {
    alert(generatedBoard.boardValid())
})

document.getElementById('board').addEventListener('click', function(event) {
    resetCellColors(generatedBoard);

    const rowIndex = +event.target.id[0];
    const columnIndex = +event.target.id[2];

    highlightCell(generatedBoard, rowIndex, columnIndex,'#C5C5C5', '#8195B5');
})

document.addEventListener('keydown', function(event) {
    const selectedCellIndex = findSelectedCell(generatedBoard, 'rgb(197, 197, 197)');
    resetCellColors(generatedBoard);
    highlightCell(generatedBoard, selectedCellIndex[0], selectedCellIndex[1],'#C5C5C5', '#8195B5');

    const validSolutions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const solution = +event.key
    if (validSolutions.includes(solution)) {
        generatedBoard.board[selectedCellIndex[0]][selectedCellIndex[1]] = solution;
        generatedBoard.updateBoardHTML()
    } else {
        return 0;
    }
    
    highlightMistakes(generatedBoard, selectedCellIndex[0], selectedCellIndex[1], 'red');
})