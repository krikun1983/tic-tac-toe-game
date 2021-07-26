import React, { useState } from 'react';
import calculateWinner from '../../utils/utils';
import Board from '../Board';

const Game = (): JSX.Element => {
  const [state, setState] = useState({ history: [{ squares: Array(9).fill('') }], stepNumber: 0, xIsNext: true });
  const [count, setCount] = useState(0);

  const handleClick = (i: number) => {
    setCount(count + 1);
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
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
    const desc = move ? `Go to move #${move}` : 'To the start of the game';
    return (
      <li className="moves__item" key={desc}>
        <button className="moves__btn" onClick={() => jumpTo(move)} type="button">
          {desc}
        </button>
      </li>
    );
  });

  const status = `${
    count < 9
      ? `${winner?.squares ? `Winner: ${winner.squares}` : `Next player: ${state.xIsNext ? 'X' : 'O'}`}`
      : 'There is no winner'
  }`;

  return (
    <div className="game">
      <h1 className="heading">Tic-tac-toe game</h1>
      <div className="game-board">
        <Board squares={current.squares} onClick={(i: number) => handleClick(i)} winner={winner?.lines} />
      </div>
      <div className="game-info">
        <div className={`status ${winner?.squares ? 'status__winner' : ''}`}>{status}</div>
        <ol className="moves">{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
