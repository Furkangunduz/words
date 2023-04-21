import Test from "./apps/Test";
import Words from "./apps/Words.jsx";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import ToastManager from "toastify-react-native";
function App() {
  return (
    <SafeAreaView style={style.AndroidSafeArea}>
      <ToastManager duration={2000} hasBackDrop={true} />
      <Words></Words>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS ? (Platform.OS === "android" ? StatusBar.currentHeight : 0) : 0,
  },
});

export default App;
