import { AsyncStorage } from "react-native";

const travel = (arr_2d, action) => {
  return arr_2d.map((row, rowIndex) =>
    row.map((square, colIndex) => {
      const params = { square, rowIndex, colIndex };
      action(params);
      return params.square === square ? square : params.square;
    })
  );
};

const gameSpeedTable = {
  "0-100": 5,
  "100-200": 4,
  "200-300": 3,
  "300-400": 2,
  "400-1000": 1,
};

function isBgLight(bg = "#000000") {
  if (bg[0] == "#") bg = bg.replace("#", "");
  if (bg.length != 6) bg = bg.slice(0, 6);
  const r = parseInt(bg.slice(0, 2), 16);
  const g = parseInt(bg.slice(2, 4), 16);
  const b = parseInt(bg.slice(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
}

async function setItem(key, value) {
  try {
    AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
}
async function getItem(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.error(error);
  }
}

export { travel, gameSpeedTable, isBgLight, setItem, getItem };
