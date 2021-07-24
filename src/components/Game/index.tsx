import React, { useState } from 'react';
import calculateWinner from '../../utils/utils';
import Board from '../Board';

const Game = (): JSX.Element => {
  const [state, setState] = useState({ history: [{ squares: Array(9).fill('') }], xIsNext: true });

  const handleClick = (i: number) => {
    const { history } = state;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? 'X' : '0';
    setState({ history: history.concat([{ squares }]), xIsNext: !state.xIsNext });
  };

  const { history } = state;
  const current = history[history.length - 1];
  const winner = calculateWinner(current.squares);
  const status = `${winner ? `Winner: ${winner}` : `Next player: ${state.xIsNext ? 'X' : 'O'}`}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i: number) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

export default Game;
