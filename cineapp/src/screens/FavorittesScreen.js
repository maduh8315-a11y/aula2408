import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavoritesScreen() {
  const [favoritos, setFavoritos] = useState([]);

  // Função para ler do Storage
  const carregarFavoritos = async () => {
    const dados = await AsyncStorage.getItem('@cinefatec_favoritos');
    if (dados) {
      setFavoritos(JSON.parse(dados));
    }
  };

  // Carrega ao abrir a tela
  useEffect(() => {
    carregarFavoritos();
  }, []);

  const limparLista = async () => {
      await AsyncStorage.removeItem('@cinefatec_favoritos');
      setFavoritos([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus Filmes Salvos</Text>
      
      {favoritos.length === 0 && <Text>Nenhum favorito ainda.</Text>}

      <FlatList
        data={favoritos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>⭐ {item.titulo}</Text>
          </View>
        )}
      />
      
      <Button title="Limpar Favoritos" color="red" onPress={limparLista} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' }
});