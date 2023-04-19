import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";

export default Controls = ({ styles, choosenText, onPressCancel, onPressSubmit }) => {
  return (
    <View style={{ justifyContent: "center", width: "100%" }}>
      <View style={styles.choosenText}>
        <FlatList
          numColumns={8}
          data={choosenText?.split("") ?? []}
          renderItem={({ item }) => {
            console.log(item);
            return (
              <View style={styles.square}>
                <Text>{item}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.controlButtons}>
        <TouchableOpacity onPress={() => onPressSubmit()}>
          <View style={[styles.button, styles.green_bg]}>
            <Image source={require("../assets/check.png")} style={[styles.image]}></Image>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onPressCancel()}>
          <View style={[styles.button, styles.red_bg]}>
            <Image source={require("../assets/xmark.png")} style={[styles.image]}></Image>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
