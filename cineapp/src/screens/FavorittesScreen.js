import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function FavoritesScreen() {
  const [favoritos, setFavoritos] = useState([]);

  const carregarFavoritos = async () => {
    const dados = await AsyncStorage.getItem('@cinefatec_favoritos');
    setFavoritos(dados ? JSON.parse(dados) : []);
  };

  // Recarrega toda vez que a tela ganha foco (ex: voltar da Details)
  useFocusEffect(
    React.useCallback(() => {
      carregarFavoritos();
    }, [])
  );

  const limparLista = async () => {
    await AsyncStorage.removeItem('@cinefatec_favoritos');
    setFavoritos([]);
  };

  const removerFavorito = async (id) => {
    const novaLista = favoritos.filter((f) => f.id !== id);
    await AsyncStorage.setItem('@cinefatec_favoritos', JSON.stringify(novaLista));
    setFavoritos(novaLista);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus Filmes Salvos</Text>
      <Text style={styles.contador}>
        {favoritos.length === 0
          ? 'Nenhum filme salvo ainda'
          : `Total: ${favoritos.length} ${favoritos.length === 1 ? 'filme salvo' : 'filmes salvos'}`}
      </Text>

      {favoritos.length === 0 ? (
        <View style={styles.vazioContainer}>
          <Text style={styles.vazioEmoji}>🎬</Text>
          <Text style={styles.vazioTexto}>Sua lista de favoritos está vazia.</Text>
          <Text style={styles.vazioSubtexto}>Volte para a Home e salve alguns filmes!</Text>
        </View>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTexto}>⭐ {item.titulo}</Text>
              <TouchableOpacity onPress={() => removerFavorito(item.id)}>
                <Text style={styles.remover}>🗑 Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {favoritos.length > 0 && (
        <TouchableOpacity style={styles.botaoLimpar} onPress={limparLista}>
          <Text style={styles.botaoLimparTexto}>Limpar Favoritos</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold' },
  contador: { fontSize: 14, color: '#666', marginBottom: 15 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemTexto: { fontSize: 16 },
  remover: { color: '#e53935', fontWeight: 'bold' },
  vazioContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  vazioEmoji: { fontSize: 40, marginBottom: 10 },
  vazioTexto: { fontSize: 16, fontWeight: 'bold', color: '#444' },
  vazioSubtexto: { fontSize: 13, color: '#888', marginTop: 4 },
  botaoLimpar: {
    backgroundColor: '#e53935',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  botaoLimparTexto: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});