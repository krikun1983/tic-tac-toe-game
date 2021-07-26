import React, { useState } from 'react';
import calculateWinner from '../../utils/utils';
import Board from '../Board';

const Game = (): JSX.Element => {
  const [state, setState] = useState({ history: [{ squares: Array(9).fill('') }], stepNumber: 0, xIsNext: true });

  const getWinner = () => {
    const { history } = state;
    const current = history[state.stepNumber];
    const winner = calculateWinner(current.squares);
    const linesWinner = winner ? calculateWinner(current.squares)?.lines : null;
    return linesWinner;
  };

  const handleClick = (i: number) => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    console.log(getWinner());
    if (calculateWinner(squares)?.squares || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? 'X' : '0';
    setState({ history: history.concat([{ squares }]), stepNumber: history.length, xIsNext: !state.xIsNext });
  };

  const jumpTo = (step: number) => {
    const { history } = state;
    setState({
      history,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  };

  const { history } = state;
  const current = history[state.stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ? `Перейти к ходу #${move}` : 'К началу игры';
    return (
      <li className="moves__item" key={desc}>
        <button className="moves__btn" onClick={() => jumpTo(move)} type="button">
          {desc}
        </button>
      </li>
    );
  });

  const status = `${winner?.squares ? `Winner: ${winner.squares}` : `Next player: ${state.xIsNext ? 'X' : 'O'}`}`;

  return (
    <div className="game">
      <h1 className="heading">Tic-tac-toe game</h1>
      <div className="game-board">
        <Board squares={current.squares} onClick={(i: number) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div className={`status ${winner?.squares ? 'status__winner' : ''}`}>{status}</div>
        <ol className="moves">{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
