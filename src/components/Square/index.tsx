import React from 'react';
import ValueSquareProps from '../../types/valueSquareProps';

const Square = ({ value }: ValueSquareProps): JSX.Element => {
  return (
    <button className="square" type="button">
      {value}
    </button>
  );
};

export default Square;
