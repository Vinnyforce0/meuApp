import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_USER_KEY } from "../storage/storageKeys";

export default function HomeScreen({ setLoggedUser }) {
  async function handleLogout() {
    await AsyncStorage.removeItem(STORAGE_USER_KEY);

    // Atualiza o AppNavigator IMEDIATAMENTE
    setLoggedUser(null);
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Bem-vindo!</Text>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: "red",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "#fff" }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
