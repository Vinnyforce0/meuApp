import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_USER_KEY } from "../storage/storageKeys";

async function getUsers() {
  const data = await AsyncStorage.getItem("USERS");
  return data ? JSON.parse(data) : [];
}

async function saveUsers(users) {
  await AsyncStorage.setItem("USERS", JSON.stringify(users));
}

// LOGIN
export async function login(email, password) {
  const users = await getUsers();
  const user = users.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) throw new Error("Credenciais inválidas");

  await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
  return user;
}

// LOGOUT
export async function logout() {
  await AsyncStorage.removeItem(STORAGE_USER_KEY);
  return true;
}

// CHECK SESSION
export async function getLoggedUser() {
  const data = await AsyncStorage.getItem(STORAGE_USER_KEY);
  return data ? JSON.parse(data) : null;
}

// REGISTER
export async function register(name, email, password) {
  const users = await getUsers();

  const exists = users.find((u) => u.email === email);
  if (exists) throw new Error("Email já registrado");

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
  };

  users.push(newUser);
  await saveUsers(users);

  await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(newUser));
  return newUser;
}
