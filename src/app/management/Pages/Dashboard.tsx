import {
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../auth/Assets/Logo.svg";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";

interface AccessEntry {
  id: string;
  enteredAt: string;
  exitAt: string | null;
  student: { name: string; enrollment: string };
  course: { name: string };
  room: { name: string };
}

export default function Dashboard() {
  const navigation = useNavigation<any>();
  const { signOut } = useAuth();
  const [recentAccesses, setRecentAccesses] = useState<AccessEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/access/recent?limit=5")
      .then(({ data }) => {
        setRecentAccesses(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await signOut();

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.container}>
        <Image
          source={require("../../auth/Assets/SenacBackground.png")}
          style={styles.image}
        />

        <View style={styles.textContainer}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.title}>Olá, Gestor!</Text>
              <Text style={styles.subtitle}>Bem-vindo(a) ao portal</Text>
            </View>

            <Pressable style={styles.logoutButton} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={22} color="#FFFFFF" />
            </Pressable>
          </View>

          <Logo width={200} height={140} style={{ marginTop: 3 }} />
        </View>

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Que bom ter você aqui!</Text>
          <Text style={styles.welcomeDescription}>
            Este é o seu portal de gestão. Acompanhe, organize e agilize sua
            rotina com mais eficiência.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.titleCard}>ACESSO RÁPIDO</Text>
          <View style={styles.grid}>
            <Pressable
              style={styles.quickButton}
              onPress={() => navigation.navigate("RegisterStudent")}
            >
              <View style={styles.iconBox}>
                <Ionicons name="person-add-outline" size={26} color="#2F6BFF" />
              </View>
              <Text style={styles.quickText}>Novo Aluno</Text>
            </Pressable>

            <Pressable
              style={styles.quickButton}
              onPress={() => navigation.navigate("RegisterClass")}
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

        {/* Acessos Recentes */}
        <View style={[styles.card, { marginTop: 16 }]}>
          <Text style={styles.titleCard}>ACESSOS RECENTES</Text>
          {loading ? (
            <ActivityIndicator color="#2F6BFF" style={{ marginTop: 16 }} />
          ) : recentAccesses.length === 0 ? (
            <Text style={{ color: "#C8D2E3", marginTop: 10, fontSize: 13 }}>
              Nenhum acesso registrado ainda.
            </Text>
          ) : (
            recentAccesses.map((entry) => {
              const time = new Date(entry.enteredAt).toLocaleTimeString(
                "pt-BR",
                { hour: "2-digit", minute: "2-digit" },
              );
              const course = entry.course?.name ?? "—";
              const room = entry.room?.name ?? "—";
              return (
                <View key={entry.id} style={styles.accessRow}>
                  <View style={styles.accessIconBox}>
                    <Ionicons name="person-outline" size={18} color="#2F6BFF" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.accessName}>
                      {entry.student?.name ?? "—"}
                    </Text>
                    <Text style={styles.accessDetail}>
                      {course} · {room}
                    </Text>
                  </View>
                  <Text style={styles.accessTime}>{time}</Text>
                </View>
              );
            })
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: "#021127" },
  scrollContent: { alignItems: "center", paddingBottom: 30 },
  container: { width: "100%", alignItems: "center" },
  image: { width: "100%", height: 250 },
  textContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
  },
  title: { color: "#FFF", fontSize: 28, fontWeight: "bold", marginTop: 10 },
  subtitle: { color: "#FFF", fontSize: 14 },
  welcomeContainer: { width: "92%", marginTop: 30 },
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
    marginTop: 30,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    borderColor: "#0B3D91",
  },
  titleCard: { color: "#80B3F8", fontWeight: "bold", fontSize: 16 },
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
  accessRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#0B3D91",
    gap: 10,
  },
  accessIconBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#112e61",
    alignItems: "center",
    justifyContent: "center",
  },
  accessName: { color: "#FFFFFF", fontSize: 13, fontWeight: "600" },
  accessDetail: { color: "#80B3F8", fontSize: 11, marginTop: 2 },
  accessTime: { color: "#C8D2E3", fontSize: 12 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logoutButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
});
