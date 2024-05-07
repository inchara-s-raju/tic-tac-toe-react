import { useState } from 'react';
import Square from '../square';

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleclick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };
  const handleResetClick = () => {
    setSquares([]);
  };
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner:' + ' ' + winner;
  } else {
    status = 'Next player:' + ' ' + (xIsNext ? 'X' : 'O');
  }
  return (
    <>
      <h1 className='header'>Tic Tac Toe</h1>
      <div className='about' style={{ padding: '4px' }}>
        Tic-tac-toe is a very popular game for two players, X and O, who take
        turns marking the spaces in a 3×3 grid. The player who succeeds in
        placing three of their marks in a vertical, horizontal or diagonal row
        wins the game.
      </div>
      <div className='status'>{status}</div>
      <div className='reset'>
        <button onClick={handleResetClick}>Reset</button>
      </div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleclick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleclick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleclick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleclick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleclick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleclick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleclick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleclick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleclick(8)} />
      </div>
    </>
  );
}
