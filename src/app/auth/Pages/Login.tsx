import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import Logo from "../Assets/Logo.svg";
import { useState } from "react";
import { Pressable } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  Student: undefined;
  Management: undefined;
};

export default function Login() {
  const [perfil, setPerfil] = useState<"estudante" | "gestao">("estudante");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  async function handleLogin() {
    if (!email.trim() || !password) {
      Alert.alert("Atenção", "Preencha e-mail e senha.");
      return;
    }

    setLoading(true);
    try {
      const role = await signIn(email.trim().toLowerCase(), password);

      if (perfil === "estudante" && role !== "STUDENT") {
        Alert.alert(
          "Perfil incorreto",
          `Esta conta é de ${role === "ADMIN" ? "administrador" : "professor"}.\nSelecione "Gestão" para acessar.`,
        );
        return;
      }
      if (perfil === "gestao" && role === "STUDENT") {
        Alert.alert(
          "Perfil incorreto",
          'Esta conta é de estudante.\nSelecione "Estudante" para acessar.',
        );
        return;
      }

      const target = role === "STUDENT" ? "Student" : "Management";
      navigation.reset({ index: 0, routes: [{ name: target }] });
    } catch (err: any) {
      let msg: string;
      if (!err?.response) {
        msg = `Servidor inacessível.\n\nURL: ${err?.config?.url ?? "?"}\nDetalhe: ${err?.message}`;
      } else if (err.response.status === 401 || err.response.status === 400) {
        msg = err.response.data?.error ?? "E-mail ou senha incorretos.";
      } else {
        msg = `Erro ${err.response.status}: ${err.response.data?.error ?? err.message}`;
      }

      Alert.alert("Erro ao entrar", msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Image
        source={require("../Assets/SenacBackground.png")}
        style={styles.background}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Logo width={220} height={110} />
          <Text style={styles.titleWelcome}>Bem-vindo!</Text>
          <Text style={styles.descriptionWelcome}>
            Faça login para acessar o Smart Campus
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.titleCard}>Escolha seu perfil de acesso</Text>
          <View style={styles.toggleContainer}>
            <Pressable
              style={[
                styles.toggleButton,
                perfil === "estudante" && styles.activeButton,
              ]}
              onPress={() => setPerfil("estudante")}
            >
              <MaterialCommunityIcons
                name="school"
                size={22}
                color={perfil === "estudante" ? "#1E7BFF" : "#9CA8B8"}
              />
              <Text
                style={[
                  styles.toggleText,
                  perfil === "estudante" && styles.activeText,
                ]}
              >
                Estudante
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.toggleButton,
                perfil === "gestao" && styles.activeButton,
              ]}
              onPress={() => setPerfil("gestao")}
            >
              <Ionicons
                name="people-outline"
                size={24}
                color={perfil === "gestao" ? "#1E7BFF" : "#9CA8B8"}
              />
              <Text
                style={[
                  styles.toggleText,
                  perfil === "gestao" && styles.activeText,
                ]}
              >
                Gestão
              </Text>
            </Pressable>
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>E-mail</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={18} color="#9CA8B8" />
              <TextInput
                style={styles.input}
                placeholder="seu.email@exemplo.com"
                placeholderTextColor="#9CA8B8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />
            </View>
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={18} color="#9CA8B8" />
              <TextInput
                style={styles.input}
                placeholder="**********"
                placeholderTextColor="#9CA8B8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
            </View>
          </View>
          <TouchableOpacity
            style={[styles.loginButton, loading && { opacity: 0.6 }]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="log-in-outline" size={24} color="#FFFFFF" />
                <Text style={styles.loginButtonText}>Entrar</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#03142e",
  },
  background: {
    width: "100%",
    position: "absolute",
    top: 0,
  },
  scroll: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  titleWelcome: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 23,
    textAlign: "center",
    marginTop: 8,
  },
  descriptionWelcome: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 4,
  },
  card: {
    backgroundColor: "#051e3e",
    width: "85%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  titleCard: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 14,
  },
  toggleContainer: {
    flexDirection: "row",
    height: 58,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
    marginBottom: 6,
  },
  toggleButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(3, 20, 46, 0.45)",
  },
  activeButton: {
    backgroundColor: "rgba(31, 111, 235, 0.15)",
    borderWidth: 1.5,
    borderColor: "#1E7BFF",
    borderRadius: 8,
  },
  toggleText: {
    color: "#9CA8B8",
    fontSize: 15,
    fontWeight: "700",
  },
  activeText: {
    color: "#1E7BFF",
  },
  fieldWrapper: {
    marginTop: 14,
  },
  label: {
    color: "#9CA8B8",
    marginBottom: 6,
    fontSize: 13,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 50,
    backgroundColor: "rgba(3, 20, 46, 0.6)",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#fff",
    fontSize: 14,
  },
  loginButton: {
    marginTop: 28,
    height: 55,
    borderRadius: 8,
    backgroundColor: "#1463F3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
