document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("container");

    function generateRandomSudoku() {
        const puzzle = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ];
        return puzzle;
    }

    // Function to solve the Sudoku puzzle
    function solveSudoku(board) {
        // Placeholder function for solving Sudoku puzzle
        const solvedPuzzle = JSON.parse(JSON.stringify(board));
        solveHelper(solvedPuzzle);
        return solvedPuzzle;
    }

    // Helper function for solving Sudoku recursively
    function solveHelper(board) {
        const emptyCell = findEmptyCell(board);
        if (!emptyCell) {
            return true; // Puzzle solved
        }

        const [row, col] = emptyCell;
        for (let num = 1; num <= 9; num++) {
            if (isValidMove(board, row, col, num)) {
                board[row][col] = num;
                if (solveHelper(board)) {
                    return true;
                }
                board[row][col] = 0; // Backtrack
            }
        }
        return false; // No valid number found for this cell
    }

    // Function to find an empty cell in the Sudoku puzzle
    function findEmptyCell(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    return [row, col];
                }
            }
        }
        return null; // No empty cell found
    }

    // Function to check if a move is valid
    function isValidMove(board, row, col, num) {
        // Check row
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num) {
                return false;
            }
        }
        // Check column
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) {
                return false;
            }
        }
        // Check 3x3 grid
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (board[i][j] === num) {
                    return false;
                }
            }
        }
        return true; // Move is valid
    }

    // Function to create the Sudoku puzzle grid
    function createSudokuGrid(puzzle) {
        container.innerHTML = '';
        puzzle.forEach((row, rowIndex) => {
            const rowElement = document.createElement('div');
            rowElement.classList.add('row');
            row.forEach((cell, columnIndex) => {
                const cellElement = document.createElement('input');
                cellElement.classList.add('cell');
                cellElement.classList
                    .add((rowIndex + columnIndex) % 2 === 0 ?
                        'lightBackground' : 'darkBackground');
                cellElement.type = 'text';
                cellElement.maxLength = 1;
                cellElement.value = cell !== 0 ? cell : '';
                rowElement.appendChild(cellElement);
            });
            container.appendChild(rowElement);
        });
    }

    // Initialize puzzle
    let initialPuzzle = generateRandomSudoku();
    let puzzle = JSON.parse(JSON.stringify(initialPuzzle));
    let solvedPuzzle = [];

    // Function to solve the puzzle
    function solvePuzzle() {
        solvedPuzzle = solveSudoku(puzzle);
        createSudokuGrid(solvedPuzzle);
    }

    // Function to reset the puzzle
    function resetPuzzle() {
        initialPuzzle = generateRandomSudoku();
        puzzle = JSON.parse(JSON.stringify(initialPuzzle));
        solvedPuzzle = [];
        createSudokuGrid(puzzle);
    }

    // Initial puzzle creation
    createSudokuGrid(puzzle);

    // Attach event listeners to buttons
    document.getElementById("solveButton")
        .addEventListener("click", solvePuzzle);
    document.getElementById("resetButton")
        .addEventListener("click", resetPuzzle);
});