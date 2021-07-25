import React from "react";
import { StyleSheet, Text, View } from "react-native";

import FormikTextField from "./components/FormikTextField";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Loan EMI Calculator</Text>
      <FormikTextField />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: 300,
    marginTop: 70,
    marginHorizontal: 5,
  },

  headline: {
    fontSize: 22,
    textAlign: "center",
    color: "#2818dd",
    fontWeight: "600",
    marginBottom: 20,
    fontWeight: "600",
  },
});
