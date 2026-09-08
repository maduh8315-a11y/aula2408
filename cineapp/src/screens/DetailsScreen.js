import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Recebemos "route" para acessar os parâmetros enviados pela Home
export default function DetailsScreen({ route, navigation }) {
  // Desestruturação para pegar o parâmetro "filme"
  const { filme } = route.params;

  // Função para Persistir Dados (AsyncStorage)
  const salvarFavorito = async () => {
    try {
      // 1. Ler o que já existe salvo
      const favoritosAtuais = await AsyncStorage.getItem('@cinefatec_favoritos');
      let listaSalva = favoritosAtuais ? JSON.parse(favoritosAtuais) : [];

      // 2. Verificar se já não está salvo
      const jaExiste = listaSalva.find(f => f.id === filme.id);
      if (jaExiste) {
        Alert.alert("Aviso", "Este filme já está nos favoritos!");
        return;
      }

      // 3. Adicionar o novo e salvar
      listaSalva.push(filme);
      await AsyncStorage.setItem('@cinefatec_favoritos', JSON.stringify(listaSalva));
      
      Alert.alert("Sucesso", "Filme salvo nos favoritos!");
      navigation.goBack(); // Volta para a tela anterior
      
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tituloGrande}>{filme.titulo}</Text>
      <Text style={styles.detalhe}>Ano: {filme.ano}</Text>
      <Text style={styles.sinopse}>{filme.sinopse}</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="Salvar nos Favoritos" onPress={salvarFavorito} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  tituloGrande: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  detalhe: { fontSize: 16, color: 'blue', marginBottom: 20 },
  sinopse: { fontSize: 16, lineHeight: 24, fontStyle: 'italic' }
});