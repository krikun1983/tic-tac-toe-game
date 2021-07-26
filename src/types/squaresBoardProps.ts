type SquaresBoardProps = {
  squares: string[];
  onClick: (i: number) => void;
  winner: number[] | undefined;
};

export default SquaresBoardProps;
