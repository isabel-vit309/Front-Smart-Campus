import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../../services/api";

interface Course {
  id: string;
  name: string;
  code: string;
}
interface Room {
  id: string;
  name: string;
  capacity: number;
}

const DAYS = [
  { label: "Segunda", value: 1 },
  { label: "Terça", value: 2 },
  { label: "Quarta", value: 3 },
  { label: "Quinta", value: 4 },
  { label: "Sexta", value: 5 },
  { label: "Sábado", value: 6 },
  { label: "Domingo", value: 0 },
];

export default function RegisterClass() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastRegistered, setLastRegistered] = useState<any>(null);

  useEffect(() => {
    Promise.all([api.get("/api/courses"), api.get("/api/rooms")])
      .then(([c, r]) => {
        setCourses(c.data);
        setRooms(r.data);
      })
      .catch(() => {});
  }, []);

  const resetForm = () => {
    setSelectedCourseId("");
    setSelectedRoomId("");
    setSelectedDay(null);
    setStartTime("");
    setEndTime("");
  };

  const handleRegister = async () => {
    if (
      !selectedCourseId ||
      !selectedRoomId ||
      selectedDay === null ||
      !startTime ||
      !endTime
    ) {
      Alert.alert("Erro", "Selecione curso, sala, dia e preencha os horários.");
      return;
    }
    const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      Alert.alert("Erro", "Horário inválido. Use o formato HH:MM (ex: 18:00).");
      return;
    }
    if (startTime >= endTime) {
      Alert.alert("Erro", "O horário de início deve ser antes do término.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post("/api/schedules", {
        courseId: selectedCourseId,
        roomId: selectedRoomId,
        dayOfWeek: selectedDay,
        startTime,
        endTime,
      });
      const course = courses.find((c) => c.id === selectedCourseId);
      const room = rooms.find((r) => r.id === selectedRoomId);
      setLastRegistered({
        course: course?.name,
        room: room?.name,
        startTime,
        endTime,
      });
      Alert.alert("Sucesso", "Aula registrada com sucesso!");
      resetForm();
    } catch (err: any) {
      const msg = err?.response?.data?.error ?? "Erro ao registrar aula.";
      Alert.alert("Erro", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../auth/Assets/SenacBackground.png")}
        style={styles.backgroundImage}
      />

      <SafeAreaView style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Registro de Aulas</Text>
            <Text style={styles.subtitle}>
              Registre aqui as aulas, horários e salas de cada turma
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.titleCard}>REGISTRO DE AULA</Text>
            <Text style={styles.cardSubtitle}>
              Preencha as informações para registrar uma aula
            </Text>

            {/* Curso */}
            <Text style={styles.sectionTitle}>Disciplina / Curso</Text>
            <View style={styles.chipGrid}>
              {courses.map((c) => (
                <TouchableOpacity
                  key={c.id}
                  style={[
                    styles.chip,
                    selectedCourseId === c.id && styles.chipActive,
                  ]}
                  onPress={() => setSelectedCourseId(c.id)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedCourseId === c.id && { color: "#FFF" },
                    ]}
                  >
                    {c.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Sala */}
            <Text style={styles.sectionTitle}>Sala</Text>
            <View style={styles.chipGrid}>
              {rooms.map((r) => (
                <TouchableOpacity
                  key={r.id}
                  style={[
                    styles.chip,
                    selectedRoomId === r.id && styles.chipActive,
                  ]}
                  onPress={() => setSelectedRoomId(r.id)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedRoomId === r.id && { color: "#FFF" },
                    ]}
                  >
                    {r.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Dia da semana */}
            <Text style={styles.sectionTitle}>Dia e Horário</Text>
            <Text style={styles.label}>Dia da semana</Text>
            <View style={styles.chipGrid}>
              {DAYS.map((d) => (
                <TouchableOpacity
                  key={d.value}
                  style={[
                    styles.chip,
                    selectedDay === d.value && styles.chipActive,
                  ]}
                  onPress={() => setSelectedDay(d.value)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedDay === d.value && { color: "#FFF" },
                    ]}
                  >
                    {d.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Horários */}
            <View style={styles.row}>
              <View style={styles.halfField}>
                <Text style={styles.label}>Horário de início</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 18:00"
                  placeholderTextColor="#6B8BB0"
                  value={startTime}
                  onChangeText={setStartTime}
                />
              </View>
              <View style={styles.halfField}>
                <Text style={styles.label}>Horário de término</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 20:00"
                  placeholderTextColor="#6B8BB0"
                  value={endTime}
                  onChangeText={setEndTime}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.6 }]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Ionicons name="book-outline" size={20} color="#FFFFFF" />
                  <Text style={styles.buttonText}>REGISTRAR AULA</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Último registro */}
          {lastRegistered && (
            <View style={styles.card}>
              <Text style={styles.titleCard}>REGISTRO RECENTE</Text>
              <View style={styles.recentCard}>
                <View style={styles.recentIconBox}>
                  <Ionicons name="book" size={24} color="#FFFFFF" />
                </View>
                <View style={styles.recentInfo}>
                  <Text style={styles.recentDiscipline}>
                    {lastRegistered.course}
                  </Text>
                  <Text style={styles.recentTime}>
                    {lastRegistered.startTime} - {lastRegistered.endTime}
                  </Text>
                  <Text style={styles.recentRoom}>{lastRegistered.room}</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative", backgroundColor: "#021127" },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: 200,
    top: 0,
    left: 0,
  },
  content: { flex: 1, marginTop: 100 },
  header: { marginTop: -10, marginHorizontal: 20, marginBottom: 24 },
  title: { color: "#FFF", fontSize: 28, fontWeight: "bold" },
  subtitle: { color: "#80B3F8", fontSize: 14, marginTop: 4 },
  card: {
    backgroundColor: "#051e3e",
    width: "92%",
    alignSelf: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#0B3D91",
    padding: 14,
    marginBottom: 16,
  },
  titleCard: {
    color: "#80B3F8",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  cardSubtitle: { color: "#C8D2E3", fontSize: 12, marginBottom: 4 },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  label: { color: "#80B3F8", fontSize: 12, marginBottom: 6, marginTop: 8 },
  input: {
    backgroundColor: "#0F213F",
    borderRadius: 8,
    padding: 12,
    color: "#FFFFFF",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#0B3D91",
  },
  row: { flexDirection: "row", gap: 12 },
  halfField: { flex: 1 },
  chipGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#0F213F",
    borderWidth: 1,
    borderColor: "#0B3D91",
  },
  chipActive: { backgroundColor: "#0B4BBB", borderColor: "#2F6BFF" },
  chipText: { color: "#80B3F8", fontSize: 12 },
  button: {
    backgroundColor: "#0B4BBB",
    height: 48,
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  buttonText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 14 },
  recentCard: {
    backgroundColor: "#0F213F",
    width: "100%",
    marginTop: 12,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  recentIconBox: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#0B4BBB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  recentInfo: { flex: 1 },
  recentDiscipline: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
  recentTime: {
    color: "#2F6BFF",
    fontSize: 13,
    marginTop: 4,
    fontWeight: "500",
  },
  recentRoom: { color: "#C8D2E3", fontSize: 13, marginTop: 2 },
});
