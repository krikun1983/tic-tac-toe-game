import React from 'react';
import SquaresBoardProps from '../../types/squaresBoardProps';
import Square from '../Square';

const Board = ({ squares, onClick, winner }: SquaresBoardProps): JSX.Element => {
  const renderSquare = (i: number) => {
    let result = false;
    if (winner) {
      winner.forEach((item: number) => {
        if (item === i) {
          result = true;
        }
      });
    }
    return <Square value={squares[i]} onClick={() => onClick(i)} result={result} />;
  };

  return (
    <div className="board">
      <div className="board__row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board__row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board__row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
