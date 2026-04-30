import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./app/auth/Pages/Login";
import StudentRoutes from "./app/student/StudentRoutes";
import Dashboard from "./app/management/Pages/Dashboard";

const Stack = createNativeStackNavigator();

export default function Routes() {
  const isLogged = false; 
  const userType = "student"; 

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={
        !isLogged
          ? "Login"
          : userType === "student"
          ? "Student"
          : "Management"
      }
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Student" component={StudentRoutes} />
      <Stack.Screen name="Management" component={Dashboard} />
    </Stack.Navigator>
  );
}