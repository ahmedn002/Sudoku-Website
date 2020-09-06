export function resetCellColors(board) {
    for (let rowIndex = 0; rowIndex < board.board.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < board.board[0].length; columnIndex++) {
            document.getElementById(rowIndex + '-' + columnIndex).style.background = '#EBEBEB';
        }
    }
}

export function highlightCell(board, rowIndex, columnIndex, cellColor, intersectionColor) {
    const rowIndices = board.getRowIndices(rowIndex);
    const columnIndices = board.getColumnIndices(columnIndex);
    const blockIndices = board.getBlockIndices2(rowIndex, columnIndex);
    
    const intersectionCells = rowIndices.concat(columnIndices, blockIndices);

    for (let hintIndex of board.hints) {
        if (rowIndex === hintIndex[0] && columnIndex === hintIndex[1]) {
            return 0;
        }
    }
    
    for (let index of intersectionCells) {
        document.getElementById(index[0] + '-' + index[1]).style.background = intersectionColor;
    }

    document.getElementById(rowIndex + '-' + columnIndex).style.background = cellColor;
}

export function highlightMistakes(board, rowIndex, columnIndex, color) {
    const rowIndices = board.getRowIndices(rowIndex);
    const columnIndices = board.getColumnIndices(columnIndex);
    const blockIndices = board.getBlockIndices2(rowIndex, columnIndex);
    
    const intersectionCells = rowIndices.concat(columnIndices, blockIndices);

    for (let index of intersectionCells) {
        if (board.board[index[0]][index[1]] == board.board[rowIndex][columnIndex]
            && JSON.stringify([rowIndex, columnIndex]) != JSON.stringify(index)) {
                document.getElementById(index[0] + '-' + index[1]).style.background = color;
            }
    }
}

export function duplicateBoard(duplicateFrom, duplicateTo) {
    for (let i = 0; i < duplicateFrom.board.length; i++) {
        duplicateTo.board[i] = duplicateFrom.board[i].slice()
    }
}

export function findSelectedCell(board, color) {
    for (let rowIndex = 0; rowIndex < board.board.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < board.board[0].length; columnIndex++) {
           if (document.getElementById(rowIndex + '-' + columnIndex).style.background == color) {
               return [rowIndex, columnIndex];
           }
        }
    }
}
