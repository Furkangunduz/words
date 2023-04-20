const travel = (arr_2d, action) => {
  const newArr_2d = arr_2d.map((row, rowIndex) =>
    row.map((square, colIndex) => {
      action({ square, rowIndex, colIndex });
      return square;
    })
  );
  return newArr_2d;
};
const gameSpeedTable = {
  "0-100": 5,
  "100-200": 4,
  "200-300": 3,
  "300-400": 2,
  "400-1000": 1,
};

export { travel, gameSpeedTable };
