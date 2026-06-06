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
type StudentFormData = {
  email: string;
  course: string;
  turma: string;
  password: string;
  confirmPassword: string;
};

// ==================== MAIN COMPONENT ====================
export default function RegisterStudent() {
  // Form state
  const [formData, setFormData] = useState<StudentFormData>({
    email: '',
    course: '',
    turma: '',
    password: '',
    confirmPassword: '',
  });

  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle student registration
  const handleRegister = () => {
    // Validation checks
    if (!formData.email || !formData.course || !formData.turma || !formData.password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (formData.password.length < 8) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 8 caracteres');
      return;
    }

    // Simulate successful registration
    Alert.alert('Sucesso', 'Aluno registrado com sucesso!');

    // Reset form
    setFormData({
      email: '',
      course: '',
      turma: '',
      password: '',
      confirmPassword: '',
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
            <Text style={styles.title}>Novo Aluno</Text>
            <Text style={styles.subtitle}>
              Registre aqui os alunos que terão acesso ao portal
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            <Text style={styles.titleCard}>REGISTRO DE NOVO ALUNO</Text>
            <Text style={styles.cardSubtitle}>
              Preencha as informações para registrar um aluno
            </Text>

            {/* Access Data Section */}
            <Text style={styles.sectionTitle}>Dados de Acesso</Text>

            {/* Email Field */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o email do aluno"
              placeholderTextColor="#6B8BB0"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Course Field */}
            <Text style={styles.label}>Curso</Text>
            <View style={styles.selectWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Selecione o curso do aluno"
                placeholderTextColor="#6B8BB0"
                value={formData.course}
                onChangeText={(text) => setFormData({ ...formData, course: text })}
              />
              <Ionicons name="chevron-down" size={20} color="#80B3F8" style={styles.selectIcon} />
            </View>

            {/* Class Field */}
            <Text style={styles.label}>Turma</Text>
            <View style={styles.selectWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Selecione a turma do aluno"
                placeholderTextColor="#6B8BB0"
                value={formData.turma}
                onChangeText={(text) => setFormData({ ...formData, turma: text })}
              />
              <Ionicons name="chevron-down" size={20} color="#80B3F8" style={styles.selectIcon} />
            </View>

            {/* Password Field */}
            <Text style={styles.label}>Senha</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Digite a senha"
                placeholderTextColor="#6B8BB0"
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#80B3F8"
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password Field */}
            <Text style={styles.label}>Confirmar Senha</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Confirme a senha"
                placeholderTextColor="#6B8BB0"
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#80B3F8"
                />
              </TouchableOpacity>
            </View>

            {/* Password Requirements Section */}
            <View style={styles.passwordRequirements}>
              <Text style={styles.requirementsTitle}>Requisitos da senha:</Text>
              <View style={styles.requirementItem}>
                <Ionicons name="checkmark-circle" size={14} color="#4CAF50" />
                <Text style={styles.requirementText}>Mínimo de 8 caracteres</Text>
              </View>
              <View style={styles.requirementItem}>
                <Ionicons name="checkmark-circle" size={14} color="#4CAF50" />
                <Text style={styles.requirementText}>Incluir letras e números</Text>
              </View>
              <View style={styles.requirementItem}>
                <Ionicons name="checkmark-circle" size={14} color="#4CAF50" />
                <Text style={styles.requirementText}>Pelo menos uma letra maiúscula</Text>
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Ionicons name="person-add-outline" size={20} color="#FFFFFF" />
              <Text style={styles.buttonText}>REGISTRAR NOVO ALUNO</Text>
            </TouchableOpacity>
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
    marginTop: 12,
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
  selectWrapper: {
    position: "relative",
  },
  selectIcon: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  passwordInput: {
    flex: 1,
    paddingRight: 40,
  },
  passwordRequirements: {
    backgroundColor: "#0F213F",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#0B3D91",
  },
  requirementsTitle: {
    color: "#80B3F8",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  requirementText: {
    color: "#C8D2E3",
    fontSize: 11,
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
});