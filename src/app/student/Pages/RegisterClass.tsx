import React, { useState } from 'react';
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
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";

// ==================== TYPES ====================
type ClassFormData = {
  room: string;
  turma: string;
  course: string;
  discipline: string;
  professor: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
};

// ==================== MOCK DATA ====================
// Recent class registration example
const recentClass = {
  discipline: 'Programação Web',
  startTime: '18:00',
  endTime: '20:00',
  room: '1604',
  professor: 'Rafaela Cantarelli',
};

// ==================== MAIN COMPONENT ====================
export default function RegisterClass() {
  // Form state
  const [formData, setFormData] = useState<ClassFormData>({
    room: '',
    turma: '',
    course: '',
    discipline: '',
    professor: '',
    dayOfWeek: '',
    startTime: '',
    endTime: '',
  });

  // Handle class registration
  const handleRegister = () => {
    // Validation checks
    if (!formData.room || !formData.turma || !formData.discipline || !formData.professor) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    // Simulate successful registration
    Alert.alert('Sucesso', 'Aula registrada com sucesso!');

    // Reset form
    setFormData({
      room: '',
      turma: '',
      course: '',
      discipline: '',
      professor: '',
      dayOfWeek: '',
      startTime: '',
      endTime: '',
    });
  };

  return (
    <View style={styles.container}>
      {/* Background image (same as Homepage) */}
      <Image
        source={require("../../auth/Assets/SenacBackground.png")}
        style={styles.backgroundImage}
      />

      <SafeAreaView style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>Registro de Aulas</Text>
            <Text style={styles.subtitle}>
              Registre aqui as aulas, horários e salas de cada turma
            </Text>
          </View>

          {/* Registration Form Card */}
          <View style={styles.card}>
            <Text style={styles.titleCard}>REGISTRO DE AULA</Text>
            <Text style={styles.cardSubtitle}>
              Preencha as informações para registrar uma aula
            </Text>

            {/* Room and Class Section */}
            <Text style={styles.sectionTitle}>Sala e Turma</Text>

            <View style={styles.row}>
              <View style={styles.halfField}>
                <Text style={styles.label}>Sala</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Sala"
                  placeholderTextColor="#6B8BB0"
                  value={formData.room}
                  onChangeText={(text) => setFormData({ ...formData, room: text })}
                />
              </View>
              <View style={styles.halfField}>
                <Text style={styles.label}>Turma</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Turma"
                  placeholderTextColor="#6B8BB0"
                  value={formData.turma}
                  onChangeText={(text) => setFormData({ ...formData, turma: text })}
                />
              </View>
            </View>

            {/* Course Field */}
            <Text style={styles.label}>Curso</Text>
            <TextInput
              style={styles.input}
              placeholder="Curso"
              placeholderTextColor="#6B8BB0"
              value={formData.course}
              onChangeText={(text) => setFormData({ ...formData, course: text })}
            />

            {/* Discipline and Professor Section */}
            <Text style={styles.sectionTitle}>Disciplina e Professor</Text>

            {/* Discipline Field */}
            <Text style={styles.label}>Disciplina</Text>
            <TextInput
              style={styles.input}
              placeholder="Disciplina"
              placeholderTextColor="#6B8BB0"
              value={formData.discipline}
              onChangeText={(text) => setFormData({ ...formData, discipline: text })}
            />

            {/* Professor Field */}
            <Text style={styles.label}>Professor</Text>
            <TextInput
              style={styles.input}
              placeholder="Professor"
              placeholderTextColor="#6B8BB0"
              value={formData.professor}
              onChangeText={(text) => setFormData({ ...formData, professor: text })}
            />

            {/* Day and Time Section */}
            <Text style={styles.sectionTitle}>Dia e Horário</Text>

            {/* Day of Week Field */}
            <Text style={styles.label}>Dia</Text>
            <View style={styles.selectWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Selecione o dia"
                placeholderTextColor="#6B8BB0"
                value={formData.dayOfWeek}
                onChangeText={(text) => setFormData({ ...formData, dayOfWeek: text })}
              />
              <Ionicons name="chevron-down" size={20} color="#80B3F8" style={styles.selectIcon} />
            </View>

            {/* Start and End Time Fields */}
            <View style={styles.row}>
              <View style={styles.halfField}>
                <Text style={styles.label}>Horário de início</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 18:00"
                  placeholderTextColor="#6B8BB0"
                  value={formData.startTime}
                  onChangeText={(text) => setFormData({ ...formData, startTime: text })}
                />
              </View>
              <View style={styles.halfField}>
                <Text style={styles.label}>Horário de término</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 20:00"
                  placeholderTextColor="#6B8BB0"
                  value={formData.endTime}
                  onChangeText={(text) => setFormData({ ...formData, endTime: text })}
                />
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Ionicons name="book-outline" size={20} color="#FFFFFF" />
              <Text style={styles.buttonText}>REGISTRAR AULA</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Registration Card */}
          <View style={styles.card}>
            <Text style={styles.titleCard}>REGISTRO RECENTE</Text>

            <View style={styles.recentCard}>
              <View style={styles.recentIconBox}>
                <Ionicons name="book" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.recentInfo}>
                <Text style={styles.recentDiscipline}>{recentClass.discipline}</Text>
                <Text style={styles.recentTime}>
                  {recentClass.startTime} - {recentClass.endTime}
                </Text>
                <Text style={styles.recentRoom}>Sala {recentClass.room}</Text>
                <Text style={styles.recentProfessor}>Professor(a): {recentClass.professor}</Text>
              </View>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ==================== STYLES ====================
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
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  title: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#80B3F8",
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
  cardSubtitle: {
    color: "#C8D2E3",
    fontSize: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 12,
  },
  label: {
    color: "#80B3F8",
    fontSize: 12,
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    backgroundColor: "#0F213F",
    borderRadius: 8,
    padding: 12,
    color: "#FFFFFF",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#0B3D91",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfField: {
    flex: 1,
  },
  selectWrapper: {
    position: "relative",
  },
  selectIcon: {
    position: "absolute",
    right: 12,
    top: 12,
  },
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
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
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
  recentInfo: {
    flex: 1,
  },
  recentDiscipline: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  recentTime: {
    color: "#2F6BFF",
    fontSize: 13,
    marginTop: 4,
    fontWeight: "500",
  },
  recentRoom: {
    color: "#C8D2E3",
    fontSize: 13,
    marginTop: 2,
  },
  recentProfessor: {
    color: "#80B3F8",
    fontSize: 12,
    marginTop: 2,
  },
});