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

const today = [
  {
    id: "1",
    disciplina: "Programação Web",
    horario: "18:00 - 20:00",
    sala: "1604",
    professor: "Marcos Silva",
  },
  {
    id: "2",
    disciplina: "Banco de Dados",
    horario: "20:00 - 22:00",
    sala: "1604",
    professor: "Rafaela Cantarelli",
  },
];

const nextweeks = [
  {
    id: "seg",
    dia: "SEGUNDA-FEIRA",
    aulas: [
      {
        disciplina: "Programação Web",
        horario: "18:00 - 20:00",
        sala: "1604",
        professor: "Marcos Silva",
      },
      {
        disciplina: "Banco de Dados",
        horario: "20:00 - 22:00",
        sala: "1604",
        professor: "Rafaela Cantarelli",
      },
    ],
  },
  {
    id: "ter",
    dia: "TERÇA-FEIRA",
    aulas: [
      {
        disciplina: "Design",
        horario: "18:00 - 20:00",
        sala: "1604",
        professor: "Felipe Monteiro",
      },
      {
        disciplina: "Comunicação Empresarial",
        horario: "20:00 - 22:00",
        sala: "1604",
        professor: "Marcos Silva",
      },
    ],
  },
  {
    id: "qua",
    dia: "QUARTA-FEIRA",
    aulas: [
      {
        disciplina: "Programação Web",
        horario: "18:00 - 20:00",
        sala: "1604",
        professor: "Marcos Silva",
      },
      {
        disciplina: "Banco de Dados",
        horario: "20:00 - 22:00",
        sala: "1604",
        professor: "Rafaela Cantarelli",
      },
    ],
  },
  {
    id: "qui",
    dia: "QUINTA-FEIRA",
    aulas: [
      {
        disciplina: "Design",
        horario: "18:00 - 20:00",
        sala: "1604",
        professor: "Felipe Monteiro",
      },
      {
        disciplina: "Comunicação Empresarial",
        horario: "20:00 - 22:00",
        sala: "1604",
        professor: "Marcos Silva",
      },
    ],
  },
  {
    id: "sex",
    dia: "SEXTA-FEIRA",
    aulas: [
      {
        disciplina: "Programação Web",
        horario: "18:00 - 20:00",
        sala: "1604",
        professor: "Marcos Silva",
      },
      {
        disciplina: "Banco de Dados",
        horario: "20:00 - 22:00",
        sala: "1604",
        professor: "Rafaela Cantarelli",
      },
    ],
  },
];

type AulaCardProps = {
  disciplina: string;
  horario: string;
  sala: string;
  professor: string;
};

const AulaCard = ({ disciplina, horario, sala, professor }: AulaCardProps) => (
  <View style={styles.scheduleCard}>
    <View style={styles.scheduleIconBox}>
      <Ionicons name="book-outline" size={24} color="#FFFFFF" />
    </View>

    <View style={styles.scheduleInfo}>
      <Text style={styles.className}>{disciplina}</Text>
      <Text style={styles.classTime}>{horario}</Text>
      <Text style={styles.classRoom}>Sala {sala}</Text>
      <Text style={styles.professor}>Prof(a): {professor}</Text>
    </View>
  </View>
);

export default function Schedule() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../auth/Assets/SenacBackground.png")}
        style={styles.backgroundImage}
      />

      <SafeAreaView style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Horários</Text>
            <Text style={styles.subtitle}>Confira seus horários da semana</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.titleCard}>HOJE</Text>
            <Text style={styles.dateText}>Segunda-feira, 26 de abril</Text>

            {today.map((aula) => (
              <AulaCard key={aula.id} {...aula} />
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.titleCard}>HORÁRIOS DA SEMANA</Text>

            {nextweeks.map((dia) => (
              <View key={dia.id}>
                <View style={styles.dayHeader}>
                  <Ionicons name="calendar-outline" size={16} color="#80B3F8" />
                  <Text style={styles.dayTitle}>{dia.dia}</Text>
                </View>
                {dia.aulas.map((aula, idx) => (
                  <AulaCard key={idx} {...aula} />
                ))}
              </View>
            ))}
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

  infocard: {
    color: "#ffffff",
    textAlign: "center",
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

  scheduleCard: {
    backgroundColor: "#112e61",
    width: "100%",
    marginTop: 12,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  scheduleIconBox: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: "#0B4BBB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  scheduleInfo: {
    flex: 1,
  },

  className: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  classTime: {
    color: "#2F6BFF",
    fontSize: 13,
    marginTop: 4,
    fontWeight: "500",
  },

  classRoom: {
    color: "#C8D2E3",
    fontSize: 13,
    marginTop: 2,
  },

  professor: {
    color: "#80B3F8",
    fontSize: 12,
    marginTop: 2,
  },

  dayHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    marginBottom: 4,
  },

  dayTitle: {
    color: "#80B3F8",
    fontSize: 14,
    fontWeight: "bold",
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
