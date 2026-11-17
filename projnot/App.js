import React, { useState, useEffect } from 'react';
import { StyleSheet,Text, View, TextInput, Button, Alert, ActivityIndicator, ScrollView, Platform } from 'react-native';
import { supabase } from './src/services/supabase.js';
import { registerForLocalNotificationsAsync, triggerLocalNotification } from './src/helper/notificationsHelper';

export default function App() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('🟡 Conectando...');

  useEffect(() => {
    // 1. Inicializa permissões e ajusta status
    registerForLocalNotificationsAsync().then((ok) => {
      if (!ok) setStatus('🟠 Sem Permissão de Notificação');
    });

    // 2. Conecta ao canal Realtime do Supabase
    const channel = supabase
      .channel('public:notifications')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        ({ new: data }) => {
          if (data?.title && data?.body) {
            triggerLocalNotification(data.title, data.body);
          }
        }
      )
      .subscribe((state) => {
        if (state === 'SUBSCRIBED') setStatus('🟢 Conectado e Escutando Avisos');
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const sendNotification = async () => {
    const cleanTitle = title.trim();
    const cleanMessage = message.trim();

    if (!cleanTitle || !cleanMessage) {
      return Alert.alert('Atenção', 'Preencha o título e a mensagem.');
    }

    setLoading(true);
    const { error } = await supabase
      .from('notifications')
      .insert([{ title: cleanTitle, body: cleanMessage }]);
    setLoading(false);

    if (error) {
      Alert.alert('Erro ao enviar', error.message);
      return;
    }

    Alert.alert('Sucesso', 'Notificação transmitida!');
    setTitle('');
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>📡 EngComp Alert (Realtime)</Text>

        <View style={styles.statusContainer}>
          <Text style={styles.label}>Status do Sistema:</Text>
          <Text style={styles.statusText}>{status}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.subHeader}>Área do Coordenador</Text>

        <TextInput
          style={styles.input}
          placeholder="Título (ex: Prova Liberada)"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Mensagem (ex: Confira no sistema acadêmico)"
          placeholderTextColor="#888"
          value={message}
          onChangeText={setMessage}
          multiline
        />

        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <Button title="DISPARAR ALERTA" onPress={sendNotification} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  scroll: { padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
  statusContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  label: { fontSize: 14, color: '#666', marginBottom: 4 },
  statusText: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  divider: { height: 1, backgroundColor: '#ddd', marginVertical: 20 },
  subHeader: { fontSize: 18, fontWeight: 'bold', color: '#007AFF', marginBottom: 12 },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: { height: 90, textAlignVertical: 'top' },
});