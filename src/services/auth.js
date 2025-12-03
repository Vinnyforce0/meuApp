import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_USER_KEY } from "../storage/storageKeys";

const FAKE_DB = {
  users: [
    {
      id: "1",
      email: "teste@teste.com",
      password: "123456",
      name: "Usuário Teste",
    },
  ],
};

// ---- LOGIN ----
export async function login(email, password) {
  const user = FAKE_DB.users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  // salva sessão
  await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));

  return user;
}

// ---- LOGOUT ----
export async function logout() {
  try {
    await AsyncStorage.removeItem(STORAGE_USER_KEY);
    return true;
  } catch (error) {
    return false;
  }
}


// ---- CHECK SESSION ----
export async function getLoggedUser() {
  const data = await AsyncStorage.getItem(STORAGE_USER_KEY);
  return data ? JSON.parse(data) : null;
}

// ---- REGISTER ----
export async function register(name, email, password) {
  const exists = FAKE_DB.users.find((u) => u.email === email);
  if (exists) {
    throw new Error("Email já registrado");
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
  };

  FAKE_DB.users.push(newUser);
  await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(newUser));

  return newUser;
}
