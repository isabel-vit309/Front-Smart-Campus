import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Dashboard from "./Pages/Dashboard";
import ClassList from "./Pages/ClassList";
import ListStudents from "./Pages/ListStudents";

const Tab = createBottomTabNavigator();

export default function ManagementRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#041936",
          borderTopWidth: 0,
        },

        tabBarActiveTintColor: "#2F6BFF",
        tabBarInactiveTintColor: "#FFFFFF",

        tabBarIcon: ({ color }) => {
          let iconName: any = "home";

          if (route.name === "Dashboard") {
            iconName = "home";
          } else if (route.name === "NovoAluno") {
            iconName = "person-add";
          } else if (route.name === "RegistroAulas") {
            iconName = "clipboard";
          } else if (route.name === "ListStudents") {
            iconName = "people";
          } else if (route.name === "ClassList") {
            iconName = "school";
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "Início",
        }}
      />

      <Tab.Screen
        name="NovoAluno"
        component={ListStudents}
        options={{
          title: "Novo Aluno",
        }}
      />

      <Tab.Screen
        name="RegistroAulas"
        component={ListStudents}
        options={{
          title: "Registro",
        }}
      />

      <Tab.Screen
        name="ListStudents"
        component={ListStudents}
        options={{
          title: "Alunos",
        }}
      />

      <Tab.Screen
        name="ClassList"
        component={ClassList}
        options={{
          title: "Aulas",
        }}
      />
    </Tab.Navigator>
  );
}