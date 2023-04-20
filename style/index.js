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
    },
    square: {
      width: ITEM_SIZE * 1.25,
      height: ITEM_SIZE * 1.3,
      margin: 3,
      alignItems: "center",
      justifyContent: "center",
      borderColor: "rgba(0,0,0,0.3)",
    },
    circle: {
      borderWidth: 1.5,
      borderRadius: 100,
    },
    rect: {
      borderWidth: 1.5,
      borderRadius: 5,
    },
    controlButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 2,
      marginHorizontal: 30,
    },
    choosenText: {
      height: ITEM_SIZE * 2,
      width: "100%",
      justifyContent: "center",
      paddingHorizontal: 5,
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
      paddingHorizontal: 25,
      paddingVertical: 25,
      borderRadius: 100,
    },
    selected: {
      backgroundColor: "rgba(0,0,0,0.27)",
      borderWidth: 3,
      borderColor: "yellow",
    },

    image: {
      width: 35,
      height: 35,
    },
    green_bg: {
      backgroundColor: "green",
    },
    red_bg: {
      backgroundColor: "red",
    },
    flatlistContainer: {
      height: height / 1.66,
    },
  });
