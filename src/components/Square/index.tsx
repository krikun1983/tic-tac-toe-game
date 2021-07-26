import React from 'react';
import ValueSquareProps from '../../types/valueSquareProps';

const Square = ({ value, onClick, result }: ValueSquareProps): JSX.Element => {
  return (
    <button className={`square ${result ? 'winner' : ''}`} type="button" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
