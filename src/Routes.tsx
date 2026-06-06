import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "./context/AuthContext";

import Login from "./app/auth/Pages/Login";
import StudentRoutes from "./app/student/StudentRoutes";
import ManagementRoutes from "./app/management/ManagementRoutes";

const Stack = createNativeStackNavigator();

export default function Routes() {
  const { token, role, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#021127" }}>
        <ActivityIndicator size="large" color="#2F6BFF" />
      </View>
    );
  }

  const initial = !token
    ? "Login"
    : role === "STUDENT"
    ? "Student"
    : "Management";

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initial}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Student" component={StudentRoutes} />
      <Stack.Screen name="Management" component={ManagementRoutes} />
    </Stack.Navigator>
  );
}
