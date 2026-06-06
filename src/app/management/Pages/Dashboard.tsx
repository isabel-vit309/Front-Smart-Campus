import { Image, Text, View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../auth/Assets/Logo.svg";

export default function Dashboard() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../auth/Assets/SenacBackground.png")}
        style={styles.image}
      />

      <View style={styles.textContainer}>
        <Text style={styles.title}>Olá, Gestor!</Text>
        <Text style={styles.subtitle}>Bem-vindo(a) ao portal</Text>
        <Logo width={200} height={140} style={{ marginTop: 3 }} />
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Que bom ter você aqui!</Text>
        <Text style={styles.welcomeDescription}>
          Este é o seu portal de gestão. Acompanhe, organize e agilize sua rotina
          com mais eficiência.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.titleCard}>ACESSO RÁPIDO</Text>

        <View style={styles.grid}>
          <Pressable
            style={styles.quickButton}
            onPress={() => navigation.navigate("NovoAluno")}
          >
            <View style={styles.iconBox}>
              <Ionicons name="person-add-outline" size={26} color="#2F6BFF" />
            </View>
            <Text style={styles.quickText}>Novo Aluno</Text>
          </Pressable>

          <Pressable
            style={styles.quickButton}
            onPress={() => navigation.navigate("RegistroAulas")}
          >
            <View style={styles.iconBox}>
              <Ionicons name="clipboard-outline" size={26} color="#2F6BFF" />
            </View>
            <Text style={styles.quickText}>Registro de Aulas</Text>
          </Pressable>

          <Pressable
           style={styles.quickButton}
           onPress={() => navigation.navigate("ListStudents")}
          >
           <View style={styles.iconBox}>
             <Ionicons name="people-outline" size={26} color="#2F6BFF" />
          </View>
          <Text style={styles.quickText}>Listagem de Alunos</Text>
          </Pressable>

          <Pressable
            style={styles.quickButton}
            onPress={() => navigation.navigate("ClassList")}
          >
            <View style={styles.iconBox}>
              <Ionicons name="school-outline" size={26} color="#2F6BFF" />
            </View>
            <Text style={styles.quickText}>Listagem de Aulas</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021127",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: 250,
  },

  textContainer: {
    position: "absolute",
    top: 40,
    left: 20,
  },

  title: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10
  },

  subtitle: {
    color: "#FFF",
    fontSize: 14,
  },

  welcomeContainer: {
    width: "92%",
    marginTop: 30,
  },

  welcomeTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 2,
  },

  welcomeDescription: {
    color: "#C8D2E3",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
  },

  card: {
    backgroundColor: "#051e3e",
    width: "92%",
    height: "40%",
    marginTop: 30,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    borderColor: "#0B3D91",
  },

  titleCard: {
    color: "#80B3F8",
    fontWeight: "bold",
    fontSize: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 15,
    rowGap: 12,
  },

  quickButton: {
    backgroundColor: "#112e61",
    width: "48%",
    height: 100,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: "#0B3D91",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  quickText: {
    color: "#FFFFFF",
    fontSize: 11,
    textAlign: "center",
    fontWeight: "600",
  },
});