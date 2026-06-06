import {
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";

export default function ListStudents() {
  const alunos = [
    { nome: "Ana Maria Teixeira", email: "anamaria@gmail.com", turma: "TDS04S3" },
    { nome: "Ana Maria Teixeira", email: "anamaria@gmail.com", turma: "TDS04S3" },
    { nome: "Ana Maria Teixeira", email: "anamaria@gmail.com", turma: "TDS04S3" },
    { nome: "Ana Maria Teixeira", email: "anamaria@gmail.com", turma: "TDS04S3" },
    { nome: "Ana Maria Teixeira", email: "anamaria@gmail.com", turma: "TDS04S3" },
    { nome: "Ana Maria Teixeira", email: "anamaria@gmail.com", turma: "TDS04S3" },
    { nome: "Ana Maria Teixeira", email: "anamaria@gmail.com", turma: "TDS04S3" },
    { nome: "Ana Maria Teixeira", email: "anamaria@gmail.com", turma: "TDS04S3" },
    { nome: "Ana Maria Teixeira", email: "anamaria@gmail.com", turma: "TDS04S3" },
    { nome: "Ana Maria Teixeira", email: "anamaria@gmail.com", turma: "TDS04S3" },
    { nome: "Ana Maria Teixeira", email: "anamaria@gmail.com", turma: "TDS04S3" },
    { nome: "Ana Maria Teixeira", email: "anamaria@gmail.com", turma: "TDS04S3" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator
      >
        <Image
          source={require("../../auth/Assets/SenacBackground.png")}
          style={styles.image}
        />

        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Listagem de Alunos</Text>
            <Text style={styles.subtitle}>
              Gerencie os alunos cadastrados no sistema
            </Text>
          </View>

          <Pressable style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.titleCard}>ALUNOS CADASTRADOS</Text>
          <Text style={styles.descriptionCard}>
            Visualize e gerencie os alunos do portal
          </Text>

          <View style={styles.filterContainer}>
            <View style={styles.searchBox}>
              <TextInput
                placeholder="Buscar por nome ou email"
                placeholderTextColor="#9CAAC0"
                style={styles.input}
              />
              <Ionicons name="search-outline" size={18} color="#FFFFFF" />
            </View>

            <Pressable style={styles.filterButton}>
              <Ionicons name="filter-outline" size={16} color="#FFFFFF" />
              <Text style={styles.filterText}>Filtrar</Text>
              <Ionicons name="chevron-down-outline" size={14} color="#FFFFFF" />
            </Pressable>
          </View>

          <DataTable style={styles.table}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title textStyle={styles.headerText}>
                ALUNO
              </DataTable.Title>

              <DataTable.Title textStyle={styles.headerText}>
                EMAIL
              </DataTable.Title>

              <DataTable.Title textStyle={styles.headerText}>
                TURMA
              </DataTable.Title>

              <DataTable.Title textStyle={styles.headerText}>
                AÇÕES
              </DataTable.Title>
            </DataTable.Header>

            {alunos.map((aluno, index) => (
              <DataTable.Row key={index} style={styles.tableRow}>
                <DataTable.Cell textStyle={styles.rowText}>
                  {aluno.nome}
                </DataTable.Cell>

                <DataTable.Cell textStyle={styles.rowText}>
                  {aluno.email}
                </DataTable.Cell>

                <DataTable.Cell textStyle={styles.rowText}>
                  {aluno.turma}
                </DataTable.Cell>

                <DataTable.Cell>
                  <Pressable>
                    <Ionicons name="create-outline" size={15} color="#80B3F8" />
                  </Pressable>
                </DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={0}
              numberOfPages={10}
              onPageChange={() => {}}
              label="Mostrando 12 de 100 alunos"
              showFastPaginationControls
              numberOfItemsPerPage={12}
              onItemsPerPageChange={() => {}}
              selectPageDropdownLabel=""
              style={styles.pagination}
              theme={{
                colors: {
                  onSurface: "#FFFFFF",
                  primary: "#80B3F8",
                },
              }}
            />
          </DataTable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021127",
  },

  scroll: {
    flex: 1,
    width: "100%",
  },

  scrollContent: {
    alignItems: "center",
    paddingBottom: 110,
  },

  image: {
    width: "100%",
    height: 220,
  },

  header: {
    position: "absolute",
    top: 70,
    width: "86%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#FFFFFF",
    fontSize: 13,
    marginTop: 4,
    width: 230,
  },

  notificationButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#112e61",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  notificationDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 50,
    backgroundColor: "#2F6BFF",
  },

  card: {
    backgroundColor: "#051e3e",
    width: "86%",
    marginTop: -40,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    borderColor: "#0B3D91",
  },

  titleCard: {
    color: "#80B3F8",
    fontWeight: "bold",
    fontSize: 15,
  },

  descriptionCard: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 6,
  },

  filterContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 18,
  },

  searchBox: {
    flex: 1,
    height: 36,
    borderWidth: 1,
    borderColor: "#80B3F8",
    borderRadius: 6,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 11,
    padding: 0,
  },

  filterButton: {
    height: 36,
    borderWidth: 1,
    borderColor: "#80B3F8",
    borderRadius: 6,
    paddingHorizontal: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  filterText: {
    color: "#FFFFFF",
    fontSize: 11,
  },

  table: {
    backgroundColor: "#112e61",
    borderRadius: 10,
    marginTop: 16,
    paddingHorizontal: 6,
    paddingTop: 4,
  },

  tableHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#214C89",
  },

  headerText: {
    color: "#2F6BFF",
    fontSize: 9,
    fontWeight: "bold",
  },

  tableRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#214C89",
    minHeight: 36,
  },

  rowText: {
    color: "#FFFFFF",
    fontSize: 8,
  },

  pagination: {
    borderTopWidth: 0,
  },
});