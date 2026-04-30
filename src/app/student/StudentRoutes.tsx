import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "./Pages/Home";
import Schedule from "./Pages/Schedule";
import History from "./Pages/History";

const Tab = createBottomTabNavigator();

export default function StudentRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#041936",
          borderTopWidth: 0,
        },

        tabBarActiveTintColor: "#2F6BFF",
        tabBarInactiveTintColor: "#FFFFFF",

        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === "Início") {
            iconName = "home";
          } else if (route.name === "Horários") {
            iconName = "calendar";
          } else if (route.name === "Histórico") {
            iconName = "time";
          }

          return <Ionicons name={iconName} size={20} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Início" component={Home} />
      <Tab.Screen name="Horários" component={Schedule} />
      <Tab.Screen name="Histórico" component={History} />
    </Tab.Navigator>
  );
}