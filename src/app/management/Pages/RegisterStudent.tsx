import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView, Image,
  TextInput, TouchableOpacity, Alert, ActivityIndicator,
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import api from '../../../services/api';

interface Course {
  id: string;
  name: string;
  code: string;
}

export default function RegisterStudent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [enrollment, setEnrollment] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/api/courses').then(({ data }) => setCourses(data)).catch(() => {});
  }, []);

  const resetForm = () => {
    setName(''); setEmail(''); setEnrollment('');
    setPassword(''); setConfirmPassword(''); setSelectedCourseId('');
  };

  const handleRegister = async () => {
    if (!name || !email || !enrollment || !password) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.'); return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.'); return;
    }
    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres.'); return;
    }
    setLoading(true);
    try {
      const { data: student } = await api.post('/api/students', { name, email, password, enrollment });
      if (selectedCourseId) {
        await api.post(`/api/students/${student.id}/enroll`, { courseId: selectedCourseId });
      }
      Alert.alert('Sucesso', `Aluno "${name}" registrado com sucesso!`);
      resetForm();
    } catch (err: any) {
      const msg = err?.response?.data?.error ?? 'Erro ao registrar aluno.';
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../auth/Assets/SenacBackground.png")} style={styles.backgroundImage} />

      <SafeAreaView style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Novo Aluno</Text>
            <Text style={styles.subtitle}>Registre aqui os alunos que terão acesso ao portal</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.titleCard}>REGISTRO DE NOVO ALUNO</Text>
            <Text style={styles.cardSubtitle}>Preencha as informações para registrar um aluno</Text>

            <Text style={styles.sectionTitle}>Dados Pessoais</Text>

            <Text style={styles.label}>Nome completo *</Text>
            <TextInput
              style={styles.input} placeholder="Nome do aluno" placeholderTextColor="#6B8BB0"
              value={name} onChangeText={setName}
            />

            <Text style={styles.label}>Matrícula (RA) *</Text>
            <TextInput
              style={styles.input} placeholder="Ex: 2024001" placeholderTextColor="#6B8BB0"
              value={enrollment} onChangeText={setEnrollment} keyboardType="number-pad"
            />

            <Text style={styles.sectionTitle}>Dados de Acesso</Text>

            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input} placeholder="Digite o email do aluno" placeholderTextColor="#6B8BB0"
              value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"
            />

            <Text style={styles.label}>Senha *</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Mínimo 6 caracteres" placeholderTextColor="#6B8BB0"
                value={password} onChangeText={setPassword} secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#80B3F8" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirmar Senha *</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Confirme a senha" placeholderTextColor="#6B8BB0"
                value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#80B3F8" />
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Curso (opcional)</Text>
            <Text style={styles.label}>Selecione o curso</Text>
            <View style={styles.courseGrid}>
              {courses.map((c) => (
                <TouchableOpacity
                  key={c.id}
                  style={[styles.courseChip, selectedCourseId === c.id && styles.courseChipActive]}
                  onPress={() => setSelectedCourseId(selectedCourseId === c.id ? '' : c.id)}
                >
                  <Text style={[styles.courseChipText, selectedCourseId === c.id && { color: "#FFFFFF" }]}>
                    {c.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.6 }]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#FFFFFF" /> : (
                <>
                  <Ionicons name="person-add-outline" size={20} color="#FFFFFF" />
                  <Text style={styles.buttonText}>REGISTRAR NOVO ALUNO</Text>
                </>
              )}
            </TouchableOpacity>
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
  header: { marginTop: 10, marginHorizontal: 20, marginBottom: 24 },
  title: { color: "#FFF", fontSize: 28, fontWeight: "bold" },
  subtitle: { color: "#80B3F8", fontSize: 14, marginTop: 4 },
  card: {
    backgroundColor: "#051e3e", width: "92%", alignSelf: "center",
    borderRadius: 12, borderWidth: 1, borderColor: "#0B3D91", padding: 14, marginBottom: 16,
  },
  titleCard: { color: "#80B3F8", fontWeight: "bold", fontSize: 16, marginBottom: 4 },
  cardSubtitle: { color: "#C8D2E3", fontSize: 12, marginBottom: 16 },
  sectionTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold", marginTop: 16, marginBottom: 8 },
  label: { color: "#80B3F8", fontSize: 12, marginBottom: 4, marginTop: 12 },
  input: {
    backgroundColor: "#0F213F", borderRadius: 8, padding: 12,
    color: "#FFFFFF", fontSize: 14, borderWidth: 1, borderColor: "#0B3D91",
  },
  passwordWrapper: { flexDirection: "row", alignItems: "center" },
  passwordInput: { flex: 1, paddingRight: 40 },
  courseGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 4 },
  courseChip: {
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20,
    backgroundColor: "#0F213F", borderWidth: 1, borderColor: "#0B3D91",
  },
  courseChipActive: { backgroundColor: "#0B4BBB", borderColor: "#2F6BFF" },
  courseChipText: { color: "#80B3F8", fontSize: 12 },
  button: {
    backgroundColor: "#0B4BBB", height: 48, borderRadius: 8, marginTop: 24, marginBottom: 8,
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10,
  },
  buttonText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 14 },
});
