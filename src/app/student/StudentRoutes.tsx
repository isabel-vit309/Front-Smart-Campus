import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

function Home() {
  return (
    <View style={styles.container}>
      <Text>Início do Aluno</Text>
    </View>
  );
}

function Schedule() {
  return (
    <View style={styles.container}>
      <Text>Horários</Text>
    </View>
  );
}

function Absences() {
  return (
    <View style={styles.container}>
      <Text>Faltas</Text>
    </View>
  );
}

export default function StudentRoutes() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Início" component={Home} />
      <Tab.Screen name="Horários" component={Schedule} />
      <Tab.Screen name="Faltas" component={Absences} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});