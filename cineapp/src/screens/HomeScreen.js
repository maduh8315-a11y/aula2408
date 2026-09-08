import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { buscarFilmes } from '../api';

export default function HomeScreen({ navigation }) {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      const dados = await buscarFilmes();
      setFilmes(dados);
      setLoading(false);
    }
    carregarDados();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#6200ee" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.botaoFavoritos}
        onPress={() => navigation.navigate('Favorites')}
      >
        <Text style={styles.botaoFavoritosTexto}> Ver Meus Favoritos</Text>
      </TouchableOpacity>

      <FlatList
        data={filmes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Details', { filme: item })}
          >
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.ano}>{item.ano} • {item.genero}</Text>
            <Text style={styles.duracao}>⏱ {item.duracao}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  botaoFavoritos: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  botaoFavoritosTexto: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  card: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 8, elevation: 2 },
  titulo: { fontSize: 18, fontWeight: 'bold' },
  ano: { color: '#666', marginTop: 2 },
  duracao: { color: '#999', fontSize: 12, marginTop: 4 },
});