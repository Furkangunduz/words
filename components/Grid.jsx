import { useMemo } from "react";
import { View, FlatList } from "react-native";
import GridCell from "./GridCell";

export default ({ data, onPressItem, styles, isGameOver, isGamePaused }) => {
  const memoizedData = useMemo(() => data, [data]);

  return (
    <View style={styles.flatlistContainer}>
      <FlatList
        data={memoizedData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, indexRow }) => (
          <View key={"row_" + indexRow} style={styles.row}>
            {item.map((square, indexCol) => (
              <GridCell
                key={"cell" + "_" + indexRow + "_" + indexCol}
                item={square}
                styles={styles}
                onPressItem={onPressItem}
                indexRow={indexRow}
                indexCol={indexCol}
                isGameOver={isGameOver}
                isGamePaused={isGamePaused}
              />
            ))}
          </View>
        )}
      />
    </View>
  );
};
