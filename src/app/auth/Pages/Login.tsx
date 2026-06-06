import { View, Image, Text, TextInput, StyleSheet, Pressable, Alert } from "react-native";
import Logo from "../Assets/Logo.svg";
import { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function Login() {
  const [perfil, setPerfil] = useState("estudante");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<any>();

  async function handleLogin() {
  try {
    if (!email || !password) {
      Alert.alert("Atenção", "Preencha e-mail e senha.");
      return;
    }

    setLoading(true);

    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      let errorMessage = "Login inválido";

      if (typeof data.message === "string") {
        errorMessage = data.message;
      } else if (typeof data.error === "string") {
        errorMessage = data.error;
      } else if (data.error && typeof data.error === "object") {
        errorMessage = Object.values(data.error).flat().join("\n");
      }

      Alert.alert("Erro ao entrar", errorMessage);
      return;
    }

    const { token, role } = data;

    console.log("TOKEN:", token);
    console.log("ROLE:", role);

    if (role === "STUDENT") {
      navigation.navigate("Student");
      return;
    }

    if (role === "ADMIN") {
      navigation.navigate("Management");
      return;
    }

    Alert.alert(
      "Acesso negado",
      "Esse perfil não possui acesso ao aplicativo."
    );
  } catch (error) {
    console.log(error);
    Alert.alert("Erro", "Não foi possível conectar ao servidor.");
  } finally {
    setLoading(false);
  }
}

  return (
    <View style={styles.container}>
      <Image
        source={require("../Assets/SenacBackground.png")}
        style={styles.background}
      />

      <View style={styles.content}>
        <Logo width={220} height={110} />

        <Text style={styles.titleWelcome}>Bem-vindo!</Text>

        <Text style={styles.descriptionWelcome}>
          Faça login para acessar o Smart Campus
        </Text>

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

          <View style={{ marginTop: 10 }}>
            <View style={{ marginTop: 15, width: "100%", paddingHorizontal: 20 }}>
              <Text style={styles.label}>E-mail</Text>

              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={18} color="#9CA8B8" />

                <TextInput
                  style={styles.input}
                  placeholder="seu.email@exemplo.com"
                  placeholderTextColor="#9CA8B8"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <View style={{ marginTop: 15, width: "100%", paddingHorizontal: 20 }}>
              <Text style={styles.label}>Senha</Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#9CA8B8"
                />

                <TextInput
                  style={styles.input}
                  placeholder="**********"
                  placeholderTextColor="#9CA8B8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>
          </View>

          <Pressable
            style={[
              styles.loginButton,
              loading && { opacity: 0.7 },
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Ionicons name="log-in-outline" size={24} color="#FFFFFF" />

            <Text style={styles.loginButtonText}>
              {loading ? "Entrando..." : "Entrar"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#03142e",
  },

  background: {
    width: "100%",
    position: "absolute",
  },

  logoContainer: {
    position: "absolute",
    top: 80,
    width: "100%",
    alignItems: "center",
  },

  logo: {
    width: 150,
    height: 100,
    resizeMode: "contain",
  },

  titleWelcome: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 23,
    textAlign: "center",
  },

  descriptionWelcome: {
    color: "#FFFFFF",
    fontWeight: "normal",
    fontSize: 12,
    marginTop: 5,
  },

  card: {
    backgroundColor: "#051e3e",
    width: "80%",
    height: 470,
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  content: {
    flex: 1,
    alignItems: "center",
    marginTop: 80,
  },

  titleCard: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 15,
    fontSize: 12,
    fontWeight: "bold",
  },

  toggleContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 20,
    height: 58,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
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
    marginTop: 50,
    marginHorizontal: 20,
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