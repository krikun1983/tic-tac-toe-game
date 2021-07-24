import React from 'react';
import ValueSquareProps from '../../types/valueSquareProps';

const Square = ({ value, onClick }: ValueSquareProps): JSX.Element => {
  return (
    <button className="square" type="button" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
