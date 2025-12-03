import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { logout } from "../services/auth";

export default function HomeScreen({ navigation }) {

  async function handleLogout() {
    const result = await logout();
    if (result) {
      navigation.replace("Login"); // impede voltar com o botão VOLTAR
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Home!</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#d9534f",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
