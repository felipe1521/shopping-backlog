import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import repository from '../data/repository';
import { getDataItem, storeData } from '../helpers/storageHelper';

const PRODUCTS = 'PRODUCTS';

function Intro({ navigation }) {
  useEffect(() => {
    const getData = async () => {
        const hasLauched = await getDataItem(PRODUCTS);
        if (!hasLauched) await storeData(PRODUCTS, JSON.stringify(repository));
        //await storeData(PRODUCTS, JSON.stringify(repository));
    };
    getData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Main");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View></View>
      <View style={styles.center}>
        <Image
          source={require("../../assets/icon.png")}
          style={styles.image}
        ></Image>
        <Text style={[styles.text, { fontSize: 25 }]}>Shopping Backlog</Text>
      </View>
      <View style={[styles.center, { marginVertical: 20 }]}>
        <Text style={styles.text}>App creada por Felipe</Text>
        <Text style={styles.text}>Versión 0.1.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#000559",
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    color: "#ffffff",
    textAlign: "center",
  },
  center: {
    alignItems: "center",
  },
});

export default Intro;
