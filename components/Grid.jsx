// import React from "react";
import { View, FlatList } from "react-native";
import GridCell from "./GridCell";
import { Dimensions } from "react-native";

export default ({ data, onPressItem, styles }) => {
  const { height } = Dimensions.get("window");
  return (
    <View style={{ height, marginTop: height / 4 }}>
      <FlatList
        data={data}
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
              />
            ))}
          </View>
        )}
      />
    </View>
  );
};
