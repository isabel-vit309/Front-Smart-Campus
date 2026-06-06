import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "./Pages/Home";
import Schedule from "./Pages/Schedule";
import History from "./Pages/History";
import RegisterStudent from "./Pages/RegisterStudent";
import RegisterClass from "./Pages/RegisterClass";

const Tab = createBottomTabNavigator();

export default function StudentRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#041936",
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#2F6BFF",
        tabBarInactiveTintColor: "#FFFFFF",
        tabBarIcon: ({ color, size }) => {
          let iconName: any = "home";

          if (route.name === "Início") {
            iconName = "home";
          } else if (route.name === "Horários") {
            iconName = "calendar";
          } else if (route.name === "Histórico") {
            iconName = "time";
          } else if (route.name === "Novo Aluno") {
            iconName = "person-add";
          } else if (route.name === "Registrar Aula") {
            iconName = "book";
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "5000",
          marginBottom: 4,
        },
      })}
    >
      <Tab.Screen name="Início" component={Home} />
      <Tab.Screen name="Horários" component={Schedule} />
      <Tab.Screen name="Histórico" component={History} />
      <Tab.Screen name="Novo Aluno" component={RegisterStudent} />
      <Tab.Screen name="Registrar Aula" component={RegisterClass} />
    </Tab.Navigator>
  );
}