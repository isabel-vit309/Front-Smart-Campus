import { Image, Text, View, StyleSheet, Pressable, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";
import { useEffect, useState } from "react";
import api from "../../../services/api";

interface Student {
  id: string;
  name: string;
  enrollment: string;
  user: { email: string };
  courses: { course: { name: string; code: string } }[];
}

export default function ListStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const perPage = 10;

  useEffect(() => {
    api.get("/api/students").then(({ data }) => setStudents(data))
      .catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.user.email.toLowerCase().includes(search.toLowerCase())
  );

  const paged = filtered.slice(page * perPage, (page + 1) * perPage);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator>
        <Image source={require("../../auth/Assets/SenacBackground.png")} style={styles.image} />

        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Listagem de Alunos</Text>
            <Text style={styles.subtitle}>Gerencie os alunos cadastrados no sistema</Text>
          </View>
          <Pressable style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.titleCard}>ALUNOS CADASTRADOS</Text>
          <Text style={styles.descriptionCard}>Visualize e gerencie os alunos do portal</Text>

          <View style={styles.filterContainer}>
            <View style={styles.searchBox}>
              <TextInput
                placeholder="Buscar por nome ou email"
                placeholderTextColor="#9CAAC0"
                style={styles.input}
                value={search}
                onChangeText={(t) => { setSearch(t); setPage(0); }}
              />
              <Ionicons name="search-outline" size={18} color="#FFFFFF" />
            </View>
          </View>

          {loading ? (
            <ActivityIndicator color="#2F6BFF" style={{ marginTop: 20 }} />
          ) : (
            <DataTable style={styles.table}>
              <DataTable.Header style={styles.tableHeader}>
                <DataTable.Title textStyle={styles.headerText}>ALUNO</DataTable.Title>
                <DataTable.Title textStyle={styles.headerText}>EMAIL</DataTable.Title>
                <DataTable.Title textStyle={styles.headerText}>MATRÍCULA</DataTable.Title>
                <DataTable.Title textStyle={styles.headerText}>AÇÕES</DataTable.Title>
              </DataTable.Header>

              {paged.map((aluno) => (
                <DataTable.Row key={aluno.id} style={styles.tableRow}>
                  <DataTable.Cell textStyle={styles.rowText}>{aluno.name}</DataTable.Cell>
                  <DataTable.Cell textStyle={styles.rowText}>{aluno.user.email}</DataTable.Cell>
                  <DataTable.Cell textStyle={styles.rowText}>{aluno.enrollment}</DataTable.Cell>
                  <DataTable.Cell>
                    <Pressable>
                      <Ionicons name="create-outline" size={15} color="#80B3F8" />
                    </Pressable>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}

              <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(filtered.length / perPage)}
                onPageChange={setPage}
                label={`Mostrando ${paged.length} de ${filtered.length} alunos`}
                showFastPaginationControls
                numberOfItemsPerPage={perPage}
                onItemsPerPageChange={() => {}}
                selectPageDropdownLabel=""
                style={styles.pagination}
                theme={{ colors: { onSurface: "#FFFFFF", primary: "#80B3F8" } }}
              />
            </DataTable>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#021127" },
  scroll: { flex: 1, width: "100%" },
  scrollContent: { alignItems: "center", paddingBottom: 110 },
  image: { width: "100%", height: 220 },
  header: { position: "absolute", top: 70, width: "86%", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  title: { color: "#FFFFFF", fontSize: 28, fontWeight: "bold" },
  subtitle: { color: "#FFFFFF", fontSize: 13, marginTop: 4, width: 230 },
  notificationButton: { width: 38, height: 38, borderRadius: 10, backgroundColor: "#112e61", alignItems: "center", justifyContent: "center", marginTop: 5 },
  notificationDot: { position: "absolute", top: 8, right: 8, width: 7, height: 7, borderRadius: 50, backgroundColor: "#2F6BFF" },
  card: { backgroundColor: "#051e3e", width: "86%", marginTop: -40, borderRadius: 12, borderWidth: 1, padding: 14, borderColor: "#0B3D91" },
  titleCard: { color: "#80B3F8", fontWeight: "bold", fontSize: 15 },
  descriptionCard: { color: "#FFFFFF", fontSize: 11, fontWeight: "bold", marginTop: 6 },
  filterContainer: { flexDirection: "row", gap: 8, marginTop: 18 },
  searchBox: { flex: 1, height: 36, borderWidth: 1, borderColor: "#80B3F8", borderRadius: 6, paddingHorizontal: 10, flexDirection: "row", alignItems: "center" },
  input: { flex: 1, color: "#FFFFFF", fontSize: 11, padding: 0 },
  table: { backgroundColor: "#112e61", borderRadius: 10, marginTop: 16, paddingHorizontal: 6, paddingTop: 4 },
  tableHeader: { borderBottomWidth: 1, borderBottomColor: "#214C89" },
  headerText: { color: "#2F6BFF", fontSize: 9, fontWeight: "bold" },
  tableRow: { borderBottomWidth: 1, borderBottomColor: "#214C89", minHeight: 36 },
  rowText: { color: "#FFFFFF", fontSize: 8 },
  pagination: { borderTopWidth: 0 },
});
