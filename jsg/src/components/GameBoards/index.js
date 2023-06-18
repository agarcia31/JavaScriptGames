class Gameboard {
  constructor() {
    this.board = []; // The game board
    this.size = 0; // Size of the board (can be adjusted as needed)
    this.initializeBoard(); // Initialize the board
  }

  get size() {
    return this._size;
  }

  set size(size) {
    this._size = size;
  }

  initializeBoard() {
    // Initialize the board with empty cells or initial game state
    // Adjust this method to match your game's requirements
    this.board = Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => null)
    );
  }

  createBoard(size) {
    // Create or recreate the board with the specified size
    this.size = size;
    this.initializeBoard();
    this.updateUI();
  }

  getCellValue(row, col) {
    if (this.isValidCell(row, col)) {
      return this._board[row][col];
    }
    return null; // or throw an error
  }
  
  isValidCell(row, col) {
    return row >= 0 && row < this.size && col >= 0 && col < this.size;
  }
  
  setCellValue(row, col, value) {
    // Set the value of a cell at the specified row and column
    this.board[row][col] = value;
    this.updateUI();
  }
  
  clearBoard() {
    this._board = Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => null)
    );
    this.updateUI();
  }
  
  updateUI(callback) {
    if (typeof callback === 'function') {
      callback(this._board);
    }
  }    
}

export default Gameboard;

  