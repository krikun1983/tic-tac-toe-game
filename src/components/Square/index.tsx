import React, { useState } from 'react';
import ValueSquareProps from '../../types/valueSquareProps';

const Square = ({ value }: ValueSquareProps): JSX.Element => {
  const [stateValue, setStateValue] = useState({ value: '' });

  return (
    <button className="square" type="button" onClick={() => setStateValue({ value: 'X' })}>
      {stateValue.value}
    </button>
  );
};

export default Square;
