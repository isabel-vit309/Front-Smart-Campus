import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type HistoryItem = {
  id: string;
  status: "present" | "absent";
  startTime: string;
  endTime: string;
  dayOfWeek: string;
};

type DayHistory = {
  date: string;
  dayName: string;
  items: HistoryItem[];
};

const todayHistory: DayHistory = {
  date: "26 de abril",
  dayName: "Segunda-feira",
  items: [
    {
      id: "1",
      status: "present",
      startTime: "18:00",
      endTime: "22:00",
      dayOfWeek: "SEGUNDA-FEIRA",
    },
  ],
};

const weeklyHistory: HistoryItem[] = [
  {
    id: "2",
    status: "present",
    startTime: "18:00",
    endTime: "22:00",
    dayOfWeek: "SEGUNDA-FEIRA",
  },
  {
    id: "3",
    status: "present",
    startTime: "18:00",
    endTime: "22:00",
    dayOfWeek: "TERÇA-FEIRA",
  },
  {
    id: "4",
    status: "present",
    startTime: "18:00",
    endTime: "21:00",
    dayOfWeek: "QUARTA-FEIRA",
  },
  {
    id: "5",
    status: "present",
    startTime: "18:00",
    endTime: "22:00",
    dayOfWeek: "QUINTA-FEIRA",
  },
  {
    id: "6",
    status: "absent",
    startTime: "18:00",
    endTime: "22:00",
    dayOfWeek: "SEXTA-FEIRA",
  },
];

const HistoryCard = ({ item }: { item: HistoryItem }) => {
  const isPresent = item.status === "present";

  const statusIcon = isPresent
    const iconName = isPresent ? "checkmark-circle" : "close-circle";
    const iconColor = isPresent ? "#4CAF50" : "#FF4C4C";

  return (
    <View style={styles.historyCard}>
      <View style={styles.historyIconBox}>
        <Ionicons name={iconName} size={24} color={iconColor} />
      </View>

      <View style={styles.historyInfo}>
        <Text style={styles.statusText}>
          {isPresent ? "PRESENÇA" : "SEM REGISTRO"}
        </Text>
        <Text style={styles.timeText}>
          {item.startTime} - {item.endTime}
        </Text>
        <Text style={styles.dayText}>{item.dayOfWeek}</Text>
      </View>
    </View>
  );
};

export default function History() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../auth/Assets/SenacBackground.png")}
        style={styles.backgroundImage}
      />

      <SafeAreaView style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Histórico</Text>
            <Text style={styles.subtitle}>
              Confira seu histórico de entrada e saída
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.titleCard}>HOJE</Text>
            <Text style={styles.dateText}>
              {todayHistory.dayName}, {todayHistory.date}
            </Text>

            {todayHistory.items.map((item) => (
              <HistoryCard key={item.id} item={item} />
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.titleCard}>HISTÓRICO DA SEMANA</Text>

            {weeklyHistory.map((item) => (
              <HistoryCard key={item.id} item={item} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#021127",
  },

  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: 200,
    top: 0,
    left: 0,
  },

  content: {
    flex: 1,
    marginTop: 100,
  },

  header: {
    marginHorizontal: 20,
    marginBottom: 24,
  },

  title: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#ffffff",
    fontSize: 14,
    marginTop: 4,
  },

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

  dateText: {
    color: "#C8D2E3",
    fontSize: 12,
    marginBottom: 12,
  },

  historyCard: {
    backgroundColor: "#112e61",
    width: "100%",
    marginTop: 12,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  historyIconBox: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: "#0B4BBB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  statusIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },

  historyInfo: {
    flex: 1,
  },

  statusText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  timeText: {
    color: "#2F6BFF",
    fontSize: 13,
    marginTop: 4,
    fontWeight: "500",
  },

  dayText: {
    color: "#C8D2E3",
    fontSize: 13,
    marginTop: 2,
  },

  footer: {
    textAlign: "center",
    color: "#C8D2E3",
    fontSize: 12,
    marginVertical: 30,
    marginHorizontal: 20,
    lineHeight: 18,
  },
});
