import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../../services/api";

const DAY_NAMES = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

interface FlatSchedule {
  id: string;
  courseName: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  roomName: string;
}

const AulaCard = ({ disciplina, horario, sala }: { disciplina: string; horario: string; sala: string }) => (
  <View style={styles.scheduleCard}>
    <View style={styles.scheduleIconBox}>
      <Ionicons name="book-outline" size={24} color="#FFFFFF" />
    </View>
    <View style={styles.scheduleInfo}>
      <Text style={styles.className}>{disciplina}</Text>
      <Text style={styles.classTime}>{horario}</Text>
      <Text style={styles.classRoom}>{sala}</Text>
    </View>
  </View>
);

export default function Schedule() {
  const [schedules, setSchedules] = useState<FlatSchedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/students/me").then(({ data }) => {
      const flat: FlatSchedule[] = [];
      for (const enr of data.courses) {
        for (const sch of enr.course.schedules) {
          flat.push({
            id: sch.id,
            courseName: enr.course.name,
            dayOfWeek: sch.dayOfWeek,
            startTime: sch.startTime,
            endTime: sch.endTime,
            roomName: sch.room.name,
          });
        }
      }
      flat.sort((a, b) => a.dayOfWeek - b.dayOfWeek || a.startTime.localeCompare(b.startTime));
      setSchedules(flat);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const todayIndex = new Date().getDay();
  const todaySchedules = schedules.filter((s) => s.dayOfWeek === todayIndex);

  // Agrupar por dia para "semana"
  const byDay: Record<number, FlatSchedule[]> = {};
  for (const s of schedules) {
    if (!byDay[s.dayOfWeek]) byDay[s.dayOfWeek] = [];
    byDay[s.dayOfWeek].push(s);
  }
  const sortedDays = Object.keys(byDay).map(Number).sort((a, b) => a - b);

  const today = new Date();
  const dateStr = today.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });

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
            <Text style={styles.title}>Horários</Text>
            <Text style={styles.subtitle}>Confira seus horários da semana</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.titleCard}>HOJE</Text>
            <Text style={styles.dateText}>{dateStr}</Text>
            {todaySchedules.length === 0 ? (
              <Text style={{ color: "#C8D2E3", marginTop: 8 }}>Nenhuma aula hoje.</Text>
            ) : (
              todaySchedules.map((s) => (
                <AulaCard key={s.id} disciplina={s.courseName} horario={`${s.startTime} - ${s.endTime}`} sala={s.roomName} />
              ))
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.titleCard}>HORÁRIOS DA SEMANA</Text>
            {sortedDays.map((day) => (
              <View key={day}>
                <View style={styles.dayHeader}>
                  <Ionicons name="calendar-outline" size={16} color="#80B3F8" />
                  <Text style={styles.dayTitle}>{DAY_NAMES[day].toUpperCase()}</Text>
                </View>
                {byDay[day].map((s) => (
                  <AulaCard key={s.id} disciplina={s.courseName} horario={`${s.startTime} - ${s.endTime}`} sala={s.roomName} />
                ))}
              </View>
            ))}
            {sortedDays.length === 0 && (
              <Text style={{ color: "#C8D2E3", marginTop: 8 }}>Nenhum horário cadastrado.</Text>
            )}
          </View>

          <Text style={styles.infocard}>
            Os horários são atualizados automaticamente{"\n"}
            Em caso de dúvidas, procure sua coordenação
          </Text>
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
  infocard: {
    color: "#ffffff", textAlign: "center", backgroundColor: "#051e3e",
    width: "92%", alignSelf: "center", borderRadius: 12, borderWidth: 1,
    borderColor: "#0B3D91", padding: 14, marginBottom: 16,
  },
  titleCard: { color: "#80B3F8", fontWeight: "bold", fontSize: 16, marginBottom: 4 },
  dateText: { color: "#C8D2E3", fontSize: 12, marginBottom: 12 },
  scheduleCard: {
    backgroundColor: "#112e61", width: "100%", marginTop: 12,
    borderRadius: 12, padding: 12, flexDirection: "row", alignItems: "flex-start",
  },
  scheduleIconBox: {
    width: 42, height: 42, borderRadius: 8, backgroundColor: "#0B4BBB",
    alignItems: "center", justifyContent: "center", marginRight: 14,
  },
  scheduleInfo: { flex: 1 },
  className: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
  classTime: { color: "#2F6BFF", fontSize: 13, marginTop: 4, fontWeight: "500" },
  classRoom: { color: "#C8D2E3", fontSize: 13, marginTop: 2 },
  dayHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 16, marginBottom: 4 },
  dayTitle: { color: "#80B3F8", fontSize: 14, fontWeight: "bold" },
});
