import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoadingScreen from "../screens/LoadingScreen";
import { STORAGE_USER_KEY } from "../storage/storageKeys";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [loading, setLoading] = useState(true);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    async function checkLogin() {
      const savedUser = await AsyncStorage.getItem(STORAGE_USER_KEY);

      if (savedUser) {
        setLoggedUser(JSON.parse(savedUser));
      }

      setLoading(false);
    }

    checkLogin();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {loggedUser ? (
          <Stack.Screen
            name="Home"
            children={(props) => (
              <HomeScreen {...props} setLoggedUser={setLoggedUser} />
            )}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              children={(props) => (
                <LoginScreen {...props} setLoggedUser={setLoggedUser} />
              )}
            />

            <Stack.Screen
              name="Register"
              children={(props) => (
                <RegisterScreen {...props} setLoggedUser={setLoggedUser} />
              )}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
