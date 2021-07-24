import React, { useState } from 'react';
import calculateWinner from '../../utils/utils';
import Square from '../Square';

const Board = (): JSX.Element => {
  const [squares, setSquares] = useState({ squares: Array(9).fill(''), xIsNext: true });

  const handleClick = (i: number) => {
    const squaresNew = squares.squares.slice();
    if (calculateWinner(squaresNew) || squaresNew[i]) {
      return;
    }
    squaresNew[i] = squares.xIsNext ? 'X' : '0';
    setSquares({ squares: squaresNew, xIsNext: !squares.xIsNext });
  };

  const renderSquare = (i: number) => {
    return <Square value={squares.squares[i]} onClick={() => handleClick(i)} />;
  };

  const winner = calculateWinner(squares.squares);
  const status = `${winner ? `Выиграл: ${winner}` : `Следующий ход: ${squares.xIsNext ? 'X' : '0'}`}`;

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </>
  );
};

export default Board;
