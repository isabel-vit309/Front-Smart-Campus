import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../../services/api";

// Estrutura retornada por GET /api/access/students/:id/history → .accesses[]
interface AccessLog {
  id: string;
  enteredAt: string;
  exitAt: string | null;
  course: { name: string };
  room: { name: string };
  schedule: { dayOfWeek: number; startTime: string; endTime: string };
}

const HistoryCard = ({ log }: { log: AccessLog }) => {
  const entered = new Date(log.enteredAt);
  const exited = log.exitAt ? new Date(log.exitAt) : null;
  const dayName = entered.toLocaleDateString("pt-BR", { weekday: "long" }).toUpperCase();
  const courseName = log.course?.name ?? "Disciplina";
  const timeIn = entered.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const timeOut = exited ? exited.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "--:--";

  return (
    <View style={styles.historyCard}>
      <View style={styles.historyIconBox}>
        <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
      </View>
      <View style={styles.historyInfo}>
        <Text style={styles.statusText}>{courseName}</Text>
        <Text style={styles.timeText}>{timeIn} - {timeOut}</Text>
        <Text style={styles.dayText}>{dayName}</Text>
      </View>
    </View>
  );
};

export default function History() {
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState<string | null>(null);

  useEffect(() => {
    api.get("/api/students/me").then(({ data }) => {
      setStudentId(data.id);
      return api.get(`/api/access/students/${data.id}/history`);
    }).then(({ data }) => {
      // data = { student, total, accesses: [...] }
      setLogs(data.accesses ?? []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const today = new Date();
  const todayStr = today.toDateString();
  const todayLogs = logs.filter((l) => new Date(l.enteredAt).toDateString() === todayStr);
  const pastLogs = logs.filter((l) => new Date(l.enteredAt).toDateString() !== todayStr);

  const dateLabel = today.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator color="#2F6BFF" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../auth/Assets/SenacBackground.png")} style={styles.backgroundImage} />

      <SafeAreaView style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Histórico</Text>
            <Text style={styles.subtitle}>Confira seu histórico de entrada e saída</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.titleCard}>HOJE</Text>
            <Text style={styles.dateText}>{dateLabel}</Text>
            {todayLogs.length === 0 ? (
              <Text style={{ color: "#C8D2E3", marginTop: 8 }}>Nenhum registro hoje.</Text>
            ) : (
              todayLogs.map((log) => <HistoryCard key={log.id} log={log} />)
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.titleCard}>HISTÓRICO RECENTE</Text>
            {pastLogs.length === 0 ? (
              <Text style={{ color: "#C8D2E3", marginTop: 8 }}>Nenhum histórico anterior.</Text>
            ) : (
              pastLogs.slice(0, 20).map((log) => <HistoryCard key={log.id} log={log} />)
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative", backgroundColor: "#021127" },
  backgroundImage: { position: "absolute", width: "100%", height: 200, top: 0, left: 0 },
  content: { flex: 1, marginTop: 100 },
  header: { marginHorizontal: 20, marginBottom: 24 },
  title: { color: "#FFF", fontSize: 28, fontWeight: "bold" },
  subtitle: { color: "#ffffff", fontSize: 14, marginTop: 4 },
  card: {
    backgroundColor: "#051e3e", width: "92%", alignSelf: "center",
    borderRadius: 12, borderWidth: 1, borderColor: "#0B3D91", padding: 14, marginBottom: 16,
  },
  titleCard: { color: "#80B3F8", fontWeight: "bold", fontSize: 16, marginBottom: 4 },
  dateText: { color: "#C8D2E3", fontSize: 12, marginBottom: 12 },
  historyCard: {
    backgroundColor: "#112e61", width: "100%", marginTop: 12,
    borderRadius: 12, padding: 12, flexDirection: "row", alignItems: "center",
  },
  historyIconBox: {
    width: 42, height: 42, borderRadius: 8, backgroundColor: "#0B4BBB",
    alignItems: "center", justifyContent: "center", marginRight: 14,
  },
  historyInfo: { flex: 1 },
  statusText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
  timeText: { color: "#2F6BFF", fontSize: 13, marginTop: 4, fontWeight: "500" },
  dayText: { color: "#C8D2E3", fontSize: 13, marginTop: 2 },
});
