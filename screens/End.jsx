import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Table, Row, Rows } from "react-native-table-component";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    marginBottom: 20,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  loginText: {
    fontWeight: "bold",
    color: "white",
  },
});

export default ({ navigation, route }) => {
  const { score, userName, restartGame } = route.params;
  const [scores, setScores] = useState([]);

  AsyncStorage.getItem("scores").then((data) => {
    if (data) {
      setScores(JSON.parse(data));
    }
  });

  const tableHead = ["Player", "Score", "Date"];
  const tableData = scores.map((item) => [userName, item.score, item.date]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oyun Bitti</Text>
      <Text style={styles.score}>Kullanıcı Adınız: {userName}</Text>
      <Text style={styles.score}>Skorunuz: {score}</Text>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          restartGame();
          navigation.navigate("Game", { userName: userName });
        }}
      >
        <Text style={styles.loginText}>Tekrar Oyna</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 20 }}>
        <Text>Önceki Oyunlarda Aldığınız Puanlar : </Text>
        <Table style={{ marginTop: 20 }}>
          <Row data={tableHead} />
          <Rows data={tableData} />
        </Table>
      </View>
    </View>
  );
};
