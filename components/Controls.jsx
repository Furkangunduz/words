import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";

export default Controls = ({ styles, choosenText, onPressCancel, onPressSubmit }) => {
  return (
    <View style={{ justifyContent: "space-evenly", width: "100%" }}>
      <View style={[styles.choosenText, { justifyContent: "center", alignItems: "center" }]}>
        <FlatList
          numColumns={8}
          data={choosenText?.split("") ?? []}
          renderItem={({ item }) => {
            return (
              <View style={[styles.square, { height: 50, width: 40, borderColor: "yellow", backgroundColor: "rgba(0,0,0,0.3)" }]}>
                <Text style={{ fontSize: 30, textTransform: "uppercase", color: "white" }}>{item}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.controlButtons}>
        <TouchableOpacity onPress={() => onPressSubmit()}>
          <View style={[styles.button, styles.green_bg]}>
            <Image source={require("../assets/check.png")} style={[styles.image, { tintColor: "white" }]}></Image>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onPressCancel()}>
          <View style={[styles.button, styles.red_bg]}>
            <Image source={require("../assets/xmark.png")} style={[styles.image, { tintColor: "white" }]}></Image>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
