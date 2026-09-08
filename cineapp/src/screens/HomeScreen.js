import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { buscarFilmes } from '../api'; // Importando nossa API simulada

export default function HomeScreen({ navigation }) {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect substitui o "OnCreate" para carregar dados iniciais
  useEffect(() => {
    async function carregarDados() {
      const dados = await buscarFilmes(); // Consumo da API (Assíncrono)
      setFilmes(dados);
      setLoading(false);
    }
    carregarDados();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{flex: 1}} />;
  }

  return (
    <View style={styles.container}>
      <Button title="Ver Meus Favoritos" onPress={() => navigation.navigate('Favorites')} />
      
      <FlatList
        data={filmes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            // AQUI OCORRE A PASSAGEM DE PARÂMETROS
            // Passamos o objeto inteiro 'item' para a próxima tela
            onPress={() => navigation.navigate('Details', { filme: item })}
          >
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.ano}>{item.ano}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  card: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 8, elevation: 2 },
  titulo: { fontSize: 18, fontWeight: 'bold' },
  ano: { color: '#666' }
});