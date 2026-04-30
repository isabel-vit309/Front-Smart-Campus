import { Image, Text, View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Logo from "../../auth/Assets/Logo.svg";

export default function Home() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../auth/Assets/SenacBackground.png")}
        style={styles.image}
      />

      <View style={styles.textContainer}>
        <Text style={styles.title}>Olá, Aluno!</Text>
        <Text style={styles.subtitle}>Bem-vindo(a) de volta.</Text>
        <Logo width={170} height={100} style={{ marginTop: 4 }} />
      </View>

      <View style={styles.card}>
        <Text style={styles.titleCard}>ACESSO RÁPIDO</Text>

        <Text style={styles.qrTitle}>Seu QR Code de acesso</Text>

        <View style={styles.qrContent}>
          <Image
          source={require("../Assets/QRCode (2).png")}
            style={styles.qrImage}
          />

          <View style={styles.qrInfo}>
            <Text style={styles.description}>
              Apresente este código no leitor da portaria para liberar seu acesso
            </Text>

            <Text style={styles.expireText}>Expira em</Text>
            <Text style={styles.timer}>00:30</Text>
          </View>
        </View>

        <Pressable style={styles.button}>
          <Ionicons name="qr-code-outline" size={22} color="#FFFFFF" />
          <Text style={styles.buttonText}>GERAR NOVO QR CODE</Text>
        </Pressable>
      </View>

      <View style={styles.cardTwo}>
        <Text style={styles.titleCard}>HOJE</Text>
        <View style={styles.sheduleCard}>
        <View style={styles.scheduleIconBox}>
            <Ionicons name="calendar-outline" size={24} color="#FFFFFF" />
        </View>

        <View style={styles.scheduleInfo}>
            <Text style={styles.nextClass}>Próxima aula</Text>
            <Text style={styles.className}>Programação Web</Text>
            <Text style={styles.classTime}>18:00 - 20:00</Text>
            <Text style={styles.classRoom}>Sala 1604</Text>
        </View>

        <View style={styles.badge}>
            <Text style={styles.badgeText}>EM 20 MIN</Text>
        </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#021127",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: 200,
  },

  textContainer: {
    position: "absolute",
    top: 40,
    left: 20,
  },

  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#FFF",
    fontSize: 14,
  },

  card: {
    backgroundColor: "#051e3e",
    width: "92%",
    marginTop: -8,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },

  cardTwo: {
    backgroundColor: "#051e3e",
    width: "92%",
    marginTop: 15,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },

  titleCard: {
    color: "#80B3F8",
    fontWeight: "bold",
    fontSize: 16,
  },

  qrTitle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 13,
    marginTop: 8,
  },

  qrContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    gap: 18,
  },

  qrImage: {
    width: 150,
    height: 150,
    borderRadius: 12,
  },

  qrInfo: {
    flex: 1,
  },

  description: {
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 16,
  },

  expireText: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 18,
  },

  timer: {
    color: "#2F6BFF",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 4,
  },

  button: {
    backgroundColor: "#0B4BBB",
    height: 42,
    borderRadius: 6,
    marginTop: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 13,
  },
  sheduleCard: {
  backgroundColor: "#0F213F",
  width: "100%",
  marginTop: 15,
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

nextClass: {
  color: "#80B3F8",
  fontSize: 16,
},

className: {
  color: "#FFFFFF",
  fontSize: 14,
  marginTop: 2,
},

classTime: {
  color: "#C8D2E3",
  fontSize: 13,
  marginTop: 8,
},

classRoom: {
  color: "#C8D2E3",
  fontSize: 13,
  marginTop: 2,
},

badge: {
  backgroundColor: "#0B3D91",
  borderRadius: 20,
  paddingHorizontal: 16,
  paddingVertical: 5,
},

badgeText: {
  color: "#2F6BFF",
  fontSize: 11,
  fontWeight: "bold",
},
});