const travel = (arr_2d, action) => {
  const newArr_2d = arr_2d.map((row) =>
    row.map((item) => {
      action(item);
      return item;
    })
  );
  return newArr_2d;
};

export default travel;
