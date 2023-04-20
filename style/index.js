import { StyleSheet } from "react-native";
export default (ITEM_SIZE, width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      paddingBottom: 0,
    },
    row: {
      flexDirection: "row",
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.1)",
    },
    square: {
      width: ITEM_SIZE * 1.25,
      height: ITEM_SIZE * 1.3,
      borderRadius: 5,
      margin: 1.5,
      alignItems: "center",
      justifyContent: "center",
      borderColor: "rgba(0,0,0,0.3)",
      borderWidth: 1.5,
    },
    controlButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 10,
      marginHorizontal: 50,
    },
    choosenText: {
      height: ITEM_SIZE * 2,
      width: "100%",
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    letter: {
      fontSize: 25,
      fontWeight: "500",
      textTransform: "uppercase",
    },
    controls: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: width / 1.5,
    },
    button: {
      borderWidth: 2,
      borderColor: "black",
      padding: 10,
      borderRadius: 100,
    },
    image: {
      width: 30,
      height: 30,
    },
    green_bg: {
      backgroundColor: "green",
    },
    red_bg: {
      backgroundColor: "red",
    },
    flatlistContainer: {
      height: height / 1.68,
    },
  });
